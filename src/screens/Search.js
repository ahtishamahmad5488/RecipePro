import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';

const Search = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <TouchableOpacity style={styles.backBtn}>
        <Image
          style={styles.backArrow}
          source={require('../images/backArrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.searchBox}></View>
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
    height: 50,
    width: 50,
    borderRadius: 25,
    left: 20,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    height: 50,
    width: 50,
    marginRight: 4,
  },
});
