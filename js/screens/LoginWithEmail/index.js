import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, SafeAreaView } from 'react-native';
import { View, Button, Input, Text, Colors, Container, Loading } from './../../theme';
import authActions from './../../actions/auth';
import { StackActions, NavigationActions } from 'react-navigation';

export class LoginWithEmail extends Component {

	static navigationOptions = {
		title: 'Login With Email'
	};
	
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
		this.props.navigation.navigate('ForgotPassword')
	}
	
	loginWithEmail() {
		if (!this.state.valid) {
			return false;
		}
		let email = this.loginWithEmailForm.email;
		let password = this.loginWithEmailForm.password;
		Loading.show();
		authActions.loginWithEmail(email, password).then(() => {
			Loading.dismiss();
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Home' })],
			});
			this.props.navigation.dispatch(resetAction);
		}, error => {
			Loading.dismiss();
			Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
		});
	}
	
	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
			<Container padding>

				<SafeAreaView style={{ flex: 1 }}>

					<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

						{/* Inputs */}

						<View style={{ flex: 1 }}>

							<View style={{ marginBottom: 16 }}>
								<Input style={{ 
									borderBottomWidth: 1, 
									borderBottomColor: Colors.light, 
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
									returnKeyType={"go"}
									enablesReturnKeyAutomatically={true}
									onChangeText={(value) => {
										this.loginWithEmailForm.password = value, 
										this.validateLoginWithEmailForm()
									}}
									inputRef={input => {
										this.inputs['password'] = input;
									}}
									onSubmitEditing={() => {
										if (this.state.valid) {
											this.loginWithEmail();
										}
									}}>
									<Input.Before>
										<Text style={{ marginRight: 24 }}>Password</Text>
									</Input.Before>
								</Input>
							</View>

							 <Button disabled={!this.state.valid} onPress={() => this.loginWithEmail()}>
								<Button.Text>Sign In</Button.Text>
							</Button>

						</View>

						<Button style={{ backgroundColor: 'transparent' }} onPress={() => this.openForgotPassword()}>
							<Button.Text style={{ color: Colors.primary }}>Forgot Password</Button.Text>
						</Button>

					</KeyboardAvoidingView>

				</SafeAreaView>

			</Container>
			
			</TouchableWithoutFeedback>

		);
		
	}
	
}
