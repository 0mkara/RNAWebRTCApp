/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, Platform, SafeAreaView, AsyncStorage, BackHandler, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import io from 'socket.io-client/dist/socket.io';
import { MEMBERS_KEY } from '../../actions/StorageKeys';

import { Container, Text, Header, Content, Icon, Button, List, ListItem, Left, Body, Right, Switch, Thumbnail } from 'native-base';
import commonStyle from '../../commonStyle/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import profileImage from '../../images/profile.png';
import { Actions } from 'react-native-router-flux';

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
      room: 'private_room',
      messages: [],
      chatMessage: [{ selfMessage: true, message: 'demo message' }]
    };
  }

  componentDidMount() {
    this.handleConnect();
    AsyncStorage.clear();

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress() {
    Alert.alert('Exit app', 'Do you want to exit ?', [{ text: 'No', onPress: () => 'no' }, { text: 'Yes', onPress: () => BackHandler.exitApp() }]);
    return true;
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    const stmsg = this.state.messages;
    if (this.props.message !== prevProps.message && message.from !== undefined) {
      stmsg.push(message);
      this.setState({
        messages: stmsg
      });
    }
  }
  onPressExchange(socketId) {
    this.props.store.dispatch({ type: CREATE_OFFER, payload: socketId });
  }
  handleSend() {
    const messages = this.state.messages;
    messages.push({ from: 'self', message: this.state.text });
    this.props.store.dispatch({ type: SEND_MESSAGE, payload: this.state.text });
    this.setState({
      text: '',
      messages
    });
  }
  handleConnect = async () => {
    this.props.store.dispatch({ type: CONNECT });
  };
  handleJoin = async () => {
    AsyncStorage.setItem(MEMBERS_KEY, '');
    if (this.props.connected) {
      console.log('Connected');
      this.props.store.dispatch({ type: JOIN, payload: this.state.room });
      this.props.store.dispatch({ type: 'get', payload: this.state.room });
    }
    console.log(this.state.room);
  };
  handleGet() {
    this.props.store.dispatch({ type: 'get', payload: this.state.room });
  }
  handleLeave() {
    this.props.store.dispatch({ type: DISCONNECT });
  }
  handleKeyboardHeight() {
    console.log(event);
  }

  demoMessageSend(msg) {
    if (this.state.text.length > 0) {
      const message = this.state.chatMessage;
      message.push({ selfMessage: false, message: msg });
      this.setState({ chatMessage: message });
      this.setState({ text: '' });
    }
  }
  render() {
    const { messages } = this.state;
    const { socketids, my_socket_id } = this.props;
    console.log(this.props);
    let heightOfInput = 0;
    return (
      <Container>
        <LinearGradient colors={['#5C4DD0', '#491E5A']} style={commonStyle.linearGradient}>
          <ScrollView>
            <Content style={{ flex: 1, height: '100%' }}>
              <Text style={{ color: '#fff', textAlignVertical: 'center', textAlign: 'center', fontSize: 12 }}>Today 4.35 PM</Text>
              {this.state.chatMessage.map((i, e) =>
                i.selfMessage ? (
                  <View key="i">
                    <List>
                      <ListItem avatar>
                        <Left>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require('../../images/profile.png')} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                          <Text note style={commonStyle.chatTextStyle}>
                            {i.message}
                          </Text>
                          <Text note style={commonStyle.timeTextStyle}>
                            3 minute ago
                          </Text>
                        </Body>
                      </ListItem>
                    </List>
                  </View>
                ) : (
                  <View key="i">
                    <List>
                      <ListItem avatar>
                        <Body style={{ borderBottomWidth: 0 }}>
                          <Right style={{ position: 'absolute', right: 15 }}>
                            <Text note style={commonStyle.chatTextStyle}>
                              {i.message}
                            </Text>
                            <Text note style={commonStyle.timeTextStyle}>
                              3 minute ago
                            </Text>
                          </Right>
                        </Body>
                        <Right style={{ borderBottomWidth: 0 }}>
                          <Thumbnail style={commonStyle.chatingProfileImageStyle} source={require('../../images/profile.png')} />
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
              <View style={styles.chatViewStyle}>
                {messages.map((item, index) => (
                  <MessageText key={index}>{item}</MessageText>
                ))}
              </View>
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
                <TouchableOpacity
                  style={commonStyle.buttonStyle}
                  onPress={() => {
                    this.demoMessageSend(this.state.text);
                  }}
                >
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

const mapStateToProps = ({ connection, routes }) => {
  const { connected, socketids, message, datachan_stat, room_joined, my_socket_id } = connection;
  return { connected, socketids, message, datachan_stat, room_joined, my_socket_id, routes };
};
export default connect(
  mapStateToProps,
  {}
)(ChatRoom);
