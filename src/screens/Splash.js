import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {deviceHeight, deviceWidth} from '../components/Dimensions';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Introduction');
    }, 2000);
  });
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/splash.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: deviceWidth,
    height: deviceHeight,
  },
});
