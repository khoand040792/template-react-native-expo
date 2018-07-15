import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

/*
 * Screen
 * 
 */
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/account/LoginScreen';
import SignupScreen from '../screens/account/SignupScreen';
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
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-home'}
    />
  ),
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
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  fPasswordScreen: { screen: ForgotPasswordScreen }
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