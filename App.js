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



export default class App extends Component<Props> {
    render() {

        return(
            <NavigatorIOS
                initialRoute={{
                    component: Login,
                    title: 'Welcome',
                    //passProps: {index: 1}
                }}
                style={{flex: 1}}
            />
        );
    }
}
