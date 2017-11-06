// @flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, Text, Dimensions } from 'react-native';
import { scale, verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
const styles = {};
const containerDefaultStyle = {
    style: {
        height: verticalScale(41),
        width: width - scale(52),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
}
const inputDefaultStyle = {
    style : {
        color: 'rgb(126, 129, 168)',
        height: verticalScale(41-4),
        width: width - scale(52+4),
        backgroundColor: 'aliceblue',
        margin: scale(2),
        textAlign: 'left',
        borderRadius: scale(1.6)
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
const MessageInput = ({ label, value, onChangeText, placeholder, placeholderTextColor, secureTextEntry, inputContainerStyle, inputTextStyle, labelTextStyle, androidUnderlineColor, onFocus, onEndEditing }) => {
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
            colors={['#ED5050', '#8948EE']}
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
                onFocus={onFocus}
                onEndEditing={onEndEditing}
                autoCapitalize="none"/>
        </LinearGradient>
    );
};
export { MessageInput };
