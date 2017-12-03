# RNAWebRTCApp implements basic WebRTC communication using React Native and socket.io

## Technologies

 * WebRTC data channel
 * React Native & Redux
 * SocketIO server & client signalling

Please use [react-native-webrtc-server](https://github.com/oney/react-native-webrtc-server) for signalling purpose.

## Screenshots
![simulator screen shot - iphone se - 2017-10-08 at 19 37 00](https://user-images.githubusercontent.com/13261372/31317604-b79806b2-ac61-11e7-9f54-1c11d15699b6.png) ![simulator screen shot - iphone se - 2017-10-08 at 19 42 26](https://user-images.githubusercontent.com/13261372/31317605-b7f480f4-ac61-11e7-838a-7d4e311ceff8.png)

## Usage

- Run react-native-webrtc-server
- Install RNAWebRTCApp
- Join room
- Both party can send message to each other

Edit `/src/websocketMiddleware.js` and point to nodejs socketio server.

```
socket = io.connect('https://127.0.0.1:4443', {transports: ['websocket']});
```

## TODO
- [ ] Add audio support
- [ ] Add video support
- [ ] Add multiparty support

## Notes

This project aims to provide a peer to peer interface for full WebRTC chat with a self hosted signalling server.
