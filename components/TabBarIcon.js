import React from 'react';
//import { Icon } from 'expo';
//import { Image } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={this.props.size ? this.props.size : 30}
        style={{ marginBottom: -3}}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
      // <Image
      //   style={{ width: 25, height: 25 }}
      //   source={this.props.focused ? this.props.tabIconSelected : this.props.tabIconDefault}
      // />
    );
  }
}