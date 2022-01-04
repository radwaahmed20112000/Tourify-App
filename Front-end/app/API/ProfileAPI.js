import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import IPAdress from '../API/IPAdress';
import PickImage from '../Service/PickImage';

const updatePhoto = async (token) => {
    const photo = PickImage()
    try {
        let response = await fetch(IPAdress + "account/updatePhoto", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ photo: photo })
        })
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    };
}

const getUserProfile = async (token) => {
    const urls = [IPAdress + "account/userProfile", IPAdress + "posts/profilePosts"]
    const data = await Promise.all(urls.map(async url => {
        const resp = await fetch(url,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }).catch((err) => { return false });
        if (resp.status == 200) return resp.json();
        else return false;
    }
    )).catch((err) => {
        return { successful: false, message: "Error ocurred, check your network.." }
    });
    if (data[0] && data[1])
        return { successful: true, userInfo: data[0], userPosts: data[1] };
    else return { successful: false, message: "Error ocurred, check your network.." };
}
const updateCountry = async (token, country) => {
    try {
        let response = await fetch(IPAdress + "account/updateCountry", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ country: country })
        })
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    };
}
const updateBio = async (token, bio) => {
    try {
        let response = await fetch(IPAdress + "account/updateBio", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ bio: bio })
        })
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    };
}

// data : [{user info},[array of posts]]
export { getUserProfile, updateCountry, updateBio, updatePhoto }