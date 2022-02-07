import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Platform } from 'react-native';
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { NotificationsContext } from './app/Context/NotificationsContext';
//TODO : Save Token

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  //notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //navigation:
  const Stack = createStackNavigator();
  //theme:
  const [lightMode, setLightMode] = useState(true)
  const [notificationsCount, setNotificationsCount] = useState(0)

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
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)

    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setNotificationsCount(notificationsCount => notificationsCount + 1)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
            <NotificationsContext.Provider value={notificationsCount}>
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
            </NotificationsContext.Provider>
          </TokenContext.Provider>
        </AuthContext.Provider>
      </ThemeContext.Provider>

    );
  }
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})