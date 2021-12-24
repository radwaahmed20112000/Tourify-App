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
    const [photo, setPhoto] = useState("https://www.google.com/search?q=google+user+photo&sxsrf=AOaemvJvkzT8oxpBoiJ-bmZmvJ5mSW4y3w:1640333776137&tbm=isch&source=iu&ictx=1&fir=9T2hLo6aQx6YlM%252CX8JaXF6sFzBNAM%252C_%253BDpF8Hm_sa-53jM%252Clljpu_bc8bR5iM%252C_%253BAyxseCZU8nq6eM%252CimPhn2_EDQcIPM%252C_%253B63oKHPItaAV6TM%252CfN9oMPY7hqNldM%252C_%253BZluLiB4toI9ScM%252CimPhn2_EDQcIPM%252C_%253BaJNHN6kn5gphiM%252Cbch7RqdmdWTFjM%252C_%253BCCSe2EHFm0tNcM%252CimPhn2_EDQcIPM%252C_%253BlZgxKlN5po1QRM%252CMhtRhRgW_suEQM%252C_%253BFoRObteE0ANebM%252CbXBT54pzQQj07M%252C_%253BQE3OQDJuT9zyvM%252CimPhn2_EDQcIPM%252C_%253ByMOEGzgwMplHcM%252CiLC34UqEKs5eGM%252C_%253BNfyZ3Txe2qVL2M%252CKS3Q-XqcTxLNWM%252C_%253BfSLCZUDpcY2PIM%252C27FgZ0sSZtOXFM%252C_%253BsKHiZmdLMGcE6M%252CimPhn2_EDQcIPM%252C_%253BTBK0wsrDLPAf4M%252CBp-oFJsCrgqagM%252C_&vet=1&usg=AI4_-kQuIqF7C568wsfY1dgS7W3wcuZePg&sa=X&ved=2ahUKEwihmajA__v0AhVs5OAKHZAxBXQQ9QF6BAgIEAE#imgrc=DpF8Hm_sa-53jM");
    const handleSignIn = (googleBool)=>{
      let res = signIn(email, password, "false");
      
    }
    const handleSignUp = (googleBool)=>{
      let res = signUp(email, name, password, country, photo, "false");
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
            {/* <Text style={styles.message}>{message}</Text> */}
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