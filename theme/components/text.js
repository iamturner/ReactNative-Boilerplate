import React, { Component } from 'react';
import { StyleSheet, Text as El } from 'react-native';

export class Text extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {
        return (
			<El style={[{ fontSize: 16 }, this.props.style]}>
				{ this.props.children }
			</El>
        )
    }
    
}
