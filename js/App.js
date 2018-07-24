import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import { View, Colors } from './theme';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

/* Check if user is authenticated */

AsyncStorage.getItem('loggedUser', (err, user) => {
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
});

registerScreens();

console.disableYellowBox = true;