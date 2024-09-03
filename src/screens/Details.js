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
        onPress={() => navigation.navigate('Home')}
        style={styles.backBtn}>
        <Image
          style={styles.arrowBack}
          source={require('../images/home/arrowback.png')}
        />
      </TouchableOpacity>
      <Text style={styles.titleItem}>{route.params.data.recipe.label}</Text>
      <Text style={styles.source}>
        {'added by: ' + route.params.data.recipe.source}
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
            'Meal Type',
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
            ? route.params.data.recipe.ingredientsLine
            : selectedTab == 3
            ? route.params.data.recipe.dietLabels
            : selectedTab == 4
            ? route.params.data.recipe.mealType
            : selectedTab == 5
            ? route.params.data.recipe.cuisneType
            : null
        }
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
  headerItem: {},
});
