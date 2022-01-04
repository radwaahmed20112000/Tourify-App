import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext, AppTheme } from './app/Context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './app/Screens/Splash';
import { AuthContext } from './app/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginReducer, initialLoginState } from './app/Context/LoginReducer';
import { signInRequest, signUpRequest } from './app/API/RegisterationAPI';
import Registeration from './app/Screens/Registeration';
import NavigationTabs from './app/Components/Navigation/NavigationTabs'
import { TokenContext } from './app/Context/TokenContext';
import Map from './app/Screens/Map';

export default function App() {
  //navigation:
  const Stack = createStackNavigator();
  //theme:
  const [lightMode, setLightMode] = useState(true)
  const [Theme, setTheme] = useState(AppTheme.light);
  function changeTheme() {
    setLightMode(!lightMode);
    if (lightMode) setTheme(AppTheme.light);
    else setTheme(AppTheme.dark);
  }
  //authuntication
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => {
    return {
      signIn: async (email, password, googleBool) => {
        let response = await signInRequest(email, password, googleBool);
        if (!response.successful) {
          return response.message;
        }
        //if user successfully logged in, save user token and store in local storage
        let userToken = response.userToken;
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'Login', userToken });
      },
      signUp: async (email, userName, password, country, photo, googleBool) => {
        let response = await signUpRequest(email, userName, password, country, photo, googleBool);
        if (!response.successful) {
          return response.message;
        }
        //if user successfully signed up, save user token and store in local storage
        let userToken = response.userToken;
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'Register', userToken });
      },
      signOut: async () => {
        //remove token from local storage
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'Logout' });
      }
    }
  }, [])

  useEffect(() => {
    //check if user logged  in or not
    setTimeout(async () => {
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RetrieveToken", userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <Splash />
    )
  }
  else {
    return (
      <ThemeContext.Provider value={Theme}>
        <AuthContext.Provider value={authContext}>
          <TokenContext.Provider value={loginState.userToken}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loginState.userToken ?
                  <Stack.Screen name="NavigationTabs"
                    component={NavigationTabs} />
                  :
                  <Stack.Screen
                    name="Registeration"
                    component={Registeration}
                    initialParams={{ isSignUp: false }}
                  />
                }
                <Stack.Screen 
                  name="Map"
                  component={Map} />
              </Stack.Navigator>
            </NavigationContainer>
          </TokenContext.Provider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" animating={true} color={Theme.light.SecondaryPurple} />
//       </View>
//     )
//   }
//   else {
//     return (
//       <ThemeContext.Provider value={{ theme, changeTheme }}>
//         <Registeration isSignUp={signUp} changeSigning={changeSigning} />
//         <Feed />
//       </ThemeContext.Provider>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})