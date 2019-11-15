/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from "react";
import { View, KeyboardAvoidingView, TextInput, Platform, SafeAreaView, AsyncStorage, BackHandler, TouchableOpacity, Alert, ScrollView } from "react-native";
import { connect } from "react-redux";
import { CONNECT, WEBTRC_EXCHANGE, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT, DELETE_OFFER_REQUEST } from "../../actions/types";
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from "../common";
import { verticalScale } from "../scaling";
import styles from "./styles";
import io from "socket.io-client/dist/socket.io";
import { MEMBERS_KEY } from "../../actions/StorageKeys";

import { Container, Text, Header, Content, Icon, Button, List, ListItem, Left, Body, Right, Switch, Thumbnail } from "native-base";
import commonStyle from "../../commonStyle/commonStyle";
import LinearGradient from "react-native-linear-gradient";
import profileImage from "../../images/profile.png";
import { Actions } from "react-native-router-flux";
import moment from "moment";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.onPressExchange = this.onPressExchange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
    this.demoMessageSend = this.demoMessageSend.bind(this);
    this.state = {
      text: null,
      room: "private_room",
      messages: [],
      chatMessage: [{ selfMessage: true, message: "demo message" }]
    };
  }

  async componentDidMount() {
    // this.handleConnect();
    // AsyncStorage.clear();
    if (this.props.offer === null) {
      AsyncStorage.getItem("socketID").then(socketID => {
        this.onPressExchange(socketID);
      });
    }
    if (this.props.offer) {
      this.props.store.dispatch({ type: WEBTRC_EXCHANGE, payload: this.props.offer });
      this.props.store.dispatch({ type: DELETE_OFFER_REQUEST });
    }
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress() {
    Alert.alert("Exit app", "Do you want to exit ?", [
      { text: "No", onPress: () => "no" },
      { text: "Yes", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    let stmsg = this.state.messages;
    console.log(this.state);

    if (this.props.message !== prevProps.message) {
      stmsg = stmsg.concat(message[message.length - 1]);

      this.setState({
        messages: stmsg
      });
    }
  }
  onPressExchange(socketId) {
    const to = this.props.chatID;
    const from = socketId;
    this.props.store.dispatch({ type: CREATE_OFFER, payload: { to, from } });
  }
  handleSend() {
    const msg = {
      from: this.props.my_socket_id,
      msg: this.state.text,
      time: moment().format("HH:mm")
    };
    const messages = this.state.messages.concat(msg);

    this.props.store.dispatch({ type: SEND_MESSAGE, payload: JSON.stringify(msg) });
    this.setState({
      text: "",
      messages
    });
  }
  handleConnect = async () => {
    // this.props.store.dispatch({ type: CONNECT });
  };
  handleJoin = async () => {
    AsyncStorage.setItem(MEMBERS_KEY, "");
    if (this.props.connected) {
      this.props.store.dispatch({ type: JOIN, payload: this.state.room });
      this.props.store.dispatch({ type: "get", payload: this.state.room });
    }
  };
  handleGet() {
    this.props.store.dispatch({ type: "get", payload: this.state.room });
  }
  handleLeave() {
    this.props.store.dispatch({ type: DISCONNECT });
  }
  handleKeyboardHeight() {}

  demoMessageSend(msg) {
    this.props.store.dispatch({ type: SEND_MESSAGE, payload: this.state.text });
  }
  render() {
    const { messages } = this.state;
    const { socketids, my_socket_id } = this.props;

    let heightOfInput = 0;
    return (
      <Container>
        <LinearGradient colors={["#5C4DD0", "#491E5A"]} style={commonStyle.linearGradient}>
          <ScrollView>
            <Content style={{ flex: 1, height: "100%" }}>
              <Text style={{ color: "#fff", textAlignVertical: "center", textAlign: "center", fontSize: 12 }}>Today 4.35 PM</Text>
              {messages.map((i, e) =>
                i.from !== my_socket_id ? (
                  <View key={e}>
                    <List>
                      <ListItem avatar>
                        <Left>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require("../../images/profile.png")} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                          <Text note style={commonStyle.chatTextStyle}>
                            {i.msg}
                          </Text>
                          <Text note style={commonStyle.timeTextStyle}>
                            {i.time}
                          </Text>
                        </Body>
                      </ListItem>
                    </List>
                  </View>
                ) : (
                  <View key={e}>
                    <List>
                      <ListItem avatar>
                        <Body style={{ borderBottomWidth: 0 }}>
                          <Right style={{ position: "absolute", right: 15 }}>
                            <Text note style={commonStyle.chatTextStyle}>
                              {i.msg}
                            </Text>
                            <Text note style={commonStyle.timeTextStyle}>
                              {i.time}
                            </Text>
                          </Right>
                        </Body>
                        <Right style={{ borderBottomWidth: 0 }}>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require("../../images/profile.png")} />
                        </Right>
                      </ListItem>
                    </List>
                  </View>
                )
              )}
            </Content>
          </ScrollView>
          <View style={styles.chatContainerStyle}>
            <KeyboardAvoidingView
              behavior="padding"
              // keyboardVerticalOffset={verticalScale(123)}
              contentContainerStyle={styles.chatAvoidingViewStyle}
            >
              {/* <View style={styles.chatViewStyle}>
                {messages.map((item, index) => (
                  <MessageText key={index}>{item}</MessageText>
                ))}
              </View> */}
              <View style={styles.messageViewStyle}>
                <TextInput
                  placeholder="Enter your Message"
                  placeholderTextColor="#fff"
                  autoCorrect={false}
                  style={styles.inputStyle}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  multiline={true}
                  autoCapitalize="none"
                  numberOfLines={heightOfInput}
                  onContentSizeChange={event => {
                    heightOfInput = event.nativeEvent.contentSize.height;
                  }}
                />
                <TouchableOpacity style={commonStyle.buttonStyle} onPress={this.handleSend}>
                  <Text style={commonStyle.buttonTextStyle}>Send</Text>
                </TouchableOpacity>
              </View>

              <View></View>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = ({ connection, routes, chatReducer }) => {
  const { connected, socketids, message, datachan_stat, room_joined, my_socket_id, offer } = connection;
  const { chatID } = chatReducer;
  return { connected, socketids, message, datachan_stat, room_joined, my_socket_id, routes, chatID, offer };
};
export default connect(mapStateToProps, {})(ChatRoom);
