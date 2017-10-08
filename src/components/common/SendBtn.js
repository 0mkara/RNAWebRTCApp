import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from '../scaling';

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: "#7e81a8",
        fontSize: Math.round(scale(16)),
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    buttonContainerStyle: {
        height: verticalScale(41),
        width: scale(52),
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'transparent'
    }
};

const SendBtn = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <LinearGradient
          colors={['#6AF48E', '#6AF48E']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
          style={styles.buttonContainerStyle}>
          <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
              {children}
            </Text>
          </TouchableOpacity>
      </LinearGradient>
  );
};
export { SendBtn };
