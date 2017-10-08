import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import configureStore from './configureStore';
import ChatRoom from './components/ChatRoomComponent';
const store = configureStore();
const RouterComponent = () => {
	return (
		<Router store={store}>
			<Scene overlay>
				<Scene key="lightbox" lightbox initial>
					<Scene key="root" hideNavBar hideTabBar>
						<Scene key="home" tabs={false} hideNavBar panHandlers={null}>
							<Scene key="home_map" component={ChatRoom} title="Home"></Scene>
						</Scene>
					</Scene>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
