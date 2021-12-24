
import * as React from "react"
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from "react-native-responsive-fontsize";

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function Map({setLatitude, setLongitude}) {
	const [ pin, setPin ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324
	})

    const [ region, setRegion ] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<View style={styles.upperSection}>
				<TouchableOpacity> 
					<FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) } color={theme.SecondaryPurple}  style={{marginRight :15, marginTop : 8, alignSelf:"flex-end" }}/>
				</TouchableOpacity>
				<TouchableOpacity onPress= {() => navigation.goBack()}>
					<LinearGradient
						colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 1 }}
						style={styles.button}>
						<Text style={{color:"white"}}>Done</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>

            <MapView
				style={styles.map}
				region={region}
				provider="google"
			>
				<Marker
					coordinate={pin}
					draggable={true}
					onDragEnd={(e) => {
                        console.log(e.nativeEvent.coordinate.latitude)
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
                        setRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        })
						this.setLatitude(pin.latitude)
						this.setLongitude(pin.longitude)
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	upperSection : {
        flexDirection : 'row',
        padding : "5%",
        paddingBottom: "5%",
        borderBottomWidth:RFValue(0.5),
        width:SCREEN_WIDTH,
    },
})
export default Map;