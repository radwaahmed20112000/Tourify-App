import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';
import ImagePicker from 'react-native-image-picker';
import TagsList from '../Components/PostCreation/TagsList';

function PostCreation() {

    const [value, onChangeText] = React.useState('');
    const {theme} = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Text style={{color: theme.Text, fontSize: normalize(30)}}>Let's Share Our Tour</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 0.3}}
                onChangeText={text => onChangeText(text)}
                placeholder= "How was your trip?"
                value={value}
                multiline={true}
            />
            <AirbnbRating
                type='star'
                ratingCount={5}
                showRating
                
            // onFinishRating={this.ratingCompleted}
            />
            <TagsList></TagsList>
            {/* <Button onPress={()=> changeTheme()} title='Post'></Button> */}
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