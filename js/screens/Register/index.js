import React, { Component } from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { View, Button, Input, Text, Colors, Container, Loading, Form } from './../../theme';
import authActions from './../../actions/auth';
import { StackActions, NavigationActions } from 'react-navigation';

export class Register extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Register'
		};
	};
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false
		}
		this.registerForm = {
			name: null, 
			email: null, 
			password: null
		}
	}
	
	validateRegisterForm() {
		let name = this.registerForm.name;
		let email = this.registerForm.email;
		let password = this.registerForm.password;
		this.setState({ 
			valid: (name && email && password) ? true : false
		});
	}
	
	register() {
		if (!this.state.valid) {
			return false;
		}
		let name = this.registerForm.name;
		let email = this.registerForm.email;
		let password = this.registerForm.password;
		Loading.show();
		authActions.register(name, email, password).then(() => {
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
			
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
				<Container padding>

					{/* Inputs */}

					<View style={{ flex: 1 }}>
			
						<Form style={{ marginBottom: 16 }}>
							<Form.Input style={{ 
								borderBottomWidth: 1, 
								borderBottomColor: Colors.light, 
								borderBottomLeftRadius: 0, 
								borderBottomRightRadius: 0 }}
								autoCapitalize="words"
								autoCorrect={false}
								onChangeText={(value) => {
									this.registerForm.name = value, 
									this.validateRegisterForm()
								}}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Name</Text>
								</Input.Before>
							</Form.Input>
							<Form.Input style={{ 
								borderBottomWidth: 1, 
								borderBottomColor: Colors.light, 
								borderRadius: 0 }}
								keyboardType="email-address" 
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={(value) => {
									this.registerForm.email = value, 
									this.validateRegisterForm()
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
									this.registerForm.password = value, 
									this.validateRegisterForm()
								}}
								onSubmitEditing={() => {
									if (this.state.valid) {
										this.register();
									}
								}}>
								<Input.Before>
									<Text style={{ marginRight: 24 }}>Password</Text>
								</Input.Before>
							</Form.Input>
						</Form>

						<Button primary disabled={!this.state.valid} onPress={() => this.register()}>
							<Button.Text>Create Account</Button.Text>
						</Button>

					</View>
			
				</Container>
			
			</TouchableWithoutFeedback>
						 
			</KeyboardAvoidingView>
			
		);
		
	}
	
}
