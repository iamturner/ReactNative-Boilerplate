import React, { Component } from 'react';
import { StyleSheet, Image as El, View } from 'react-native';

export class Image extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
        
    render() {

        const { source, style, placeholder, ...rest } = this.props;

        return (
            <View style={[style, styles.container]}>
                <El 
                    {...rest}
                    style={[styles.image]}
                    source={source} />
                { placeholder && <El 
                    {...rest}
                    style={[styles.image, styles.placeholder]}
                    source={placeholder} /> }
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    image: {
        ...StyleSheet.absoluteFill,
        height: '100%',
        width: '100%'
    },
    placeholder: {
        zIndex: -1
    }
})