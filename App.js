import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    NavigatorIOS
} from 'react-native';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import FooterApp from "./components/Footer";



export default class App extends Component<Props> {
    render() {

        return(
            <NavigatorIOS
                ref='nav'
                initialRoute={{
                    component: Dashboard,
                    backgroundColor:"#2c3e50",
                    navigationBarHidden:true,
                    title: 'Welcome',
                }}

                style={{flex: 1}}
            />
        );
    }
}
