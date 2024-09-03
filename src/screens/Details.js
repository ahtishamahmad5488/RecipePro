import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: route.params.data.recipe.image}}
        style={styles.banner}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Image
          style={styles.arrowBack}
          source={require('../images/home/arrowback.png')}
        />
      </TouchableOpacity>
      <Text style={styles.titleItem}>{route.params.data.recipe.label}</Text>
      <Text style={styles.source}>
        {'Added By: '}
        <Text style={{color: '#05B681'}}>
          {route.params.data.recipe.source}
        </Text>
      </Text>
      <Text style={styles.calories}>
        {'Calories: '}
        <Text style={{color: 'orange'}}>
          {route.params.data.recipe.calories}
        </Text>
      </Text>
      <Text style={styles.calories}>
        {'Total Weight: '}
        <Text style={{color: 'orange'}}>
          {route.params.data.recipe.totalWeight}
        </Text>
      </Text>
      <Text style={styles.calories}>
        {'Meal Type: '}
        <Text style={{color: '#05B681'}}>
          {route.params.data.recipe.mealType}
        </Text>
      </Text>

      <View>
        <FlatList
          horizontal
          contentContainerStyle={{marginTop: 20}}
          showsHorizontalScrollIndicator={false}
          data={[
            'Health',
            'Cautions',
            'Ingredients',
            'Diet',
            'Cuisines',
            'Dish Type',
          ]}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedTab(index)}
                style={[
                  styles.typeItems,
                  {
                    borderWidth: selectedTab == index ? 0 : 0.5,
                    marginLeft: index == 0 ? 16 : 10,
                    borderColor: '#9e9e9e',
                    backgroundColor: selectedTab == index ? '#05B681' : 'white',
                  },
                ]}>
                <Text style={{color: selectedTab == index ? 'white' : 'black'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList
        data={
          selectedTab == 0
            ? route.params.data.recipe.healthLabels
            : selectedTab == 1
            ? route.params.data.recipe.cautions
            : selectedTab == 2
            ? route.params.data.recipe.ingredientLines
            : selectedTab == 3
            ? route.params.data.recipe.dietLabels
            : selectedTab == 4
            ? route.params.data.recipe.cuisineType
            : route.params.data.recipe.dishType
        }
        renderItem={({item, index}) => {
          return (
            <View style={styles.labels}>
              <Text style={styles.headerItem}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    left: 16,
    top: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBack: {
    width: 30,
    height: 30,
    left: 4,
  },
  titleItem: {
    color: 'black',
    fontSize: 30,
    fontWeight: '800',
    alignSelf: 'center',
    width: '90%',
  },
  source: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
  },
  typeItems: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  headerItem: {
    color: 'black',
  },
  labels: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderWidth: 0.5,
    marginTop: 10,
    borderColor: '#9e9e9e',
    paddingLeft: 10,
    borderRadius: 10,
  },
  calories: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginLeft: 20,
  },
});
