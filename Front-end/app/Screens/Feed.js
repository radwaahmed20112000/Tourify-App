import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
// import useFetch from '../api/useFetch';
import { MenuProvider } from 'react-native-popup-menu';

import { ThemeContext } from '../Context/ThemeContext';
import { normalize, width } from '../util/FontNormalization';
import PostListComponent from '../Components/Shared/PostListComponent';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../Context/TokenContext';
import IPAdress from '../API/IPAdress';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const WINDOW_HEIGHT = Dimensions.get('window').height;


function Feed(props) {
  const token = useContext(TokenContext);
  const url = IPAdress + "posts/feed"
  const lorempIpsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia," +
    "    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum" +
    "    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium" +
    "    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis" +
    "    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam"

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

  const images1 = [
    {
      uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e34cad97f50001314f70/large.jpg'
    },
    {
      uri: 'https://d3i4lqsaxjar6n.cloudfront.net/post_images/61958e4b490a7c0003244ab4/large.jpg'
    }
  ]

  const postsX = [{
    post_id: 100,
    email: 10,
    userPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS8__K2f9ts2zYtS3Wo_O_GI9o263MQoiLXxrV-awEMCNHf7k_IFWDKIWkKGxHQtahfM&usqp=CAU",
    body: 'hey',
    rating: 5,
    userName: "John Smith",
    photos: images
  }, {
    post_id: 10,
    email: 10,
    userPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS8__K2f9ts2zYtS3Wo_O_GI9o263MQoiLXxrV-awEMCNHf7k_IFWDKIWkKGxHQtahfM&usqp=CAU",
    body: "Hey there!",
    rating: 5,
    userName: "Sarah",
    photos: images1
  }]

  const [posts, setPosts] = useState([]);

  const useFetch = (url) => {
    const [onProgress, setProgress] = useState(true);
    const [error, setError] = useState(null);

    const theme = useContext(ThemeContext);
    const [onProcessing, setProcessing] = useState(true);

    useEffect(() => {
      console.log(url)
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        }
      }).then(response => response.json())
        .then(json => {
          console.log('parsed json', json) // access json.body here
          setPosts(json)
          console.log("ALOO")
          console.log(posts)
        })
        .catch(err => {
          console.log(err)
        });
      //}
    }, [])
  }
  const deletePostFromState = (postID) => {  // should be transfered to  profile 
    let newData = [...posts];
    newData = newData.filter(function (el) { return el.post_id != postID; });
    setPosts(newData);

  }

  useFetch(url);


  // useEffect(() => { 
  //   // setProcessing(onProgress);
  //   setPosts(data);
  // });

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          // removeClippedSubviews={true}
          // initialNumToRender={27}
          // windowSize={41}
          keyExtractor={(item) => item.post_id}
          renderItem={({ item }) => {
            item.deletePostFromState = deletePostFromState;

            return (
              // <Text>nkll</Text>
              <PostListComponent item={item} />
            )
          }} />

      </SafeAreaView>
    </MenuProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(50)
  },
  text: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: "900"
  },
});
export default Feed;
