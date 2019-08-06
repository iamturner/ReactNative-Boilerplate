import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Container, Loading, Toast, Colors, Form } from './../../theme';
import authActions from "./../../actions/auth";

export class ChangePassword extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Change Password'
        };
    };
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: false
        }
        this.changePasswordForm = {
            current: null, 
            new: null
        }
    }
    
    validateChangePasswordForm() {
        const currentPassword = this.changePasswordForm.current;
        const newPassword = this.changePasswordForm.new;
        this.setState({ 
            valid: (currentPassword && newPassword) ? true : false
        });
    }
    
    changePassword() {
        if (!this.state.valid) {
            return false;
        }
        const currentPassword = this.changePasswordForm.current;
        const newPassword = this.changePasswordForm.new;
        Loading.show();
        authActions.updatePassword(currentPassword, newPassword).then(() => {
            Loading.dismiss();
            this.props.navigation.pop();
            /* Toast notification */
            Toast.show("Your password has been updated.");
        }, error => {
            Loading.dismiss();
            Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
        });
    }
    
    render() {
        
        return (
            
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            
            <Container padding>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

                    {/* Inputs */}

                    <View style={{ flex: 1 }}>

                        <Form style={{ marginBottom: 16 }}>
                            <Form.Input style={{ 
                                borderBottomWidth: 1, 
                                borderBottomColor: Colors.light, 
                                borderBottomLeftRadius: 0, 
                                borderBottomRightRadius: 0 }}
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    this.changePasswordForm.current = value, 
                                    this.validateChangePasswordForm()
                                }}>
                                <Input.Before>
                                    <Text style={{ marginRight: 24 }}>Current</Text>
                                </Input.Before>
                            </Form.Input>
                            <Form.Input style={{ 
                                borderTopLeftRadius: 0, 
                                borderTopRightRadius: 0 }}
                                secureTextEntry={true}
                                returnKeyType={"go"}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={(value) => {
                                    this.changePasswordForm.new = value, 
                                    this.validateChangePasswordForm()
                                }}
                                onSubmitEditing={() => {
                                    if (this.state.valid) {
                                        this.changePassword();
                                    }
                                }}>
                                <Input.Before>
                                    <Text style={{ marginRight: 24 }}>New</Text>
                                </Input.Before>
                            </Form.Input>
                        </Form>

                        <Button color={'primary'} disabled={!this.state.valid} onPress={() => this.changePassword()}>
                            <Button.Text>Submit</Button.Text>
                        </Button>

                    </View>

                </KeyboardAvoidingView>

            </Container>
            
            </TouchableWithoutFeedback>
            
        );
        
    }
    
}
