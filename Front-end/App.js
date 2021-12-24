import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { ThemeContext, Theme } from './app/Context/ThemeContext';
import Registeration from './app/Screens/Registeration';
import Feed from './app/Screens/Feed';
import PostCreation from './app/Screens/PostCreation';
import TagsList from './app/Components/PostCreation/TagsList';
import ImageSharing from './app/Components/PostCreation/ImageSharing';
import Map from './app/Screens/Map/';

export default function App() {
  const [lightMode, setLightMode] = useState(true)
  const [signUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState(Theme.light);
  function changeSigning() {
    setIsSignUp(!signUp);
  }
  function changeTheme() {
    setLightMode(!lightMode);
    if (lightMode) setTheme(Theme.light);
    else setTheme(Theme.dark);
  }
  useEffect(() => {
    //check if user logged in????????
  }, [])


  // return (
  //   <ThemeContext.Provider value={{theme, changeTheme}}>
  //    <NavigationContainer>
  //      <Tabs/>
  //      </NavigationContainer>

  //   </ThemeContext.Provider>
  // );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} color={Theme.light.SecondaryPurple} />
      </View>
    )
  }
  else {
    return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <PostCreation></PostCreation>
        {/* <PostCreation></PostCreation> */}
        {/* <Registeration isSignUp={signUp} changeSigning={changeSigning} />
        <Feed /> */}
      </ThemeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});