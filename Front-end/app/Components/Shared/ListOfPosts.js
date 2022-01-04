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


function ListPfPosts(props) {
    const [posts, setPosts] = useState([]);
    const deletePostFromState = (postID) => {  // should be transfered to  profile 
        let newData = [...posts];
        newData = newData.filter(function (el) { return el.post_id != postID; });
        setPosts(newData);
    }


  return (
        <FlatList
          data={posts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.post_id}

          renderItem={({ item }) => {
            item.deletePostFromState = deletePostFromState;
            return (
              <PostListComponent item={item} />
            )
          }} />
  );
}

export default ListPfPosts;
