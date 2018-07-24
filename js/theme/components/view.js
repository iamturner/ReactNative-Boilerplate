import React, { Component } from 'react';
import { StyleSheet, View as El } from 'react-native';

export class View extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {
        return (
			<El 
				{...this.props}
				style={[this.props.style, (this.props.padding ? styles.padding : null)]}>
				{ this.props.children }
			</El>
        )
    }
    
}

const styles = StyleSheet.create({
	padding: {
		padding: 16
	}
});