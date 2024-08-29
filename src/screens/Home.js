import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {deviceWidth} from '../components/Dimensions';
import {COLORS} from '../components/colors';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Image
          style={styles.banner}
          source={require('../images/home/home.jpg')}
        />
        <View style={styles.transparentView}>
          <Text style={styles.titleHeading}>RecipePro</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.searchBox}>
            <Image
              style={styles.searchIcon}
              source={require('../images/home/search.png')}
            />
            <Text style={styles.placeholderText}>Search here.....</Text>
          </TouchableOpacity>
          <Text style={styles.tagLine}>
            Search 1000+ recipes easily with one click
          </Text>
        </View>
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
  searchBox: {
    height: 60,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  searchIcon: {
    width: 26,
    height: 26,
  },
  placeholderText: {
    color: '#9e9e9e',
    fontSize: 16,
    marginLeft: 15,
  },
  titleHeading: {
    fontSize: 40,
    position: 'absolute',
    top: 30,
    left: 10,
    color: 'white',
    fontWeight: '700',
  },
  tagLine: {
    fontSize: 16,
    color: 'white',
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 8,
  },
});
