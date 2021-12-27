import React, { useContext, useState } from 'react';
import { View, StyleSheet, Button, FlatList, SafeAreaView, Dimensions, Text } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

function TagsList({setTags}) {
    const theme = useContext(ThemeContext);
    const tags = [ "Historical", "Beach", "Fun", "Romantic", "Relaxation",
    "Camping", "Volunteer", "Road", "Custom" ];
    var choosenTags = {"Historical":false, "Beach":false, "Fun":false, "Romantic":false, "Relaxation":false,
    "Camping":false, "Volunteer":false, "Road":false, "Custom":false };
    const [state, setState] = useState({refresh:true})

  
    const chooseTag = (tag) => {
        if(!choosenTags[tag])
            choosenTags[tag] = true
        else 
            choosenTags[tag] = false
        setTags(choosenTags)
        if(tag == 'Custom') {} //TODO
        setState({ refresh: ! state.refresh })
    };
    
    return (
        <SafeAreaView >
        <Collapse>
            <CollapseHeader >
                <View style={{borderBottomWidth:0.5, width:SCREEN_WIDTH*0.3, borderBottomColor:theme.SecondaryPurple,}}>
                    <Text style={{fontSize:RFValue(15), color:theme.Text, textAlign:"left"}}>Tags</Text>
                </View>
            </CollapseHeader>
            <CollapseBody>
                <FlatList
                    extraData={state.refresh}
                    data={tags}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    numColumns={4}
                    initialNumToRender={27}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => {
                        return(
                            <TouchableOpacity 
                                onPress={() => chooseTag(item)}
                                style={[styles.container, 
                                    {backgroundColor:choosenTags[item]? "black":"white"}]}                                
                            >
                                <Text style={{fontSize:RFValue(14),}}>{ item}</Text>
                            </TouchableOpacity> 
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
        borderRadius: SCREEN_WIDTH*0.1,
        padding:SCREEN_WIDTH*0.015,
        borderColor:"white",
    }
})

export default TagsList;