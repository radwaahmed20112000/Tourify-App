import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ThemeContext } from '../../Context/ThemeContext';
import ImageViewer from './ImageViewer';

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function navigateToProfile(userId) {

}

function navigateToPost(postId) {

}

function PostListComponent(props) {
    console.log("ALO")

    const theme = useContext(ThemeContext);
    console.log(props.item)
    const { post_id, email, body, rating, userName, userPhoto, photos } = props.item;

    return (

        <View style={styles.container}>

            <View style={styles.user}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center',

                }} >
                    <TouchableOpacity onPress={() => navigateToProfile(email)}>

                        <ImageBackground style={{ flex: 1 }} source={{ uri: userPhoto }} style={styles.userImage} imageStyle={{
                            borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                            borderWidth: 0.25
                        }}></ImageBackground>
                    </TouchableOpacity>

                    <View style={{ paddingLeft: RFValue(10), justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text }}>{userName}</Text>

                        {/* TODO add time stamp */}
                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{"2m"}</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center' }} >

                    <Menu  >
                        <MenuTrigger>
                            <View style={{ paddingHorizontal: RFValue(20), paddingVertical: RFValue(10) }} >
                                <FontAwesomeIcon icon={faEllipsisV} size={RFValue(15)} color={theme.SubText} ></FontAwesomeIcon>

                            </View>

                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ marginTop: RFValue(30) }}>
                            <MenuOption onSelect={() => alert(`Save`)} text='Edit Post' />
                            <MenuOption onSelect={() => alert(`Delete`)} >
                                <Text style={{ color: 'red' }}>Delete Post</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>

                </View>


            </View>


            <TouchableOpacity onPress={() => navigateToPost(post_id)}>
                <SafeAreaView style={styles.postDescription}>
                    <Text style={{ textAlign: 'left', fontSize: RFValue(12), color: theme.PrimaryColor }}>{ }{body}</Text>
                </SafeAreaView>
            </TouchableOpacity>
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
        paddingRight: RFValue(10),
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
        marginTop: RFValue(10),
        marginHorizontal: RFValue(5)
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