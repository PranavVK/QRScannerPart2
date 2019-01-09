import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, Button, ScrollView, FlatList, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import LinearGradient from 'react-native-linear-gradient';
import CategoryButton from '../Components/CategoryButton'
import Permissions from 'react-native-permissions';

import { STYLE_CONSTANTS } from '../Constants/Styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class EventDetailsSelectionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      mainDescription: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
      sessionDetails: [{ 'title': "Need of Ethereum", 'timing': "12th November, 9 AM - 4 PM", 'description': "Importance of new system and User Types of Ethereum" }, { 'title': "Study of Ethereum", 'timing': "13th November, 9 AM - 4 PM", 'description': "Ethereum Foundation and Analysis of White and Yell..." },{ 'title': "Session 3", 'timing': "13th November, 9 AM - 4 PM", 'description': "Ethereum Foundation and Analysis of White and Yell..." }],
      isExpanded: false,
      isTextViewCollapsed: false
      // sessionTitles: [],
      // sessionTimes: [],
      // sessionDescriptions: []
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => {
       Permissions.check('camera').then(response => {
                      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                      if (response == 'authorized') {
                        this.props.navigator.push({
                          screen: 'ScanPage',
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
                        Permissions.request('camera', {
                          rationale: {
                            title: 'EventsApp requires camera permission',
                            message:
                              'EventsApp needs access to your camera ' +
                              'so you can scan QR code for order delivery.',
                          },
                        }).then(response => {
                          if (response == 'authorized') {
                            this.props.navigator.push({
                              screen: 'ScanPage',
                              navigatorStyle: {
                                navBarBackgroundColor: 'rgba(232,236,244,1)',
                                navBarNoBorder: true,
                                navBarButtonColor: "black",
                                drawUnderStatusBar: true,
                                navBarHidden: true
                              },
                            });
                          }
                          this.setState({ cameraPermission: response })
                        })
                      }
                      this.setState({ photoPermission: response })
                    })
                  }}>
      <View style={{ flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start", width: deviceWidth }}>
        <Text style={{ fontFamily: 'OpenSans', fontSize: 18, fontWeight: '400', paddingLeft: 10, marginTop: 8 }}>{item.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width: deviceWidth, paddingLeft: 10, marginTop: 4 }}>
          <Image style={{ height: 20, width: 20 }} source={require('../Assets/Icons/clock-with-white-face.png')} />
          <Text style={{ fontFamily: 'OpenSans', fontSize: 16, fontWeight: "normal", marginLeft: 10, marginTop: 2 }}>{item.timing}</Text>
        </View>
        <Text style={{ fontFamily: 'OpenSans', fontSize: 14, fontWeight: '200', paddingLeft: 10, marginTop: 4, marginBottom: 8 }}>{item.description}</Text>
      </View>
      <View style={{ width: deviceWidth, paddingLeft: 10, paddingRight: 10, marginTop: 4, marginBottom: 4, height: 2, backgroundColor: "rgba(139,230,62,1)" }}></View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: STYLE_CONSTANTS.BACKGROUND_COLOR, marginBottom: 10 }}>
          <ImageBackground source={require('../Assets/Icons/backgroundImage.jpeg')} style={{ width: deviceWidth, height: deviceHeight / 2.6, backgroundColor: 'rgba(41,56,148,1)', marginTop: 40 }} >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth, height: 60, marginTop: 40 }}>
              <TouchableOpacity onPress={() => {
                this.props.navigator.pop({
                  animationType: 'fade',
                })
              }} style={{ height: 30, width: 30, paddingLeft: 10 }}>
                <Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/Back.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { }} style={{ height: 42, width: 42 }}>
                <Image style={{ height: 25, width: 25 }} source={require('../Assets/Icons/more.png')} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={() => {
            this.setState({ isExpanded: !this.state.isExpanded, })
          }}>
            <View style={{ flex: 1, flexDirection: 'column', width: deviceWidth }}>
              <Text style={{ fontFamily: 'OpenSans', paddingLeft: 10, paddingRight: 10, fontSize: 25, fontWeight: '500', marginTop: 8 }}>{this.state.item.title}</Text>
              {(!this.state.isTextViewCollapsed || this.state.isExpanded) && <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 8 }}>
                <Text style={{ fontFamily: 'OpenSans', fontSize: 16, fontWeight: '300' }} onLayout={(event) => {
                  console.log("height is :-")
                  console.log(event.nativeEvent.layout.height)
                  if (event.nativeEvent.layout.height > 71.857 && !this.state.isExpanded) {
                    this.setState({ isTextViewCollapsed: true })
                  }
                }}>{this.state.item.desc}</Text>
              </View>}
              {this.state.isTextViewCollapsed && !this.state.isExpanded && <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '400', width: 30, height: 24, marginTop: 47.9, marginLeft: deviceWidth - 40, opacity: 1 }}>...</Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: -71.857, height: 71.857, paddingRight: 30 }}>{this.state.item.desc}</Text>
              </View>}
              {this.state.isExpanded && <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start", width: deviceWidth, marginTop: 4, marginBottom: 4 }}>
                {this.state.item.category.map((item) => <CategoryButton title={item} />)}
              </View>}
              <View style={{ paddingRight: 10, paddingLeft: 10, backgroundColor: "rgba(139,230,62,1)", width: deviceWidth, height: 2, marginBottom: 8, marginTop: 6 }}></View>

            </View>
          </TouchableOpacity>
          <FlatList
            style={{ paddingBottom: 40 }}
            data={this.state.sessionDetails}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: deviceHeight - 70 }}><Text>Nothing to display.</Text></View>}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '300'
  },
  textField: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 35,
    textAlign: 'left'
  }
});

export default (EventDetailsSelectionPage);