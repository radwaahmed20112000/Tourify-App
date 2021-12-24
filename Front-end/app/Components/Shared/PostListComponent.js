import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, TouchableHighlight, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";

import { ThemeContext } from '../../Context/ThemeContext';
import ImageViewer from './ImageViewer';

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function navigateToProfile(userId) {

}

function navigateToPost(postId) {

}

function PostListComponent(props) {
    console.log("ALO")

    console.log(props.item)
    const theme = useContext(ThemeContext);
    const { postId, userId, title, body, rating, userName, userPhoto, photos } = props.item;

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigateToProfile(userId)}>
                <View style={styles.user}>
                    <ImageBackground style={{ flex: 1 }} source={{ uri: userPhoto }} style={styles.userImage} imageStyle={{
                        borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                        borderWidth: 0.25
                    }}></ImageBackground>
                    <View style={{ paddingLeft: RFValue(10), width: "100%", justifyContent: 'center' }}>
                        <SafeAreaView style={{ width: "85%" }}>
                            <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.PrimaryColor }}>{userName}</Text>
                            {/* TODO add time stamp */}
                            <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{"2m"}</Text>

                        </SafeAreaView>
                    </View>
                </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={() => navigateToPost(postId)}>
                <SafeAreaView style={styles.postDescription}>
                    <Text style={{ fontSize: RFValue(12), color: theme.PrimaryColor }}>{ }{body}</Text>
                </SafeAreaView>
            </TouchableHighlight>
            <View style={{
                height: RFValue(300), width: "100%", paddingVertical: RFValue(10)
            }}>
                <ImageViewer images={photos}  ></ImageViewer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: RFValue(30),
        paddingLeft: RFValue(10),
    },
    button: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "3%",
        top: "7%",
        borderRadius: 50

    },
    text: {
        color: "white",
        fontSize: RFValue(18),
        fontWeight: "900"
    },
    user: {
        flexDirection: 'row',
        width: "90%",
        marginTop: 15,
        padding: 4,
        paddingLeft: RFValue(20),
        borderRadius: 20,

    },
    userImage: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
    },
    postDescription: {
        flexDirection: 'row',
        paddingTop: RFValue(8),

    }
});
export default PostListComponent;