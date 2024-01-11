import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../misc/Colors';
import Roundbtnicon from './Roundbtnicon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useNotes} from '../Context/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  // console.log(ms)
  if (!ms || isNaN(ms)) {
    return 'Date information not available';
  }

  const date = new Date(ms);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(2, '0');
  const hrs = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
  const [showModal, setshowModal] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const {noteId} = props.route.params;
  const {notes, setnotes} = useNotes();
  const navigation = useNavigation();
  const [note, setnote] = useState(notes.find(n => n.id === noteId));

  const handleonClose = () => {
    setshowModal(false);
  };

  const handleUpdteNote = async (title, desc, time) => {
    try {
      const result = await AsyncStorage.getItem('notes');

      if (result) {
        let notes = JSON.parse(result);
        const newNotes = notes.filter(n => {
          if (n.id === note.id) {
            n.title = title;
            n.desc = desc;
            n.isUpdated = true;
            // n.time = time;
            n.time = Date.now();

            setnote(n);
          }
          return n;
        });
        setnotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      } else {
        console.log('No notes found.');
      }
    } catch (error) {
      console.log('Error in deleting note', error);
    }
  };

  // const handleUpdteNote = async (title, desc) => {
  //   try {
  //     const result = await AsyncStorage.getItem('notes');

  //     if (result) {
  //       let notes = JSON.parse(result);

  //       const newNotes = notes.map((n) => {
  //         if (n.id === note.id) {
  //           n.title = title;
  //           n.desc = desc;
  //           n.isUpdated = true;
  //           n.time = Date.now(); // Set the timestamp to the current time
  //         }
  //         return n;
  //       });

  //       setnotes(newNotes);
  //       await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  //     } else {
  //       console.log('No notes found.');
  //     }
  //   } catch (error) {
  //     console.log('Error in updating note', error);
  //   }
  // };

  const openEditModal = () => {
    setisEdit(true);
    setshowModal(true);
  };
  const DeleteNote = async () => {
    try {
      const result = await AsyncStorage.getItem('notes');

      if (result) {
        let notes = JSON.parse(result);
        const newNotes = notes.filter(n => n.id !== note.id);
        setnotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        navigation.navigate('NoteScreen');
      } else {
        console.log('No notes found.');
      }
    } catch (error) {
      console.log('Error in deleting note', error);
    }
  };
  const handleDeleteNote = () => {
    Alert.alert(
      'Are you Sure!',
      'This will delete your Note permanently',
      [
        {
          text: 'Delete',
          onPress: () => {
            DeleteNote();
          },
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
    
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.LIGHT} />
      <SafeAreaView style={[styles.container, {paddingTop: 60}]}>
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated at ${formatDate(note.time)}`
            : `created at ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <ScrollView>
          <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>
        <View style={styles.btnContainer}>
          <Roundbtnicon
            name={'delete'}
            style={{backgroundColor: Colors.ERROR, marginBottom: 10}}
            onPress={handleDeleteNote}
          />
          <Roundbtnicon name={'edit'} onPress={openEditModal} />
        </View>
        <NoteInputModal
          isEdit={isEdit}
          note={note}
          visible={showModal}
          onclose={handleonClose}
          onsubmit={handleUpdteNote}
        />
      </SafeAreaView>
    </>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.PRIMARY,
    fontSize: 26,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 18,
    color: 'black',
    opacity: 0.7,
    marginTop: 10,
  },
  time: {
    textAlign: 'right',
    fontSize: 13,
    color: Colors.DARK,
    opacity: 0.5,
    paddingRight: 5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});
