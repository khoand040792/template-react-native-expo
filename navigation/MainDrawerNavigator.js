import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

/*
 * Screen
 * 
 */
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/account/LoginScreen';
/*
 * Component
 * 
 */
import TabBarIcon from '../components/TabBarIcon';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Trang chủ',
};

const drawerNavigator = createDrawerNavigator({
  HomeStack
}, {
    tabBarOptions: {
      style: {
        backgroundColor: '#fff'
      },
      activeTintColor: '#00a651',
    }
  }
);


// login stack
const LoginStack = createStackNavigator({
  loginScreen: { screen: LoginScreen }
}, {
    navigationOptions: {
      headerStyle: { backgroundColor: '#fff' },
    }
  })

export default createStackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: drawerNavigator },
}, {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);