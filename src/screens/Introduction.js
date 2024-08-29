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
import {COLORS, SIZES} from '../components/colors';
import {useNavigation} from '@react-navigation/native';

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
            lineHeight: 40,
          }}>
          {item.slogan}
        </Text>
      </LinearGradient>
    </ImageBackground>
  </View>
);

const RecipeCarousel = () => {
  const navigation = useNavigation();

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}
            colors={[COLORS.darkGreen, COLORS.lime]}>
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,

    width: '90%',
    margin: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecipeCarousel;
