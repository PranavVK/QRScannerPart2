import {Navigation} from 'react-native-navigation';
import App from '../App';
import HomePage from './HomePage'
import ScanPage from './ScanPage'
import EventDetailsSelectionPage from './EventDetailsSelectionPage'
import ScanSuccessPage from './ScanSuccessPage';


export function registerScreens() {
	Navigation.registerComponent('Login', () => App);
	Navigation.registerComponent('HomePage', () => HomePage);
	Navigation.registerComponent('ScanPage', () => ScanPage);
	Navigation.registerComponent('EventDetailsSelectionPage', () => EventDetailsSelectionPage);
	Navigation.registerComponent('ScanSuccessPage', () => ScanSuccessPage);
}