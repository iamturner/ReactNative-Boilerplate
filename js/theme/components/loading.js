import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text, Animated } from 'react-native';
import { View } from './../';

export class Loading extends React.Component {
	
	static show (callback) {

		_loading.setState({
			display: true
		}, () => {
			
			Animated.parallel([
				Animated.timing(_loading.animateLoading.opacity, {
					toValue: 1,
					duration: 100
				})
			]).start(() => {
				
				if (typeof callback == 'function') {
					callback()
				}
			});
			
		})
		
	}
	
	static dismiss (callback) {

		Animated.parallel([
			Animated.timing(_loading.animateLoading.opacity, {
				toValue: 0,
				duration: 100
			})
		]).start(() => {
		
			_loading.setState({
				display: false
			}, () => {
				
				if (typeof callback == 'function') {
					callback()
				}
			})
			
		});
		
	}
	
	constructor(props, context) {
        super(props, context);
		
		this.state = {
			display: false
		}
		
		this.animateLoading = {
            opacity: new Animated.Value(0)
        }
		
		_loading = this;
		
    }
	
	render() {
		
		if (this.state.display) {
			
			return (
				<Animated.View style={[styles.container, { opacity: this.animateLoading.opacity } ]}>
					<View style={styles.loader}>
						<ActivityIndicator color="#69717d" />
					</View>
				</Animated.View>
			)
		}
		else {
			
			return (
				<View />
			)
		}
		
    }
	
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: 'rgba(20,20,20,0.7)'
	}, 
	loader: {
		backgroundColor: '#f8f8f8', 
		justifyContent: 'center', 
		alignItems: 'center', 
		flexDirection: 'row', 
		borderRadius: 8, 
		paddingHorizontal: 34, 
		paddingVertical: 24
	}, 
	text: {
		color: '#222222', 
		fontWeight: 'bold', 
		marginLeft: 16, 
		backgroundColor: 'transparent'
	}
});
