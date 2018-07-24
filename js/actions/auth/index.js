import { AsyncStorage } from 'react-native';

module.exports = {
	
	/* Login With Email */
	
	loginWithEmail: (email, password) => {
		return new Promise((resolve, reject) => {
			// Update AsyncStorage with logged in user
			AsyncStorage.setItem('loggedUser', 'user');
			return resolve();
		});
	}, 
	
	/* Logout */
	
	logoutUser: () => {
        // Remove logged in user from AsyncStorage
		AsyncStorage.removeItem('loggedUser');
    }, 
	
	/* Recover Password */

    recoverPassword: (email) => {
        return new Promise((resolve, reject) => {
			return resolve();
		});
    }, 
	
	/* Register New User */
    
	register: (name, email, password) => {
		return new Promise((resolve, reject) => {
			// Update AsyncStorage with logged in user
			AsyncStorage.setItem('loggedUser', 'user');
			return resolve();
		});
    }, 
	
	/* Update Password */

    updatePassword: (currentPassword, newPassword) => {
		return new Promise((resolve, reject) => {
			return resolve();
		});
    }, 
	
	/* Update Email Address */

    updateEmail: (newEmail, password) => {
		return new Promise((resolve, reject) => {
			return resolve();
		});
    }, 
	
	/* Delete User Account */
    
	deleteAccount: (password) => {
		return new Promise((resolve, reject) => {
			// Remove logged in user from AsyncStorage
			AsyncStorage.removeItem('loggedUser');
			return resolve();
		});
    }
	
}
