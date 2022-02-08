import React, { useContext,useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, RefreshControl, Dimensions,FlatList,TouchableOpacity, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';
import Comment from '../PostView/Comment';
import { ThemeContext } from '../../Context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device widthmport { ThemeContext } from '../../Context/ThemeContext';

export default function ImageViewer(props) {   /// images  as props   
    const [commentList, setComments] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9}]);
    const [refreshing, setRefreshing] = React.useState(false);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        console.log(props.route.params)
    }, [])

    const commentOnPost = ()=>{

    }
    const likePost = ()=>{
        console.log("dd")

    }
    const viewLikes =()=>{
        
    }

   let photos =null
    return (
     <View style={styles.maincontainer}>
        {/* <ScrollView  style={{flex:1}}> */}

            {/* {
                    commentList && commentList.map((item,i)=>{
                       return  <Comment key={i}  comment ={item} />
                    })

            } */}
            {/* <View style={styles.comments}>
     
        </View> */}
{/* 
        </View> */}

        {/* </ScrollView> */}
            <FlatList
                data={commentList}
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.07 }}
                // refreshControl={

                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
                keyExtractor={(item) => item.post_id}
                ListHeaderComponent={() => {
                    return <View key= {-1} style={styles.container}>

                        <View style={styles.user}>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'center'

                            }} >
                                <TouchableOpacity onPress={() => navigateToProfile(email)}>

                                    <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://avatars.githubusercontent.com/u/61039282?s=40&v=4' }} style={styles.userImage} imageStyle={{
                                        borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                                        borderWidth: 0.25
                                    }}></ImageBackground>
                                </TouchableOpacity>

                                <View style={{ paddingLeft: RFValue(10), justifyContent: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text }}>{'ali ahmed'}</Text>

                                    {/* TODO add time stamp */}
                                    <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{'1m'}</Text>
                                </View>
                            </View>



                        </View>


                        <TouchableOpacity onPress={() => navigateToPost(post_id)}>
                            <SafeAreaView style={styles.postDescription}>
                                <Text style={{ textAlign: 'left', fontSize: RFValue(12), color: theme.PrimaryColor }}>{ }{'Reprehenderit ipsum officia anim exercitation anim adipisicing reprehenderit exercitation esse tempor Lorem tempor dolore voluptate.'}</Text>
                            </SafeAreaView>
                        </TouchableOpacity>
                        <View style={photos && photos.length ? { height: RFValue(300), width: "100%", paddingVertical: RFValue(10) } : { height: RFValue(100), width: "100%", paddingVertical: RFValue(10) }}>
                            {photos && photos.length ?
                                <ImageViewer images={photos}  ></ImageViewer>
                                :
                                null}
                        </View>
                        <View style={styles.counts}>
                            <TouchableOpacity onPress={() => viewLikes()}>
                            <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>122 likes</Text> 
                            </TouchableOpacity> 
                            <View style={{  flex:1 , alignItems:"flex-end" , paddingRight:RFValue(32)}}>                        
                                <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>1233 comments</Text>  
                            </View>                     
                         </View>
                        <View style={styles.postFooter}>
                            <View style={styles.like}> 
                                <TouchableOpacity onPress={() => likePost()}>
                                <AntDesign name="like2" size={22} color="grey" />
                                <Text>like</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.com}> 
                                <TouchableOpacity onPress={() => commentOnPost()}>
                                <EvilIcons style={{marginLeft:RFValue(9)}}  name="comment" size={26} color="grey" />              
                                <Text>comment</Text>
                                </TouchableOpacity>

                                </View>

                        </View>

                    </View>
                }
                
        
            
            
                }
                renderItem={({ item }) => {
                    return (
                        <Comment key={item.id} />
                    )
                }} />
     </View >



    
    );
}

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        display: 'flex',
        alignItems:'flex-start',
        paddingVertical:12,
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',
      
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    c: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'

    },
    extra: {
        alignItems: 'center',
        flex: 1,
        margin: 2,
        backgroundColor: "#696969"
    },
    num: {
        position: 'absolute',
        top: '40%',
        fontSize: 29,
        fontWeight: 'bold',
        color: "#fff"
    },
    container: {
      paddingTop:RFValue(22),
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
       paddingHorizontal:RFValue(12),
       marginRight:RFValue(33)  , 
        elevation: 5,
        maxHeight:0.5*SCREEN_HEIGHT
    },

    user: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(10),
        width: SCREEN_WIDTH,
        paddingHorizontal: RFValue(10)
    },
    userImage: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
    },
    postDescription: {
        flexDirection: 'row',
        paddingTop: RFValue(8),
        width: SCREEN_WIDTH * 0.98,
        paddingLeft: RFValue(10),
         paddingRight: RFValue(10)
    },
    postFooter:{
        display:'flex',
        flexDirection:'row'
    },
    like :{
        flex: 1,
        borderTopWidth: RFValue(1),
        borderBottomWidth: RFValue(0),
        borderWidth: RFValue(1),
        borderColor: 'rgba(226, 226, 226, 1)',
        alignItems: 'center',
        paddingVertical: RFValue(7),
        borderRightWidth:0,
        borderLeftWidth:0,
        display:'flex',
    },
    com:{
        flex:1,
        borderTopWidth:RFValue(1),
        borderBottomWidth: RFValue(0),

        borderColor:'rgba(226, 226, 226, 1)',
        alignItems:'center',
        paddingVertical:RFValue(7)


    },
    counts:{
        display:"flex",
        flexDirection:"row",
        alignContent:"space-between",
        justifyContent: 'space-between',
        margin:RFValue(6)
    }

});