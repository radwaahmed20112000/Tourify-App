import React, { useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device width
import { ThemeContext } from '../../Context/ThemeContext';

export default function Comment(props) {   /// images  as props   
    const theme = useContext(ThemeContext);

    const deleteComment = ()=>{
     let id = props.id
    }


    const editComment = () => {
        let id = props.id
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.uImg}>
            <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://avatars.githubusercontent.com/u/61039282?s=40&v=4' }} 
            style={styles.userImage}
            imageStyle={{
                borderRadius: SCREEN_WIDTH * 0.15,
                borderWidth: 0.25
            }}>
           
            </ImageBackground>
         </View>
           <View>
            <View style={styles.commentBox}>
                <View style={{ paddingLeft: RFValue(10), justifyContent: 'center' , marginBottom:3 }}>
                    <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text , fontWeight:'bold'}}>{'ali ali'}</Text>

                    <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{'1m'}</Text>
                </View>
                <View>
                <Text> Duis dolore pariatur veniam proident in incididunt elit tempor ad.Lorem elit sunt in 
                    eiusmod duis eiusmod elit id nulla laborum consequat.Officia anim occaecat consectetur nulla exercitation aliqua velit.</Text>
                </View>
           </View>
            <View style={styles.commentActions} >
                    <TouchableOpacity style={styles.actionLink} onPress={() => editComment()}>
                        <View style={styles.actionLink}>
                            <Text style={{ fontWeight:'bold', color: 'rgba( 5, 136, 188,1)' }}>Edit </Text>
                        </View>
                        
                    </TouchableOpacity>
                    <View>
                        <Text>
                            |
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteComment()}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: 'rgba( 5, 136, 188,1)' }}> Delete </Text>
                        </View>
                    </TouchableOpacity>
               
           </View>
        </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width : SCREEN_WIDTH,
       
        alignItems: 'flex-start',
        backgroundColor:'white'
        
    },
    userImage:{
        
        height :30,
        width:30,
        marginTop:12
    },
    commentBox :{
        display:'flex',
        flexDirection: 'column',
        width: 0.8*SCREEN_WIDTH,
        marginLeft:9,
        backgroundColor: 'rgba(226, 226, 226, 1)',
        padding:20,
        paddingTop:10,
        borderBottomEndRadius:12,
        borderBottomLeftRadius:12,
        borderTopRightRadius:12 


      // flex:1,
    }
    ,
    commentActions:{
        display : 'flex',
        flexDirection: 'row',
        marginLeft:20

    },

    actionLink:{
        fontWeight: 'bold',
        color:'rgba( 5, 136, 188,1)',

    }
  
});