import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from '../scaling';

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: "#444",
        fontSize: 12,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    buttonContainerStyle: {
        height: verticalScale(25),
        width: scale(80),
        borderRadius: scale(2.6),
        shadowColor: '#110E19',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: scale(2.6),
        elevation: 1,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: scale(2.6),
        width: '100%'
    },
    buttonGradientStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: scale(2.6)
    }
};

const GreenBtn = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <LinearGradient
        colors={['#979797', '#979797']}
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
        style={styles.buttonContainerStyle}>
          <TouchableOpacity onPress={onPress} style={[buttonStyle, {margin: 0}]}>
            <LinearGradient
                colors={['#19e8b3', '#abed57']}
                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
                style={styles.buttonGradientStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
            </LinearGradient>
          </TouchableOpacity>
      </LinearGradient>
  );
};
export { GreenBtn };
