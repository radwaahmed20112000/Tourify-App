import React, { useContext, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import useFetch from '../api/useFetch';

import { ThemeContext } from '../Context/ThemeContext';
import { normalize, width } from '../util/FontNormalization';
import PostListComponent from '../Components/Shared/PostListComponent';
import { RFValue } from 'react-native-responsive-fontsize';

const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BOTTOM_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;

function Feed(props) {

  const url = "http://192.168.1.9:8080/"
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
    postId: 100,
    userId: 10,
    userPhoto: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    title: "",
    body: lorempIpsum,
    rating: 5,
    userName: "John Smith",
    photos: images
  }, {
    postId: 10,
    userId: 10,
    userPhoto: "https://d3i4lqsaxjar6n.cloudfront.net/post_images/61958e4b490a7c0003244ab4/large.jpg",
    title: "",
    body: "Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo " +
      "fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore " +
      "suscipit quas? Nulla, placeat.",
    rating: 5,
    userName: "Sarah Osama",
    photos: images1
  }]

  // const useFetch = (url) => {
  //   const [data, setData] = useState([]);
  //   const [onProgress, setProgress] = useState(true);
  //   const [error, setError] = useState(null);

  //   const theme = useContext(ThemeContext);
  //   const [posts, setPosts] = useState(postsX);
  //   const [onProcessing, setProcessing] = useState(true);

  //   useEffect(() => {
  //     // if(data === []){
  //     fetch(url)
  //       .then(res => {
  //         if (!res.ok) {
  //           throw Error('Could not fetch the data for that resource');
  //         }
  //         return res.json();
  //       })
  //       .then(data => {
  //         setPosts(data);
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       });
  //     //}
  //   }, [url])

  //   return { data };
  // }


  const userPhoto = 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'


  // const { data } = useFetch(url + 'feed/');
  // console.log("1")
  // console.log(data)
  // console.log("2")

  // useEffect(() => {
  //   setProcessing(onProgress);
  //   setPosts(data);
  // });
  // const [search, setSearch] = useState('');
  // const updateSearch = value => {
  //   setSearch(value);
  // }
  // const searchFor = async () => {
  //   setProcessing(true);
  //   await fetch('http://192.168.1.8:3000/Search/Podcast/' + search)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw Error('could not fetch the data for that resource');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       setProcessing(false);
  //       setPosts(data);

  //     })
  //     .catch(err => {
  //       setProcessing(false);
  //       error = err.message;
  //     });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postsX}
        // removeClippedSubviews={true}
        // initialNumToRender={27}
        // windowSize={41}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => {
          return (
            // <Text>nkll</Text>
            <PostListComponent item={item} />
          )
        }} />

    </SafeAreaView>
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
    fontSize: normalize(18),
    fontWeight: "900"
  },
});
export default Feed;
