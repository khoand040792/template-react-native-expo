import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * @param navigation: object // navigation props
 * @param title: string // title of header
 */
export default header = function (navigation, title) {
    return {
        title: title,
        headerTintColor: '#fff',
        headerStyle: {
            //borderBottomWidth: 0,
            backgroundColor: '#02b294',
            //elevation: 0,
        },
        headerLeft: (
            <TouchableHighlight
                onPress={() => navigation.openDrawer()}
                style={{
                    backgroundColor: "transparent",
                    marginLeft: 10
                }}
            >
                <Ionicons name="ios-menu-outline" size={32} color="#fff" />
            </TouchableHighlight>
        ),
    }
}