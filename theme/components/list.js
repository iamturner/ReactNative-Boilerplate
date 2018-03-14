import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export class List extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
	
	static get Item() {
		return ListItem;
	}

    render() {

        return (
			<View style={[styles.list, this.props.style]}>
				{ this.props.children }
			</View>
        )
		
    }
    
}

export class ListItem extends React.Component {
	
	constructor(props, context) {
        super(props, context);
    }
	
	render() {
		
		return (
			<View style={[styles.item, this.props.style]}>
				{ this.props.children }
			</View>
		)
		
	}
	
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: 'white', 
		paddingLeft: 16
	}, 
	item: {
		borderBottomWidth: 1, 
		borderBottomColor: '#ddd', 
		paddingRight: 16
	}
});
