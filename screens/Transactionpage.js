import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import  * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'; 

export default class Transactionscreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hascamerapermission:null,
            scanned:false,
            scandata:'',
            buttonstate : 'normal'

        }
    }
    getcamerapermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hascamerapermission:status === "granted",
            buttonstate:'clicked',scanned:false
        })
    } 
    handlebarcodescan = async({type,data})=>{
        this.setState({
            scanned:true,scandata:data,buttonstate:'normal'
        })
        }
    render(){
        const hascamerapermission = this.state.hascamerapermission;
        const scanned = this.state.scanned;
        const buttonstate = this.state.buttonstate;
        if (buttonstate==="clicked" && hascamerapermission){
            return(
                <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handlebarcodescan}
                style = {StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonstate==="normal"){
        return(
            <View style ={styles.container}>
                <Text style ={styles.displayText}>{hascamerapermission===true?this.state.scandata:"request camera permission"}</Text>
                <TouchableOpacity 
                onPress={this.getcamerapermission}
                style ={styles.scanButton}>
                <Text style ={styles.buttonText}>scan the QR code to run the app</Text>
                </TouchableOpacity>
            </View>
        )
        }
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    displayText:{
        fontSize:10,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:"black",
        marginBottom: 20
    },
    buttonText:{
        
        fontSize:30,       
    }
})



