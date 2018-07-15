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
        headerLeft: (
            <TouchableHighlight
                onPress={() => navigation.openDrawer()}
                style={{
                    backgroundColor: "transparent",
                    marginLeft: 10
                }}
            >
                <Ionicons name="ios-menu-outline" size={32} color="#000" />
            </TouchableHighlight>
        ),
    }
}