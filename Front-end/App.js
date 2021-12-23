import React,{ useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { ThemeContext, AppTheme} from './app/Context/ThemeContext';
import Registeration from './app/Screens/Registeration';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './app/Screens/Splash';
import { AuthContext } from './app/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginReducer, initialLoginState } from './app/Context/LoginReducer';
import PrivateApp from './app/Components/Navigation/PrivateApp';

export default function App() {
  //navigation:
  const Stack = createStackNavigator();
  //theme:
  const [lightMode, setLightMode] = useState(true)
  const [Theme, setTheme] = useState(AppTheme.light);
  function changeTheme()
  {
      setLightMode(!lightMode);
      if(lightMode) setTheme(AppTheme.light);
      else setTheme(AppTheme.dark);
  }
  //authuntication
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(()=>{
    return{
      signIn: async (email, password)=>{
        fakeEmail = "aya";
        fakePassword = "hello";
        userToken = null;
        userName = null;
        userPhoto = null;
        if(fakeEmail == email && fakePassword == password)
        {
          userToken = "fakeToken";
          userName = "ayaa";
          userPhoto = "This is a photo";
          try {
            await AsyncStorage.setItem('userToken', userToken)
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'Login', userName, userPhoto, userToken});
      },
      signUp: async (email, userName, password, country)=>{
        userToken = "fakeToken";
        userPhoto ="This is a photo";
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'Register', userName, userPhoto, userToken});
      },
      signOut: async ()=>{
        try {
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'Logout'});
      }
    }
  }, [])

  useEffect(()=>{
    //check if user logged  in or not
    setTimeout(async ()=>{
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type : "RetrieveToken", userToken})
    }, 1000)
  }, [])

  if(loginState.isLoading)
  {
    return(
      <Splash/>
    )
  }
  else{
    return (
      <ThemeContext.Provider value={Theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {loginState.userToken?
            <Stack.Screen name="PrivateApp"
            component={PrivateApp}
            /*initialParams={{userName: loginState.userName}}*//>
            :
            <Stack.Screen
              name="Registeration"
              component={Registeration}
              initialParams={{isSignUp: false}}
            />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
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
