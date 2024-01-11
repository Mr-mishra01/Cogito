import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../misc/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const Searchbar = ({containerStyle, value, onChangeText, onClear}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput
        value={value}
        style={styles.searchbar}
        placeholder="search here.."
        placeholderTextColor={'#000'}
        onChangeText={onChangeText}
      />
      {value ? (
        <Icon
          name="close"
          size={20}
          color={Colors.DARK}
          style={styles.Icon}
          onPress={onClear}
        />
      ) : null}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    height: 60,
    width: '100%',
    fontSize: 18,
    paddingLeft: 15,
    borderRadius: 20,
    color: '#000',
  },
  container: {justifyContent: 'center'},
  Icon: {
    borderRadius: 20,
    padding: 15,
    position: 'absolute',
    right: 10,
  },
});
