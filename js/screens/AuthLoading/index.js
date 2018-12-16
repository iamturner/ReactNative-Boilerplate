import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import { Container, Text } from './../../theme';
import { StackActions, NavigationActions } from 'react-navigation';

export class AuthLoading extends Component {

	/* Temporary screen for while waiting for async storage. 
	This screen will likely be covered by the splash screen. */
	
	static navigationOptions = {
		header: null
	};
	
	constructor(props, context) {
		super(props, context);
	}
	
	componentDidMount = async () => {
		
		AsyncStorage.getItem('loggedUser', (err, user) => {
			
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: user == null ? 'Login' : 'Home' })],
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	render() {
		
		return (
			
			<Container />
		);
		
	}
	
}
