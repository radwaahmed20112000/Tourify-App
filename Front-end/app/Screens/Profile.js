import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { TokenContext } from '../Context/TokenContext';

function Profile (props) {
  const {signOut} = React.useContext(AuthContext);
  const token = useContext(TokenContext);
  console.log("hello" + token);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={[styles.signInBtn, {backgroundColor: "red"}]} onPress={()=> signOut()}>
        <Text style={styles.btnTxt}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
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
      fontSize:18,
      fontWeight:"900"
  }
});
export default Profile;