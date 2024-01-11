import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteProvider from './src/Context/NoteProvider';

const App = () => {
  // const [username, setUsername] = useState('');

  // const getuser = async () => {
  //   try {
  //     const name = await AsyncStorage.getItem('user');
  //     const userobj = JSON.parse(name);
  //     setUsername(userobj);
  //   } catch (error) {
  //     console.error('Error getting user:', error);
  //   }
  // };

  // useEffect(() => {
  //   getuser();
  // }, []);
  return (
    <NavigationContainer>
      <NoteProvider>
        <StackNavigator />
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;
