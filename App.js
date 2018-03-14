import React, { Component } from "react";
import { View, Colors } from './theme';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

//import firebase from './lib/firebase';

//firebase.auth().onAuthStateChanged((user) => {
	
	/* Check if user is authenticated */
	
	Navigation.startSingleScreenApp({
		screen: {
			screen: (user ? 'screen.Home' : 'screen.Login'),
			title: (user ? ' Home ' : ' Login '), 
			navigatorStyle: {
				navBarTextColor: Colors.primary, 
				navBarBackgroundColor: '#f8f8f8', 
				navBarNoBorder: true
			}
		}, 
		animationType: 'none'
	})
	
//});

registerScreens();

console.disableYellowBox = true;