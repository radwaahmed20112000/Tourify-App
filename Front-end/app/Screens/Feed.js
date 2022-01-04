import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Dimensions, FlatList, SafeAreaView, View } from 'react-native';
// import useFetch from '../api/useFetch';

import { ThemeContext } from '../Context/ThemeContext';
import PostListComponent from '../Components/Shared/PostListComponent';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../Context/TokenContext';
import IPAdress from '../API/IPAdress';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const WINDOW_HEIGHT = Dimensions.get('window').height;


function Feed({navigation}) {
  const token = useContext(TokenContext);
  const url = IPAdress + "posts/feed"
  const theme = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    useFetch()
    setRefreshing(false)

  }, [refreshing]);


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

  const deletePostFromState = (postID) => {  // should be transfered to  profile 
    let newData = [...posts];
    newData = newData.filter(function (el) { return el.post_id != postID; });
    setPosts(newData);

  }

  // useFetch(url);


  // useEffect(() => { 
  //   // setProcessing(onProgress);
  //   setPosts(data);
  // });

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          // removeClippedSubviews={true}
          // initialNumToRender={27}
          // windowSize={41}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.post_id}
          renderItem={({ item }) => {
            item.deletePostFromState = deletePostFromState;
            return (
              <PostListComponent item={item} navigation={navigation} />
            )
          }} />

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
