import React, { Component } from 'react';
import { Platform, StyleSheet, Alert, Image, ActionSheetIOS, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, Button, List, Input, Text, Container, Colors, Loading } from './../../theme';
import profileProvider from './../../providers/profile';
import Icon from 'react-native-vector-icons/Ionicons';

export class EditProfile extends Component {

	static navigatorButtons = {
		leftButtons: [{
			title: 'Cancel', 
			id: 'cancel'
		}], 
		rightButtons: [{
			title: 'Save', 
			id: 'save', 
			buttonFontSize: 18, 
			buttonFontWeight: 'bold'
		}]
	}
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false, 
			userProfile: null
        }
		this.inputs = {};
		/* Listen for nav bar events, (e.g. clicking the 'Cancel' button) */
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		profileProvider.getUserProfile().then((user) => {
			this.setState({
				userProfile: JSON.parse(JSON.stringify(user))
        	}, () => {
				this.validateUserProfileForm();
			});
		});
	}
	
	onNavigatorEvent(event) {
		/* Check if event is a button press */
		if (event.type == 'NavBarButtonPress') {
			/* Check ID of button pressed */
			if (event.id == 'cancel') {
				/* Dismiss Modal */
				this.props.navigator.dismissModal();
			} else if (event.id == 'save') {
				this.updateProfile();
			}
		}
		
	}

	focusNextField(key) {
		this.inputs[key].focus();
	}

	validateUserProfileForm() {
		let name = this.state.userProfile.name;
		this.setState({ 
			valid: (name) ? true : false
		});
	}

	async openCameraRoll() {
		if (this.state.userProfile.photo) {
			/* Display photo options */
			const confirm = () => {
				return new Promise((resolve, reject) => {
					/* Display action sheet (iOS) */
					if (Platform.OS === 'ios') {
						ActionSheetIOS.showActionSheetWithOptions({
							options: ['Choose New Photo', 'Delete Photo', 'Cancel'],
							destructiveButtonIndex: 1,
							cancelButtonIndex: 2,
						}, (buttonIndex) => {
							switch (buttonIndex) {
								case 0 :
									resolve();
									break;
								case 1 :
									/* Remove user's profile photo*/
									let profile = this.state.userProfile;
										profile.photo = null;
									this.setState({
										userProfile: profile
									});
									
									reject();
									break;
								case 2 :
									reject();
									break;
							}
						});
					} 
					/* Display alert (Android) */
					else {
						Alert.alert('Profile Photo', 'Edit your profile photo.', [{
							text: 'Delete', onPress: () => {
								/* Remove user's profile photo*/
								let profile = this.state.userProfile;
									profile.photo = null;
								this.setState({
									userProfile: profile
								});

								reject();
							}, style: 'destructive'}, {
							text: 'Cancel', onPress: () => {
								reject();
							}, style: 'cancel'}, {
							text: 'Choose', onPress: () => {
								resolve();
							}
						}], { cancelable: false });
					}
				});
			}
			await confirm();
		}
		/* Open Modal */
		this.props.navigator.showModal({
			screen: 'screen.CameraRoll',
			title: 'All Photos', 
			navigatorStyle: {
				navBarTextColor: Colors.primary, 
				navBarBackgroundColor: '#f8f8f8', 
				navBarNoBorder: true
			}, 
			passProps: {
				onSelectedPhoto: (data) => {
					let profile = this.state.userProfile;
						profile.photo = data.photo;
					this.setState({
						userProfile: profile
					});
				}
			}
		});
	}

	updateProfile() {
		if (!this.state.valid) {
			return false;
		}
		let name = this.state.userProfile.name;
		let location = this.state.userProfile.location;
		let photo = this.state.userProfile.photo;
		Loading.show({ text: 'Saving...' }).then(() => {
			profileProvider.updateUserProfile(name, location, photo).then(() => {
				Loading.dismiss().then(() => {
					this.props.onUpdatedProfile(this.state.userProfile);
					/* Close modal */
					this.props.navigator.dismissModal();
					/* Toast notification */
					this.props.navigator.showInAppNotification({
						screen: 'component.Toast', 
						position: 'bottom', 
						passProps: {
							message: "Your profile has been updated."
						}, 
						autoDismissTimerSec: 3
					});
				});
			}, error => {
				Loading.dismiss().then(() => {
					Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
				});
			});
		});
	}

	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
			<Container>
			
				{ this.state.userProfile && <View>
			
					<View padding style={styles.photoContainer}>
						<View style={styles.photoBackground}></View>
						<View style={styles.photo}>
							{ this.state.userProfile.photo && <Image style={styles.photoImage} source={{uri: this.state.userProfile.photo}} /> }
							<Button style={styles.photoButton} onPress={() => this.openCameraRoll()}>
								<Button.Text>
									<Icon name="ios-camera" size={40} style={{marginTop: 4}} />
								</Button.Text>
							</Button>
						</View>
					</View>

					<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
						<Text style={{ fontSize: 14, color: Colors.text }}>Personal Information</Text>
					</View>

					<List style={{ marginTop: 10 }}>

						<List.Item>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text>Name</Text>
								<Input style={{ 
									flex: 1, 
									borderRadius: 0, 
									backgroundColor: 'transparent' }}
									value={this.state.userProfile.name}
									onChangeText={(value) => {
										let profile = this.state.userProfile;
											profile.name = value;
										this.setState({
											userProfile: profile
										});
										this.validateUserProfileForm();
									}}
									onSubmitEditing={() => {
										this.focusNextField('location')
									}}
									inputRef={input => {
										this.inputs['name'] = input;
									}}>
								</Input>
							</View>
						</List.Item>
						<List.Item style={{ borderBottomWidth: 0 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ fontSize: 16 }}>Location</Text>
								<Input style={{ 
									flex: 1, 
									borderRadius: 0, 
									backgroundColor: 'transparent' }}
									value={this.state.userProfile.location}
									onChangeText={(value) => {
										let profile = this.state.userProfile;
											profile.location = value;
										this.setState({
											userProfile: profile
										});
										this.validateUserProfileForm();
									}}
									inputRef={input => {
										this.inputs['location'] = input;
									}}>
								</Input>
							</View>
						</List.Item>
					</List> 

				</View> }
			
			</Container>

			</TouchableWithoutFeedback>
			
		);
		
	}
	
}

const styles = StyleSheet.create({
	photoContainer: {
		paddingBottom: 0
	}, 
	photoBackground: {
		backgroundColor: 'rgba(81, 101, 120, 0.15)', 
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 16
	}, 
	photo: {
		backgroundColor: '#516578', 
		height: 80, 
		width: 80, 
		borderRadius: 40, 
		marginTop: 16
	}, 
	photoImage: {
		height: 80, 
		width: 80, 
		borderRadius: 40, 
		opacity: 0.6
	}, 
	photoButton: {
		position: 'absolute', 
		width: 80, 
		height: 80, 
		marginVertical: 0, 
		borderRadius: 40, 
		backgroundColor: 'transparent'
	}
});
