import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemeContext } from '../Context/ThemeContext';
import {normalize,width} from '../util/FontNormalization';

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function Feed(props) {
    const {theme} = useContext(ThemeContext);

    return (
        <View style={styles.container}>
          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            // style={styles.background}
          />
          {/* <LinearGradient
            // Button Linear Gradient
            colors={[theme.SecondaryCyan,theme.SecondaryPurple]}
            start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 1 }}
            style={styles.button}>
            <Text style={styles.text}>Sign in with Facebook</Text>
          </LinearGradient> */}
                 <LinearGradient
            colors={[theme.SecondaryCyan,theme.SecondaryPurple]}
            start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 1 }}
            style={styles.button}>
          </LinearGradient>
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
        button:{
            width:100,
            height:100,
            alignItems: 'center',
            justifyContent:"center",
            marginBottom:"3%",
            top:"7%",
             borderRadius:50

        },
        text:{
            color:"white",
            fontSize:normalize(18),
            fontWeight:"900"
        },
    });
  export default Feed;