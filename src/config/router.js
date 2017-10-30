import { StackNavigator } from 'react-navigation';
import ChatRoomComponent from '../components/ChatRoomComponent';

export default StackNavigator(
    {
        Home: {
            screen: ChatRoomComponent,
            navigationOptions: {
                header: () => null
            }

        },
    },
    {
        headerMode: 'screen'

    }
)
