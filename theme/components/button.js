import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from './../variables/colors';

export class Button extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
	static get Text() {
		return ButtonText;
	}
	
    render() {
        return (
			<TouchableOpacity 
				style={[
					styles.button, 
					this.props.style, 
					(this.props.outline ? styles.buttonOutline : null), 
					(this.props.disabled ? styles.buttonDisabled : null)
				]} 
				onPress={this.props.onPress}
				activeOpacity={this.props.disabled ? 0.4 : 0.8}>
				<View>
					{ this.props.children }
				</View>
			</TouchableOpacity>
        )
    }
    
}

export class ButtonText extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
		
		return (
			<Text style={[styles.buttonText, this.props.style]}>
				{ this.props.children }
			</Text>
		)
		
	}
	
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary, 
		height: 44, 
		paddingHorizontal: 16, 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderRadius: 4, 
		marginVertical: 2
	}, 
	buttonOutline: {
		backgroundColor: 'transparent', 
		borderWidth: 1, 
		borderColor: Colors.primary
	}, 
	buttonDisabled: {
		opacity: 0.4
	}, 
	buttonText: {
		fontSize: 16, 
		color: 'white'
	}
});