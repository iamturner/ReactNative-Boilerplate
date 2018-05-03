import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './../';

export class Container extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {
        return (
			<View 
				{...this.props}
				style={[styles.container, this.props.style]}
				padding={this.props.padding}>
				{ this.props.children }
			</View>
        )
    }
    
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e5edf1', 
		borderTopWidth: 1, 
		borderTopColor: '#dddddd'
	}
});