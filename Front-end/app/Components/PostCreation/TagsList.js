import React, { useState, Component } from 'react';
import { View, StyleSheet, Button, FlatList, SafeAreaView, Dimensions  } from 'react-native';
import {ExpandableListView} from 'react-native-expandable-listview';


function TagsList(props) {
    const [color, setColor] = useState(true);


    const tags = [ "Historical", "Beach", "Fun", "Romantic", "Relaxation",
    "Camping", "Volunteer", "Road", "Custom" ];
    var choosenTags = {"Historical":false, "Beach":false, "Fun":false, "Romantic":false, "Relaxation":false,
    "Camping":false, "Volunteer":false, "Road":false, "Custom":false };

    function handleItemClick({index}) {
      console.log(index);
    };
  
    const chooseTag = (tag) => {
        if(!choosenTags[tag]){
            choosenTags[tag] = true
            setColor(false)
        }
        else {
            choosenTags[tag] = false
            setColor(true)
        }
        if(tag == 'Custom') {} //TODO
    };
    const CONTENT = [
        {
            id: '0',
            categoryName: 'Tags',
            subCategory: [
            {
                customInnerItem: (
                    <FlatList
                        data={tags}
                        style={{alignItems:"center", }}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        numColumns={4}
                        legacyImplementation={false}
                        initialNumToRender={27}
                        windowSize={41}
                        removeClippedSubviews={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index}) => {
                            return(
                                <Button style={styles.container} onPress={() => chooseTag(item)} title={item}> 
                                </Button>  
                            )
                        }}
                    />             
                ),
                id: '1',
                name: '',
            },
            ],
        },  
    ];

    
    return (
        <SafeAreaView >
        <ExpandableListView
            data={CONTENT} 
            innerItemContainerStyle={styles.container}
            onItemClick={handleItemClick}
        />
        </SafeAreaView>
    );  

}
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const styles = StyleSheet.create({
    container:{
        borderWidth: 0.3,
        borderRadius: 2,
        borderColor:"white",
        backgroundColor: "white",
        // rgba(232, 232, 232, 0.2)
    }
})

export default TagsList;