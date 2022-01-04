import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import PostListComponent from './PostListComponent';

  function ListOfPosts(props) {
    const [posts, setPosts] = useState(props.posts);
    const isProfile = props.isProfile;
    console.log("MYYYY POSTS : " + props.posts)
    const [refreshing, setRefreshing] = React.useState(false);
    const deletePostFromState = (postID) => {  // should be transfered to  profile 
        let newData = [...posts];
        newData = newData.filter(function (el) { return el.post_id != postID; });
        setPosts(newData);
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    //get here
    setRefreshing(false)

  }, [refreshing]);
  return (
      <SafeAreaView style={{flex:1}}>
        <FlatList
          data={posts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.post_id}

          renderItem={({ item }) => {
            item.deletePostFromState = deletePostFromState;
            return (
              <PostListComponent item={item}  isProfile={isProfile}/>
            )
          }} />
      </SafeAreaView>
  );
}

export default ListOfPosts;
