import React, { useContext, useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../Context/TokenContext';
import ListOfPosts from '../Components/Shared/ListOfPosts';
import {getFeedPosts} from '../API/PostListAPI';
import { normalize } from '../util/FontNormalization';

function Feed({navigation}) {
  const token = useContext(TokenContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(async () => {
    const data = await getFeedPosts(token);
    if(data !== false)
    {
      setPosts(data);
      setLoading(false);
    }
    else
      setMessage("An error occurred, check your network..");
  }, []);

  if(loading)
  {
    return(
      <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
      {message? <Text style={{color:"#999999", fontSize:normalize(17)}}>{message}</Text>
      :<ActivityIndicator size={50} color="#999999" animating={true} />
      }
      </View>
    )
  }else{
    return (
        <SafeAreaView style={styles.container}>
        {posts? <ListOfPosts posts={posts} isProfile ={false}></ListOfPosts> : null}
        </SafeAreaView>
    );
  }
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
