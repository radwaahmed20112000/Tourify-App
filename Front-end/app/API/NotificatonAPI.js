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
        .catch(err => false);

        if(resp.status !== 200) return false;
        else 
            return resp.json();
    }
    catch { () => false }
}


export { markAsRead, getAllNotifications }