import React, { Component } from 'react'
import { Alert } from 'react-native'

/**
 * @param: message : string
 * @param: callback : function
 * @param: context: object
 */
export default ReponseApi = function (message, callback, context) {
    Alert.alert(
        "Message",
        message,
        [
            //{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
            //{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => callback(context) },
        ],
        { cancelable: false }
    )
}

