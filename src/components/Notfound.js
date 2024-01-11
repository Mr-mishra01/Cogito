import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const Notfound = () => {
  return (
    <View style={[ StyleSheet.absoluteFillObject,styles.container]}>
    <Icon name="frowno" size={90} color='#000'/>
    <Text style={{marginTop:20,fontSize:20,color:'#000'}}>Result Not Found!</Text>
    </View>
  )
}

export default Notfound
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        opacity:0.5,
        zIndex:-1
    }
})