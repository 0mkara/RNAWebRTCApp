/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../../src/components/scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        padding: 0
    },
    buttonStyle: {
        height: 30,
        backgroundColor: '#302D2D',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 14,
        color: '#00FB75',
        fontWeight: 'bold',
        marginTop: 5,
        alignItems: 'center',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderColor: '#00FB75',
        borderRadius: 3
    },
    margin30: {
        marginTop: 30,
    },
    buttonTextStyle: {
        color: '#7BFFB8'
    },
    errorText: {
        color: '#fff',
        paddingLeft: 14,
        fontSize: 14
    },
    inputStyle: {
        color: '#fff',
        width: 300,
        fontSize: 16,
        padding: 0
    },
    linearGradient: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: verticalScale(65),
        padding: 14,
        width: '100%',
        fontFamily: 'Nunito-Regular'
    },
    labelText: {
        color: '#fff',
        fontSize: 14,
    },
    navBar: {
        backgroundColor: 'transparent'
    },
    navBarStyles: {
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        marginBottom: 0,
        padding: 0,
        fontFamily: 'Nunito-Regular'
    },
    navbarTitleStyles: {
        fontSize: 24,
        color: '#fff',
        marginTop: 8,
    },
    navbarChatTitleStyles: {
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
        paddingBottom: 5
    },
    logoStyle: {
        marginBottom: 50,
        marginTop: 50,
        fontSize: 100,
        color: '#fff'
    },
    navBarImage: {
        fontSize: 100,
        color: '#fff'
    },
    sideBarList: {
        borderBottomWidth: 0,
        width: '100%',
        // backgroundColor: '#383838',
        // opacity: .2
    },
    sideBarListText: {
        color: '#4E3D3D',

    },
    menuBurgerStyle: {
        height: 26,
        width: 23,
    },
    chatingProfileImageStyle: {
        height: 50,
        width: 50
    },
    chatTextStyle: {
        color: '#fff'
    },
    timeTextStyle: {
        color: '#85C8EC',
        fontSize: 12
    },
    fontStyle: {
        // fontFamily: 'Nunito-Regular'
    }


});
