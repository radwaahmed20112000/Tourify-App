import IPAdress from '../API/IPAdress';
const URL = IPAdress+ "profile/";
const getUserProfile = async (token)=>{
    const urls = [URL + "userProfile", URL + "profilePosts"]
    const data = await Promise.all(urls.map(async url => {
            const resp = await fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token
                },
            }).catch((err)=>{return false});
            if(resp.status == 200) return resp.json();
            else return false;
        }
    )).catch((err)=>{
        return{successful: false, message:"Error ocurred, check your network.."}
    });
    if(data[0] == false || data[1] == false)
        return{successful: false, message:"Error ocurred, check your network.."}
    else return {successful: true, userInfo:data[0], userPosts:data[1]};
}
const updateCountry = async(token, country)=>{
    try{
        let response = await fetch(URL + "/updateCountry", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(country)
        })
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }catch(error){
        return false;
    };
}
const updateBio = async(token, bio)=>{
    try{
        let response = await fetch(URL + "/updateBio", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(bio)
        })
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }catch(error){
        return false;
    };
}
    
// data : [{user info},[array of posts]]
export { getUserProfile, updateCountry, updateBio}