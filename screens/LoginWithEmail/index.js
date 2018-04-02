import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Colors, Container, Loading } from './../../theme';
import authProvider from './../../providers/auth';

export class LoginWithEmail extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false
		}
		this.loginWithEmailForm = {
			email: null, 
			password: null
		}
		this.inputs = {};
	}
	
	focusNextField(key) {
		this.inputs[key].focus();
	}
	
	validateLoginWithEmailForm() {
		let email = this.loginWithEmailForm.email;
		let password = this.loginWithEmailForm.password;
		this.setState({ 
			valid: (email && password) ? true : false
		});
	}
	
	openForgotPassword() {
		this.props.navigator.showModal({
			screen: 'screen.ForgotPassword',
			title: 'Forgot Password', 
			navigatorStyle: {
				navBarTextColor: Colors.primary, 
				navBarBackgroundColor: '#f8f8f8', 
				navBarNoBorder: true
			}
		});
	}
	
	loginWithEmail() {
		if (!this.state.valid) {
			return false;
		}
		let email = this.loginWithEmailForm.email;
		let password = this.loginWithEmailForm.password;
		Loading.show().then(() => {
			authProvider.loginWithEmail(email, password).then(() => {
				Loading.dismiss().then(() => {
					this.props.navigator.resetTo({
						screen: 'screen.Home',
						title: 'Home', 
						animated: false, 
						navigatorStyle: {
							navBarTextColor: Colors.primary, 
							navBarBackgroundColor: '#f8f8f8', 
							navBarNoBorder: true
						}
					});
				});
			}, error => {
				Loading.dismiss().then(() => {
					Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
				});
			});
		});
	}
	
	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
						
				<Container padding>

					{/* Inputs */}

					<View style={{ flex: 1 }}>
			
						<View style={{ marginBottom: 16 }}>
							<Input style={{ 
								borderBottomWidth: 1, 
								borderBottomColor: '#dddddd', 
								borderBottomLeftRadius: 0, 
								borderBottomRightRadius: 0 }} 
								keyboardType="email-address" 
								autoCapitalize="none"
								returnKeyType={"next"}
								autoCorrect={false}
								onChangeText={(value) => {
									this.loginWithEmailForm.email = value, 
									this.validateLoginWithEmailForm()
								}}
								onSubmitEditing={() => {
									this.focusNextField('password')
								}}
								inputRef={input => {
                                    this.inputs['email'] = input;
                                }}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Email</Text>
								</Input.Before>
							</Input>
							<Input style={{ 
								borderTopLeftRadius: 0, 
								borderTopRightRadius: 0 }}
								secureTextEntry={true}
								onChangeText={(value) => {
									this.loginWithEmailForm.password = value, 
									this.validateLoginWithEmailForm()
								}}
								inputRef={input => {
                                    this.inputs['password'] = input;
                                }}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Password</Text>
								</Input.Before>
							</Input>
						</View>

						{ (!this.state.valid) && <Button disabled>
							<Button.Text>Sign In</Button.Text>
						</Button> }
							
						{ (this.state.valid) && <Button onPress={() => this.loginWithEmail()}>
							<Button.Text>Sign In</Button.Text>
						</Button> }

					</View>
			
					<Button style={{ backgroundColor: 'transparent' }} onPress={() => this.openForgotPassword()}>
						<Button.Text style={{ color: Colors.primary }}>Forgot Password</Button.Text>
					</Button>
			
				</Container>
			
			</KeyboardAvoidingView>
					
			</TouchableWithoutFeedback>
			
		);
		
	}
	
}
