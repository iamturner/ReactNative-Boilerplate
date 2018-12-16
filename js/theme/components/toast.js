import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { View } from './../';

export class Toast extends React.Component {
	
	static show (msg) {

		_toast.setState({
			display: true, 
			message: msg
		}, () => {
		
			Animated.parallel([
				Animated.timing(_toast.animateToast.opacity, {
					toValue: 1,
					duration: 200
				}),
				Animated.timing(_toast.animateToast.translateY, {
					toValue: 0,
					duration: 200
				})
			]).start(() => {

				// Auto close after 3 seconds 
				setTimeout(() => {
					_toast.close();
				}, 2000)

			});
			
		})
		
	}
	
	constructor(props, context) {
        super(props, context);
		
		this.state = {
			display: false, 
			message: '', 
			animateToast: 1
		}
		
		this.animateToast = {
            opacity: new Animated.Value(0), 
            translateY: new Animated.Value(15)
        }
		
		_toast = this;
    }
	
	close() {
		
		Animated.parallel([
			Animated.timing(_toast.animateToast.opacity, {
				toValue: 0,
				duration: 200
			}),
			Animated.timing(_toast.animateToast.translateY, {
				toValue: 15,
				duration: 200
			})
		]).start(() => {
			
			this.setState({
				display: false
			})
			
		});
		
	}
	
	render() {
		
		if (this.state.display) {
			
			return (
				<TouchableWithoutFeedback onPress={() => this.close()}>
					<View style={styles.container}>
						<Animated.View 
							style={[styles.toast, {
								opacity: this.animateToast.opacity, 
								transform: [{
									translateY: this.animateToast.translateY
								}]
							}]}>
							<Text style={styles.text}>{ this.state.message }</Text>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
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
		width: Dimensions.get('window').width, 
		padding: 16, 
		position: 'absolute', 
		bottom: 40
	}, 
	toast: {
		backgroundColor: 'rgba(0,0,0,0.9)', 
		borderRadius: 4, 
		padding: 15
	}, 
	text: {
		color: '#ffffff', 
		fontSize: 14
	}
});
