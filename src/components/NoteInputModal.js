import {
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../misc/Colors';
import Roundbtnicon from './Roundbtnicon';

const NoteInputModal = ({visible, onclose, onsubmit, isEdit, note}) => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const handlemodalblinking = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      settitle(note.title);
      setdesc(note.desc);
    }
  }, [isEdit]);
  const handleTextInput = (text, valuefor) => {
    if (valuefor === 'title') settitle(text);
    if (valuefor === 'desc') setdesc(text);
  };

  const handlesubmit = () => {
    if (!title.trim() && !desc.trim()) return onclose();

    if (isEdit) {
     onsubmit(title,desc)
    } else {
      onsubmit(title, desc);
      settitle('');
      setdesc('');
    }
    onclose();
  };

  const closeModal = () => {
    if (!isEdit) {
      settitle('');
      setdesc('');
    }
    onclose();
  };

  return (
    <>
      <StatusBar hidden={true} />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            style={[styles.Title, styles.input]}
            value={title}
            placeholder="Title"
            placeholderTextColor={'#000'}
            onChangeText={text => handleTextInput(text, 'title')}
          />
          <TextInput
            style={[styles.desc, styles.input]}
            value={desc}
            multiline
            placeholder="Note"
            placeholderTextColor={'#000'}
            onChangeText={text => handleTextInput(text, 'desc')}
          />
          <View style={styles.btnContainer}>
            {title.trim() || desc.trim() ? (
              <Roundbtnicon
                size={15}
                name={'close'}
                onPress={() => closeModal()}
              />
            ) : null}
            <Roundbtnicon
              size={15}
              name={'check'}
              onPress={() => handlesubmit()}
              style={styles.check}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handlemodalblinking}>
          <View style={[styles.ModalBg, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.PRIMARY,
    fontSize: 18,
    color: Colors.DARK,
  },
  Title: {
    height: 60,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  ModalBg: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  check: {
    marginLeft: 15,
  },
});
