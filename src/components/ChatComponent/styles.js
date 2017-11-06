import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale } from '../scaling';

const { width, height } = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    height: height - 65,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'aliceblue',
    //paddingTop: verticalScale(25)
  },
  inputStyle : {
      height: 40,
      width: 60,
      borderColor: 'gray',
      borderWidth: 1
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
  },
  chatViewStyle: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  },
  messageViewStyle: {
      width,
      justifyContent: 'flex-end'
  },
  chatAvoidingViewStyle: {
      flex: 1,
  },
  headerStyle: {
      height: 40,
      paddingLeft: 0,
      paddingRight: 15,
      borderRadius: 5
  },
  messageInputWrapper: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#efefef'
  }
});
