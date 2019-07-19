import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Container, Loading, Toast } from './../../theme';
import authActions from './../../actions/auth';

export class ForgotPassword extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Forgot Password',
			headerLeft: (
				<Button onPress={() => navigation.pop()}>
					<Button.Text>Cancel</Button.Text>
				</Button>
			)
		};
	};
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false
		}
		this.recoverPasswordForm = {
			email: null
		}
		this.refs;
	}
	
	validateRecoverPasswordForm() {
		const { email } = this.recoverPasswordForm;
		this.setState({ 
			valid: (email) ? true : false
		});
	}

	recoverPassword() {
		if (!this.state.valid) {
			return false;
		}
		const { email } = this.recoverPasswordForm;
		Loading.show();
		authActions.recoverPassword(email).then(() => {
			Loading.dismiss();
			this.props.navigation.pop();
			/* Toast notification */
			Toast.show("A reset link has been sent to your email.");
		}, error => {
			Loading.dismiss().then(() => {
				setTimeout(() => {
					Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
				}, 10);
			});
		});
	}
	
	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

			<Container>

				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

					<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
						<Text style={{ fontSize: 14 }}>Please enter your email address and we will send you a link to reset your password.</Text>
					</View>

					{/* Inputs */}

					<View padding style={{ flex: 1 }}>

						<View style={{ marginBottom: 16 }}>
							<Input  
								keyboardType="email-address" 
								autoCapitalize="none"
								onChangeText={(value) => {
									this.recoverPasswordForm.email = value, 
									this.validateRecoverPasswordForm()
								}}
								autoCorrect={false}
								returnKeyType={"go"}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => {
									if (this.state.valid) {
										this.recoverPassword();
									}
								}}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Email</Text>
								</Input.Before>
							</Input>
						</View>

						<Button color={'primary'} disabled={!this.state.valid} onPress={() => this.recoverPassword()}>
							<Button.Text>Submit</Button.Text>
						</Button>

					</View>

				</KeyboardAvoidingView>

			</Container>
					
			</TouchableWithoutFeedback>
						 
		);
		
	}
	
}
