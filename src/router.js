/* import React from 'react';
import { Scene, Router, Drawer, Stack, Actions } from 'react-native-router-flux';
import configureStore from './configureStore';
import ChatRoom from './components/ChatRoomComponent';
import {
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';
import DrawerContent from './components/common/DrawerContent';
import MenuIcon from './images/ic_menu.png';
const store = configureStore();
const RouterComponent = ({navigation}) => {
	return (
		<Router store={store}>
			<Stack key="root">
				<Drawer
					hideNavBar
					key="drawer"
					contentComponent={DrawerContent}
					drawerImage={MenuIcon}
					drawerWidth={300}
				>
					<Scene hideNavBar>
						<Stack key="home" tabs={false}>
							<Scene key="home_map" component={ChatRoom} title="Home"></Scene>
						</Stack>
					</Scene>
				</Drawer>
			</Stack>
		</Router>
	);
}; */

import ChatRoom from './components/ChatRoomComponent';
import DrawerContent from './components/common/DrawerContent';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

const RootNavigator = StackNavigator({
  Home: {
    screen: ChatRoom,
  }
});

const RouterComponent = DrawerNavigator({
  DrawerHome: {
		screen: RootNavigator,
		header: null
  }
})

export default RouterComponent;