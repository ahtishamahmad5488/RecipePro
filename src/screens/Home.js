import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {deviceWidth} from '../components/Dimensions';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Image
          style={styles.banner}
          source={require('../images/home/home.jpg')}
        />
        <View style={styles.transparentView}></View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: deviceWidth,
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transparentView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
