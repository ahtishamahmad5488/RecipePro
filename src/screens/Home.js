import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceWidth} from '../components/Dimensions';
import {COLORS} from '../components/colors';
import {MEAL_FILTERS} from '../Data/data';
import {APP_ID, APP_KEY} from '../API/API';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'Get',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${APP_ID}&app_key=${APP_KEY}`,
        requestOptions,
      );
      const data = await response.json();
      setRecipes(data.hits);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.topView}>
        <Animatable.Image
          animation={'slideInUp'}
          style={styles.banner}
          source={require('../images/home/home.jpg')}
        />
        <View style={styles.transparentView}>
          <Animatable.Text animation={'slideInUp'} style={styles.titleHeading}>
            RecipePro
          </Animatable.Text>
          <AnimatedBtn
            onPress={() => navigation.navigate('Search')}
            animation={'slideInUp'}
            activeOpacity={0.8}
            style={styles.searchBox}>
            <Image
              style={styles.searchIcon}
              source={require('../images/home/search.png')}
            />
            <Text style={styles.placeholderText}>Search here.....</Text>
          </AnimatedBtn>
          <Animatable.Text animation={'slideInUp'} style={styles.tagLine}>
            Search 1000+ recipes easily with one click
          </Animatable.Text>
        </View>
      </View>
      <Animatable.Text animation={'slideInUp'} style={styles.headerCategory}>
        Categories
      </Animatable.Text>
      <View style={styles.categories}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MEAL_FILTERS}
          renderItem={({item, index}) => {
            return (
              <AnimatedBtn
                animation={'slideInUp'}
                style={styles.cardItems}
                activeOpacity={0.6}>
                <View style={styles.cards}>
                  <Image style={styles.cardIcons} source={item.icon} />
                </View>
                <Text style={styles.titleCategory}>{item.title}</Text>
              </AnimatedBtn>
            );
          }}
        />
      </View>
      <Animatable.Text
        animation={'slideInUp'}
        style={styles.headerTrendingRecipes}>
        Trending Recipes
      </Animatable.Text>
      <FlatList
        data={recipes}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 16}}
        horizontal
        keyExtractor={item => item.recipe.uri}
        renderItem={({item}) => (
          <AnimatedBtn
            animation={'slideInUp'}
            style={styles.cartItems}
            onPress={() => navigation.navigate('Details', {data: item})}>
            <Image
              style={styles.recipeImage}
              source={{uri: item.recipe.image}}
            />
            <View style={[styles.transparentView, {borderRadius: 20}]}>
              <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
            </View>
          </AnimatedBtn>
        )}
      />
      {loading && <Loader />}
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
    height: '34%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transparentView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    width: '90%',
    color: 'white',
  },
  cartItems: {
    width: 160,
    height: 230,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  headerTrendingRecipes: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 20,
    color: 'black',
  },
});
