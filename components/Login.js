import React,{Component} from 'react'
import { KeyboardAvoidingView,View,Text,Image,TextInput, TouchableOpacity,StyleSheet,NavigatorIOS} from 'react-native';
import Dashboard from './Dashboard'
import PropTypes from 'prop-types';
import Realm from 'realm'
let users;
let myuser;



export default class Login extends Component {


    constructor(props) {
        super(props);
        this._onForward = this._onForward.bind(this);
        this.state = {
            text: '',
            password: '',
            loggedin: false

        };
    }
    async _onForward()  {
        const LoginSchema ={
            name:'Login',
            properties:{
                username:{type:'string'},
                password:{type:'string'}
            }
        };
        let realm = new Realm({
            schema:[LoginSchema]
        });

        realm.write(()=>{
            let user = realm.create('Login',{username:'sachin',password:'sachin'})
            //console.log(user);
        });

        //Realm.Sync.User.login('https://awesome-plastic-hat.us1a.cloud.realm.io','s29sharma@gmail.com','password')
        await Realm.open({schema:[LoginSchema]})
            .then(realm =>{
                users = realm.objects('Login');
                myuser= users.filtered('username="sachin" AND password="sachin"').slice(0,5);
                console.log(myuser);
            }).catch(error=>{
            error.toString();
        });
        for(let [key,value] of Object.entries(myuser)) {
            console.log(key,value);
            if(value.username === this.state.text && value.password === this.state.password) {
                this.props.navigator.push({
                    component: Dashboard,
                    title: 'Scene'
                });
            }


            else {

            }
        }
    }


    render() {
        //const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../images/looto.png')} />

                </View>

            <View style={styles.formContainer}>

                <TextInput style={styles.input}
                           autoCapitalize="none"
                           onSubmitEditing={() => this.passwordInput.focus()}
                           autoCorrect={false}
                           keyboardType='email-address'
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                           returnKeyType="next"
                           placeholder='Email or Mobile Num'
                           placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style={styles.input}
                           returnKeyType="go"
                           ref={(input) => this.passwordInput = input}
                           placeholder='Password'
                           onChangeText={(password) => this.setState({password})}
                           value={this.state.password}
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           secureTextEntry/>

                <TouchableOpacity style={styles.buttonContainer}
                                onPress={this._onForward}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

            </View>
            </KeyboardAvoidingView>

        );
    }
}
        const styles = StyleSheet.create({
            container: {
                padding: 20,
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: '#2c3e50'
            },
            input: {
                width:375,
                height: 40,
                backgroundColor: 'rgba(225,225,225,0.2)',
                marginBottom: 10,
                padding: 10,
                color: '#fff'
            },
            buttonContainer: {
                backgroundColor: '#2980b6',
                paddingVertical: 15
            },
            buttonText: {
                color: '#fff',
                textAlign: 'center',
                fontWeight: '700'
            }

});