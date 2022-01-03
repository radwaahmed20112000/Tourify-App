import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { faTimes  } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PhotosList({photos, setPhotos}) {
    const theme = useContext(ThemeContext);
    const [state, setState] = useState({refresh:true})

    const deletePhoto = (index) => {
        photos.splice(index, 1)
        setPhotos(photos)
        setState({ refresh: ! state.refresh })
    }
    return (
        <View>
        {photos.length > 0 && 
            <Collapse>
            <CollapseHeader>
                <View style={{borderBottomWidth:0.5, width:SCREEN_WIDTH*0.3, borderBottomColor:theme.SecondaryPurple,}}>
                    <Text style={{fontSize:RFValue(15), color:theme.Text, textAlign:"left"}}>Photos</Text>
                </View>
            </CollapseHeader>
            <CollapseBody >
                <FlatList
                    data={photos}
                    extraData={state.refresh}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    initialNumToRender={27}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => {
                        return(
                            <View style={{flexDirection:"row",alignItems:"flex-start"}}>
                                <Image
                                    source= {{uri :item.localUri}}
                                    style={styles.avatar}
                                    resizeMethod="scale"
                                />   
                                <TouchableOpacity style={[{backgroundColor: theme.SecondaryPurple},styles.upload]} onPress={() => deletePhoto(index)}>
                                    <FontAwesomeIcon icon={faTimes} size={ RFValue(8) }  color="white" ></FontAwesomeIcon>
                                </TouchableOpacity>
                            </View>                    
                        )
                    }}
                />  
            </CollapseBody>
            </Collapse>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    avatar:{
        width: SCREEN_WIDTH*0.2,
        height: SCREEN_WIDTH*0.2,
        borderWidth: 2,
        marginTop:SCREEN_WIDTH*0.02,
        marginLeft:SCREEN_WIDTH*0.02
    },
    upload: {
        width: SCREEN_WIDTH*0.05,
        height: SCREEN_WIDTH*0.05,
        borderRadius: SCREEN_WIDTH*0.05,
        alignItems: "center",
        justifyContent:"center",
        marginLeft:-SCREEN_WIDTH*0.02,
        flexDirection:"row"
    },
})
export default PhotosList;