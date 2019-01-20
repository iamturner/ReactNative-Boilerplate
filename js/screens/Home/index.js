import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { View, Button, List, Text, Colors, Container, ActionSheet } from './../../theme';
import authActions from './../../actions/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions, NavigationActions } from 'react-navigation';

export class Home extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Home'
		};
	};
	
	constructor(props, context) {
		super(props, context);
	}
	
	goToProfile() {
		this.props.navigation.navigate('Profile')
	}
	
	goToAccountSettings() {
		this.props.navigation.navigate('AccountSettings')
	}

	logOut() {
		const confirm = () => {
			
			return new Promise((resolve, reject) => {
				ActionSheet.show({
					title: 'Are you sure you want to sign out?', 
					options: ['Sign Out', 'Cancel'], 
					destructiveButtonIndex: 0,
					cancelButtonIndex: 1
				}).then((buttonIndex) => {
					if (buttonIndex == 0) {
						resolve();
					}
				});
			});
		}
		confirm().then(() => {
			authActions.logoutUser();
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Login' })],
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	render() {
		
		return (
			
			<Container>
			
				<List style={{ marginTop: 16 }}>
					<List.Item>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToProfile()}>
							<Text style={{ flex: 1 }}>User Profile</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
					<List.Item style={{ borderBottomWidth: 0 }}>
						<TouchableOpacity style={{ paddingVertical: 7, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.goToAccountSettings()}>
							<Text style={{ flex: 1 }}>Account Settings</Text>
							<Icon name="ios-arrow-forward" size={22} style={{marginTop: 4}} />
						</TouchableOpacity>
					</List.Item>
				</List>

				<Button style={{ marginTop: 24, borderRadius: 0, backgroundColor: 'white' }} onPress={() => this.logOut()}>
					<Button.Text style={{ color: Colors.danger }}>Sign Out</Button.Text>
				</Button>
				
			</Container>
			
		);
		
	}
	
}
