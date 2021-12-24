import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemeContext } from '../Context/ThemeContext';
import { normalize, width } from '../util/FontNormalization';
import PostListComponent from '../Components/Shared/PostListComponent';

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function Feed(props) {
  const theme = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [onProcessing, setProcessing] = useState(true);
  const url = "http://localhost:3306/"
  const { error, onProgress, data } = useFetch(url + 'feed/');
  useEffect(() => {
    setProcessing(onProgress);
    setPosts(data);
  });
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
    <View style={styles.container}>
      <FlatList>
        data={posts}
        removeClippedSubviews={true}
        initialNumToRender={27}
        windowSize={41}
        contentContainerStyle={{ justifyContent: "center", alignItems: "center", paddingLeft: "6%", paddingRight: "6%", paddingBottom: Platform.OS == "android" ? BOTTOM_HEIGHT * 2.7 : 0 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem ={({ item, index }) => {
          return (
            item.show ? <PostListComponent item={item} />
              : <View style={{ height: 0, width: 0 }}></View>
          )
        }}
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
