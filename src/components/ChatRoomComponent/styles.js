/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-dupe-keys */
import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'aliceblue',
        paddingTop: verticalScale(65)
    },
    inputStyle: {
        // height: 40,
        borderColor: '#7BFFB8',
        borderWidth: 1,
        backgroundColor: 'transparent',
        width: '70%',
        borderRadius: 5,
        paddingLeft: 20,
        color: '#fff'
    },
    joinRoomStyle: {
        width: (width - 20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    connectLstStyle: {
        width: (width - 20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chatContainerStyle: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        padding: 27
    },
    chatViewStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    messageViewStyle: {
        width: (width - 20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingRight: 20
    },
    chatAvoidingViewStyle: {
        flex: 1,
    }
});
