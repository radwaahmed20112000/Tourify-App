import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Dimensions, FlatList, SafeAreaView, View } from 'react-native';
// import useFetch from '../api/useFetch';

import { ThemeContext } from '../Context/ThemeContext';
import PostListComponent from '../Components/Shared/PostListComponent';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../Context/TokenContext';
import IPAdress from '../API/IPAdress';
import ListOfPosts from '../Components/Shared/ListOfPosts';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const WINDOW_HEIGHT = Dimensions.get('window').height;


function Feed({navigation}) {
  const token = useContext(TokenContext);
  const url = IPAdress + "posts/feed"
  const theme = useContext(ThemeContext);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    useFetch();
  }, []);

  const useFetch = () => {
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
        setPosts(json)
        console.log("ALOO" + json);
      })
      .catch(err => {
        console.log(err)
      });
  }

  // useFetch(url);


  // useEffect(() => { 
  //   // setProcessing(onProgress);
  //   setPosts(data);
  // });

  return (
      <SafeAreaView style={styles.container}>
       {posts? <ListOfPosts posts={posts} navigation={navigation} isProfile ={false}></ListOfPosts> : null}
      </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(50)
  }
});
export default Feed;
