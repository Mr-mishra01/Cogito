import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext();
const NoteProvider = ({children}) => {
  const [notes, setnotes] = useState([]);

  const findNotes = async () => {
    const res = await AsyncStorage.getItem('notes');
    console.log(res);
    if (res !== null) {
      setnotes(JSON.parse(res));
    }
  };

  useEffect(() => {
    findNotes();
  }, []);
  return (
    <NoteContext.Provider value={{notes, setnotes, findNotes}}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NoteContext);
};
export default NoteProvider;
