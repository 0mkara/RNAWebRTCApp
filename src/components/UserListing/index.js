// @flow
import React, { Component } from "react";
import { View, KeyboardAvoidingView, TextInput, Platform, SafeAreaView, AsyncStorage, BackHandler, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from "../../actions/types";
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from "../common";
import { verticalScale } from "../scaling";
import styles from "./styles";
import { MEMBERS_KEY } from "../../actions/StorageKeys";
import { userChanged, setChatID } from "../../actions/ChatAction";
import { createRoom, leaveRoom } from "../../actions/WebSocketActions";

import { Container, Text, Header, Content, Icon, Button, List, ListItem, Left, Body, Right, Switch, Thumbnail } from "native-base";
import commonStyle from "../../commonStyle/commonStyle";
import LinearGradient from "react-native-linear-gradient";
import { Actions } from "react-native-router-flux";

class UserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
      // offers: null
    };
    this.chat = this.chat.bind(this);
  }

  async componentDidMount() {
    await this.props.store.dispatch({ type: CONNECT });
  }

  componentDidUpdate(prevProps) {
    this.createRoom();

    if (prevProps.roomInfo != this.props.roomInfo) {
      this.setState({ userList: this.props.roomInfo });
    }
  }

  async createRoom() {
    if (this.props.connected && this.props.room_joined === false && this.props.my_socket_id) {
      await this.props.createRoom();
    }
  }

  async componentWillUnmount() {
    // await this.props.leaveRoom();
  }

  chat(name, socketID) {
    console.log(socketID, name);

    this.props.store.dispatch(userChanged(name));
    this.props.store.dispatch(setChatID(socketID));

    Actions.home_map();
  }

  render() {
    const { chatUser, my_socket_id } = this.props;
    return (
      <Container style={commonStyle.container}>
        <LinearGradient colors={["#5C4DD0", "#491E5A"]} style={commonStyle.linearGradient}>
          <Content>
            <View>
              <List>
                {this.state.userList &&
                  this.state.userList.map((e, i) => (
                    <ListItem avatar key={i} style={{ paddingBottom: 15 }}>
                      <TouchableOpacity onPress={() => this.chat(e.Name, e.SocketID)} style={{ width: "100%", margin: 0, padding: 0 }}>
                        <Left tyle={{ width: "100%", margin: 0, padding: 0 }}>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require("../../images/profile.png")} />
                          <Text style={{ marginLeft: 20, color: "#fff" }}>{e.Name}</Text>
                          {this.props.offer && this.props.offer.from == e.SocketID && <Text style={styles.offerCounterStyle}>1</Text>}
                        </Left>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
              </List>
            </View>
          </Content>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = ({ connection, routes, chatReducer }) => {
  const { connected, socketids, message, datachan_stat, room_joined, my_socket_id, offer } = connection;
  const { chatUser, roomInfo } = chatReducer;
  return { connected, socketids, message, datachan_stat, room_joined, my_socket_id, routes, chatUser, roomInfo, offer };
};
export default connect(mapStateToProps, { createRoom, leaveRoom })(UserListing);
