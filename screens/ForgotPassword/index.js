import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Container, Colors, Loading } from './../../theme';
import authProvider from './../../providers/auth';

export class ForgotPassword extends Component {

	static navigatorButtons = {
		leftButtons: [{
			title: 'Cancel', 
			id: 'cancel'
		}]
	}
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false
		}
		this.recoverPasswordForm = {
			email: null
		}
		this.refs;
		/* Listen for nav bar events, (e.g. clicking the 'Cancel' button) */
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		/* Check if event is a button press */
		if (event.type == 'NavBarButtonPress') {
			/* Check ID of button pressed */
			if (event.id == 'cancel') {
				/* Dismiss Modal */
				this.props.navigator.dismissModal();
			}
			
		}
		
	}
	
	validateRecoverPasswordForm() {
		let email = this.recoverPasswordForm.email;
		this.setState({ 
			valid: (email) ? true : false
		});
	}

	recoverPassword() {
		if (!this.state.valid) {
			return false;
		}
		Loading.show().then(() => {
			authProvider.recoverPassword(this.recoverPasswordForm.email).then(() => {
				Loading.dismiss().then(() => {
					this.props.navigator.dismissModal();
					/* Toast notification */
					this.props.navigator.showInAppNotification({
						screen: 'component.Toast', 
						position: 'bottom', 
						passProps: {
							message: "A reset link has been sent to your email."
						}, 
						autoDismissTimerSec: 3
					});
				});
			}, error => {
				Loading.dismiss().then(() => {
					setTimeout(() => {
						Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
					}, 10);
				});
			});
		});
	}
	
	render() {
		
		return (
			
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
				<Container>

					<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
						<Text style={{ fontSize: 14, color: Colors.text }}>Please enter your email address and we will send you a link to reset your password.</Text>
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

						{ (!this.state.valid) && <Button disabled>
							<Button.Text>Submit</Button.Text>
						</Button> }
							
						{ (this.state.valid) && <Button onPress={() => this.recoverPassword()}>
							<Button.Text>Submit</Button.Text>
						</Button> }

					</View>
			
				</Container>
					
			</TouchableWithoutFeedback>
			
			</KeyboardAvoidingView>
						 
		);
		
	}
	
}
