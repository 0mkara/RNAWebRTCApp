import React from 'react';
import { Scene, Router, Drawer, Stack } from 'react-native-router-flux';
import configureStore from './configureStore';
import ChatRoom from './components/ChatRoomComponent';
import Login from './components/LoginComponent';
import Registration from './components/RegistrationComponent';
import ForgotPassword from './components/ForgottPassword';
import SplashScreen from './components/SplashScreen'
import commonStyle from './commonStyle/commonStyle';
import NavBar from './components/NavBar/Navbar';
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
				<Scene key="splash" hideNavBar component={SplashScreen} title="spalsh"></Scene>
				<Scene key="login" navBar={NavBar} component={Login} title="Login"></Scene>
				<Scene key="signup" navBar={NavBar} component={Registration} title="Sign up"></Scene>
				<Scene key="forgottpassword" navBar={NavBar} component={ForgotPassword} title="Forgot password"></Scene>
				<Scene hideNavBar>
					<Stack key="home" tabs={false}>
						<Drawer
							hideNavBar
							key="drawer"
							contentComponent={DrawerContent}
							navBar={NavBar}
							drawerImage={MenuIcon}
							drawerWidth={300}
						>
							<Scene key="home_map" component={ChatRoom} title="Home"></Scene>
						</Drawer>
					</Stack>
				</Scene>
			</Stack>
		</Router>
	);
};

export default RouterComponent;