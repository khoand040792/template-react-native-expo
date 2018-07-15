import React from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import HeaderNavigation from '../../constants/header';

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return HeaderNavigation(navigation, "Home");
  }

  render() {
    return (
      <View style={styles.container}>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
    overflow: 'hidden'
  },
  welcomeImage: {
    width: '90%',
    height: 110,
    marginTop: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  titleOverImage: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 13,
    color: 'white',
  }
});
