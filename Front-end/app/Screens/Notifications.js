import React, { useEffect, useState }  from 'react';
import { SafeAreaView } from 'react-native';

import { getAllNotifications } from '../API/NotificatonAPI';
import Spinner from 'react-native-loading-spinner-overlay';
import { TokenContext } from '../Context/TokenContext';
import { useContext } from 'react';
import NotificationList from '../Components/Notification/NotificationList';

function Notifications ({navigation}) {

    const [notifications, setNotifications] = useState([])
    const [processing, setProcessing] = useState(true)
    const user_token = useContext(TokenContext)
    const [state, setState] = useState({refresh:true})


    useEffect( async() => {
        // setProcessing(true)
        // console.log("hi")
        const data = await getAllNotifications(user_token)
        console.log({data})
        setNotifications(data)
        console.log({notifications})
        console.log(notifications[0])
        setProcessing(false)
        setState({ refresh: ! state.refresh })
    }, [])

    return (
        <SafeAreaView style={{paddingTop:"8%"}}>
            {processing &&                 
                <Spinner
                        visible={processing}
                        textContent={'Loading...'}
                        textStyle={{color: '#FFF'}}
                />}
            {!processing && 
                <NotificationList navigation = {navigation} notifications={notifications} />
            }
        </SafeAreaView>
    );
}



export default Notifications;