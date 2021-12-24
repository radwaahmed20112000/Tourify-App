import React, {useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Picker} from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';
import { AuthContext } from '../Context/AuthContext';
import CountryPicker from 'react-native-country-picker-modal';
import * as Google from 'expo-google-app-auth';

function Registeration({navigation, route}) {
    const [isSignUp, setIsSignUp] = useState(route.params.isSignUp);
    const {signIn, signUp} = React.useContext(AuthContext);
    const Theme = React.useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState(null);
    const [message, setMessage] = useState("");
    const [photo, setPhoto] = useState(null);
    const handleSignIn = (googleBool)=>{
      let res = signIn(email, password, googleBool);
      setMessage(res);
    }
    const handleSignUp = (googleBool)=>{
      let res = signUp(email, name, password, country, photo, googleBool);
      setMessage(res);
    }
    const onSelect = (country) => {
      setCountry(country.name);
    }
    const handleGoogleSignIn = ()=>{
      const config = {
        iosClientId: "568488060081-cdjfp9cp382ed7gbkhmbekda4u9105se.apps.googleusercontent.com",
        androidClientId: "568488060081-sa2lakshiboq3ko58j759cd1jaioja9i.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      }
      Google.logInAsync(config)
      .then((result)=>{
        const {type, user} = result;
        if(type == "success")
        {
          setName(user.name);
          setPhoto(user.photoUrl);
          setEmail(user.email);
          isSignUp? handleSignUp(true) : handleSignIn(true);
        }
        else{
          setMessage("An error occurred");
        }
      })
      .catch((error) =>{
        setMessage("An error occured, check your network");
      });
    }

  return (
        <View style={styles.container}>
            <Image source={{ uri: Theme.Logo }} style={styles.logo} />
            {isSignUp? <View style={styles.inputBox}>
                <TextInput style= {styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Name" placeholderTextColor={Theme.subText} onChangeText = {text => setName(text)}></TextInput>
            </View> : null}
            <View style={styles.inputBox}>
                <TextInput style= {styles.inputText}  selectionColor={Theme.SecondaryCyan} placeholder="Email" placeholderTextColor={Theme.subText} onChangeText = {text => setEmail(text)}></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput secureTextEntry={true} style= {styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Password" placeholderTextColor={Theme.subText} onChangeText = {text => setPassword(text)}></TextInput>
            </View>
            {isSignUp?
            <View style={[styles.countryPicker, {backgroundColor:'#ededed'}]}>
            <CountryPicker {...{onSelect, withCloseButton:true, withFilter:true}} visible={false} style={{fontSize:50}}/>
            <Text numberOfLines={1} style={[styles.country, {color:Theme.SecondaryCyan}]}>{country}</Text>
            </View>
            : null}
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={[styles.signInBtn, {backgroundColor: Theme.SecondaryCyan}]} onPress={()=>{isSignUp? handleSignUp(false) : handleSignIn(false)}}>
                <Text style={styles.btnTxt}>{isSignUp? "Sign Up" : "Sign In"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn} onPress={()=> handleGoogleSignIn()}>
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
    bottom:"4%",
  },
  signInBtn:{
      width:"80%",
      height:50,
      alignItems: 'center',
      justifyContent:"center",
      marginBottom:"3%",
      top:"3%",
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
    top:"7%",
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
      top:"15%",
      width:"75%",
      flexDirection:"row",
  },
  signTxt:{
    color:"#636363", 
    fontSize:normalize(17)
  },
  countryPicker:{
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    height:60,
    marginBottom:"2%"
  },
  country:{
    fontSize:normalize(19)
  },
  message:{
    fontSize:normalize(16),
    color:"#fc0339",
  }

});
 export default Registeration;