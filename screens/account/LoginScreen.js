import React, { Component } from 'react';
import {
    View, StyleSheet, Text, TouchableHighlight,
    Image, AsyncStorage, Alert, NetInfo
} from 'react-native';
import InputIcon from '../../components/InputIcon';
import { Ionicons } from '@expo/vector-icons';
import LoginFacebook from '../../components/LoginFacebook';
import ResponseApi from '../../api/ResponseApi';
import SpinFullScreen from '../../components/ActivityIndicator';
import { Login } from '../../api/ApiUtilities';
import Secret from '../../constants/Secret';
import { SaveTokenDevice } from '../../api/ApiUtilities';
import { Permissions, Notifications } from 'expo';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            username: 'khoand@gmail.com', // null
            password: '123456', // null
            showSpiner: false,
        }

        // check has login
        this.isLoginBefore();
    }

    /**
     * @param {*} token : string // token api request header
     */
    async registerPushNotifyAsync(token) {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            this.navigateScreen();
            return;
        }

        // Get the token that uniquely identifies this device
        let tokenDevice = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        return SaveTokenDevice(token, tokenDevice).then((data) => {
            if (!data.error) {
                //save token device
                AsyncStorage.setItem(Secret.tokenDeviceSave, tokenDevice).then(() => {
                    // navigate to home screen
                    this.navigateScreen();
                });
            }
        });
    }

    /**
     * if user has login before,redirec to home screen
     */
    isLoginBefore = () => {
        AsyncStorage.getItem(Secret.tokenRequestApi).then((token) => {
            if (token) {
                this.props.navigation.navigate("tabStack")
            }
        });
    }

    login = () => {
        if (this.state.username && this.state.password) {
            // call api login
            this.setState({ showSpiner: true })
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    Login(this.state.username, this.state.password)
                        .then((data) => {
                            if (!data.error) {
                                AsyncStorage.setItem(Secret.tokenRequestApi, data.Token)
                                // get token device and send to server for the first login
                                AsyncStorage.getItem(Secret.tokenDeviceSave).then((tokenDevice) => {
                                    if (tokenDevice) {
                                        this.navigateScreen();
                                    } else {
                                        this.registerPushNotifyAsync(data.Token);
                                    }
                                })

                            } else {
                                ResponseApi("Email (phone) hoặc mật khẩu không đúng", (context) => {
                                    context.setState({ showSpiner: false })
                                }, this);
                            }
                        }).catch((err) => {
                            this.setState({ showSpiner: false })
                        });
                } else {
                    alert("Không có kết nối mạng")
                }
            });
            return;
        }
        ResponseApi("Email(số điện thoại) và mật khẩu được yêu cầu", () => { }, this);
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
                            placeholder="Email hoặc số điện thoại"
                            value={(username) => {
                                this.state.username = username;
                            }}
                        />
                        <InputIcon name="ios-lock-outline"
                            placeholder="Mật khẩu"
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
                            <View style={styles.boxHelpHeader}>
                                <Text style={styles.boxHelpHeaderTxtLeft}
                                    onPress={() => this.props.navigation.navigate('signupScreen')}
                                >Đăng ký</Text>
                                <Text style={styles.boxHelpHeaderTxtRight}
                                    onPress={() => this.props.navigation.navigate('fPasswordScreen')}
                                >Quên mật khẩu?</Text>
                            </View>
                            <View style={styles.boxHelpOr}>
                                <Text style={styles.line}></Text>
                                <Text style={styles.lineOr}>hoặc</Text>
                                <Text style={styles.line}></Text>
                            </View>
                        </View>
                        <LoginFacebook />
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