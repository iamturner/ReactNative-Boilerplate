import React, { Component } from 'react';
import { Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, AlertIOS } from 'react-native';
import { View, Button, Input, Text, Container, Loading, Toast } from './../../theme';
import authActions from "./../../actions/auth";
import prompt from 'react-native-prompt-android';

export class ChangeEmail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Change Email'
        };
    };
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: false
        }
        this.changeEmailForm = { 
            newEmail: null
        }
    }
    
    validateChangeEmailForm() {
        const { newEmail } = this.changeEmailForm;
        this.setState({ 
            valid: (newEmail) ? true : false
        });
    }
    
    changeEmail() {
        if (!this.state.valid) {
            return false;
        }
        const { newEmail } = this.changeEmailForm;
        /* User should reauthenticate before changing their email */
        const confirmPassword = () => {
            return new Promise((resolve, reject) => {
                if (Platform.OS === 'ios') {
                    AlertIOS.prompt(
                        'Password Confirmation',
                        'Please confirm your password to change your email address',
                        password => {
                            resolve({ email: newEmail, password: password});
                        }, 
                        'secure-text'
                    );
                } else {
                    prompt(
                        'Password Confirmation',
                        'Please confirm your password to change your email address', [{
                            text: 'Cancel', onPress: () => {/* Cancelled */}, style: 'cancel'}, {
                            text: 'OK', onPress: password => resolve({ email: newEmail, password: password})
                        }], { 
                            type: 'secure-text', 
                            cancelable: false 
                        });
                }
            })
        }
        confirmPassword().then((resp) => {
            Loading.show();
            authActions.updateEmail(resp.email, resp.password).then(() => {
                Loading.dismiss();
                this.props.navigation.pop();
                // Toast notification
                Toast.show("Your email address has been updated.");
            }, error => {
                Loading.dismiss();
                Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
            });
        })
    }
    
    render() {
        
        return (
            
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            
            <Container padding>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

                    {/* Inputs */}

                    <View style={{ flex: 1 }}>

                        <View style={{ marginBottom: 16 }}>
                            <Input 
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                onChangeText={(value) => {
                                    this.changeEmailForm.newEmail = value, 
                                    this.validateChangeEmailForm()
                                }} 
                                autoCorrect={false}
                                returnKeyType={"go"}
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => {
                                    if (this.state.valid) {
                                        this.changeEmail();
                                    }
                                }}>
                                <Input.Before>
                                    <Text style={{ marginRight: 24 }}>Email</Text>
                                </Input.Before>
                            </Input>
                        </View>

                        <Button color={'primary'} disabled={!this.state.valid} onPress={() => this.changeEmail()}>
                            <Button.Text>Submit</Button.Text>
                        </Button>

                    </View>

                </KeyboardAvoidingView>

            </Container>
            
            </TouchableWithoutFeedback>
            
        );
        
    }
    
}
