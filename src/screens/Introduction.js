import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';

import {deviceHeight, deviceWidth} from '../components/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {COLORS, SIZES} from '../components/colors';

const carouselData = [
  {
    id: 1,

    image: require('../images/Intro/mainImg.png'),
    slogan: 'Cooking a Delicious Food Easily',
  },
  {
    id: 2,
    image: require('../images/Intro/Intro1.png'),
    slogan: 'Discover flavors, create memories—one recipe at a time!',
  },
  {
    id: 3,
    image: require('../images/Intro/intro2.jpg'),
    slogan: 'Elevate your kitchen skills with easy and delicious recipes',
  },
  {
    id: 4,
    image: require('../images/Intro/intro3.jpg'),
    slogan: 'Unleash your inner chef with our step-by-step guides!',
  },
  {
    id: 5,
    image: require('../images/Intro/intro4.jpg'),
    slogan: 'Wholesome meals made simple—cook your way to happiness',
  },
  {
    id: 6,
    image: require('../images/Intro/intro5.jpg'),
    slogan: 'Spice up your daily meals with our creative recipe ideas!',
  },
  {
    id: 7,
    image: require('../images/Intro/intro6.jpg'),
    slogan: 'Transform your ingredients into culinary masterpieces',
  },
  {
    id: 8,
    image: require('../images/Intro/intro7.jpg'),
    slogan: 'Savor the art of cooking—recipes that inspire and delight',
  },
  {
    id: 9,
    image: require('../images/Intro/intro.jpg'),
    slogan: 'Find your next favorite dish with our endless recipe collection',
  },
];

const renderItem = ({item, index}) => (
  <View style={{height: SIZES.height > 700 ? '85%' : '70%'}}>
    <ImageBackground
      style={{flex: 1, justifyContent: 'flex-end'}}
      source={item.image}
      resizeMode="cover">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[COLORS.transparent, COLORS.black]}
        // colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']} // Transparent to Black
        style={{
          height: 200,
          justifyContent: 'flex-end',
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 45,
          }}>
          {item.slogan}
        </Text>
      </LinearGradient>
    </ImageBackground>
  </View>
);

const RecipeCarousel = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <Carousel
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
        autoplay={true}
        loop={true}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />

      {/* Details */}
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  slogan: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RecipeCarousel;
