import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Image, Alert, ScrollView } from 'react-native';
import InputIcon from '../../components/InputIcon';
import { Ionicons } from '@expo/vector-icons';
import TitleHeader from '../../components/TitleHeader';
import HeaderNavigation from '../../constants/header';
import SpinFullScreen from '../../components/ActivityIndicator';
import { Register } from '../../api/ApiUtilities';
import ResponseApi from '../../api/ResponseApi';

export default class SignupScreen extends Component {

    static navigationOptions = HeaderNavigation(null, "TẠO TÀI KHOẢN");

    state = {
        FullName: '',
        Email: '',
        Phone: '',
        Password: ' ',
        showSpiner: false
    }

    register = () => {
        if (this.state.FullName && this.state.Email && this.state.Phone && this.state.Password) {
            // request register to remote server
            Register(this.state).then((data) => {
                if (!data.error) {
                    ResponseApi("Đăng ký thành công", (context) => {
                        context.setState({ showSpiner: false })
                        context.props.navigation.navigate('loginScreen')
                    }, this);
                } else {
                    ResponseApi("Email hoặc số điện thoại đã được đăng ký", (context) => {
                        context.setState({ showSpiner: false })
                    }, this);
                }
            });

            return;
        }
        ResponseApi("Email, số điện thoại, tên và mật khẩu được yêu cầu", () => { }, this);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
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
                            placeholder="Họ tên"
                            value={(fullName) => {
                                this.state.FullName = fullName;
                            }}
                        />
                        <InputIcon name="ios-mail-outline"
                            placeholder="Email"
                            value={(email) => {
                                this.state.Email = email;
                            }}
                        />
                        <InputIcon name="ios-lock-outline"
                            placeholder="Mật khẩu"
                            value={(password) => {
                                this.state.Password = password;
                            }}
                        />
                        <InputIcon name="ios-phone-portrait-outline"
                            placeholder="Số điện thoại"
                            value={(sdt) => {
                                this.state.Phone = sdt;
                            }}
                        />
                        <TouchableHighlight
                            onPress={this.register}
                            style={styles.btnLogin}
                        >
                            <Text style={styles.btnLoginTxt}>Đăng kí</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
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
        marginBottom: 50
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