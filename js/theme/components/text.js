import React, { Component } from 'react';
import { StyleSheet, Text as El } from 'react-native';
import { Colors } from './../variables/colors';

export class Text extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {
		
		const { children, style = {} } = this.props;
		
		/* Pass props to children */
		const childrenWithProps = React.Children.map(children, child => {
			if (typeof child == 'object' && child != null) {
				/* Pass style prop to child <Text> elements */
				return React.cloneElement(child, {
					style: Array.isArray(style) ? [...style, ...[child.props.style]] : { ...style, ...child.props.style }
				});
			} else {
				return child
			}
		});
		
        return (
			<El 
				{...this.props}
				style={[styles.text, style]}>
				{ childrenWithProps }
			</El>
        )
    }
    
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16, 
		color: Colors.dark
	}
});
