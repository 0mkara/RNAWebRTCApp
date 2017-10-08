import React from 'react';
import { Text, View } from 'react-native';
import { scale, verticalScale } from '../scaling';

const styles = {
    textStyle: {
        color: "#000000",
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: 'transparent'
    },
    msgContainerStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: verticalScale(45),
        width: scale(163),
        borderRadius: scale(8),
        paddingLeft: scale(5),
        paddingRight: scale(5),
        marginLeft: scale(10),
        marginRight: scale(10),
        marginTop: verticalScale(5),
        marginBottom: verticalScale(5)
    },
    blueMsgContainerStyle: {
        backgroundColor: 'rgba(106, 191, 244, 0.44)'
    },
    greenMsgContainerStyle: {
        backgroundColor: 'rgba(106, 244, 142, 0.44)'
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: scale(2.6),
        backgroundColor: 'transparent'
    }
};

const MessageText = ({ children }) => {
  const { textStyle, msgContainerStyle, blueMsgContainerStyle, greenMsgContainerStyle } = styles;

  return (
      <View
          style={[msgContainerStyle, children.from === 'self' ? blueMsgContainerStyle : greenMsgContainerStyle]}>
          <Text style={textStyle}>
              {children.message}
          </Text>
      </View>
  );
};
export { MessageText };
