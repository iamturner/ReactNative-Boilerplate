import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TextInput } from 'react-native';

export class Input extends React.Component {
    
    constructor(props, context) {
        super(props, context);
		
		this.contentBefore = null;
		this.contentAfter = null;
    }
	
	static get Before() {
		return InputBefore;
	}
	
	static get After() {
		return InputAfter;
	}

    render() {
		
		React.Children.forEach(this.props.children, (child) => {
			
			if (child.type.displayName == 'InputBefore') {
				this.contentBefore = child;
			} else if (child.type.displayName == 'InputAfter') {
				this.contentAfter = child;
			}
			
		});
		
        return (
			<View style={[styles.container, this.props.style]}>
				{ this.contentBefore }
				<TextInput 
					style={styles.input} 
					value={this.props.value}
					blurOnSubmit={this.props.blurOnSubmit} 					
					onSubmitEditing={this.props.onSubmitEditing} 
					placeholder={this.props.placeholder} 
					secureTextEntry={this.props.secureTextEntry} 
					spellCheck={this.props.spellCheck} 
					returnKeyType={this.props.returnKeyType}
					onChangeText={this.props.onChangeText}
					keyboardType={this.props.keyboardType}
					autoCapitalize={this.props.autoCapitalize}
					autoCorrect={this.props.autoCorrect}
					ref={this.props.inputRef} 
					underlineColorAndroid='transparent' />
				{ this.contentAfter }
			</View>
        )
		
    }
    
}

export class InputBefore extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
		
		return (
			<View>
				{ this.props.children }
			</View>
		)
		
	}
	
}

export class InputAfter extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
		
		return (
			<View>
				{ this.props.children }
			</View>
		)
		
	}
	
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white', 
		borderRadius: 4, 
		flexDirection: 'row', 
		overflow: 'hidden', 
		paddingHorizontal: 16, 
		paddingVertical: (Platform.OS === 'ios' ? 12 : 0), 
		alignItems: 'center', 
		flexWrap: 'wrap'
	}, 
	input: {
		flex: 1, 
		fontSize: 16
	}
});