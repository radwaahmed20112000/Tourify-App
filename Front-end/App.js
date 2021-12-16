import React,{ useState } from 'react';
import { StyleSheet} from 'react-native';
import SignIn from './app/Screens/SignIn';
import { ThemeContext, Theme, changeTheme } from './app/Context/ThemeContext';
export default function App() {
  const [lightMode, setTheme] = useState(true)
  function changeTheme()
  {
      setTheme(!lightMode);
  }
  return (
    <ThemeContext.Provider value={{...Theme, lightMode, changeTheme}}>
      <SignIn/>
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
