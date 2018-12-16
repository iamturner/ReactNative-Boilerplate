import _ from "lodash";
import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TextInput } from 'react-native';

export class Input extends React.Component {
    
    constructor(props, context) {
        super(props, context);
		
		this.state = {
			contentBefore: null, 
			contentAfter: null
		}
    }
	
	static get Before() {
		return InputBefore;
	}
	
	static get After() {
		return InputAfter;
	}

    render() {
		
		React.Children.map(this.props.children, (child) => {

			if (child.type === InputBefore) {
				if (!this.state.contentBefore) {
					this.setState({ contentBefore: child });
				}
			} else if (child.type === InputAfter) {
				if (!this.state.contentAfter) {
					this.setState({ contentAfter: child });	
				}
			}
			
		});
		
		let computedProps = _.clone(this.props);
		delete computedProps.children;
		
        return (
			<View style={[styles.container, this.props.style]}>
				{ this.state.contentBefore }
				<TextInput 
					{...computedProps}
					style={styles.input}
					ref={this.props.inputRef}
					underlineColorAndroid='transparent' />
				{ this.state.contentAfter }
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
		borderRadius: 6, 
		flexDirection: 'row', 
		overflow: 'hidden', 
		paddingHorizontal: 16, 
		alignItems: 'center', 
		flexWrap: 'wrap'
	}, 
	input: {
		flex: 1, 
		fontSize: 16, 
		paddingVertical: (Platform.OS === 'ios' ? 12 : 8)
	}
});
