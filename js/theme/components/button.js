import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors } from './../variables/colors';
import { Text } from './../';

export class Button extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
	static get Text() {
		return ButtonText;
	}
	
    render() {
		
		const { children, color = '', size = 'normal', variant = '', disabled, style } = this.props;
		
		const Sizes = {
			small: styles.buttonSmall,
			large: styles.buttonLarge
		}
		
		const Variants = {
			outline: styles.buttonOutline,
			clear: {/* IF NECESSARY */}
		}
		
		let buttonStyles = {};
        let buttonTextStyles = {};
		
		/* Set Color */
        if (Colors.hasOwnProperty(color) && variant == '') { 
            buttonStyles.backgroundColor = Colors[color]
			/* Set text color to white if not a 'light' button */
            if (color != "light") {
                buttonTextStyles.color = 'white'
            }
        }
		
		/* Set Size */
		if (Sizes.hasOwnProperty(size)) { 
            buttonStyles = Object.assign(buttonStyles, Sizes[size])
			/* Set text size */
			buttonTextStyles.fontSize = Sizes[size].fontSize
		}
		
		/* Set Variant */
		if (Variants.hasOwnProperty(variant)) { 
            buttonStyles = Object.assign(buttonStyles, Variants[variant])
			if (Colors.hasOwnProperty(color)) { 
				buttonStyles.borderColor = Colors[color]
				buttonTextStyles.color = Colors[color]
			}
        }
		
		/* Pass props to children */
		const childrenWithProps = React.Children.map(children, child => 
			React.cloneElement(child, {
		  		buttonTextStyles: buttonTextStyles
			}));
		
        return (
			<TouchableOpacity 
				{...this.props}
				style={[
					styles.button, 
					buttonStyles,
					style
				]} 
				activeOpacity={disabled ? 0.4 : 0.8}>
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
		
		const { children, buttonTextStyles, style } = this.props;
		
		return (
			<Text 
				{...this.props}
				style={[
					styles.buttonText, 
					buttonTextStyles,
					style
				]}>
				{ children }
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
		borderWidth: 1,
		borderColor: Platform.OS === 'ios' ? 'rgb(0,122,255)' : 'rgb(0,0,0)'
	}, 
	buttonSmall: {
		fontSize: 15,
		height: 32
	},
	buttonLarge: {
		fontSize: 19,
		height: 54,
		paddingHorizontal: 20
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
