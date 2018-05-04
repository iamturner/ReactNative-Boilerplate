import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, AlertIOS, Alert } from 'react-native';
import { View, Button, List, Text, Colors, Container, Loading } from './../../theme';
import authProvider from './../../providers/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import prompt from 'react-native-prompt-android';

export class AccountSettings extends Component {

	constructor(props, context) {
		super(props, context);
	}
	
	goToChangeEmail() {
		this.props.navigator.push({
			screen: 'screen.ChangeEmail',
			title: 'Change Email', 
			backButtonTitle: 'Back'
		});
	}
	
	goToChangePassword() {
		this.props.navigator.push({
			screen: 'screen.ChangePassword',
			title: 'Change Password', 
			backButtonTitle: 'Back'
		});
	}
	
	deleteAccount() {
		const confirm = () => {
			return new Promise((resolve, reject) => {
				if (Platform.OS === 'ios') {
					AlertIOS.prompt(
						'Password Confirmation',
						'Please confirm your password to delete your account',
						password => {
							resolve(password);
						}, 
						'secure-text'
					);
				} else {
					prompt(
						'Password Confirmation',
						'Please confirm your password to delete your account', [{
							text: 'Cancel', onPress: () => {/* Cancelled */}, style: 'cancel'}, {
							text: 'OK', onPress: password => {
								resolve(password)
							}
						}], { 
							type: 'secure-text', 
							cancelable: false 
						}
					);
				}
			});
		}
		confirm().then((password) => {
			Loading.show().then(() => {
				authProvider.deleteAccount(password).then(() => {
					Loading.dismiss().then(() => {
						this.props.navigator.resetTo({
							screen: 'screen.Login',
							title: 'Login', 
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
		});
	}
	
	render() {
		
		return (
			
			<Container>
			
				<List style={{ marginTop: 16 }}>
					<List.Item>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToChangeEmail()}>
							<Text style={{ flex: 1 }}>Change Email</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
					<List.Item style={{ borderBottomWidth: 0 }}>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToChangePassword()}>
							<Text style={{ flex: 1 }}>Change Password</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
				</List>
			
				<View style={{ marginTop: 24, paddingHorizontal: 16 }}>
					<Text style={{ fontSize: 14, color: Colors.text }}>Some sort of warning about deleting your account.</Text>
				</View>
			
				<Button style={{ marginTop: 12, borderRadius: 0, backgroundColor: 'white' }} onPress={() => this.deleteAccount()}>
					<Button.Text style={{ color: Colors.danger }}>Delete Account</Button.Text>
				</Button>
			
			</Container>
			
		);
		
	}
	
}
