import {
  Alert,
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Children, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../misc/Colors';
import Searchbar from '../components/Searchbar';
import Roundbtnicon from '../components/Roundbtnicon';
import NoteInputModal from '../components/NoteInputModal';
import Note from '../components/Note';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useNotes} from '../Context/NoteProvider';
import Notfound from '../components/Notfound';

const NoteScreen = () => {
  const [user, setuser] = useState('');
  const [greet, setgreet] = useState('evening');
  const [modalvisible, setmodalvisible] = useState(false);
  const [SearchQuery, setSearchQuery] = useState('');
  const [resultNotfound, setresultNotfound] = useState(false);

  const {notes, setnotes, findNotes} = useNotes();

  const navigation = useNavigation();

  const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

  const handleGreet = () => {
    const hrs = new Date().getHours();
    // console.log(hrs);
    if (hrs === 0 || hrs < 12) return setgreet('Morning');
    else if (hrs === 13 || hrs < 17) return setgreet('Afternoon');
    else return setgreet('evening');
  };

  const handleUserOut = async () => {
    try {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: async () => {
              await AsyncStorage.clear();
              // Navigate to the initial screen
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Intro'}], // Replace 'InitialScreen' with the actual name of your initial screen
                }),
              );
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const showUser = async () => {
    try {
      const res = await AsyncStorage.getItem('user');
      const userObj = JSON.parse(res);
      const name = userObj ? userObj.name : ''; // extarcting the value of name
      setuser(name);
    } catch (error) {
      console.log('error in getting username', error);
    }
  };

  const handleSubmit = async (title, desc) => {
    const note = {id: Date.now(), title, desc, time: Date.now()};
    console.log('time in handle submit ', Date.now());
    const updatedNote = [...notes, note];
    console.log('updated note', updatedNote);
    setnotes(updatedNote);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNote));
  };

  const handleOnsearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setresultNotfound(false);
      return await findNotes();
    }
    const filterNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });
    if (filterNotes.length) {
      setnotes([...filterNotes]);
    } else {
      setresultNotfound(true);
    }
  };

  useEffect(() => {
    showUser();
    handleGreet();
    // findNotes();
  }, []);

    const reverseNotes = reverseData(notes)
  const openNote = note => {
    navigation.navigate('NoteDetail', {noteId: note.id});
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setresultNotfound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.LIGHT} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.greetContainer}>
            <Text style={styles.greet}>{`Good ${greet} ${user}`}</Text>
            <Roundbtnicon onPress={handleUserOut} size={25} name={'logout'} />
          </View>
          <Searchbar
            value={SearchQuery}
            onChangeText={handleOnsearchInput}
            containerStyle={{marginVertical: 10}}
            onClear={handleOnClear}
          />
          {resultNotfound ? (
            <Notfound />
          ) : (
            <FlatList
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              data={reverseNotes}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                return <Note onPress={() => openNote(item)} item={item} />;
              }}
            />
          )}
          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderConatiner,
              ]}>
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
          <Roundbtnicon
            onPress={() => setmodalvisible(true)}
            name={'plus'}
            style={styles.plusbtn}
          />
        </View>
      </TouchableWithoutFeedback>
      <NoteInputModal
        visible={modalvisible}
        onclose={() => setmodalvisible(false)}
        onsubmit={handleSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  greet: {
    fontSize: 20,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    opacity: 0.3,
    textTransform: 'uppercase',
  },
  emptyHeaderConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  plusbtn: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    zIndex: 1,
  },
  greetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
