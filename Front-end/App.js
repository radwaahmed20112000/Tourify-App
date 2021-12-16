import React from 'react';
import { StyleSheet} from 'react-native';
import SignIn from './app/Screens/SignIn';
import { ThemeContext, Theme } from './app/Context/ThemeContext';
export default function App() {

  return (
    <ThemeContext.Provider value={{...Theme}}>
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
