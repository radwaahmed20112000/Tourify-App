import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Dimensions, Text } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';

function TagsList({setTags, tags, setDeletedTags, deletedTags, edit}) {
    const theme = useContext(ThemeContext);
    const [isDialogVisible, setVisible] = useState(false);
    const [tagsList, setTagsList] = useState([ "Historical", "Beach", "Fun", "Romantic", "Relaxation",
    "Camping", "Volunteer", "Road", "Custom" ]);

    const [state, setState] = useState({refresh:true})

    useEffect(() => {
        if(edit){
            tagsList = tagsList.filter(function(val) {
                return tags.indexOf(val) == -1;
            });
            setTagsList(tagsList)
        }
    },[])

    const chooseTag = (tag) => {
        if(tag == 'Custom') {
            setVisible(true)
            return
        }
        const index = tags.indexOf(tag)
        if(index > -1) {
            tags.splice(index, 1);
            if(edit) deletedTags.push(tag)
        }
        else 
            tags.push(tag)
        setTags(tags)
        setDeletedTags(deletedTags)
        setState({ refresh: ! state.refresh }) 
    };
    
    return (
        <SafeAreaView style={{marginBottom:SCREEN_WIDTH*0.02}}>
        <Collapse>
            <CollapseHeader >
                <View style={{borderBottomWidth:0.5, width:SCREEN_WIDTH*0.3, borderBottomColor:theme.SecondaryPurple,}}>
                    <Text style={{fontSize:RFValue(15), color:theme.Text, textAlign:"left"}}>Tags</Text>
                </View>
            </CollapseHeader>
            <CollapseBody>
                <FlatList
                    extraData={state.refresh}
                    data={tagsList}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    numColumns={5}
                    initialNumToRender={27}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{justifyContent:"space-between", alignItems:"center"}}
                    renderItem={({ item, index}) => {
                        return(
                            <TouchableOpacity 
                                onPress={() => chooseTag(item)}
                                style={[styles.container, 
                                    {backgroundColor:tags.indexOf(item) > -1? '#d6d4ce':'white', marginRight:SCREEN_WIDTH*0.01}]}>
                                <Text style={{fontSize:RFValue(14),}}>{ item}</Text>
                            </TouchableOpacity> 
                        )
                    }}
                />  
            </CollapseBody>
        </Collapse>
        <DialogInput 
            isDialogVisible={isDialogVisible}
            title={"Custom Tag"}
            message={"What kind of trips did you have?"}
            hintInput ={"Tag"}
            submitInput={ (inputText) => {
                tagsList.splice(tagsList.length - 1, 0, inputText);
                setTagsList(tagsList)
                tags.push(inputText)
                setTags(tags)
                setState({ refresh: ! state.refresh }) 
                setVisible(false)
            } }
            closeDialog={ () => {setVisible(false)}}>
        </DialogInput>
        </SafeAreaView>
        
    );  

}
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