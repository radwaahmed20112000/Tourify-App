
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
    var newTags = [];
    for (const [key, value] of Object.entries(tags)) {
        console.log(`${key}: ${value}`);
        if (value){
            newTags.push(key)
        }
    }
    var body = JSON.stringify({
        user: "radwa", //TODO
        description: description,
        tags: newTags,
        photos: photos,  //TODO
        organisation : organisation,
        rate: rate,
        duration: duration,
        budget: budget + currency,
        latitude: latitude, //TODO
        longitude: longitude //TODO
    })
    console.log(body)
    fetch(ipAddress+'/posts/TripCreation', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }).then((res)=>console.log(JSON.stringify(res)));
}

