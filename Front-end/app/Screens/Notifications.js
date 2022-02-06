import React, { useState }  from 'react';
import { SafeAreaView } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

function Notifications (props) {
  const [notifications, setNotifications] = useState(
    [
      {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000", open:true},
      {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"https://via.placeholder.com/100x100/20B2AA/000000", open: true},
      {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"", open:true},
      {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"", open:false},
      {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh",    text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"https://via.placeholder.com/100x100/7B68EE/000000", open:false},
      {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Clark June Boom!", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"", open:false},
      {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",      text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", attachment:"", open:false},
    ]
  )
  const viewNotification = (item) => {
    let index = fruits.indexOf(item);
    notifications[index].open = false;
    setNotifications(notifications); 
  }

  return (
    <SafeAreaView style={{paddingTop:"8%"}}>
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
        let attachment = <View/>;
        let mainContentStyle;
        if(Notification.attachment) {
          mainContentStyle = styles.mainContent;
          attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
        }
        return(
          <View style={[styles.container, {backgroundColor:Notification.open? "#edf6f7":"white" }]}>
            <Image source={{uri:Notification.image}} style={styles.avatar}/>
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text>{Notification.text}</Text>
                </View>
                <Text style={styles.timeAgo}>
                  2 hours ago
                </Text>
              </View>
              {attachment}
            </View>
          </View>
        );
      }}/>
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