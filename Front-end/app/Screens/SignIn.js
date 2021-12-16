import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
function SignIn() {
    const {isLightTheme, light, dark} = useContext(ThemeContext);
  return (
        <View style={styles.container}>
            <Text style={{color: isLightTheme? light.Text : dark.Text}}>Hello</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default SignIn;