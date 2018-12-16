import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

/* Screens */
import { AuthLoading } from './AuthLoading';
import { Login } from './Login';
import { LoginWithEmail } from './LoginWithEmail';
import { Register } from './Register';
import { Home } from './Home';
import { Profile } from './Profile';
import { AccountSettings } from './AccountSettings';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { EditProfile } from './EditProfile';
import { ForgotPassword } from './ForgotPassword';
import { CameraRollPage } from './CameraRoll';

const navigationOptions = {
	headerStyle: {
		shadowOpacity: 0,
		elevation: 0,
		borderBottomWidth: 0
	}
};

const MainStack = createStackNavigator({
	/* */
	AuthLoading: { screen: AuthLoading },
	Login: { screen: Login },
	LoginWithEmail: { screen: LoginWithEmail },
	Register: { screen: Register },
	Home: { screen: Home },
	Profile: { screen: Profile },
	AccountSettings: { screen: AccountSettings },
	ChangeEmail: { screen: ChangeEmail },
	ChangePassword: { screen: ChangePassword }
}, {
	/* */
	defaultNavigationOptions: navigationOptions
});

export const RootNavigator = createStackNavigator({
	Main: {
		screen: MainStack,
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
