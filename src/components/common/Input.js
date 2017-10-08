// @flow
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { scale, verticalScale } from '../scaling';

const styles = {};
const containerDefaultStyle = {
    style: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
}
const inputDefaultStyle = {
    style : {
        color: 'rgb(126, 129, 168)',
        height: verticalScale(35),
        width: scale(300)
    }
}
const labelDefaultStyle = {
    textAlign: 'right',
    fontSize: scale(18),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
}
const Input = ({ label, value, onChangeText, placeholder, placeholderTextColor, secureTextEntry, inputContainerStyle, inputTextStyle, labelTextStyle, androidUnderlineColor }) => {
    let underlineColor = 'rgba(0,0,0,0)';
    if(inputContainerStyle) {
        styles.containerStyle = inputContainerStyle;
    } else if (!inputContainerStyle) {
        styles.containerStyle = containerDefaultStyle.style;
    }
    if (inputTextStyle) {
        styles.inputStyle = inputTextStyle;
    } else if (!inputTextStyle) {
        styles.inputStyle = inputDefaultStyle.style;
    }
    if (labelTextStyle) {
        styles.labelStyle = labelTextStyle;
    } else if (!labelTextStyle) {
        styles.labelStyle = labelDefaultStyle.style;
    }
    if(androidUnderlineColor) {
        underlineColor = androidUnderlineColor;
    }
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCorrect={false}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            underlineColorAndroid={underlineColor}/>
    </View>
    );
};
export { Input };
