import React from 'react';
import {
  Dimensions,
  Picker,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ActionSheetIOS,
  Alert
} from 'react-native';

const { width: WindowWidth } = Dimensions.get('window');

export default class ModalPicker extends React.Component {
  state = {
    modalIsVisible: false,
    language: "0"
  };

  showActionSheetIOS() {
    if (Platform.OS === 'ios') {
      const { pickerDatas, onChange } = this.props;
      ActionSheetIOS.showActionSheetWithOptions({
        options: pickerDatas,
        destructiveButtonIndex: -2,
        cancelButtonIndex: -1,
        title: this.props.titlePicker
      },
        (buttonIndex) => {
          if (buttonIndex !== -1 && buttonIndex !== -2) {
            /* destructive action */
            onChange(pickerDatas[buttonIndex]);
          }
        });
    }
  }

  dropDownOnPlatform() {
    if (Platform.OS === 'android') {
      const pickerItem = this.props.pickerDatas.map((item, index) => {
        return (<Picker.Item label={item} value={index} key={index} />);
      })
      return (<Picker
        style={styles.btnDropdown}
        selectedValue={this.state.language}
        onValueChange={itemValue => {
          this.setState({ language: itemValue })
          this.props.onChange(this.props.pickerDatas[itemValue])
        }}>
        {pickerItem}
      </Picker>)
    }
    else if (Platform.OS === 'ios') {
      return (<Text >{this.props.titlePicker}</Text>)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container}
        onPress={() => this.showActionSheetIOS()}>
        <View style={styles.content} >
          {
            this.dropDownOnPlatform()
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1
  },
  content: {
    marginTop: 15,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#efefef',
    flexDirection: "row",
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDropdown: {
    flex: 5,
    color: '#abb2c0',
    height: "100%"
  }
});
