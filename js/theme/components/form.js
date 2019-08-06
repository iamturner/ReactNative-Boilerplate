import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Input } from './../';
import { Colors } from './../variables/colors';

export class Form extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.inputs = [];
    }
    
    static get Input() {
        
        return FormInput;
    }
    
    focusNextField(input) {
        
        const currentIndex = this.inputs.indexOf(input);
        const nextIndex = currentIndex + 1;
        
        if (this.inputs.length > nextIndex) {
            
            this.inputs[nextIndex].focus();
        }
    }
    
    recursiveMap(children) {
        
        const props = {
            register: (input) => {
                this.inputs.push(input)
            },
            goToNext: (input) => {
                this.focusNextField(input)
            }
        }
        
        return React.Children.map(children, child => {
            
            if (!React.isValidElement(child)) {	
                return child;
            }
            if (child.type === FormInput) {	
                return React.cloneElement(child, props);
            }
            if (child.props.children) {
                return React.cloneElement(child, { children: this.recursiveMap(child.props.children) });
            }
            return child;
        })
    }
    
    render() {
        
        const { children } = this.props;
        const childrenWithProps = this.recursiveMap(children);
        
        return (
            <View 
                {...this.props}>
                { childrenWithProps }
            </View>
        )
    }
    
}

export class FormInput extends React.Component {
    
    static defaultProps = {
        register: () => { return },
        goToNext: () => { return },
        returnKeyType: "next"
    }
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            index: null
        }
        
        this.inputRef = null;
    }
    
    componentDidMount() {
        
        this.props.register(this.inputRef);
    }
    
    goToNext() {
        
        this.props.goToNext(this.inputRef);
    }
    
    render() {
        
        let props = {...this.props};
        
        /* If the input has no `onSubmitEditing` property, 
        set it to go to the next input when submitted. */
        !('onSubmitEditing' in props) && (props.onSubmitEditing = () => { this.goToNext(); })
        
        return (
            <Input 
                {...props} 
                inputRef={input => {
                    this.inputRef = input;
                }} 
            />
        )
        
    }
    
}

const styles = StyleSheet.create({
    
});
