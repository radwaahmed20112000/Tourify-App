import React, { useEffect, useState }  from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { markAsRead, getAllNotifications } from '../API/NotificatonAPI';
import Spinner from 'react-native-loading-spinner-overlay';

function Notifications (props) {
    const [notifications, setNotifications] = useState([])
    const [processing, setProcessing] = useState(false)

    const viewNotification = (item) => {
        markAsRead(item)
        //TODO : Navigate to view Post (Props : item.post_id) 
    }

    useEffect( () => {
        setProcessing(true)
        console.log("hi")
        const notifs = getAllNotifications()
        console.log({notifs})
        setNotifications(notifs)
        setProcessing(false)
    }, [])

    return (
      <SafeAreaView style={{paddingTop:"8%"}}>
      {processing &&                 
          <Spinner
                visible={onProcessing}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
          />}
      {!processing &&
      <FlatList
          style={styles.root}
          data={notifications}
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
                <TouchableOpacity style={[styles.container, {backgroundColor:Notification.viewed? "#edf6f7":"white" }]} onPress={viewNotification}>
                    <Image source={{uri:Notification.photo}} style={styles.avatar}/>
                    <View style={styles.content}>
                        <View style={mainContentStyle}>
                            <View style={styles.text}>
                              <Text style={styles.name}>{Notification.name}</Text>
                              <Text>{Notification.comment_id !== Null ? 
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
        }}/>}
        </SafeAreaView>
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
export default Notifications;