import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AirbnbRating } from 'react-native-ratings';
import { ThemeContext } from '../Context/ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { TokenContext } from '../Context/TokenContext';
import TagsList from '../Components/PostCreation/TagsList';
import ImageSharing from '../Components/PostCreation/ImageSharing';
import BudgetInput from '../Components/PostCreation/BudgetInput';
import PhotosList from '../Components/PostCreation/PhotosList';
import axios from 'axios';


const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PostCreation({ navigation, edit, postId, latitude, longitude }) {
    const ipAddress = "http://192.168.1.7:19000";
    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);
    const [description, onChangeText] = useState('');
    const [tags, setTags] = useState([]);
    const [deletedTags, setDeletedTags] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [organisation, setOrganisation] = useState('');
    const [rate, setRate] = useState(3);
    const [duration, setDuration] = useState();
    const [budget, setBudget] = useState();
    const [currency, setCurrancy] = useState('');
    const newTags = (newTags) => setTags(newTags)
    const newPhotos = (newPhotos) => setPhotos(newPhotos)     
    const [onProcessing, setProcessing] = useState(false);


    useEffect(() => {
        if (latitude != null && longitude != null) {
            setLongitude(params.longitude)
            setLatitude(params.latitude)
        }
        if (edit) {
            axios({
                method: 'get',
                url: `${ipAddress}/post/${postId}`,
            }).then((response) => {
                console.log(response.data);
                const data = response.data
                onChangeText(data.description)
                setTags(data.tags)
                setPhotos(data.photos)
                setOrganisation(data.organisation)
                setRate(data.rate)
                setDuration(data.duration)
                setBudget(data.budget)
                setCurrancy(data.currency)
                setLatitude(data.latitude)
                setLongitude(data.longitude)
            });
        }
    });

    const createPost = () => {
        if (description === '' || duration === '' || budget === 0) {
            Alert.alert(
                "Be Careful",
                "You should Enter all required fields!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        var url = "";
        setProcessing(true)
        var body = JSON.stringify({
            email: token,
            body: description,
            tags: tags,
            photos: photos,
            organisation: organisation,
            rate: rate,
            duration: duration,
            budget: budget,
            currency: currency,
            latitude: latitude,
            longitude: longitude
        })
        if(edit){
            body['deletedTags'] = deletedTags
            body['deletedPhotos'] = deletedPhotos
            url = 'Edit'
        } else 
            url = 'TripCreation'
        fetch(ipAddress + '/posts/' + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then((res) => {
            console.log(JSON.stringify(res.post_id))
            setProcessing(false)
            navigation.navigate("Feed")
        });
    }

    const goToMaps = () => {
        navigation.navigate('Map')
    }
    const goBack = () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to discart your changes?",
            [
                { text: "Yes", onPress: () => navigation.navigate("Feed") },
                { text: "Continue", onPress: () => console.log("Continue") }
            ]
        );
    }

    return (
        <SafeAreaView style={[{backgroundColor: theme.primary}, styles.container]}>
            <View style={[styles.upperSection, {borderColor:theme.SecondaryPurple}]}>
                <TouchableOpacity onPress={() => goBack()} >
                    <FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) }  color={theme.SecondaryPurple}  style={{marginRight :SCREEN_WIDTH*0.68, marginTop : SCREEN_WIDTH*0.028 }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createPost()}>
                    <LinearGradient
                        colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        {!onProcessing && <Text style={{color:"white"}}> {edit?"Edit":"Share"}</Text>}
                        {onProcessing && <ActivityIndicator size="small" color="white" />}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
                <TextInput
                    value={description}
                    style={[{ borderColor: theme.SecondaryPurple }, styles.description]}
                    onChangeText={text => onChangeText(text)}
                    placeholder="How was your trip?"
                    multiline={true}
                />
                <View style={{ flexDirection: "row" }}>
                    <AirbnbRating
                        defaultRating={rate}
                        type='star'
                        ratingCount={5}
                        showRating={false}
                        size={RFValue(20)}
                        reviewSize={RFValue(20)}
                        selectedColor={theme.SecondaryPurple}
                        reviewColor={theme.SecondaryPurple}
                        imageSize={RFValue(2)}
                        onFinishRating={rate => setRate(rate)}
                    />
                    <ImageSharing setPhotos={newPhotos} photos={photos}></ImageSharing>
                    <TouchableOpacity style={{ marginLeft: SCREEN_WIDTH * 0.01, marginTop: SCREEN_HEIGHT * 0.008 }} onPress={goToMaps}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={SCREEN_WIDTH * 0.07} color={theme.SecondaryPurple}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <TagsList setTags={newTags} tags ={tags} setDeletedTags={setDeletedTags} deletedTags ={deletedTags}></TagsList>
                <PhotosList setPhotos={setPhotos} photos={photos} setDeletedPhotos={setDeletedPhotos} deletedPhotos={deletedPhotos}></PhotosList>
                <BudgetInput setBudget={setBudget} budget={budget} setCurrancy={setCurrancy} currency={currency}></BudgetInput>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        value={duration}
                        onChangeText={text => setDuration(text)}
                        placeholder="Number of Days"
                        keyboardType='numeric'
                        style={{ fontSize: RFValue(16) }}
                    />
                    <TextInput
                        value={organisation}
                        onChangeText={text => setOrganisation(text)}
                        placeholder="Organisation"
                        style={{ marginLeft: SCREEN_WIDTH * 0.3, fontSize: RFValue(16) }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: SCREEN_WIDTH * 0.1
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_HEIGHT * 0.048,
        borderRadius: SCREEN_WIDTH * 0.1,
    },
    upperSection: {
        flexDirection: 'row',
        paddingRight: SCREEN_WIDTH * 0.05,
        paddingLeft: SCREEN_WIDTH * 0.06,
        paddingBottom: SCREEN_HEIGHT * 0.03,
        paddingTop: SCREEN_HEIGHT * 0.015,
        width: SCREEN_WIDTH,
    },
    description: {
        height: SCREEN_HEIGHT * 0.3,
        width: SCREEN_WIDTH * 0.9,
        fontSize: RFValue(18),
        borderBottomWidth: 0.3,
        textAlign: "left",
        textAlignVertical: 'top'
    },
});
export default PostCreation;