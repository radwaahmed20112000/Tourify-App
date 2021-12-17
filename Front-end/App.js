import React,{ useState } from 'react';
import { StyleSheet} from 'react-native';
import { ThemeContext, Theme, changeTheme } from './app/Context/ThemeContext';
import Registeration from './app/Screens/Registeration';
import Feed from './app/Screens/Feed';

export default function App() {
  const [lightMode, setTheme] = useState(true)
  const [signUp, setIsSignUp] = useState(false)
  function changeSigning()
  {
    setIsSignUp(!signUp);
  }
  function changeTheme()
  {
      setTheme(!lightMode);
  }
  return (
    <ThemeContext.Provider value={{...Theme, lightMode, changeTheme}}>
      {/* <Registeration isSignUp={signUp} changeSigning= {changeSigning}/> */}
      <Feed/>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
