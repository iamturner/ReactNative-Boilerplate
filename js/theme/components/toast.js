import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { View } from './../';

// Register Loading Component to navigation
Navigation.registerComponent('component.Toast', () => ToastComponent);

class ToastComponent extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
        return (
			<View style={styles.container}>
				<View style={styles.toast}>
					<Text style={styles.text}>{ this.props.message }</Text>
				</View>
			</View>
        )
    }
	
}

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get('window').width, 
		padding: 16
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
