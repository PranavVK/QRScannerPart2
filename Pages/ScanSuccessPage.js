import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode';
import userName from '../App'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class ScanSuccessPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        console.log(this.props.scanDetails)
        console.log(global.userName)
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={{ width: deviceWidth, height: deviceHeight / 3 }} source={require('../Assets/Icons/backgroundImage.jpeg')} >
                    <View style={{ width: deviceWidth, height: 90 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                            <TouchableOpacity style={{ height: 30, width: 30, marginTop: 15, paddingLeft: 10 }} onPress={() => {
                                this.props.navigator.pop();
                            }} >
                                <Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/Back.png')} />
                            </TouchableOpacity>

                            <View style={{ paddingRight: 0 }}>
                                <TouchableOpacity style={{ height: 30, width: 30, marginTop: 15, marginRight: 0 }}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/more.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", width: deviceWidth, marginTop: 30, marginLeft: 25 }}>
                    <Text style={{ color: 'black', fontSize: 25, fontFamily: 'OpenSans', fontWeight: '500' }} numberOfLines={1}>{this.props.scanDetails.header}</Text>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'OpenSans', fontWeight: '600', marginTop: 15 }} numberOfLines={1}>Speaker: {this.props.scanDetails.speaker}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", marginTop: 15 }}>
                        <Image style={{ height: 20, width: 20 }} source={require('../Assets/Icons/clock-with-white-face.png')} />
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'OpenSans', fontWeight: '400', marginLeft: 15 }} numberOfLines={1}>{this.props.scanDetails.time}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", marginTop: 10 }}>
                        <Image style={{ height: 20, width: 20 }} source={require('../Assets/Icons/location.png')} />
                        <Text style={{ color: 'black', fontFamily: 'OpenSans', fontSize: 16, fontWeight: '400', marginLeft: 15 }} numberOfLines={1}>{this.props.scanDetails.venue}</Text>
                    </View>

                    <View style={{ marginTop: 20, alignItems: 'center', width: deviceWidth - 50 }}>
                        <QRCode
                            value={`${this.props.scanDetails.header}~~${this.props.scanDetails.speaker}~~${this.props.scanDetails.time}~~${this.props.scanDetails.venue}`}
                            size={200}
                            bgColor='black'
                            fgColor='white'
                        />
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'center', width: deviceWidth - 60}}>
                        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'OpenSans', fontWeight: '600', marginLeft: 15 }} numberOfLines={1}>{ global.userName} Checked-In</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default (ScanSuccessPage);