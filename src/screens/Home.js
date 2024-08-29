import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {deviceWidth} from '../components/Dimensions';
import {COLORS} from '../components/colors';
import {MEAL_FILTERS} from '../Data/data';

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
      <Text style={styles.headerCategory}>Categories</Text>
      <View style={styles.categories}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MEAL_FILTERS}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.cardItems} activeOpacity={0.6}>
                <View style={styles.cards}>
                  <Image style={styles.cardIcons} source={item.icon} />
                </View>
                <Text style={styles.titleCategory}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
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
    height: '32%',
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
    marginTop: 70,
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
    left: 16,
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
  headerCategory: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    color: 'black',
  },
  cardItems: {
    height: 140,
    width: 120,
    margin: 10,
    marginHorizontal: -2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  cards: {
    height: '70%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: 16,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcons: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCategory: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
});
