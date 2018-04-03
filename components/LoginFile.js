import React,{Component} from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView,Image,NavigatorIOS} from 'react-native';
import Login from './Login'

export default class LoginFile extends Component{

    render(){
        return(
          <KeyboardAvoidingView behavior="padding" style={styles.container}>

              <View style={styles.loginContainer}>
                  <Image resizeMode="contain" style={styles.logo} source={require('../images/logo.png')} />

              </View>
              <View style={styles.formContainer}>
                  <Login />
              </View>
          </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor: '#2c3e50'
   }
    });

