import React,{Component} from 'react';
import { View,ScrollView,ImageBackground, Text,Image, TextInput,StyleSheet,KeyboardAvoidingView, TouchableOpacity,Button} from 'react-native';
import FooterApp from "./Footer";
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Icon} from 'native-base';


export default class Submission extends Component {

    onSubmit= async(event)=>{
        console.log(this.state.value);
        event.preventDefault();
        this.setState({
            message: 'Waiting for the payment to process...'
        });
        fetch('http://localhost:8095/sendTransaction',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                value:this.state.value
            }),

        })
            .then(message=>message.json())
            .then(res=>{
                this.setState({
                    message:res
                })
            });
};

    constructor(props){
        super(props);

        this.state={
            player:null,
            balance:null,
            value:'',
            message:''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8095/getManager')
            .then(manager => manager.json())
            .then(res => {
                this.setState({
                    player: res
                });
            });

        fetch('http://localhost:8095/getbalance')
            .then(balance => balance.json())
            .then(res => {
                this.setState({
                    balance: res
                });
            });

        fetch('http://localhost:8095/getPlayerBalance')
            .then(manager => manager.json())
            .then(res => {
                this.setState({
                    balance: res
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
                    <View style={{alignContent:'center',justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
                        <Image resizeMode="contain" style={{width:150,height:150,borderRadius:65}} source={require('../images/looto.png')} />
                    </View>




                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Bet Account:</Label>
                            <Input disabled value = {this.state.player} style={{color:'white',marginLeft:10}}/>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Account Balance:</Label>
                            <Input disabled value = {this.state.balance} style={{color:'white',marginLeft:10}}/>
                        </Item>

                        <Item style={{marginBottom:20}} stackedLabel>
                            <Label style={{color:'white'}}>Bet Amount (in ethers):</Label>
                            <TextInput style={styles.input}
                                       returnKeyType="go"
                                       onChangeText={(value) => this.setState({value})}
                                       value={this.state.value}
                                       placeholderTextColor='rgba(225,225,225,0.7)'/>
                        </Item>

                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={this.onSubmit}>
                            <Text style={styles.buttonText}>Enter</Text>
                        </TouchableOpacity>


                        <Text style={{alignContent:'center',color:'white',marginLeft:10,marginTop:80}}>{this.state.message}</Text>


                </ScrollView>

                <FooterApp navigator={this.props.navigator}/>

                </ImageBackground>
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
        backgroundColor: '#2c3e50'

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
    input: {
        width:375,
        height: 40,
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    }
});