// import { Dimensions, Platform, PixelRatio } from 'react-native';

// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT,
// } = Dimensions.get('window');

// // based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320;

// export function normalize(size) {
//   const newSize = size * scale 
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize))
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
//   }
// }


const express = require('express');
const router = express.Router();
let PostController = require('../Controllers/PostController');


router.get('/' , PostController.getFeedPosts);

module.exports = router ;