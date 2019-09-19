import React, { Component } from 'react';
import { Platform, TouchableOpacity, AlertIOS, Alert } from 'react-native';
import { View, Button, List, Text, Colors, Container, Loading } from './../../theme';
import authActions from './../../actions/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import prompt from 'react-native-prompt-android';
import { connect } from 'react-redux';

class AccountSettings extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Account Settings'
        };
    };
    
    constructor(props, context) {
        super(props, context);
    }
    
    goToChangeEmail() {
        this.props.navigation.navigate('ChangeEmail')
    }
    
    goToChangePassword() {
        this.props.navigation.navigate('ChangePassword')
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
            Loading.show();
            this.props.dispatchDeleteAccount(password).then(() => {
                Loading.dismiss();
            }, error => {
                Loading.dismiss();
                Alert.alert('Error', error.message, [{text: 'OK'}], { cancelable: false });
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
                    <Text style={{ fontSize: 14 }}>Some sort of warning about deleting your account.</Text>
                </View>
            
                <Button style={{ marginTop: 12, borderRadius: 0, backgroundColor: 'white' }} onPress={() => this.deleteAccount()}>
                    <Button.Text style={{ color: Colors.danger }}>Delete Account</Button.Text>
                </Button>
            
            </Container>
            
        );
        
    }
    
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatchDeleteAccount: (password) => dispatch(authActions.deleteAccount(password))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AccountSettings);