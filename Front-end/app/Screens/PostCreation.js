import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { AirbnbRating } from 'react-native-ratings';
import { ThemeContext } from '../Context/ThemeContext';
import ImagePicker from 'react-native-image-picker';
import TagsList from '../Components/PostCreation/TagsList';
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { NetworkInfo } from "react-native-network-info";

const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PostCreation() {
    const theme = useContext(ThemeContext);
    const [description, onChangeText] = useState('');
    const [tags, setTags] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [organisation, setOrganisation] = useState('');
    const [rate, setRate] = useState(3);
    const [duration, setDuration] = useState('');
    const [budget, setBudget] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    var ipAddress ;
    
    // NetworkInfo.getIPAddress(ip => ipAddress = ip);

    const createPost = () => {
        if(description === '' || duration === '' || budget === 0 ) {
            Alert.alert(
                "Please Enter all required fields!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        var body = JSON.stringify({
            user: token, //TODO
            description: description,
            tags: tags,
            photos: photos,  //TODO
            organisation : organisation,
            rate: rate,
            duration: duration,
            budget: budget,
            latitude: latitude, //TODO
            longitude: longitude //TODO
        })
        console.log(body)
        // fetch(ipAddress+'/TripCreation', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: body
        // }).then((res)=>console.log(JSON.stringify(res)));
    }

    return (
        <SafeAreaView style={[{backgroundColor: theme.primary}, styles.container]}>
            <View style={[styles.upperSection, {borderColor:theme.SecondaryPurple}]}>
                <TouchableOpacity >
                    <FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) }  color={theme.SecondaryPurple}  style={{marginRight :15, marginTop : 8, alignSelf:"flex-end" }}/>
                </TouchableOpacity>
                {/* <Text style={{color: theme.Text, fontSize: RFValue(16)}}>Let's Share Our Tour</Text> */}
                <TouchableOpacity onPress={() => createPost()}>
                    <LinearGradient
                        colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={{color:"white"}}>Share</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
            
            <TextInput
                style={[{borderColor: theme.SecondaryPurple}, styles.description]}
                onChangeText={text => onChangeText(text)}
                placeholder= "How was your trip?"
                value={description}
                multiline={true}
            />
            <TextInput
                onChangeText={text => setBudget(text)}
                placeholder="..$"
            />
            <TextInput
                onChangeText={text => setDuration(text)}
                placeholder="..days"
            />
            <TextInput
                onChangeText={text => setOrganisation(text)}
                placeholder=".."
                
            />
            <AirbnbRating
                type='star'
                ratingCount={5}
                showRating
                size= {RFValue(20)}
                reviewSize= {RFValue(20)}
                selectedColor={theme.SecondaryPurple}
                reviewColor={theme.SecondaryPurple}
                imageSize={RFValue(2)}
                onFinishRating={rate => setRate(rate)}
            />
            {/* <Button title="Add Location" onPress={() => {navigation.navigate("Map",{setLatitude, setLongitude})}}></Button> */}
            {/* <TagsList setTags={setTags}></TagsList> */}
            {/* <ImagePicker setPhotos={setPhotos}></ImagePicker> */}
            {/* <Map initialParams={{ setLatitude: setLatitude, setLongitude:setLongitude }}></Map> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width:RFValue(60),
        height:RFValue(40),
        borderRadius: RFValue(40),
    },
    upperSection : {
        flexDirection : 'row',
        padding : "5%",
        paddingBottom: "5%",
        borderBottomWidth:RFValue(0.5),
        width:SCREEN_WIDTH,
    },
    description: {
        height: RFValue(SCREEN_HEIGHT*0.1), 
        fontSize:RFValue(18),
        borderBottomWidth: 0.3
    }
});
 export default PostCreation;