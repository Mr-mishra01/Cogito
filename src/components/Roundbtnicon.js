import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../misc/Colors';

const Roundbtnicon = ({name, size, color, style,onPress}) => {
  return (
    <Icon
      name={name}
      size={size || 24}
      color={color || Colors.DARK}
      style={[styles.Icon, {...style}]}
      onPress={onPress}
    />
  );
};

export default Roundbtnicon;

const styles = StyleSheet.create({
  Icon: {
    backgroundColor:Colors.PRIMARY,
    borderRadius: 30,
    padding: 15,
    elevation:5
  },
});
