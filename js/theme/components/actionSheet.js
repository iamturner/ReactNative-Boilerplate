import React, { Component } from 'react';
import { StyleSheet, Animated, Platform, ActionSheetIOS, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { View, Colors, Text } from './../';

export class ActionSheet extends React.Component {
    
    static show(params = {}) {
        
        if (Platform.OS == 'ios') {
        
            return new Promise((resolve, reject) => {
            
                ActionSheetIOS.showActionSheetWithOptions(params, (buttonIndex) => {

                    resolve(buttonIndex)
                });
            });
        
        } else {
            
            _actionSheet.setState({
                show: true, 
                title: params.title, 
                options: params.options, 
                destructiveButtonIndex: params.destructiveButtonIndex, 
                cancelButtonIndex: params.cancelButtonIndex
            })
            
            return new Promise((resolve, reject) => {
                
                _actionSheet.resolve = resolve
            });
            
        }
            
    }
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            show: false, 
            title: null, 
            options: [], 
            destructiveButtonIndex: null,
            cancelButtonIndex: null
        }
        
        this.resolve = null;
        
        this.animateSheet = {
            opacity: new Animated.Value(0), 
            translateY: new Animated.Value(0), 
            backgroundColor: new Animated.Value(0), 
        }
        
        this.actionSheetHeight = null;
        
        _actionSheet = this;
    }
    
    selectOption(buttonIndex) {
        
        Animated.parallel([
            Animated.timing(_actionSheet.animateSheet.translateY, {
                toValue: this.actionSheetHeight,
                duration: 300
            }), 
            Animated.timing(_actionSheet.animateSheet.backgroundColor, {
                toValue: 0,
                duration: 300
            })
        ]).start(() => {

            this.setState({
                show: false
            }, () => {
                this.resolve(buttonIndex)
            })
        });
    }
    
    animateIn(e) {
        
        let height = e.nativeEvent.layout.height;
        
        Animated.parallel([
            Animated.timing(_actionSheet.animateSheet.translateY, {
                toValue: height,
                duration: 0
            }), 
            Animated.timing(_actionSheet.animateSheet.opacity, {
                toValue: 0,
                duration: 0
            })
        ]).start(() => {
            
            Animated.parallel([
                Animated.timing(_actionSheet.animateSheet.translateY, {
                    toValue: 0,
                    duration: 300
                }), 
                Animated.timing(_actionSheet.animateSheet.backgroundColor, {
                    toValue: 100,
                    duration: 300
                }), 
                Animated.timing(_actionSheet.animateSheet.opacity, {
                    toValue: 1,
                    duration: 0
                })
            ]).start();
            
            _actionSheet.actionSheetHeight = height;
            
        });
    }
    
    render() {
        
        if (Platform.OS == 'ios' || !this.state.show) {
        
            return (
                <View />
            )
            
        } else {
        
            return (
                <TouchableWithoutFeedback onPress={() => { this.selectOption(null) }}>
                <Animated.View 
                    style={[ 
                        styles.container, {
                        backgroundColor: this.animateSheet.backgroundColor.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.48)"]
                        })
                    }]}>
                    <Animated.View 
                        style={[ 
                            styles.actionSheet, {
                            opacity: this.animateSheet.opacity, 
                            transform: [{
                                translateY: this.animateSheet.translateY
                            }]
                        }]} 
                        onLayout={this.animateIn}>
                        <View padding style={{ backgroundColor: 'white' }}>
                            <Text alt size={12} weight={'300'} color={Colors.grey} style={{ textAlign: 'center' }}>{ this.state.title }</Text>
                        </View>
                
                        { this.state.options.map((option, i) => {
                            return (
                                <View key={'option-'+i} style={[{ backgroundColor: Colors.primary }, (this.state.cancelButtonIndex == i) && { marginTop: 8 } ]}>
                                    <TouchableOpacity 
                                        activeOpacity={0.95}
                                        style={[styles.button]} 
                                        onPress={() => this.selectOption(i)}>	
                                        <Text 
                                            alt 
                                            size={15} 
                                            weight={'300'} 
                                            style={[
                                                { textAlign: 'center' }, 
                                                (this.state.destructiveButtonIndex == i) && { color: Colors.danger }, 
                                            ]}>
                                            { option }</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) }
                    </Animated.View>
                </Animated.View>
                </TouchableWithoutFeedback>
            )
            
        }
        
    }
    
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, 
        flexDirection: 'row', 
        alignItems: 'flex-end'
    }, 
    actionSheet: {
        flex: 1, 
        padding: 8
    }, 
    button: {
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderTopColor: '#e7e7e7', 
        backgroundColor: 'white'
    }
});
