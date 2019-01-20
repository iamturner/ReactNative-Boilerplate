import React, { Component } from 'react';
import { Platform, StyleSheet, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { View, Button, List, Input, Text, Container, Colors, Loading, Toast, ActionSheet, Form } from './../../theme';
import profileActions from './../../actions/profile';
import Icon from 'react-native-vector-icons/Ionicons';

export class EditProfile extends Component {
	
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Edit Profile',
			headerLeft: (
				<Button onPress={() => navigation.pop()}>
					<Button.Text>Cancel</Button.Text>
				</Button>
			),
			headerRight: (
				<Button onPress={navigation.getParam('updateProfile')}>
					<Button.Text>Save</Button.Text>
				</Button>
			)
		};
	};
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			valid: false, 
			userProfile: null
        }
	}

	componentWillMount() {
		profileActions.getUserProfile().then((user) => {
			this.setState({
				userProfile: JSON.parse(JSON.stringify(user))
        	}, () => {
				this.validateUserProfileForm();
			});
		});
	}
	
	componentDidMount() {
		this.props.navigation.setParams({ updateProfile: this.updateProfile });
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
					/* Display action sheet */
					ActionSheet.show({
						options: ['Choose New Photo', 'Delete Photo', 'Cancel'], 
						destructiveButtonIndex: 1,
						cancelButtonIndex: 2
					}).then((buttonIndex) => {
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
				});
			}
			await confirm();
		}
		/* Open Modal */
		this.props.navigation.navigate('CameraRoll', { onSelectedPhoto: this.updatePhoto });
	}

	updatePhoto = (data) => {
		let profile = this.state.userProfile;
			profile.photo = data;
		this.setState({
			userProfile: profile
		})
	}

	updateProfile = () => {
		if (!this.state.valid) {
			return false;
		}
		let name = this.state.userProfile.name;
		let location = this.state.userProfile.location;
		let photo = this.state.userProfile.photo;
		Loading.show();
		profileActions.updateUserProfile(name, location, photo).then(() => {
			Loading.dismiss();
			/* Publish profile update */
			const updateProfile = this.props.navigation.getParam('onUpdatedProfile');
			updateProfile(this.state.userProfile);
			/* Close modal */
			this.props.navigation.pop();
			/* Toast notification */
			Toast.show("Your profile has been updated.");
		}, error => {
			Loading.dismiss();
			Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
		});
	}

	render() {
		
		return (
			
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			
			<Container>
			
				{ this.state.userProfile && <Form>
			
					<View padding style={styles.photoContainer}>
						<View style={styles.photoBackground}></View>
						<View style={styles.photo}>
							{ this.state.userProfile.photo && <Image style={styles.photoImage} source={{uri: this.state.userProfile.photo}} /> }
							<Button style={styles.photoButton} onPress={() => this.openCameraRoll()}>
								<Button.Text>
									<Icon name="ios-camera" size={40} color={'white'} style={{marginTop: 4}} />
								</Button.Text>
							</Button>
						</View>
					</View>

					<View style={{ marginTop: 20, paddingHorizontal: 16 }}>
						<Text style={{ fontSize: 14 }}>Personal Information</Text>
					</View>

					<List style={{ marginTop: 10 }}>

						<List.Item>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text>Name</Text>
								<Form.Input style={{ 
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
									}}>
								</Form.Input>
							</View>
						</List.Item>
						<List.Item style={{ borderBottomWidth: 0 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ fontSize: 16 }}>Location</Text>
								<Form.Input style={{ 
									flex: 1, 
									borderRadius: 0, 
									backgroundColor: 'transparent' }}
									value={this.state.userProfile.location}
									returnKeyType={"default"}
									onChangeText={(value) => {
										let profile = this.state.userProfile;
											profile.location = value;
										this.setState({
											userProfile: profile
										});
										this.validateUserProfileForm();
									}}>
								</Form.Input>
							</View>
						</List.Item>
					</List> 

				</Form> }
			
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
