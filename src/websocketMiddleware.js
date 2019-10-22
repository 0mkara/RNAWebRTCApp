// @flow
import { AsyncStorage } from 'react-native';
import { WEBTRC_EXCHANGE, EXCHANGE, DISCONNECT, CONNECT, JOIN, CREATE_ROOM } from './actions/types';
import { MEMBERS_KEY } from './actions/StorageKeys';
// import io from 'socket.io-client';
import io from 'socket.io-client/dist/socket.io';

import { connecting, connected, disconnected, roomMembers, roomMember, roomJoin, setMySocketID } from './actions';
const webSocketMiddleware = (function() {
  let socket = null;

  const onOpen = store => evt => {
    //Send a handshake, or authenticate with remote end
    //Tell the store we're connected
    // console.log(evt);
    console.log('Connection is established');
    store.dispatch(connected);
  };

  const onClose = store => evt => {
    //Tell the store we've disconnected
    store.dispatch(disconnected);
  };

  const onJoined = () => {
      console.log('JOINED TO ROOM')
  };

  const onExchangeMessage = store => data => {
    // exchange webrtc data
    store.dispatch({ type: WEBTRC_EXCHANGE, payload: data });
  };

  const onMembers = store => socketId => {
    console.log('MEMBER');
    console.log(socketId);
    let socketIds = [];
    AsyncStorage.getItem(MEMBERS_KEY, (err, data) => {
      if (data !== null) {
        socketIds = JSON.parse(data);
      }
      for (let x = 0; x < socketId.length; x++) {
        socketIds.push(socketId[x]);
      }
      // socketIds.push(socketId);
      AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(socketIds));
      store.dispatch(roomMembers(socketIds));
    });
  };

  const failed = () => {
    //Tell the store we've disconnected
    console.log('Connection is lost');
  };
  const _retrieveAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };

  const mySocketId = store => mySocketId => {
    console.log('My ID');
    console.log(mySocketId);
    store.dispatch(setMySocketID(mySocketId));
  };

  return store => next => action => {
    //console.log(action);
    switch (action.type) {
      //The user wants us to connect
      case CONNECT:
        //console.log("Connecting websocket");
        //Start a new connection to the server
        if (socket !== null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        store.dispatch(connecting);

        //Attempt to connect (we could send a 'failed' action on error)
        // socket = io.connect('https://100.26.248.243', { transports: ['websocket'], secure: true, reconnect: true, rejectUnauthorized: false });
        AsyncStorage.getItem('access_token').then(token => {
          if (token) {
            console.log(token);
            socket = io('http://192.168.0.104:8080?access_token=' + token + '', {
              transports: ['websocket']
            });
            socket.set('origins', '*');
            socket.on('connect_failed', failed());
            socket.on('connect_error', err => {
              console.log(JSON.stringify(err));
            });
            socket.on('connect', onOpen(store));
            socket.on('leave', onClose(store));
            socket.on('join', onJoined());
            socket.on('exchange', onExchangeMessage(store));
            socket.on('my_socket_id', mySocketId(store));
            socket.on('socket_ids', onMembers(store));
          }
        });

        break;

      //The user wants us to disconnect
      case DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        store.dispatch(disconnected);
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case CREATE_ROOM:
        socket.emit('join');
        break;
      case EXCHANGE:
        socket.emit('exchange', action.payload);
        break;
      case JOIN:
        socket.emit('join', action.payload, socketIds => {
          console.log(socketIds);
          store.dispatch(roomJoin);
          AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(socketIds));
          store.dispatch(roomMembers(socketIds));
        });
        break;
      case 'get':
        console.log('GET CLICKED');
        socket.emit('get', action.payload, () => {
          console.log('get called');
        });
        break;
      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  };
})();
export { webSocketMiddleware };
