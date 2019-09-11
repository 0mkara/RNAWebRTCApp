import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../../src/components/scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        padding: 0
    },
    buttonStyle: {
        height: 40,
        backgroundColor: '#302D2D',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 14,
        color: '#00FB75',
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 30,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: '#00FB75'
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
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        paddingTop: verticalScale(65),
        padding: 27
    },
    labelText: {
        color: '#fff',
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
        right: 0
    },
    navbarTitleStyles: {
        fontSize: 24,
        color: '#fff',
        margin: 12
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

    }


});
