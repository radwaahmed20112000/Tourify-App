import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';

function PostCreation() {
    const [value, onChangeText] = React.useState('Useless Placeholder');

    const {light, dark, changeTheme, lightMode} = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Text style={{color: lightMode? light.Text : dark.Text, fontSize: normalize(30)}}>Let's Start Our Tour</Text>
            <ScrollView horizontal={true} style={styles.filterSection}>
                <TouchableOpacity onPress={() => {setTag("All");}} style={selectedFilter == "All" ? [styles.filterButtons, {backgroundColor: "white"}] : styles.filterButtons}>
                    <Text style={selectedFilter == "All" ? {fontSize: 17, color:"#010621", fontWeight:"bold"} : {fontSize: 17, color:"white"}}>All</Text>
                </TouchableOpacity>
            </ScrollView>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
            />
            <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Button onPress={()=> changeTheme()} title='Post'></Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default PostCreation;