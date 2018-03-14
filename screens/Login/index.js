import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { View, Button, Colors, Container } from './../../theme';

export class Login extends Component {

	constructor(props, context) {
		super(props, context);
	}
	
	goToLoginWithEmail() {
		this.props.navigator.push({
			screen: 'screen.LoginWithEmail',
			title: 'Login With Email', 
			backButtonTitle: 'Back'
		});
	}
	
	goToRegister() {
		this.props.navigator.push({
			screen: 'screen.Register',
			title: 'Register', 
			backButtonTitle: 'Back'
		});
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

