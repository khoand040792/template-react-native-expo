import React, { Component } from 'react';
import {
    View, StyleSheet, Text,
    TouchableHighlight, Alert, Image
} from 'react-native';
import { Notifications } from 'expo';

export default class Notification extends Component {

    state = {
        data: [],
        count: 0
    }

    navigateToDetailNotifies() {
        this.props.navigations.navigate('notification');
    }

    componentDidMount() {
        let self = this;
        Notifications.addListener((dataNotifies) => {
            self.setState({
                data: dataNotifies.data.data,
                count: dataNotifies.data.data.length
            });
        });
    }

    render() {
        const { isNotifies } = this.props;
        return (
            <TouchableHighlight
                onPress={() => this.navigateToDetailNotifies()}
                color="#fff"
            >
                <View style={styles.containerNotification}>
                    <Image source={require('../assets/images/icon-notification.png')}
                        style={styles.iconNotification} />
                    {
                        this.state.count ? <Text style={styles.countNotification}>{this.state.count}</Text> :
                            <Text></Text>
                    }
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    containerNotification: {
        height: 30,
        width: 45,
    },
    iconNotification: {
        width: 24,
        height: 28,
        marginRight: 20,
        zIndex: 0,
        position: "absolute"
    },
    countNotification: {
        zIndex: 1,
        height: 20,
        width: 20,
        borderWidth: 0.5,
        color: '#fff',
        backgroundColor: "#ed1c24",
        borderColor: '#c1352c',
        marginLeft: 10,
        textAlign: "center",
        borderRadius: 10,
        fontSize: 12,
        opacity: 0.9,
        overflow: "hidden"
    }
});