/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, StatusBar, Linking } from 'react-native';
import { Dimensions } from 'react-native';
import { BoxShadow } from 'react-native-shadow';
import LinearGradient from 'react-native-linear-gradient';

import { STYLE_CONSTANTS } from './Constants/Styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

global.userName = null;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pswd: "",
      userNameValidated: false,
      pswdValidated: false
    };
  }

  validateUsername = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text, userNameValidated: false })
      return false;
    }
    else {
      this.setState({ email: text, userNameValidated: true })
      console.log("Email is Correct");
      let index = text.indexOf("@");
      let extractedUserName = text.substring(0,index)
      global.userName = extractedUserName;
    }
  }

  validatePswd = (text) => {
    console.log(text);

    if (text.length > 8) {
      console.log("Email is Not Correct");
      this.setState({ pswd: text, pswdValidated: true })
      return false;
    }
    else {
      this.setState({ pswd: text, pswdValidated: false })
      console.log("password is less than 8 character");
    }
  }

  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }
    
    componentWillUnmount() { // C
      Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
      this.navigate(event.url);
    }
    navigate = (url) => { 
      console.log(url)
    
      const parts = url.split('?')
      const part1 = parts[0];
      const part2 = parts[1];
      const part3 = part2.split('&');

      console.log(part3[0])
      console.log("Token")
      console.log(part3[1])
      console.log("AppToken")
      console.log(part3[2])

      const isLoggedIn = part3[0] === 'login=true' ? true : false
      console.log(isLoggedIn)

    
      if (isLoggedIn === true) {
        this.props.navigator.push({
              screen: 'HomePage',
              navigatorStyle: {
                navBarBackgroundColor: 'rgba(232,236,244,1)',
                navBarNoBorder: true,
                navBarButtonColor: "black",
                drawUnderStatusBar: true,
                navBarHidden: true,
              },
            });
      }
      else {
        alert("Oh oh.. Something went wrong. Please try again!!")
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground style={{ width: deviceWidth, height: deviceHeight / 4, backgroundColor: 'rgba(41,56,148,1)' }} >
        </ImageBackground>
        <View style={styles.loginView}>

            <View style={{ height: deviceHeight / 7, justifyContent: "center", alignItems: "center" }} >
              <Text style={styles.headerText}> MyEvents</Text>
            </View>

            {/* <View style={{ width: deviceWidth - 100, height: deviceHeight / 4, marginLeft: 10 }}>
              <Text style={{ fontFamily: 'OpenSans', fontWeight: '500', marginTop: 10, color: 'gray' }}>Username</Text>
              <TextInput style={this.state.userNameValidated === true ? styles.textFieldValidated : styles.textFieldNotValidated}
                onChangeText={(text) => this.validateUsername(text)}
              />
              <Text style={{ fontFamily: 'OpenSans', fontWeight: '500', marginTop: 20, color: 'gray' }}>Password</Text>
              <TextInput style={this.state.pswdValidated === true ? styles.textFieldValidated : styles.textFieldNotValidated}
                secureTextEntry={true}
                onChangeText={(text) => this.validatePswd(text)}
              />
              <TouchableOpacity style={{ height: 30, width: 110, marginRight: 1, marginTop: 5, alignSelf: 'flex-end' }}>
                <Text style={{ fontFamily: 'OpenSans', textAlign: 'right', color: 'gray' }}>Forgot password</Text>
              </TouchableOpacity>
            </View> */}

            <View style={{ width: deviceWidth - 100, height: deviceHeight / 4, marginLeft: 10 }}>
              <TouchableOpacity
                style={styles.loginButton}
                pointerEvents={this.state.userNameValidated === true && this.state.pswdValidated === true ? 'auto' : 'none'}
                underlayColor='#fff'
                onPress={() => {
                  // if (this.state.userNameValidated === true && this.state.pswdValidated === true) {
                  //   this.props.navigator.push({
                  //     screen: 'HomePage',
                  //     navigatorStyle: {
                  //       navBarBackgroundColor: 'rgba(232,236,244,1)',
                  //       navBarNoBorder: true,
                  //       navBarButtonColor: "black",
                  //       drawUnderStatusBar: true,
                  //       navBarHidden: true,
                  //     },
                  //   });
                  // }
                  // else {
                  //   alert("Please enter a valid username and password.")
                  // }
                  Linking.openURL('https://life-at-maxis-admin.herokuapp.com/lam-admin/users/authorize?clientType=mobile')
                }}>
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.signupButton}
                underlayColor='#fff'>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity> */}
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
  },
  loginView: {
    width: deviceWidth - 80,
    height: deviceHeight - 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: -40,
    marginLeft: 40,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  headerText: {
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontSize: 25,
    fontWeight: '700'
  },
  textFieldValidated: {
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    height: 35,
    textAlign: 'left',
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontWeight: '700'
  },
  textFieldNotValidated: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 35,
    textAlign: 'left',
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontWeight: '700'
  },
  loginButton: {
    height: 40,
    backgroundColor: 'rgba(139,230,62,1)',
    borderWidth: 1,
    borderColor: 'rgba(139,230,62,1)',
    justifyContent: 'center',
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  signupButton: {
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    marginTop:5
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    fontSize: 15,
    paddingRight: 10,
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontWeight: '700'
  },
  signupText: {
    color: 'gray',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    fontWeight: '400'
  }

});

export default (App);