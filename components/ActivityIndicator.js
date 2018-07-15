import React, { Component } from 'react';
import {
    ActivityIndicator, Modal, View,
    StyleSheet, Text, NetInfo
} from 'react-native';

const ConnectionType = { wifi: "wifi", cell: "cell", none: "none", NONE: "NONE" }

export default class SpinFullScreen extends Component {

    closeModal = () => {

    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleChangeNetwork
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.handleChangeNetwork
        );
    }

    handleChangeNetwork() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                Alert.alert(
                    "Không có kết nối mạng",
                    "Mở kết nối mạng để tiếp tục sử dụng ứng dụng"
                )
            }
        });
    }

    render() {
        const { isVisible } = this.props;
        return (
            <Modal
                transparent={true}
                visible={isVisible}
                style={styles.modal}
                onRequestClose={this.closeModal}
            >
                <View style={styles.containerModal}>
                    <ActivityIndicator
                        size="large"
                        color="#ffffff" />
                    <Text style={styles.txtSpiner}>Đang xử lý...</Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    txtSpiner: {
        textAlign: "center",
        color: "#fff"
    },
    modal: {
        flex: 1,
    },
    containerModal: {
        opacity: 0.6,
        backgroundColor: "#000",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})