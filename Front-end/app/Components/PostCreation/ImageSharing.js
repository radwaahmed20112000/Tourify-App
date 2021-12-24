import React, { useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../Context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";


const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function ImageSharing({setPhotos}) {
    const [selectedImages, setSelectedImages] = React.useState([]);
    const theme = useContext(ThemeContext);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
            return;
        }
    
        setSelectedImages(selectedImages.concat({ localUri: pickerResult.uri }));
        setPhotos(selectedImages);
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                <LinearGradient
                    colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}>
                    <FontAwesomeIcon icon={faCamera} size={ RFValue(18) }  color="white"  style={{color:theme.SecondaryPurple }}/>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"black"
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width:RFValue(SCREEN_WIDTH*0.15),
        height:RFValue(40),
        borderRadius: RFValue(40),
    },
  });
export default ImageSharing;