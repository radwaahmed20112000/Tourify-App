import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function ImageSharing() {
    const [selectedImage, setSelectedImage] = React.useState(null);

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
    
        setSelectedImage({ localUri: pickerResult.uri });
    };
  
    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
            <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
            />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    /* Other styles hidden to keep the example brief... */
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  });
export default ImageSharing;