// @flow
import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, Platform, SafeAreaView, AsyncStorage, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import { MEMBERS_KEY } from '../../actions/StorageKeys';
import { userChanged } from '../../actions/ChatAction';
import { createRoom, leaveRoom } from '../../actions/WebSocketActions';

import { Container, Text, Header, Content, Icon, Button, List, ListItem, Left, Body, Right, Switch, Thumbnail } from 'native-base';
import commonStyle from '../../commonStyle/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

class UserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      room: 'private_room',
      messages: [],
      userList: []
    };
    this.chat = this.chat.bind(this);
    // this.userList = [{ name: 'Peter Seller' }, { name: 'Marlo Brando' }, { name: 'Hound' }, { name: 'Ellen' }, { name: 'Rocky' }, { name: 'Fedrick' }];
  }

  async componentDidMount() {
    await this.props.store.dispatch({ type: CONNECT });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
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
    await this.props.leaveRoom();
  }

  chat(name) {
    this.props.store.dispatch(userChanged(name));
    Actions.home_map();
  }

  render() {
    const { chatUser } = this.props;
    return (
      <Container style={commonStyle.container}>
        <LinearGradient colors={['#5C4DD0', '#491E5A']} style={commonStyle.linearGradient}>
          <Content>
            <View>
              <List>
                {this.state.userList &&
                  this.state.userList.map((e, i) => (
                    <ListItem avatar key={i} style={{ paddingBottom: 15 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.chat(e.Name);
                        }}
                        style={{ width: '100%', margin: 0, padding: 0 }}
                      >
                        <Left tyle={{ width: '100%', margin: 0, padding: 0 }}>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require('../../images/profile.png')} />
                          <Text style={{ marginLeft: 20, color: '#fff' }}>{e.Name}</Text>
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
  const { connected, socketids, message, datachan_stat, room_joined, my_socket_id } = connection;
  const { chatUser, roomInfo } = chatReducer;
  return { connected, socketids, message, datachan_stat, room_joined, my_socket_id, routes, chatUser, roomInfo };
};
export default connect(
  mapStateToProps,
  { createRoom, leaveRoom }
)(UserListing);
