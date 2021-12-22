import React, {useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';
import { AuthContext } from '../Context/AuthContext';
function Registeration({navigation, route}) {
    const [isSignUp, setIsSignUp] = useState(route.params.isSignUp);
    const {signIn, signUp} = React.useContext(AuthContext);
    const Theme = React.useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const handleSignIn = ()=>{
      signIn(email, password);
    }
    const handleSignUp = ()=>{
      signUp(email, name, password);
    }

  return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.ibb.co/S02fhRW/Tourify-Logo-Black.png' }} style={styles.logo} />
            {isSignUp? <View style={styles.inputBox}>
                <TextInput style= {styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Name" placeholderTextColor={Theme.subText} onChangeText = {text => setName(text)}></TextInput>
            </View> : null}
            <View style={styles.inputBox}>
                <TextInput style= {styles.inputText}  selectionColor={Theme.SecondaryCyan} placeholder="Email" placeholderTextColor={Theme.subText} onChangeText = {text => setEmail(text)}></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput style= {styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Password" placeholderTextColor={Theme.subText} onChangeText = {text => setPassword(text)}></TextInput>
            </View>
            <TouchableOpacity style={[styles.signInBtn, {backgroundColor: Theme.SecondaryCyan}]} onPress={()=>{isSignUp? handleSignUp() : handleSignIn()}}>
                <Text style={styles.btnTxt}>{isSignUp? "Sign Up" : "Sign In"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.btnTxtgoogle}>{isSignUp? "Sign Up With Google" : "Sign In With Google"}</Text>
                <Image source={{ uri: 'https://pngimg.com/uploads/google/google_PNG19635.png' }} style={styles.googleLogo} />
            </TouchableOpacity>
            {isSignUp?<View style={styles.signUpTexts}>
              <Text style={styles.signTxt}>Already have an account? </Text>
              <Text onPress={()=>setIsSignUp(!isSignUp)} style={{color:Theme.SecondaryCyan, textDecorationLine: 'underline', fontSize:normalize(17)}}>Sign In here</Text>
            </View> :
            <View style={styles.signUpTexts}>
                <Text style={styles.signTxt}>Don't have an account yet? </Text>
                <Text onPress={()=>setIsSignUp(!isSignUp)}  style={{color:Theme.SecondaryCyan, textDecorationLine: 'underline', fontSize:normalize(17)}}>Sign up here</Text>
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
  },
  signTxt:{
    color:"#636363", 
    fontSize:normalize(17)
  }

});
 export default Registeration;