import React,{Component} from 'react'
import { Image,View,ScrollView, Text, TextInput,StyleSheet,ImageBackground,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Drawer } from 'native-base';
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Button,Icon} from 'native-base';
import Submission from './Submission'
import FooterApp from './Footer'

export default class Winner extends Component {

    constructor(props){
        super(props);
        this.state={
            balance:null,
            message:'Click on button to pick a winner',
            players: null
        }
    }

    componentDidMount(){

        fetch('http://localhost:8095/getbalance')
            .then(balance => balance.json())
            .then(res => {
                this.setState({
                    balance: res
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

    onSubmit= async(event)=>{
        console.log(this.state.value);
        event.preventDefault();
        this.setState({
            message: 'Waiting for the winner...'
        });
        fetch('http://localhost:8095/pickWinner')
            .then(message=>message.json())
            .then(res=>{
                this.setState({
                    message:res
                })
            });
    };


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
                  <View style={{alignContent:'center',justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
                      <Image resizeMode="contain" style={{width:150,height:150,borderRadius:65}} source={require('../images/looto.png')} />
                  </View>

                  <Form>
                  <Item style={{marginBottom:20}} stackedLabel>
                      <Label style={{color:'white'}}>Number of Players</Label>
                      <Input  disabled value={this.state.players} style={{color:'white',marginLeft:10}}>
                      </Input>
                  </Item>

                  <Item style={{marginBottom:20}} stackedLabel>
                      <Label style={{color:'white'}}>Current Balance:</Label>
                      <Input disabled value = {this.state.balance} style={{color:'white',marginLeft:10}}/>
                  </Item>

                  <TouchableOpacity style={styles.buttonContainer}
                                    onPress={this.onSubmit}>
                      <Text style={styles.buttonText}>Pick the Winner</Text>
                  </TouchableOpacity>
                  </Form>

                  <Text style={{alignContent:'center',color:'white',marginLeft:10}}>{this.state.message}</Text>
              </ScrollView>
              <FooterApp navigator={this.props.navigator}/>
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