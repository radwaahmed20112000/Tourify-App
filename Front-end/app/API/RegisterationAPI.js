let API_URL = "url";
const signInRequest = async(email, password)=>{
    let payload = {email, password};
    let response = await fetch(API_URL+"/signIn", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    let data = await response.json();
    if(response.status === 200)
    {
        return {successful: true, userToken: data.token};
    }
    else{
        let message = "";
        if(response.status === 404)
            message = "Wrong Email";
        else if(response.status === 401)
            message= "Wrong Password";
        else
            message = "An error occured, please try again";
        return {successful: false, message: message};
    }
}
const signUpRequest = async(email, userName, password, country)=>{
    let payload = {email, userName, password, country};
    let response = await fetch(API_URL+"/signUp", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    let data = await response.json();
    if(response.status === 200)
    {
        return {successful: true, userToken: data.token};
    }
    else{
        let message = "";
        if(response.status === 409)
            message = "Email already exists";
        else if(response.status === 400)
            message= "Enter email and password";
        else
            message = "An error occured, please try again";
        return {successful: false, message: message};
    }
}
export {signInRequest, signUpRequest}