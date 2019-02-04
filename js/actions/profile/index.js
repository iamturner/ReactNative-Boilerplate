// User profile actions

module.exports = {
	
	updateProfile: (profile) => (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: 'UPDATE_PROFILE', 
				profile
			});
			resolve();
		})
	}
	
}
