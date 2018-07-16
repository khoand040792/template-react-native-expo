import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableHighlight,
    Image, Alert, NetInfo
} from 'react-native';
import InputIcon from '../../components/InputIcon';
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

    setupAndNavigate() {
        setTimeout(() => {
            this.setState({ showSpiner: false })
            this.props.navigation.navigate("drawerStack");
        }, 3000);
    }

    login = () => {
        if (this.state.username && this.state.password) {
            // call api login
            this.setState({ showSpiner: true })
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    this.setupAndNavigate()
                } else {
                    alert("No internet connection")
                }
            });
            return;
        }
        ResponseApi("Email and Password is required", () => { }, this);
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
                            <Text style={styles.btnLoginTxt}>Login</Text>
                        </TouchableHighlight>

                        <View style={styles.boxHelp}>
                            <Text style={styles.line}>Forgot password?</Text>
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
        backgroundColor: '#02b294',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxHelpHeader: {
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
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        color: '#fff'
    },
    boxBodyLogin: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    boxBodyLoginContext: {
        width: "88%",
        height: "100%"
    }
});