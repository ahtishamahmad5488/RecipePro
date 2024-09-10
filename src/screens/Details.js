import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Animatable.Image
          source={{uri: route.params.data.recipe.image}}
          style={styles.banner}
          animation={'slideInUp'}
        />
        <AnimatedBtn
          animation={'slideInUp'}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Image
            style={styles.arrowBack}
            source={require('../images/home/arrowback.png')}
          />
        </AnimatedBtn>
        <Animatable.Text animation={'slideInUp'} style={styles.titleItem}>
          {route.params.data.recipe.label}
        </Animatable.Text>
        <Animatable.Text animation={'slideInUp'} style={styles.source}>
          {'Added By: '}
          <Animatable.Text animation={'slideInUp'} style={{color: '#05B681'}}>
            {route.params.data.recipe.source}
          </Animatable.Text>
        </Animatable.Text>
        <Animatable.Text animation={'slideInUp'} style={styles.calories}>
          {'Calories: '}
          <Animatable.Text animation={'slideInUp'} style={{color: 'orange'}}>
            {route.params.data.recipe.calories}
          </Animatable.Text>
        </Animatable.Text>
        <Animatable.Text animation={'slideInUp'} style={styles.calories}>
          {'Total Weight: '}
          <Animatable.Text animation={'slideInUp'} style={{color: 'orange'}}>
            {route.params.data.recipe.totalWeight}
          </Animatable.Text>
        </Animatable.Text>
        <Animatable.Text animation={'slideInUp'} style={styles.calories}>
          {'Meal Type: '}
          <Animatable.Text animation={'slideInUp'} style={{color: '#05B681'}}>
            {route.params.data.recipe.mealType}
          </Animatable.Text>
        </Animatable.Text>

        <View>
          <FlatList
            horizontal
            nestedScrollEnabled={true}
            scrollEnabled={false}
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
                      backgroundColor:
                        selectedTab == index ? '#05B681' : 'white',
                    },
                  ]}>
                  <Text
                    style={{color: selectedTab == index ? 'white' : 'black'}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <FlatList
          nestedScrollEnabled={true}
          scrollEnabled={false}
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
              <Animatable.View animation={'slideInUp'} style={styles.labels}>
                <Text style={styles.headerItem}>{item}</Text>
              </Animatable.View>
            );
          }}
        />
      </View>
    </ScrollView>
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
