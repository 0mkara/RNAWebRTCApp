import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#2778ff',
        // paddingTop: verticalScale(65)
    },
    buttonText: {
        color: '#2778ff',
        fontWeight: 'bold',
    },
    errorText: {
        marginBottom: 10
    },
    loginBtn: {
        borderWidth: 0,
        borderRadius: 100
    },
    bottomText: {
        marginTop: 25,
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
    linearGradient: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        paddingTop: verticalScale(65)
    },
    logoStyle: {
        fontSize: 100,
        color: '#fff'
    },
    labelText: {
        color: '#fff'
    },
});
