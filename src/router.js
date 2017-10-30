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
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('ChatRoom', () => ChatRoom);

const RouterComponent = Navigation.startSingleScreenApp({
	screen: {
	  screen: 'ChatRoom',
	  title: 'Home',
	},
	drawer: {
	  left: {
		screen: DrawerContent,
		passProps: {},
	  },
	  style: {
		drawerShadow: true,
		contentOverlayColor: 'rgba(0,0,0,0.25)',
		leftDrawerWidth: 50,
		rightDrawerWidth: 50
	  },
	  type: 'MMDrawer',
	  animationType: 'door',
	  disableOpenGesture: false
	},
	passProps: {},
	animationType: 'slide-down'
});

export default RouterComponent;