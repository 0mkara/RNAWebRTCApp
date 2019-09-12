import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#fff',
        // backgroundColor: '#2778ff',
        // paddingTop: verticalScale(65)
    },
    inputStyle: {
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#fff',
        borderRadius: 100,
        marginBottom: 10,
        paddingLeft: 20
    },
    buttonStyle: {
        height: 50,
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#fff',
        borderRadius: 100,
        marginBottom: 5,
        padding: 14,
        color: '#2778ff',
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 30

    },
    errorText: {
        marginBottom: 5,
        color: '#fff',
        padding: 14,
        paddingBottom: 0,
        fontSize: 14
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        paddingTop: verticalScale(65)
    },
    buttonText: {
        color: '#5C4DD0',
        fontWeight: 'bold',

    },
    labelText: {
        color: '#fff'
    },
    loginBtn: {
        borderWidth: 0,
        borderRadius: 100
    },
    bottomText: {
        marginTop: 12,
        color: '#fff',
        fontWeight: 'bold'
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
    },
    formStyle: {
        alignItems: 'center'
    }, logoStyle: {
        marginBottom: 50,
        fontSize: 100,
        color: '#fff'
    }
});
