import React, { useContext, useState, useEffect } from 'react';
import { Text, RefreshControl, StyleSheet, Dimensions, FlatList, SafeAreaView, View, ImageBackground } from 'react-native';
import { TokenContext } from '../../Context/TokenContext';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

import { showMessage, hideMessage } from "react-native-flash-message";
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';

function ListOfPosts(props) {
    const Theme = React.useContext(ThemeContext);
    const token = React.useContext(TokenContext);
    const [posts, setPosts] = useState(props.posts);
    const [refreshing, setRefreshing] = React.useState(false);


    let header= {
        marginTop: RFValue(32),
            padding: RFValue(12),
                elevation: 10,
                    textAlign: 'center',
                    backgroundColor:Theme.SecondaryPurple
    }
    useEffect(async () => {
        setPosts(props.route.params.likes)
    }, []);
    const showErrorMessage = () => {
        showMessage({
            message: "",
            description: "Check your network..",
            type: "default",
            backgroundColor: Theme.SecondaryCyan, // background color
            color: "#606060",
            
        });
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        if (isProfile) {
            const data = await getUserPosts(token);
            console.log("lengthhhhh " + data);
            if (data !== false) setPosts(data);
            else {
                showErrorMessage();
            }
        }
        else {
            const data = await getFeedPosts(token);
            if (data !== false) setPosts(data);
            else {
                showErrorMessage();
            }
        }
        setRefreshing(false)

    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={header}>
                <Text style={{fontSize:32 , fontWeight:'600'}}>Likes</Text>
            </View>
            <FlatList
                data={posts}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.07 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={(item) => item.post_id}
                renderItem={({ item }) => {
                   
                    return (
                        <View style={styles.like} key ={item.email} >
                            <ImageBackground style={{ flex: 1 }} source={{ uri: item.photo }}
                                style={styles.userImage}
                                imageStyle={{
                                    borderRadius: SCREEN_WIDTH * 0.15,
                                    borderWidth: 0.25
                                }}>

                            </ImageBackground>
                            <Text> 
                                {item.name}</Text>
                        </View>
                    )
                }} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
      paddingVertical :RFValue(12)

    },
    userImage:{
        height: 40,
        width: 40,
        marginRight:RFValue(20)
    },
    like:{
        display:'flex',
        backgroundColor:'rgba(226, 226, 226, 0.3)',
        flexDirection:"row",
        padding:RFValue(20),
        elevation:1


    },





});
export default ListOfPosts;
