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
		
		const { children } = this.props;
		
		/* Pass props to children */
		const childrenWithProps = React.Children.map(children, child => 
			React.cloneElement(child, {
		  		primary: this.props.primary,
				outline: this.props.outline
			}));
		
        return (
			<TouchableOpacity 
				{...this.props}
				style={[
					styles.button, 
					(this.props.primary ? styles.buttonPrimary : null), 
					(this.props.outline ? styles.buttonOutline : null), 
					(this.props.disabled ? styles.buttonDisabled : null),
					this.props.style
				]} 
				activeOpacity={this.props.disabled ? 0.4 : 0.8}>
				<View>
					{ childrenWithProps }
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
			<Text 
				{...this.props}
				style={[
					styles.buttonText, 
					(this.props.primary ? styles.buttonTextWhite : null), 
					(this.props.outline ? styles.buttonTextPrimary : null), 
					this.props.style
				]}>
				{ this.props.children }
			</Text>
		)
		
	}
	
}

const styles = StyleSheet.create({
	button: {
		height: 44, 
		paddingHorizontal: 12,
		alignItems: 'center', 
		justifyContent: 'center',
		borderRadius: 6
	}, 
	buttonPrimary: {
		backgroundColor: Colors.primary
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
		fontSize: 17,
		color: Platform.OS === 'ios' ? 'rgb(0,122,255)' : 'rgb(0,0,0)'
	},
	buttonTextWhite: {
		color: 'white'
	},
	buttonTextPrimary: {
		color: Colors.primary
	}
});