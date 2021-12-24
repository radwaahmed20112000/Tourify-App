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
    const { theme } = useContext(ThemeContext);
    const lorempIpsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia," +
        "    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum" +
        "    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium" +
        "    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis" +
        "    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam"
    // const { postId, userId, title, body, rating, userName, userPhoto, photos } = props;
    const userPhoto = 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    const userName = "RIP my bird"
    const images = [
        {
            uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
            uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
            uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
        },
        {
            uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e2a4ad97f50001314f56/large.jpg'
        },
        {
            uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e34cad97f50001314f70/large.jpg'
        },
        {
            uri: 'https://d3i4lqsaxjar6n.cloudfront.net/post_images/61958e4b490a7c0003244ab4/large.jpg'
        }

    ]

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigateToProfile(userId)}>
                <View style={styles.user}>
                    <ImageBackground style={{ flex: 1 }} source={{ uri: userPhoto }} style={styles.userImage} imageStyle={{
                        borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                        borderWidth: 0.25
                    }}></ImageBackground>
                    <View style={{ padding: "1.5%", paddingLeft: RFValue(10), width: "100%", justifyContent: 'center' }}>
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
                    <Text style={{ fontSize: RFValue(12), color: theme.PrimaryColor }}>{ }{lorempIpsum}</Text>
                </SafeAreaView>
            </TouchableHighlight>
            <View style={{
                height: RFValue(300), width: "100%", paddingHorizontal: RFValue(20), paddingVertical: RFValue(10)
            }}>
                <ImageViewer images={images}  ></ImageViewer>

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
        paddingHorizontal: RFValue(20),
    }
});
export default PostListComponent;