import React from 'react';
import { View } from 'react-native';
import PostCreation from '../PostCreation';

function Create(props) {

    const createPost = () => {
        if(description === '' || duration === '' || budget === 0 ) {
            Alert.alert(
                "Be Careful",
                "You should Enter all required fields!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        setProcessing(true)
        var body = JSON.stringify({
            email: token, 
            body: description,
            tags: tags,
            photos: photos,  
            organisation : organisation,
            rate: rate,
            duration: duration,
            budget: budget,
            currency: currency,
            latitude: latitude, 
            longitude: longitude 
        })
        console.log(body)
        fetch(ipAddress + '/posts/TripCreation', {
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
    return (
        <View>
            <PostCreation></PostCreation>
        </View>
    );
}

export default Create;