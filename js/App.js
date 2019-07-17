import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import { View, Text, Toast, Loading, ActionSheet } from './theme';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { RootNavigator } from './screens';
import { connect } from 'react-redux';

const AppContainer = createAppContainer(RootNavigator);

class App extends Component {
	
	constructor(props, context) {
		super(props, context);
	}
	
	componentDidMount = async () => {
		
		const user = await AsyncStorage.getItem('loggedUser');
		
		this._resetApp(user);
	}
	
	componentDidUpdate(prevProps) {
		
		const { user } = this.props;
		
		if (user != prevProps.user) {
			this._resetApp(user);
		}
	}
	
	_resetApp(user) {
		
		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: user == null ? 'Guest' : 'Authed' })],
		});
		this.navigator.dispatch(resetAction);
	}
	
	render() {
		
		return (
			
			<View style={{ flex: 1 }}>
				<AppContainer ref={nav => { this.navigator = nav; }} />
				<Toast />
				<Loading />
				<ActionSheet />
			</View>
		)
	}
	
}


const mapStateToProps = (state) => {

    return {
        user: state.auth.user
    }
}

export default connect(
	mapStateToProps
)(App);

console.disableYellowBox = true;