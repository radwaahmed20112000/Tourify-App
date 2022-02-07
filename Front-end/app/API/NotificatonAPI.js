import IPAdress from './IPAdress';
import { TokenContext } from '../Context/TokenContext';


const markAsRead = async(id) => {
    try {
        let response = await fetch(IPAdress + `notifications/view/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': useContext(TokenContext)
            },
        })
        if (response.status === 200) 
            return true
        return false
    } catch (error) {
        return false
    }
}

const getAllNotifications = async () => {
    console.log("alo")
    try{
        const resp = await fetch(IPAdress + `notifications/`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': useContext(TokenContext) 
            },
        })
        .catch(err => err);

        if(resp.status !== 200) return false;
        else {
            console.log("hello")
            return resp.json();
        }
    }
    catch { (err) => err }
}


export { markAsRead, getAllNotifications }