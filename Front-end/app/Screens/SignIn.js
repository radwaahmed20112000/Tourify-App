import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';
function SignIn() {
    const {isLightTheme, light, dark} = useContext(ThemeContext);
  return (
        <View style={styles.container}>
            <Text style={{color: isLightTheme? light.Text : dark.Text, fontSize: normalize(30)}}>Hello</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default SignIn;