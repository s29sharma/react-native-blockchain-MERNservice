import React,{Component} from 'react';
import { View,ScrollView, Text,Image, TextInput,StyleSheet,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import FooterApp from "./Footer";
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Button,Icon} from 'native-base';


export default class Submission extends Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={{alignContent:'center',justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
                        <Image resizeMode="contain" style={{width:150,height:150}} source={require('../images/looto.png')} />
                    </View>


                    <Form>
                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Bet Amount (in ethers):</Label>
                            <Input style={{color:'white',marginLeft:10}}/>
                        </Item>
                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Bet Reason:</Label>
                            <Input style={{color:'white',marginLeft:10}}/>
                        </Item>
                        <TouchableOpacity style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Enter Lottery</Text>

                        </TouchableOpacity>
                    </Form>

                </ScrollView>

                <FooterApp navigator={this.props.navigator}/>
            </View>


            // const players =  lottery.getPlayers();
            //const balance =  web3.eth.getBalance("0x975D0F4DCbB412AdD2f35ECa4A7205e43E9d0CB6");


            /*
                onSubmit = async (event)=> {
                    event.preventDefault();

                    const accounts =  await web3.eth.getAccounts();
                    this.setState({message: 'Waiting for the payment to process...'});
                    await lottery.enter().send({
                        from:accounts[0],
                        value:web3.utils.toWei(this.state.value,'ether')
                    });

                    this.setState({message:'You have successfully entered the lottery'});
                };

                onClick =async(event)=>{
                    event.preventDefault();

                    const accounts = await web3.eth.getAccounts();

                    this.setState({message: "Waiting for the winner"});
                    await lottery.pickWinner().send({
                        from:accounts[0]
                    });

                    this.setState({message: 'A winner has been picked'});
                };*/
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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
    }
});