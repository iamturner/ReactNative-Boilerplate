/** @format */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';

import App from './js/App';
import store from "./js/store";
import { name as AppName } from './app.json';

const ReduxApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
)

AppRegistry.registerComponent(AppName, () => ReduxApp);
