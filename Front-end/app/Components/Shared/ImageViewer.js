import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';

export default function ImageViewer(props) {   /// images  as props   
    const [images, setImages] = useState([]);
    const [topImgs, setTopImgs] = useState([]);
    const [bottomImgs, setBottomImgs] = useState([]);
    const [extraImgs, setExtra] = useState(0);
    const [visible, setIsVisible] = useState(false);
    const [openInd, setOpenInd] = useState(0);
    // images = [
    //     {
    //         uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    //     },
    //     {
    //         uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    //     },
    //     {
    //         uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e2a4ad97f50001314f56/large.jpg'
    //     },
    //     {
    //         uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e34cad97f50001314f70/large.jpg'
    //     },
    //     {
    //         uri: 'https://d3i4lqsaxjar6n.cloudfront.net/post_images/61958e4b490a7c0003244ab4/large.jpg'
    //     }

    // ]



    useEffect(() => {
        let xx = props.images ? props.images : [];
        console.log(images)

        setImages(xx);
        let x = images.length;
        setExtra(0);
        if (x == 1) {
            setTopImgs([xx[0]]);
            setBottomImgs([])
        }
        else if (x == 2) {
            setTopImgs([images[0]]);
            setBottomImgs([images[1]])
        }
        else if (x == 3) {
            setTopImgs([images[0]]);
            setBottomImgs([images[1], images[2]])
        }
        else if (x == 4) {
            setTopImgs([images[0], images[1]]);
            setBottomImgs([images[2], images[3]])
        }
        else if (x == 5) {
            setTopImgs([xx[0], xx[1]]);
            setBottomImgs([xx[2], xx[3], xx[4]])
            setExtra(0);

        }
        else if (x > 5) {
            setTopImgs([xx[0], xx[1]]);
            setBottomImgs([xx[2], xx[3]])
            setExtra(x - 4);
        }
        else {
            setExtra(0);
        }




    }, [props])

    // const renderImages= ()=>{
    //   let no = images.lenght;
    //     switch(no){
    //       case 1 :
    //           return(
    //               <Image style={{ flex: 1, margin: 2 }} source={{ uri: 'https://d2dnvwecfdx5as.cloudfront.net/post_images/61c2e2a4ad97f50001314f56/large.jpg' }}></Image>                
    //           )
    //       case 2 :   

    //   }
    // }
    const openImg = (ind) => {
        setOpenInd(ind)
        setIsVisible(true)
    }


    return (
        <View style={styles.container}>
            <ImageView
                images={images}
                imageIndex={openInd}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            {
                topImgs.length ?
                    <View style={styles.row} >
                        {topImgs.map((e, ind) => {
                            return <TouchableOpacity style={{ flex: 1, margin: 2 }} key={ind} onPress={() => { openImg(ind) }}>
                                <Image style={{ flex: 1 }} source={{ uri: e.uri }}></Image>
                            </TouchableOpacity>
                        })}
                    </View  >

                    : null
            }

            {
                bottomImgs.length ?
                    <View style={styles.row} >
                        {bottomImgs.map((e, ind) => {
                            return <TouchableOpacity style={{ flex: 1, margin: 2 }} key={ind} onPress={() => { openImg(ind + topImgs.length) }}>
                                <Image style={{ flex: 1 }} source={{ uri: e.uri }}></Image>
                            </TouchableOpacity>

                        })}
                        {extraImgs > 0 ?
                            <TouchableOpacity key={bottomImgs.length + topImgs.length} style={styles.extra} onPress={() => { openImg(bottomImgs.length + topImgs.length) }}>
                                <Text style={styles.num} > +{extraImgs}</Text>
                            </TouchableOpacity>

                            : null}
                    </View  >

                    : null
            }



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e6f7fd',
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
    }
});