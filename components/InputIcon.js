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
                        color={'#fff'}
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
        height: 52,
        width: '100%',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#02b294',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 5,
        flexDirection: 'row',
    },
    inputTxt: {
        flex: 6,
        marginLeft: 15
    }
})