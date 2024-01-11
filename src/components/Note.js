import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../misc/Colors';
import {height, width} from './Constant';

const Note = ({item,onPress}) => {
  const {title, desc} = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.common, styles.title]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[styles.common, styles.desc]} numberOfLines={4}>
        {desc}
      </Text>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  common: {color: Colors.DARK},
  container: {
    backgroundColor: Colors.PRIMARY,
    width: width / 2.4,
    height: height / 6,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
  },
  title: {
    color: '#EEF5FF',
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
  desc: {
    alignSelf: 'flex-start',
    paddingLeft: 4,
  },
});
