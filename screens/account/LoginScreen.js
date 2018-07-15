import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableHighlight,
    Image, AsyncStorage, Alert, NetInfo
} from 'react-native';
import InputIcon from '../../components/InputIcon';
import { Ionicons } from '@expo/vector-icons';
import ResponseApi from '../../api/ResponseApi';
import SpinFullScreen from '../../components/ActivityIndicator';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        username: '',
        password: '',
        showSpiner: false,
    }

    login = () => {
        if (this.state.username && this.state.password) {
            // call api login
            this.setState({ showSpiner: true })
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    setTimeout(() => {
                        this.setState({ showSpiner: false })
                        this.props.navigation.navigate("drawerStack");
                    }, 3000);
                } else {
                    alert("No internet connection")
                }
            });
            return;
        }
        ResponseApi("Email and Password is required", () => { }, this);
    }

    navigateScreen() {
        this.setState({ showSpiner: false })
        this.props.navigation.navigate('tabStack')
    }

    render() {
        return (
            <View style={styles.container}>
                <SpinFullScreen isVisible={this.state.showSpiner} />
                <View style={styles.boxLogo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../assets/images/icon.png')}
                    />
                </View>

                <View style={styles.boxBodyLogin}>
                    <View style={styles.boxBodyLoginContext}>
                        <InputIcon name="ios-person-outline"
                            placeholder="Email"
                            value={(username) => {
                                this.state.username = username;
                            }}
                        />
                        <InputIcon name="ios-lock-outline"
                            placeholder="Password"
                            value={(password) => {
                                this.state.password = password;
                            }}
                        />
                        <TouchableHighlight
                            onPress={this.login}
                            style={styles.btnLogin}
                        >
                            <Text style={styles.btnLoginTxt}>Đăng nhập</Text>
                        </TouchableHighlight>

                        <View style={styles.boxHelp}>
                            <View style={styles.boxHelpOr}>
                                <Text style={styles.line}>Forgot password</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    btnLogin: {
        paddingTop: 2,
        backgroundColor: '#00a651',
        borderRadius: 5,
        height: 45,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLoginTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    imageLogo: {
        width: 150,
        height: 150,
        marginTop: 50,
    },
    boxLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxHelp: {
        marginVertical: 20,
    },
    boxHelpHeader: {
        flexDirection: 'row'
    },
    boxHelpOr: {
        marginTop: 10,
        flexDirection: 'row'
    },
    boxHelpHeaderTxtRight: {
        textAlign: 'right',
        flex: 1,
        color: '#68595d'
    },
    boxHelpHeaderTxtLeft: {
        flex: 1,
        color: '#68595d'
    },
    line: {
        borderBottomColor: '#68595d',
        borderBottomWidth: 0.5,
        flex: 2
    },
    lineOr: {
        paddingHorizontal: 10,
        flex: 1,
        textAlign: 'center'
    },
    boxBodyLogin: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    boxBodyLoginContext: {
        width: "90%",
        height: "100%"
    }
});