import React,{Component} from 'react'
import { View, Text, TextInput, TouchableOpacity,StyleSheet,KeyboardAvoidingView} from 'react-native';
import Web3 from 'web3'

let web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/hKOkGZCgS9FRiX2rUetf'));

const address= '0x975D0F4DCbB412AdD2f35ECa4A7205e43E9d0CB6';

const abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"random","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];


let lottery = new web3.eth.contract(abi).at(address);

export default class Dashboard extends Component{
    _handleBackPress() {
        this.props.navigator.pop();
    }
        constructor(props){
            super(props);
            this.state ={
                manager: null,
                players: [],
                balance: null,
                value:'',
                message:''
            };
        }


    getBalance() {
        web3.eth.getCoinbase((err, coinbase) => {
            const manager = web3.isConnected();
            const balance = web3.eth.getBalance("0x6BAcC201786190062f9bc92E1A2Ad95EdA4D4431", (err2, balance) => {
                console.log('balance ' + balance);
                console.log(manager);
                this.setState({
                    balance:balance,
                    manager:manager
                });
            });
        });
    }

    getManager(){
        const manager = web3.isConnected();
        console.log(manager);
        this.setState({
            manager:manager
        })
    }




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





    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.miniContainer}
                                  onPress={this._onForward}>
                    <Text style={styles.buttonContainer}>Play Lottery</Text>

                </TouchableOpacity>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    miniContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        width:200,
        height:200
    },
    buttonContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        width:100,
        height:100,
        marginLeft:50,
        marginRight:50,
        marginBottom:50,
        marginTop:50

    }
});