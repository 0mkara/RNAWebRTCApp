import React from 'react';
import { Scene, Router, Drawer, Stack } from 'react-native-router-flux';
import configureStore from './configureStore';
import ChatRoom from './components/ChatRoomComponent';
import {
	Text,
	View,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import DrawerContent from './components/DrawerContent';
import MenuIcon from './images/menu_burger.png';
const RouterComponent = () => {
	const store = configureStore();
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
};

export default RouterComponent;