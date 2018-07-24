import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { View } from './../';

// Register Loading Component to navigation
Navigation.registerComponent('component.Loading', () => LoadingComponent);

module.exports = {
    
    show: (opts = {}) => {
		
		return new Promise((resolve, reject) => {
			// Show Loading Component as Lightbox
			Navigation.showLightBox({
				screen: 'component.Loading', 
				passProps: opts, 
				style: {
					backgroundBlur: 'none', 
					backgroundColor: '#00000030', 
					tapBackgroundToDismiss: false
				}
			});
			
			return resolve();

		});
		
	}, 
	
	dismiss: () => {
		
		return new Promise((resolve, reject) => {
			// Dismiss Lightbox
			Navigation.dismissLightBox();
			
			return resolve();
		});
		
	}
    
}

class LoadingComponent extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
        return (
			<View style={styles.container}>
				<View style={styles.loader}>
					<ActivityIndicator color="#69717d" />
					{ this.props.text && <Text style={styles.text}>{ this.props.text }</Text> }
				</View>
			</View>
        )
    }
	
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', 
		justifyContent: 'center'
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
