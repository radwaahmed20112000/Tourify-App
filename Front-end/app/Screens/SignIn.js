import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';

function SignIn() {
    const {light, dark, changeTheme, lightMode} = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Text style={{color: lightMode? light.Text : dark.Text, fontSize: normalize(30)}}>Hello</Text>
            <Button onPress={()=> changeTheme()} title='Click'></Button>
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