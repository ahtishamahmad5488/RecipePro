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
import Modal from 'react-native-modal';
import {
  CUISINE_FILTERS,
  DIET_FILTERS,
  DISH_FILTERS,
  HEALTH_FILTERS,
} from '../Data/data';

const Search = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedDish, setSelectedDish] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState('');
  const [selectedHealth, setSelectedHealth] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

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
          <TouchableOpacity
            onPress={() => {
              setSearch(''), setRecipes([]);
            }}>
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
              <Text style={styles.itemLabel}>
                {item.recipe.label.length > 40
                  ? item.recipe.label.substring(0, 40) + '...'
                  : item.recipe.label}
              </Text>
              <Text style={styles.itemSource}>{item.recipe.source}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {recipes.length > 0 && (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.filterBtn}>
          <Image
            style={styles.filterIcon}
            source={require('../images/filter.png')}
          />
        </TouchableOpacity>
      )}
      <Modal
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        isVisible={showModal}
        backdropColor="rgba(0,0,0,0.5)"
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.filtersTitle}>Filter's</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Image
                style={styles.close}
                source={require('../images/close.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>Dish Type</Text>
          <View>
            <FlatList
              data={DISH_FILTERS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedDish == item ? '#05B681' : 'transparent',
                      },
                    ]}
                    onPress={() => setSelectedDish(item)}>
                    <Text
                      style={{color: selectedDish == item ? 'white' : 'black'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Cuisines</Text>
          <View>
            <FlatList
              data={CUISINE_FILTERS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedCuisines == item ? '#05B681' : 'transparent',
                      },
                    ]}
                    onPress={() => setSelectedCuisines(item)}>
                    <Text
                      style={{
                        color: selectedCuisines == item ? 'white' : 'black',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Health</Text>
          <View>
            <FlatList
              data={HEALTH_FILTERS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedHealth == item ? '#05B681' : 'transparent',
                      },
                    ]}
                    onPress={() => setSelectedHealth(item)}>
                    <Text
                      style={{
                        color: selectedHealth == item ? 'white' : 'black',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Diet</Text>
          <View>
            <FlatList
              data={DIET_FILTERS}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedDiet == item ? '#05B681' : 'transparent',
                      },
                    ]}
                    onPress={() => setSelectedDiet(item)}>
                    <Text
                      style={{color: selectedDiet == item ? 'white' : 'black'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.applyBtn}>{'Apply Filters'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginTop: 4,
  },
  filterBtn: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.9)',
    shadowOpacity: 6,
    elevation: 5,
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
  modalView: {
    width: '100%',
    paddingBottom: 30,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
  },
  filtersTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '800',
    color: 'black',
    marginTop: 6,
  },
  filterItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    borderWidth: 0.6,
    borderRadius: 10,
  },
  submitBtn: {
    width: '90%',
    height: 50,
    backgroundColor: '#05B681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
