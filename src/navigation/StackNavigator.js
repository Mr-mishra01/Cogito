import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screens/Intro';
import NoteScreen from '../screens/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteDetail from '../components/NoteDetail';
import { height } from '../components/Constant';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [usernam, setusernam] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  const getuser = async () => {
    try {
      const name = await AsyncStorage.getItem('user');
      const userobj = JSON.parse(name);
      const username = userobj ? userobj.name : '';
      setusernam(username);
      // setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error getting user:', error);
      // Handle error, e.g., navigate to an error screen
    }
  };




  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
    },1000)
    getuser();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
      {loading ? (
        <>
          <Image
            style={{height:height,width:'100%'}}
            source={require('../components/assets/Group6.png')}
          />
          <ActivityIndicator size={'large'}/>
        </>
      ) : (
        <Stack.Navigator
          // screenOptions={{headerTitle: '', headerTransparent: true}}
          detachInactiveScreens={true}
          initialRouteName={usernam ? 'NoteScreen' : 'Intro'}>
          <Stack.Screen  options={{headerShown:false}} name="Intro" component={Intro} />
          <Stack.Screen options={{headerShown:false}} name="NoteScreen" component={NoteScreen} />
          <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="NoteDetail" component={NoteDetail} />
        </Stack.Navigator>
      )}
    </View>
  );
};

export default StackNavigator;
