// @flow
import { AsyncStorage } from 'react-native';
import { WEBTRC_EXCHANGE, EXCHANGE, DISCONNECT, CONNECT, JOIN } from './actions/types';
import { MEMBERS_KEY } from './actions/StorageKeys';
import io from 'socket.io-client';
import { connecting, connected, disconnected, roomMembers, roomMember, roomJoin } from './actions';
const webSocketMiddleware = (function(){
	let socket = null;

	const onOpen = (store) => evt => {
		//Send a handshake, or authenticate with remote end
		//Tell the store we're connected
		store.dispatch(connected);
	}

	const onClose = (store) => evt => {
		//Tell the store we've disconnected
		store.dispatch(disconnected);
	}

	const onExchangeMessage = (store) => data => {
		// exchange webrtc data
		store.dispatch({ type: WEBTRC_EXCHANGE, payload: data });
	}

	const onMembers = (store) => socketId => {
		console.log(socketId);
		let socketIds = [];
		AsyncStorage.getItem(MEMBERS_KEY, (err, data) => {
			if(data !== null) {
				socketIds = JSON.parse(data);
			}
			socketIds.push(socketId);
			AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(socketIds));
			store.dispatch(roomMembers(socketIds));
		})
	}
	return store => next => action => {
		//console.log(action);
		switch(action.type) {
			//The user wants us to connect
			case CONNECT:
				//console.log("Connecting websocket");
				//Start a new connection to the server
				if(socket !== null) {
					socket.close();
				}
				//Send an action that shows a "connecting..." status for now
				store.dispatch(connecting);

				//Attempt to connect (we could send a 'failed' action on error)
				socket = io.connect('https://192.168.0.14:4443', {transports: ['websocket']});
				socket.on('connect', onOpen(store));
				socket.on('leave', onClose(store));
				socket.on('exchange', onExchangeMessage(store));
				socket.on('new_member', onMembers(store));
				break;

			//The user wants us to disconnect
			case DISCONNECT:
				if(socket !== null) {
					socket.close();
				}
				socket = null;
				store.dispatch(disconnected);
				break;

			//Send the 'SEND_MESSAGE' action down the websocket to the server
			case EXCHANGE:
				socket.emit('exchange', action.payload);
				break;
			case JOIN:
				socket.emit('join', action.payload, (socketIds) => {
					store.dispatch(roomJoin);
					AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(socketIds));
					store.dispatch(roomMembers(socketIds));
				});
				break;
			//This action is irrelevant to us, pass it on to the next middleware
			default:
				return next(action);
		}
	}
})();
export { webSocketMiddleware };
