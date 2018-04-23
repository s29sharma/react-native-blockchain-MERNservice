import React,{Component} from 'react'
import { Image,View,ScrollView, Text, TextInput,ImageBackground,StyleSheet,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Drawer } from 'native-base';
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Button,Icon} from 'native-base';
import Submission from './Submission'
import FooterApp from './Footer'
import Realm from "realm";
import Dashboard from "./Dashboard";

let myuser;
let users;

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            actualUsername:'',
            actualPassword:'',
            address:''
        }
    }


    saveResponse(){
        Realm.open({schema:[LoginSchema]})
            .then(realm =>{
                users = realm.objects('Login');
                myuser= users.filtered('username="sachin" AND password="sachin"').slice(0,5);
                console.log(myuser);
            }).catch(error=>{
            error.toString();
        });
        for(let [key,value] of Object.entries(myuser)) {
            value.username=this.state.actualUsername;
            value.password = this.state.actualPassword
        }
    }


    async componentWillMount(){
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
            console.log(user);
        });

        await Realm.open({schema:[LoginSchema]})
            .then(realm =>{
                users = realm.objects('Login');
                myuser= users.filtered('username="sachin" AND password="sachin"').slice(0,5);
                console.log(myuser);
            }).catch(error=>{
            error.toString();
        });
        for(let [key,value] of Object.entries(myuser)) {
            console.log(key, value);
            this.setState({
                actualUsername: value.username,
                actualPassword: value.password
            });
        }
    }

    componentDidMount(){

            fetch('http://localhost:8095/getAddress')
                .then(address => address.json())
                .then(res => {
                    this.setState({
                        address: res
                    });
                });

        }

    render(){
        return(
            <View style={styles.container}>

                <ImageBackground
                    source={require('../images/lottery2.png')}
                    style={{ flex: 1,
                        width: '100%',
                        height: '100%',
                    }}>

                <ScrollView style={styles.scroll}>

                    <View style={{alignContent:'center',justifyContent: 'center', alignItems: 'center', marginBottom:30,marginTop:80}}>
                        {/*<Text style={styles.center}>Lottery</Text>*/}
                        <Image resizeMode="contain" style={{width:150,height:150,borderRadius:65}} source={require('../images/ravinder.jpg')} />
                    </View>

                    <Form>
                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Username</Label>
                            <Input  disabled value={this.state.actualUsername} style={{color:'white',marginLeft:10}}>
                            </Input>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Password</Label>
                            <Input  disabled value={this.state.actualPassword} style={{color:'white',marginLeft:10}}
                                    secureTextEntry={true}
                            >
                            </Input>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Wallet Address</Label>
                            <Input  disabled value={this.state.address} style={{color:'white',marginLeft:10}}>
                            </Input>
                        </Item>


                        {/*<TouchableOpacity style={styles.buttonContainer}*/}
                                          {/*onPress={() => this.saveResponse()}*/}
                        {/*>*/}
                            {/*<Text style={styles.buttonText}>Play</Text>*/}

                        {/*</TouchableOpacity>*/}


                    </Form>

                </ScrollView>

                <FooterApp navigator={this.props.navigator} />

                </ImageBackground>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    center:{
        padding:10,
        textAlign:'center',
        fontSize:30,
        color:'white',
        fontFamily:'arial',
        marginBottom:30
    },
    footer:{

    },
    buttonContainer: {
        marginTop:20,
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        paddingBottom:15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    text:{
        padding:10,
        color:'white',
        marginRight:50
    }
});