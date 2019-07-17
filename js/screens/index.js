import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

/* Screens */
import AuthLoading from './AuthLoading';
import { Login } from './Login';
import LoginWithEmail from './LoginWithEmail';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import AccountSettings from './AccountSettings';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import EditProfile from './EditProfile';
import { ForgotPassword } from './ForgotPassword';
import { CameraRollPage } from './CameraRoll';

const navigationOptions = {
	headerStyle: {
		shadowOpacity: 0,
		elevation: 0,
		borderBottomWidth: 0
	}
};

const GuestStack = createStackNavigator({
	Login: { 
		screen: Login 
	},
	LoginWithEmail: { 
		screen: LoginWithEmail 
	},
	Register: { 
		screen: Register 
	}
}, {
	/* */
	defaultNavigationOptions: navigationOptions
});

const AuthedStack = createBottomTabNavigator({
	Home: { 
		screen: createStackNavigator({
			Home: Home,
			Profile: Profile,
			AccountSettings: AccountSettings,
			ChangeEmail: ChangeEmail,
			ChangePassword: ChangePassword
		}, {
			defaultNavigationOptions: navigationOptions
		})
	}
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return <Icon name={'ios-home'} size={25} color={tintColor} />;
		}
	}),
	tabBarOptions: {
		style: {
			borderTopWidth: 0
		}
	}
});

export const RootNavigator = createStackNavigator({
	AuthLoading: { 
		screen: AuthLoading
	},
	Guest: {
		screen: GuestStack
	}, 
	Authed: {
		screen: AuthedStack
	},
	ForgotPassword: { 
		screen: createStackNavigator({ ForgotPassword: ForgotPassword }, { defaultNavigationOptions: navigationOptions })
	},
	EditProfile: { 
		screen: createStackNavigator({ EditProfile: EditProfile }, { defaultNavigationOptions: navigationOptions })
	},
	CameraRoll: { 
		screen: createStackNavigator({ CameraRollPage: CameraRollPage }, { defaultNavigationOptions: navigationOptions })
	}
}, {
	mode: 'modal',
	headerMode: 'none'
});

