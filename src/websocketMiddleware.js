// @flow
import { AsyncStorage } from 'react-native';
import { WEBTRC_EXCHANGE, EXCHANGE, DISCONNECT, CONNECT, JOIN, CREATE_ROOM, LEAVE_ROOM } from './actions/types';
import { MEMBERS_KEY } from './actions/StorageKeys';
// import io from 'socket.io-client';
import io from 'socket.io-client/dist/socket.io';
import env from 'react-native-config';

import { connecting, connected, disconnected, roomMembers, roomMember, roomJoin, setMySocketID, roomInfo, saveRoomInfo } from './actions';
const webSocketMiddleware = (function() {
  let socket = null;

  const onOpen = store => {
    //Send a handshake, or authenticate with remote end
    //Tell the store we're connected
    // console.log(evt);
    console.log('Connection is established');
    store.dispatch(connected);
  };

  const onClose = store => {
    //Tell the store we've disconnected
    console.log('Connection is Closed');

    store.dispatch(disconnected);
  };

  const onJoined = data => {
    console.log('JOINED TO ROOM', data);
  };

  const onDisconnect = () => {
    console.log('DISCONNECTED');
  };

  const onExchangeMessage = store => data => {
    console.log('Message Exchanged');

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

  const failed = res => {
    //Tell the store we've disconnected
    console.log('Connection is lost', res);
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
        console.log('CONNECTINGGGGGGGGGG');

        //console.log("Connecting websocket");
        //Start a new connection to the server
        if (socket !== null) {
          console.log(socket);
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        store.dispatch(connecting);

        //Attempt to connect (we could send a 'failed' action on error)
        // socket = io.connect('https://100.26.248.243', { transports: ['websocket'], secure: true, reconnect: true, rejectUnauthorized: false });
        AsyncStorage.getItem('access_token').then(token => {
          if (token) {
            // console.log(token);
            socket = io(env.API_HOST + ':' + env.API_PORT + '?access_token=' + token + '', {
              transports: ['websocket']
            });
            if (socket !== null) {
              socket.on('connect_failed', failed);
              socket.on('connect_error', err => {
                console.log(JSON.stringify(err));
              });

              socket.on('connect', () => {
                console.log('Connection is established');
                store.dispatch(connected);
              });
              socket.on('disconnect', onDisconnect);
              socket.on('leave', () => {
                //Tell the store we've disconnected
                console.log('Connection is Closed');

                store.dispatch(disconnected);
              });
              socket.on('join', data => {
                console.log('JOINED TO ROOM', data);
                AsyncStorage.setItem('roomname', data);
                store.dispatch(roomJoin);
              });
              socket.on('exchange', onExchangeMessage(store));
              socket.on('my_socket_id', mySocketId(store));
              socket.on('socket_ids', onMembers(store));
              socket.on('get_user_details', data => {
                console.log('Rooom DETAILS DATA', data);
                store.dispatch(saveRoomInfo(data));
              });
            }
          }
        });

        break;

      //The user wants us to disconnect
      case DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        console.log('Disconnecting');

        socket = null;
        store.dispatch(disconnected);
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case CREATE_ROOM:
        console.log('Creating Room');
        console.log('USERID', action.payload);
        socket.emit('create', action.payload);
        break;

      case LEAVE_ROOM:
        console.log('Leaving Room');
        socket.emit('leave');
        break;
      case EXCHANGE:
        console.log('EXCHANGING');
        socket.emit('exchange', action.payload);
        break;
      case JOIN:
        console.log('Join called');

        // socket.emit('join', action.payload, socketIds => {
        //   console.log(socketIds);
        //   store.dispatch(roomJoin);
        //   AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(socketIds));
        //   store.dispatch(roomMembers(socketIds));
        // });
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
