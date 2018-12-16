import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View, Button, Colors, Container } from './../../theme';

export class Login extends Component {

	static navigationOptions = {
		title: 'Login'
	};
	
	constructor(props, context) {
		super(props, context);
	}
	
	goToLoginWithEmail() {
		this.props.navigation.navigate('LoginWithEmail')
	}
	
	goToRegister() {
		this.props.navigation.navigate('Register')
	}
	
	render() {
		
		return (
			
			<Container padding>

				<Button onPress={() => this.goToLoginWithEmail()}>
					<Button.Text>Sign in with Email</Button.Text>
				</Button>
					
				<Button outline style={{ marginTop: 24 }} onPress={() => this.goToRegister()}>
					<Button.Text style={{ color: Colors.primary }}>Create New Account</Button.Text>
				</Button>

			</Container>
			
		);
		
	}
	
}
