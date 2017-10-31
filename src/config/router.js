import { StackNavigator, DrawerNavigator } from 'react-navigation';
import ChatRoomComponent from '../components/ChatRoomComponent';
import Chat from '../components/ChatRoomComponent/chat';
import DrawerContent from '../components/common/DrawerContent';

const RootNavigator = StackNavigator({
    Home: {
      screen: ChatRoomComponent,
    },
    ChatScreen: {
        screen: Chat,
    }
  });
  
    const RouterComponent = DrawerNavigator({
        DrawerHome: {
                screen: RootNavigator,
                header: null
        }
    },
    {
        contentComponent: DrawerContent
    })
  
  export default RouterComponent;