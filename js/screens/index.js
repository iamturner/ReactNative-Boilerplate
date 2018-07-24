import { Navigation } from 'react-native-navigation';
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
import { CameraRollPage } from './CameraRoll'

export function registerScreens() {
	
	Navigation.registerComponent('screen.Login', () => Login);
	Navigation.registerComponent('screen.LoginWithEmail', () => LoginWithEmail);
	Navigation.registerComponent('screen.Register', () => Register);
	Navigation.registerComponent('screen.Home', () => Home);
	Navigation.registerComponent('screen.Profile', () => Profile);
	Navigation.registerComponent('screen.AccountSettings', () => AccountSettings);
	Navigation.registerComponent('screen.ChangeEmail', () => ChangeEmail);
	Navigation.registerComponent('screen.ChangePassword', () => ChangePassword);
	Navigation.registerComponent('screen.EditProfile', () => EditProfile);
	Navigation.registerComponent('screen.ForgotPassword', () => ForgotPassword);
	Navigation.registerComponent('screen.CameraRoll', () => CameraRollPage);
	
}
