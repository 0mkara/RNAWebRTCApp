// @flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, Text } from 'react-native';
import { scale, verticalScale } from '../scaling';

const styles = {};
const containerDefaultStyle = {
    style: {
        height: verticalScale(39),
        width: scale(204),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(2.6),
    }
}
const inputDefaultStyle = {
    style : {
        color: 'rgb(126, 129, 168)',
        height: verticalScale(35),
        width: scale(200),
        backgroundColor: 'aliceblue',
        margin: scale(2),
        textAlign: 'center'
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
const GradientInput = ({ label, value, onChangeText, placeholder, placeholderTextColor, secureTextEntry, inputContainerStyle, inputTextStyle, labelTextStyle, androidUnderlineColor }) => {
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
        <LinearGradient
            colors={['#B6CC96', '#ED6A6A', '#B770F8']}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
            style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid={underlineColor}
                multiline={false}
                autoCapitalize="none"/>
        </LinearGradient>
    );
};
export { GradientInput };
