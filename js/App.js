import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import { View, Text, Toast, Loading, ActionSheet } from './theme';
import { createAppContainer } from "react-navigation";
import { RootNavigator } from './screens';

const AppContainer = createAppContainer(RootNavigator);

export default class App extends Component {
	
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		
		return (
			
			<View style={{ flex: 1 }}>
				<AppContainer />
				<Toast />
				<Loading />
				<ActionSheet />
			</View>
		)
	}
	
}

console.disableYellowBox = true;