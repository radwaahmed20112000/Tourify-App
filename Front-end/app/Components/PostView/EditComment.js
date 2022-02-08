import React, { useContext, useState, useEffect } from 'react'
import { TextInput, Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device width
import { ThemeContext } from '../../Context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import {editComment ,deleteComment} from '../../API/CommentApi'
import { TokenContext } from '../../Context/TokenContext';

export default function EditComment(props) {   /// images  as props   
    const theme = useContext(ThemeContext);
    const [body ,setBody] = useState('');
    const token = useContext(TokenContext);

    useEffect(async () => {
        setBody(props.route.params.comment.body)
    }, []);

    const EditComment = async ()=>{
        console.log("hh")
        let b = { comment_id: props.route.params.comment.comment_id , body : body}

        const data = await editComment(token ,b);
        props.route.params.comment.body =body
        props.route.params.updateCommentBody(props.route.params.comment)
       props.navigation.goBack(null ,{data : data});
 
    }

    return (
        <View style={styles.container}>

            <TextInput
                value={body}
                style={[{ borderColor: theme.SecondaryPurple }, styles.description]}
                onChangeText={text => setBody(text)}
              //  placeholder="How was your trip?"
                multiline={true}
            />
            <TouchableOpacity onPress={() => EditComment()}>
                <LinearGradient
                    colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}>

                    <Text style={{ color: "white" }}>  Save</Text>
                    
                </LinearGradient>
            </TouchableOpacity>
   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: RFValue(40),
        display: 'flex',
        flexDirection: 'column',
   

        alignItems: 'flex-end',
        backgroundColor: 'white',
         height:SCREEN_HEIGHT,
         width:SCREEN_WIDTH
    },
    description: {
        height: SCREEN_HEIGHT * 0.25,
        width: SCREEN_WIDTH * 0.8,
        fontSize: RFValue(18),
        borderBottomWidth: 0.3,
        textAlign: "left",
        textAlignVertical: 'top',
        marginVertical:RFValue(17)

    },
    

    actionLink: {
        fontWeight: 'bold',
        color: 'rgba( 5, 136, 188,1)',

    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_HEIGHT * 0.048,
        borderRadius: SCREEN_WIDTH * 0.1,
    },

});