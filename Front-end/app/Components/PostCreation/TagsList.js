import React from 'react';
import { View, StyleSheet, Button, FlatList, SafeAreaView, Dimensions, Text } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';


function TagsList({setTags}) {
    const tags = [ "Historical", "Beach", "Fun", "Romantic", "Relaxation",
    "Camping", "Volunteer", "Road", "Custom" ];
    var choosenTags = {"Historical":false, "Beach":false, "Fun":false, "Romantic":false, "Relaxation":false,
    "Camping":false, "Volunteer":false, "Road":false, "Custom":false };

  
    const chooseTag = (tag) => {
        if(!choosenTags[tag])
            choosenTags[tag] = true
        else 
            choosenTags[tag] = false
        setTags(choosenTags)
        if(tag == 'Custom') {} //TODO
    };
    
    return (
        <SafeAreaView >
        <Collapse>
            <CollapseHeader>
                <View>
                    <Text>Tags</Text>
                </View>
            </CollapseHeader>
            <CollapseBody >
                <FlatList
                    data={tags}
                    // style={{alignItems:"center" }}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    numColumns={4}
                    initialNumToRender={27}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => {
                        return(
                            <Button 
                                style={[styles.container, 
                                {backgroundColor:choosenTags[item]? 'rgba(235, 235, 235, 0.2)':'rgba(232, 232, 232, 1)'}]}
                                onPress={() => chooseTag(item)} 
                                title={item}
                            /> 
                        )
                    }}
                />  
            </CollapseBody>
        </Collapse>
        </SafeAreaView>
    );  

}
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const styles = StyleSheet.create({
    container:{
        borderWidth: 0.3,
        borderRadius: 50,
        borderColor:"white",
    }
})

export default TagsList;