import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';

function Registeration(props) {
    const {isSignUp, changeSigning} = props;
    const {light, dark, changeTheme, lightMode} = useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.ibb.co/S02fhRW/Tourify-Logo-Black.png' }} style={styles.logo} />
            {isSignUp? <View style={styles.inputBox}>
                <TextInput style= {styles.inputText} selectionColor={light.SecondaryCyan} placeholder="Name" placeholderTextColor={light.subText} onChangeText = {text => setName(text)}></TextInput>
            </View> : null}
            <View style={styles.inputBox}>
                <TextInput style= {styles.inputText}  selectionColor={light.SecondaryCyan} placeholder="Email" placeholderTextColor={light.subText} onChangeText = {text => setEmail(text)}></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput style= {styles.inputText} selectionColor={light.SecondaryCyan} placeholder="Password" placeholderTextColor={light.subText} onChangeText = {text => setPassword(text)}></TextInput>
            </View>
            <TouchableOpacity style={[styles.signInBtn, {backgroundColor: light.SecondaryCyan}]}>
                <Text style={styles.btnTxt}>{isSignUp? "Sign Up" : "Sign In"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.btnTxtgoogle}>{isSignUp? "Sign Up With Google" : "Sign In With Google"}</Text>
                <Image source={{ uri: 'https://pngimg.com/uploads/google/google_PNG19635.png' }} style={styles.googleLogo} />
            </TouchableOpacity>
            {isSignUp?<View style={styles.signUpTexts}>
              <Text style={{color:"#636363", fontSize:normalize(17)}}>Already have an account? </Text>
              <Text onPress={()=> changeSigning()} style={{color:light.SecondaryCyan, textDecorationLine: 'underline', fontSize:normalize(17)}}>Sign In here</Text>
            </View> :
            <View style={styles.signUpTexts}>
                <Text style={{color:"#636363", fontSize:normalize(17)}}>Don't have an account yet? </Text>
                <Text onPress={()=> changeSigning()}  style={{color:light.SecondaryCyan, textDecorationLine: 'underline', fontSize:normalize(17)}}>Sign up here</Text>
            </View>}
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
  inputBox: {
    width:"80%",
    height:50,
    justifyContent:"center",
    padding:20,
    marginBottom:"5%",
    backgroundColor: '#ededed',
    borderRadius:50
  },
  inputText:{
    height:55,
    color: "#636363",
    fontSize: normalize(18)
  },
  logo:{
    width: 220,
    height: 120,
    bottom:"7%",
  },
  signInBtn:{
      width:"80%",
      height:50,
      alignItems: 'center',
      justifyContent:"center",
      marginBottom:"3%",
      top:"7%",
      borderRadius:50
  },
  btnTxt:{
      color:"white",
      fontSize:normalize(18),
      fontWeight:"900"
  },
  googleBtn:{
    width:"80%",
    height:50,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor:"black",
    flexDirection:"row",
    paddingLeft:"6%",
    top:"15%",
    borderRadius:50
  },
  btnTxtgoogle:{
      color:"white",
      fontSize:normalize(18),
      fontWeight:"900"
  },
  googleLogo:{
      width:40,
      height:40
  },
  signUpTexts:{
      top:"20%",
      width:"75%",
      flexDirection:"row",
     }

});
 export default Registeration;