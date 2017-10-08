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
      flexDirection: 'row',
  },
  chatAvoidingViewStyle: {
      flex: 1,
  }
});
