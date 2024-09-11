import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {APP_ID, APP_KEY} from '../API/API';
import Loader from '../components/Loader';

const Search = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const searchRecipe = async () => {
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
        `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`,
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Image
          style={styles.backArrow}
          source={require('../images/backArrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <Image
          style={styles.searchIcon}
          source={require('../images/search.png')}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Search Here....."
        />
        {search != '' && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Image
              style={styles.close}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      {search != '' && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => searchRecipe()}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={recipes}
        // contentContainerStyle={{marginTop: 16}}
        keyExtractor={item => item.recipe.uri}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.recipeItems}
            onPress={() => navigation.navigate('Details', {data: item})}>
            <Image style={styles.itemImage} source={{uri: item.recipe.image}} />
            <View style={[styles.transparentView, {borderRadius: 20}]}>
              <Text style={styles.itemLabel}>{item.recipe.label}</Text>
              <Text style={styles.itemSource}>{item.recipe.source}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* {loading && <Loader />} */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 20,
    left: 18,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    height: 40,
    width: 40,
    marginRight: 4,
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#9e9e9e',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 12,
    alignItems: 'center',
  },
  searchIcon: {
    width: 26,
    height: 26,
  },
  input: {
    width: '78%',
    marginLeft: 4,
    fontSize: 16,
    color: 'black',
  },
  close: {
    height: 22,
    width: 22,
  },
  buttonContainer: {
    width: '40%',
    height: 40,
    backgroundColor: '#05B681',
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeItems: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginLeft: 8,
  },
  itemLabel: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
    width: '60%',
  },
  itemSource: {
    fontSize: 16,
    color: '#05B681',
    fontWeight: '400',
    marginLeft: 10,
    width: '60%',
  },
});
