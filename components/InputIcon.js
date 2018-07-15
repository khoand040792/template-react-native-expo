import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class InputIcon extends Component {

    render() {
        const { returnType, isSearchInput, value, secure, onSearch, disable, keyboardType } = this.props;
        return (
            <View style={this.props.isNoborder ? styles.noborder : styles.container}>
                <View style={styles.content}>
                    <Ionicons
                        name={this.props.name}
                        size={this.props.size ? this.props.size : 30}
                        style={styles.icon}
                        color={'#abb2c0'}
                    />
                    <TextInput
                        returnKeyType={isSearchInput ? returnType : "next"}
                        underlineColorAndroid="transparent"
                        style={styles.inputTxt}
                        placeholder={this.props.placeholder}
                        onChangeText={(text) => value(text)}
                        secureTextEntry={secure ? secure : false}
                        onSubmitEditing={onSearch}
                        editable={disable ? false : true}
                        keyboardType={keyboardType ? keyboardType : "default"}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noborder: {
        height: 65,
        width: '100%',
    },
    container: {
        marginTop: 15,
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#efefef'
    },
    icon: {
        paddingHorizontal: 10,
        flex: 1
    },
    content: {
        padding: 5,
        flexDirection: 'row',
    },
    inputTxt: {
        flex: 5
    }
})