import React from 'react';
import { markAsRead } from '../../API/NotificatonAPI';
import { TokenContext } from '../../Context/TokenContext';
import { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity
  } from 'react-native';
function NotificationList({ navigation, notifications }) {

    const user_token = useContext(TokenContext)

    const viewNotification = (item) => {
        markAsRead(user_token, item)
        //TODO : Navigate to view Post (Props : item.post_id) 
    }

    return (
        <View>
            <FlatList
            style={styles.root}
            data={notifications}
            // extraData={state.refresh}
            ItemSeparatorComponent={() => {
                return (
                <View style={styles.separator}/>
                )
            }}
            keyExtractor={(item) => item.id }
            renderItem={(item) => {
                const Notification = item.item;
                let mainContentStyle;

                return(
                    <TouchableOpacity style={[styles.container, {backgroundColor:Notification.viewed === 0? "#edf6f7":"white" }]}
                     onPress={() => {
                         if(Notification.viewed === 0) viewNotification(Notification.id)
                     }}>
                    <Image source={{uri:Notification.photo}} style={styles.avatar}/>
                        <View style={styles.content}>
                            <View style={mainContentStyle}>
                                <View style={styles.text}>
                                <Text style={styles.name}>{Notification.name}</Text>
                                <Text>{Notification.comment_id !== null ? 
                                                'commented on your trip.'
                                            : 'liked your trip review.'}
                                </Text>
                                </View>
                                <Text style={styles.timeAgo}>
                                    {Notification.created_at}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}/>
        </View>
    );
}
const styles = StyleSheet.create({
    // root: {
    //   backgroundColor: "#FFFFFF"
    // },
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
    },
    avatar: {
        width:50,
        height:50,
        borderRadius:25,
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    timeAgo:{
        fontSize:12,
        color:"#696969"
    },
    name:{
        fontSize:16,
        color:"#1E90FF"
    }
}); 
export default NotificationList;