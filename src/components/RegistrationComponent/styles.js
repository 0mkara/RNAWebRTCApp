import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: verticalScale(65)
    },
    inputStyle: {
        height: 40,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 }
    },
    loginBtn: {
        borderWidth: 0,
        borderRadius: 100
    },
    bottomText: {
        marginTop: 25
    },
    chatContainerStyle: {
        flex: 1,
    },
    chatViewStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    messageViewStyle: {
        width,
        flexDirection: 'row',
    },
    chatAvoidingViewStyle: {
        flex: 1,
    }
});
