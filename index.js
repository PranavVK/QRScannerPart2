/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './Pages/Screens';

registerScreens();

const navigatorStyle = {
	navBarTranslucent: true,
	navBarHidden:true,
	drawUnderStatusBar: true
};

Navigation.startSingleScreenApp({
	screen: {
		screen: 'Login',
		title: '',
		navigatorStyle,
	},
	appStyle:{
		orientation: 'portrait'
	}
});

console.disableYellowBox = true;