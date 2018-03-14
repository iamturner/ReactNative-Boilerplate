// Dummy user profile

let user = {
	location: "Belfast", 
	name: "Joe Bloggs", 
	photo: null
};

module.exports = {

	getUserProfile: () => {
		// Return user
		return new Promise((resolve, reject) => {
			return resolve(user);
		});
	}, 
	
	updateUserProfile: async (name, location = null, photo = null) => {
		// Check for new photo
		if (photo != null && !photo.startsWith('http')) {
			// Upload new photo to server
		}
		// Update dummy user profile
		user = {
			location: location, 
			name: name, 
			photo: photo
		};
		// Return user
		return new Promise((resolve, reject) => {
			return resolve(user);
		});
	}
	
}