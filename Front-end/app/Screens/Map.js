
import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

function Map() {
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
	}
})
export default Map;