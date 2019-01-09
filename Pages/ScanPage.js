import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scanDetails: {},
			invalidQR: false
		};
	}

	componentDidMount() {
		//TODO: Temporary code to mock data, This has to be removed 
		var details = { header: "13 Years with Wipro", speaker: "Lorem Ipsum", time: "13th November, 3PM-5PM", venue: "Tower s, North Gate" };
		this.setState({ scanDetails: details });
		console.log(this.state.scanDetails)
	}

	

	async onSuccess(e) {
		try {
			var qrData = e.data;
			// qrData = qrData.split("~~");
			console.log(qrData)

			var validQR = true

			if (validQR === true) {
				this.props.navigator.push({
					screen: 'ScanSuccessPage',
					passProps: {
						scanDetails: this.state.scanDetails
					},
					navigatorStyle: {
						navBarBackgroundColor: 'rgba(232,236,244,1)',
						navBarNoBorder: true,
						navBarButtonColor: "black",
						drawUnderStatusBar: true,
						navBarHidden: true
					},
				});
			}
			else {
				this.setState({ invalidQR: true });
			}

		} catch (err) {
			this.setState({ invalidQR: true });
		}
	}

	render() {
		return (
			<View>
				<View style={{ width: deviceWidth, height: 90, backgroundColor: 'rgba(41,56,148,1)' }}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
						<TouchableOpacity style={{ height: 30, width: 30, marginTop: 15, paddingLeft: 10 }} onPress={() => {
						this.props.navigator.pop();
						}} >
							<Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/Back.png')} />
						</TouchableOpacity>
						<View style={{ flex: 1, paddingLeft: 40 }}>
							<Text style={styles.headerText}>Scan</Text>
						</View>


						<View style={{ paddingRight: 0 }}>
							<TouchableOpacity style={{ height: 30, width: 30, marginTop: 15, marginRight: 0 }}>
								<Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/more.png')} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
				<View>
				<QRCodeScanner
					style={{ backgroundColor: "white", marginTop: 0 }}
					onRead={this.onSuccess.bind(this)}
					cameraStyle={{height: deviceHeight-90}}
					/>
				</View>
				{this.state.invalidQR && <View style={{marginTop: deviceHeight-300, backgroundColor: 'rgba(0,0,0,0.7)', width: 200, height: 120}}>
					<Text style={{color: 'rgba(255,0,0,1)', fontSize: 16, fontWeight: '500', marginTop: 20, paddingLeft: 4}}>Scan Failure:</Text>
					<Text style={{color: 'rgba(255,0,0,1)', fontSize: 16, marginTop: 15, marginBottom: 20, paddingLeft: 4}}>No matching event found for selected QR</Text>
				</View>}
				</View>
				
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	headerText: {
		fontSize: 25,
		fontFamily: 'OpenSans',
		fontStyle: 'normal',
		fontWeight: '500',
		color: '#fff',
		marginTop: 15
	},
	captureContainer: {
		position: 'absolute'
	},
	overlayText: {
		backgroundColor: 'red',
		color: 'gray'
	}
});

export default (ScanPage);
