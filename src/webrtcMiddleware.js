// @flow
import {
  WEBTRC_EXCHANGE,
  CREATE_OFFER,
  EXCHANGE,
  SEND_MESSAGE,
  BROADCAST_OFFER
} from "./actions/types";
import { incommingMessage, datachannelOpened } from "./actions";
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate
} from "react-native-webrtc";

const webrtcMiddleware = (function() {
  let socketId = null;
  const configuration = {
    iceServers: [{ url: "stun:stun.l.google.com:19302" }]
  };
  const connection = { optional: [{ DtlsSrtpKeyAgreement: true }] };
  const peerconn = new RTCPeerConnection(configuration, connection);
  // const sdpConstraints = {'mandatory': { 'OfferToReceiveAudio': false, 'OfferToReceiveVideo': false }};
  const offerOpts = { offertoreceiveaudio: false, offertoreceivevideo: false };

  peerconn.onnegotiationneeded = function(event) {
    console.log("onnegotiationneeded");
  };
  peerconn.oniceconnectionstatechange = function(event) {
    console.log("oniceconnectionstatechange");
  };
  peerconn.onsignalingstatechange = function() {
    console.log("onsignalingstatechange");
  };
  peerconn.onaddstream = function() {
    console.log("onaddstream");
  };
  peerconn.onremovestream = function() {
    console.log("onremovestream");
  };

  function logError(error) {
    console.log("logError", error);
  }
  function createOffer(store, action) {
    console.log(action.payload);
    const dataChannel = peerconn.createDataChannel("text_chan", {
      reliable: false
    });
    peerconn.createOffer(offerOpts).then(desc => {
      peerconn
        .setLocalDescription(desc)
        .then(() => {
          // store.dispatch({ type: EXCHANGE, payload: { to: action.payload.to, sdp: peerconn.localDescription, from: action.payload.from } });
          store.dispatch({
            type: BROADCAST_OFFER,
            payload: {
              to: action.payload.to,
              from: action.payload.from,
              sdp: peerconn.localDescription
            }
          });
        })
        .catch(err => console.error("createOffer error : ", err));
    });

    dataChannel.onopen = function() {
      console.log("dataChannel.onopen");
      store.dispatch(datachannelOpened());
    };
    dataChannel.onclose = function() {
      console.log("dataChannel.onclose");
    };
    dataChannel.onmessage = function(event) {
      console.log("dataChannel.onmessage [incomming message]:", event.data);
      store.dispatch(incommingMessage(action.payload.from, event.data));
    };
    dataChannel.onerror = function(error) {
      console.log("dataChannel.onerror", error);
    };
    peerconn.textDataChannel = dataChannel;
  }
  function exchange(store, data) {
    if (socketId === null) {
      console.log("Setting Socket ID", data.from);

      socketId = data.from;
    }
    if (data.sdp) {
      console.log("exchange sdp", data);
      peerconn
        .setRemoteDescription(new RTCSessionDescription(data.sdp))
        .then(() => {
          if (peerconn.remoteDescription.type === "offer") {
            peerconn.createAnswer(offerOpts).then(desc => {
              peerconn
                .setLocalDescription(desc)
                .then(() => {
                  store.dispatch({
                    type: EXCHANGE,
                    payload: {
                      to: data.from,
                      from: data.to,
                      sdp: peerconn.localDescription
                    }
                  });
                })
                .catch(err => console.error("exchange sdp error : ", err));
            });
          }
        });
    } else {
      console.log("exchange candidate");
      peerconn.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }
  return store => next => action => {
    peerconn.onicecandidate = function(event) {
      console.log("onicecandidate");
      if (event.candidate && socketId !== null) {
        console.log("scsc", socketId);

        store.dispatch({
          type: EXCHANGE,
          payload: { to: socketId, candidate: event.candidate }
        });
      }
    };
    peerconn.ondatachannel = function(event) {
      const receiveChannel = event.channel;

      receiveChannel.onopen = data => {
        console.log("Datachanel Opened ", data);
      };

      receiveChannel.onmessage = data => {
        console.log("Message Recieved ", data, data.data);
      };
      if (!peerconn.textDataChannel) {
        peerconn.textDataChannel = receiveChannel;
        store.dispatch(datachannelOpened());
      }
    };

    switch (action.type) {
      case CREATE_OFFER:
        createOffer(store, action);
        break;
      case WEBTRC_EXCHANGE:
        exchange(store, action.payload);
        break;
      case SEND_MESSAGE:
        console.log("MSG", action.payload);

        peerconn.textDataChannel.send(action.payload);
        break;
      default:
        return next(action);
    }
  };
})();

export { webrtcMiddleware };
