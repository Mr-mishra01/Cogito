import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Roundbtnicon from '../components/Roundbtnicon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Intro = () => {
  const [name, setname] = useState('');
  const navigation = useNavigation();

  const handlesubmit = async () => {
    const user = {name: name};
    try {
      AsyncStorage.setItem('user', JSON.stringify(user))
      .then(() =>
        navigation.navigate('NoteScreen'),
      );
    } catch (error) {
      console.log('error in saving username', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.Text}>Enter your name to Continue 😊 </Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter name"
        placeholderTextColor={'black'}
        maxLength={25}
        value={name}
        onChangeText={text => {
          setname(text);
        }}
      />
      {name.trim().length > 3 ? (
        <Roundbtnicon name={'arrowright'} onPress={handlesubmit} />
      ) : null}
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    alignSelf: 'flex-start',
    color: 'purple',
    textAlign: 'left',
    paddingLeft: 30,
    fontSize: 18,
    opacity: 0.8,
  },
  TextInput: {
    height: 50,
    width: '90%',
    borderColor: 'purple',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    color: 'black',
    paddingLeft: 20,
    fontSize: 18,
    marginBottom: 15,
  },
});
