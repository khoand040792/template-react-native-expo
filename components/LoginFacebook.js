import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Expo from 'expo';
import Secret from '../constants/Secret';

export default class LoginFacebook extends Component {

    constructor(props) {
        super(props);
    }

    async logIn() {
        try {
            const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(Secret.FACEBOOK_APP_ID, {
                permissions: ['public_profile', 'email']
            });

            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                    const profile = await response.json();
                    Alert.alert(
                        'Logged in!',
                        `Hi ${profile.name}!`,
                    );
                    break;
                }
                case 'cancel': {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.btnLoginFb}
                onPress={() => this.logIn()}
            >
                <View style={styles.btnLoginFbBox}>
                    <Ionicons name="logo-facebook" size={40} color={"#fff"} style={styles.iconFb} />
                    <Text style={styles.btnLoginFbTxt}>Login with Facebook</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    btnLoginFb: {
        paddingTop: 2,
        backgroundColor: '#3c5b9b',
        borderRadius: 5,
        height: 45,
    },
    btnLoginFbBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    iconFb: {
        flex: 1,
        backgroundColor: '#4569b4',
        marginLeft: 5
    },
    btnLoginFbTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        flex: 5
    },
});