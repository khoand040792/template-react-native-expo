import React from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import HeaderNavigation from '../../constants/header';

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return HeaderNavigation(navigation, "Home");
  }

  logout = () => {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.txtTitle}>Welcome Back!</Text>
        <TouchableHighlight
          style={styles.btnLogout}
          onPress={this.logout}
        >
          <Text style={styles.txtBtnLogout}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02b294',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 30
  },
  btnLogout: {
    backgroundColor: '#1f8696',
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnLogout: {
    fontSize: 20
  }
});
