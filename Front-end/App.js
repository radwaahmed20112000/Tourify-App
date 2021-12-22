import React,{ useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import { ThemeContext, AppTheme} from './app/Context/ThemeContext';
import Registeration from './app/Screens/Registeration';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from './app/Screens/Test'
import Splash from './app/Screens/Splash';
import { AuthContext } from './app/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  //navigation:
  const Tab = createBottomTabNavigator();
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
  const initialLoginState = {
    isLoading : true,
    userName : null,
    userToken : null,
    userPhoto : null
  }
  const loginReducer = (prevState, action) =>{
    switch(action.type)
    {
      case 'RetrieveToken':
        return{
          ...prevState,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Login':
        return{
          ...prevState,
          userName : action.userName,
          userPhoto : action.userPhoto,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Logout':
        return{
          ...prevState,
          userName : null,
          userToken : null,
          userPhoto : null
        };
      case 'Register':
        return{
          ...prevState,
          userName : action.userName,
          userPhoto : action.userPhoto,
          userToken : action.userToken,
          isLoading : false
        };
    }
  }
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
      signUp: async (email, userName, password)=>{
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
          <Tab.Navigator>
            {loginState.userToken?
            <Tab.Screen name="Test"
            component={Test}
            initialParams={{userName: loginState.userName}} />
            :
            <Tab.Screen
              name="Registeration"
              component={Registeration}
              initialParams={{isSignUp: false}}
            />
            }
          </Tab.Navigator>
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
