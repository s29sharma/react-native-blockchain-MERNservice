import React,{Component} from 'react'
import { Image,View,ScrollView, Text,ImageBackground, TextInput,StyleSheet,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Drawer } from 'native-base';
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Button,Icon} from 'native-base';
import Submission from './Submission'
import FooterApp from './Footer'
export default class Dashboard extends Component {

    _handleBackPress() {
        this.props.navigator.pop();
    }

    constructor(props) {
        super(props);
        this.state = {
            manager: null,
            players: null,
            balance: null,
            value: '',
            message: ''
        };
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    componentDidMount() {

        fetch('http://localhost:8095/getbalance')
            .then(balance => balance.json())
            .then(res => {
                this.setState({
                    balance: res
                });
            });


        fetch('http://localhost:8095/getManager')
            .then(manager => manager.json())
            .then(res => {
                this.setState({
                    manager: res
                });
            });

        fetch('http://localhost:8095/getPlayers')
            .then(players => players.json())
            .then(res => {
                this.setState({
                    players:res
                });
            });



    }


    render() {

        const nextRoute = {
            component: Submission,
            title: 'Submit',
            navigationBarHidden:true
        };
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../images/lottery2.png')}
                    style={{ flex: 1,
                        width: '100%',
                        height: '100%',
                    }}>
                <ScrollView style={styles.scroll}>

                    <View style={{alignContent:'center',justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
                    {/*<Text style={styles.center}>Lottery</Text>*/}
                    <Image resizeMode="contain" style={{width:150,height:150,borderRadius:65}} source={require('../images/looto.png')} />
                    </View>

                    <Form>
                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Lottery Address</Label>
                            <Input  disabled value={this.state.manager} style={{color:'white',marginLeft:10}}>
                                <Icon name='information-circle' />
                            </Input>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Number of Players</Label>
                            <Input  disabled value={this.state.players} style={{color:'white',marginLeft:10}}>
                            </Input>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Current Balance</Label>
                            <Input  disabled value={this.state.balance}  style={{color:'white',marginLeft:10}}> Ether
                            </Input>
                        </Item>


                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this._handleNextPress(nextRoute)}
                        >
                            <Text style={styles.buttonText}>Play</Text>

                        </TouchableOpacity>


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