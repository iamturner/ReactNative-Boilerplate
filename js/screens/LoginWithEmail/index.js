import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, SafeAreaView } from 'react-native';
import { View, Button, Input, Text, Colors, Container, Loading, Form } from './../../theme';
import authActions from './../../actions/auth';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class LoginWithEmail extends Component {

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
	}
	
	validateLoginWithEmailForm() {
		const { email, password } = this.loginWithEmailForm;
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
		const { email, password } = this.loginWithEmailForm;
		Loading.show();
		this.props.dispatchLoginWithEmail(email, password).then(() => {
			Loading.dismiss();
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

							<Form style={{ marginBottom: 16 }}>
								<Form.Input style={{ 
									borderBottomWidth: 1, 
									borderBottomColor: Colors.light, 
									borderBottomLeftRadius: 0, 
									borderBottomRightRadius: 0 }} 
									keyboardType="email-address" 
									autoCapitalize="none"
									autoCorrect={false}
									onChangeText={(value) => {
										this.loginWithEmailForm.email = value, 
										this.validateLoginWithEmailForm()
									}}>
									<Input.Before>
										<Text style={{ marginRight: 24 }}>Email</Text>
									</Input.Before>
								</Form.Input>
								<Form.Input style={{ 
									borderTopLeftRadius: 0, 
									borderTopRightRadius: 0 }}
									secureTextEntry={true}
									returnKeyType={"go"}
									enablesReturnKeyAutomatically={true}
									onChangeText={(value) => {
										this.loginWithEmailForm.password = value, 
										this.validateLoginWithEmailForm()
									}}
									onSubmitEditing={() => {
										if (this.state.valid) {
											this.loginWithEmail();
										}
									}}>
									<Input.Before>
										<Text style={{ marginRight: 24 }}>Password</Text>
									</Input.Before>
								</Form.Input>
							</Form>

							 <Button color={'primary'} disabled={!this.state.valid} onPress={() => this.loginWithEmail()}>
								<Button.Text>Sign In</Button.Text>
							</Button>

						</View>

					</KeyboardAvoidingView>

					<Button color={'primary'} variant={'clear'} onPress={() => this.openForgotPassword()}>
						<Button.Text>Forgot Password</Button.Text>
					</Button>

				</SafeAreaView>

			</Container>
			
			</TouchableWithoutFeedback>

		);
		
	}
	
}

const mapDispatchToProps = (dispatch) => {
	
	return {
		dispatchLoginWithEmail: (email, password) => dispatch(authActions.loginWithEmail(email, password))
	}
}

export default connect(
	null,
	mapDispatchToProps
)(LoginWithEmail);