import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default class TitleHeader extends Component {

    render() {
        return (
            <Text style={styles.container}>{this.props.name}</Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        textAlign: "center"
    }
});