import React, { Component } from 'react';
import { StyleSheet, Text as El } from 'react-native';
import { Colors } from './../variables/colors';

export class Text extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {
        return (
			<El 
				{...this.props}
				style={[styles.text, this.props.style]}>
				{ this.props.children }
			</El>
        )
    }
    
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16, 
		color: Colors.primary
	}
});
