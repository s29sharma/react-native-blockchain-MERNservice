import React,{Component} from 'react'
import { Image,View,ScrollView, Text, TextInput,StyleSheet,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Drawer } from 'native-base';
import { Container,Item,Label,Form,Input, Header, Content,Footer,Right,Segment, FooterTab,Left,Body, Badge,Button,Icon} from 'native-base';
import SideBar from './Sidebar'
import Submission from './Submission'
import Dashboard from "./Dashboard";

export default class FooterApp extends Component{

    constructor(props){
        super(props);
        this.state={
            apps:null,
            person:null,
            calculator:null,
            calender:null
        }
    }

    _handleNextPressforapps(nextRoute) {
        this.setState({
            apps:false,
            calculator:false,
            person:true,
            calender:false
        });
        this.props.navigator.push(nextRoute)
    }

    _handleNextPressforperson(nextRoute) {
        this.setState({
            apps:false,
            calculator:false,
            person:true,
            calender:false
        });
        this.props.navigator.push(nextRoute)
    }
    _handleNextPressforcalculator(nextRoute) {
        this.setState({
            apps:false,
            calculator:true,
            person:false,
            calender:false
        });
        this.props.navigator.push(nextRoute)
    }
    _handleNextPressforcalender(nextRoute) {
        this.setState({
            apps:false,
            calculator:false,
            person:false,
            calender:true
        });
        this.props.navigator.push(nextRoute)
    }


    render(){
        const nextRoute = {
            component: Submission,
            title: 'Submit',
            navigationBarHidden:true,
        };
        const DashboardRoute ={
            component:Dashboard,
            title:"Welcome",
            navigationBarHidden:true,
        };
        const BalanceRoute ={

        };
        const ResultRoute ={

        };
        return(
            <Footer style={styles.footer}>
                <FooterTab>
                    <Button badge vertical active
                            onPress={() => this._handleNextPressforapps(DashboardRoute)}
                    >
                        <Badge><Text>2</Text></Badge>
                        <Icon name="apps" />
                        <Text>Apps</Text>
                    </Button>
                    <Button  vertical active={this.state.person}
                            onPress={() => this._handleNextPressforperson(nextRoute)}>
                        <Icon name="person" />
                        <Text>Play</Text>
                    </Button>
                    <Button badge vertical active={this.state.calculator}
                            onPress={() => this._handleNextPressforcalculator(BalanceRoute)}
                    >
                        <Badge><Text>3</Text></Badge>
                        <Icon active name="calculator" />
                        <Text>Balance</Text>
                    </Button>
                    <Button badge vertical active={this.state.calender}
                            onPress={() => this._handleNextPressforcalender(ResultRoute)}
                    >
                        <Badge><Text>1</Text></Badge>
                        <Icon name="calendar" />
                        <Text>Results</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
   footer:{

   }
});