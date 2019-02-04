// Auth actions

import { AsyncStorage } from 'react-native';

module.exports = {
	
	/* Login With Email */
	
	loginWithEmail: (email, password) => (dispatch) => {
		return new Promise((resolve, reject) => {
			// Update AsyncStorage with logged in user
			AsyncStorage.setItem('loggedUser', 'user');
			dispatch({
				type: 'LOGIN_USER',
				user: 'user'
			});
			return resolve();
		});
	}, 
	
	/* Logout */
	
	logoutUser: () => (dispatch) => {
        // Remove logged in user from AsyncStorage
		AsyncStorage.removeItem('loggedUser');
		dispatch({
			type: 'LOGOUT_USER'
		});
		return;
    }, 
	
	/* Recover Password */

    recoverPassword: (email) => {
        return new Promise((resolve, reject) => {
			return resolve();
		});
    }, 
	
	/* Register New User */
    
	register: (name, email, password) => (dispatch) => {
		return new Promise((resolve, reject) => {
			// Update AsyncStorage with logged in user
			AsyncStorage.setItem('loggedUser', 'user');
			dispatch({
				type: 'LOGIN_USER',
				user: 'user'
			});
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
    
	deleteAccount: (password) => (dispatch) => {
		return new Promise((resolve, reject) => {
			// Remove logged in user from AsyncStorage
			AsyncStorage.removeItem('loggedUser');
			dispatch({
				type: 'LOGOUT_USER'
			});
			return resolve();
		});
    }
	
}
