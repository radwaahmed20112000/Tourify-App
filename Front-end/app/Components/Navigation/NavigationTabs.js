import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../Screens/Profile';
import Notifications from '../../Screens/Notifications';
import Map from '../../Screens/Map';
import { RFValue } from "react-native-responsive-fontsize";
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../Shared/GradientText';
import { ThemeContext } from '../../Context/ThemeContext';
import { TokenContext } from '../../Context/TokenContext';
import PostCreation from '../../Screens/PostCreation';
import PostListComponent from '../Shared/PostListComponent';
import Feed from '../../Screens/Feed';
const Tab = createBottomTabNavigator();

function NavigationTabs(props) {
    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);
    console.log(token);
    return (<Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: RFValue(10),
                left: RFValue(20),
                right: RFValue(20),
                borderRadius: RFValue(20),
                height: RFValue(60),
                backgroundColor: theme.Primary,
                elevation: 1,
                shadowOpacity: 1
            },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let text
                if (route.name === 'Feed') {
                    iconName = 'home';
                    text = 'Feed'
                }
                else if (route.name === 'Notifications') {
                    iconName = 'notifications'
                    text = 'Notification'
                }
                else if (route.name === 'Profile') {
                    iconName = 'person'
                    text = 'Profile'
                }
                else if (route.name === 'PostCreation') {
                    iconName = 'add'
                    text = 'New Trip'
                }

                if (focused)
                    return <View style={{
                        marginBottom: RFValue(20),
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <LinearGradient
                            colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}>
                            <MaterialIcons name={iconName} size={30} color={theme.Primary} />
                        </LinearGradient>
                        <GradientText style={{ fontSize: RFValue(15) }}>{text}</GradientText>
                    </View>

                else
                    return <View style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <MaterialIcons name={iconName} size={30} color={theme.SubText} />
                    </View>
            }
        })}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="PostCreation" component={PostCreation} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>)

}

const circleDiameter = 50
const styles = StyleSheet.create({
    button: {
        width: RFValue(circleDiameter),
        height: RFValue(circleDiameter),
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "3%",
        top: "7%",
        borderRadius: circleDiameter / 2,
    }
});
export default NavigationTabs;