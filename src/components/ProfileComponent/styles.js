import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width } = Dimensions.get('screen');
export default StyleSheet.create({

    linearGradient: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        paddingTop: verticalScale(65)
    },
    profileImageStyle: {
        alignContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 100
    },
    imageUploadIcon: {
        color: '#491E5A',
        backgroundColor: '#7BFFB8',
        padding: 8,
        borderRadius: 100
    }
});
