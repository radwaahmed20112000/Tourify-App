let API_URL = "http://192.168.1.9:8000/account";
const signInRequest = async (email, password, googleBool) => {
    let payload = { email: email, password: password, google: googleBool };
    try {
        let response = await fetch(API_URL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        if (response.status === 200) {
            let data = await response.json();
            return { successful: true, userToken: data.token };
        }
        else {
            let message = "";
            if (response.status === 404)
                message = "You're not signed up!";
            else if (response.status === 401)
                message = "Wrong Password!";
            else
                message = "An error occurred, check your network..";
            return { successful: false, message: message };
        }
    } catch (error) {
        return { successful: false, message: "An error occurred, check your network.." };
    };
}
const signUpRequest = async (email, name, password, country, photo, googleBool) => {
    let payload = { email: email, name: name, password: password, country: country, photo: photo, google: googleBool };
    try {
        let response = await fetch(API_URL + "/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (response.status === 200) {
            let data = await response.json();
            return { successful: true, userToken: data.token };
        }
        else {
            let message = "";
            if (response.status === 409)
                message = "You're already signed up!";
            else
                message = "An error occurred, check your network..";
            return { successful: false, message: message };
        }
    } catch (error) {
        console.log(error);
        return { successful: false, message: "An error occurred, check your network.." };
    };
}
export { signInRequest, signUpRequest }