// @flow
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import MenuIcon from '../../images/ic_menu.png';

class ChatRoom extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: navigation.state.params.header,
      });
    constructor(props) {
        super(props);
        this.onPressExchange = this.onPressExchange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.state = {
            text: null,
            room: "private_room",
            messages: []
        }
    }
    componentWillMount(){
        const {setParams} = this.props.navigation;
        setParams({header: null})
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.message.from !== undefined) {
            const messages = this.state.messages;
            messages.push(nextProps.message)
            this.setState({
                messages,
            })
        }
    }
    onPressExchange(socketId) {
        this.props.store.dispatch({ type: CREATE_OFFER, payload: socketId });
    }
    handleSend() {
        const messages = this.state.messages;
        messages.push({from: 'self', message: this.state.text});
        this.props.store.dispatch({ type: SEND_MESSAGE, payload: this.state.text });
        this.setState({
            text: '',
            messages
        });
    }
    handleJoin() {
        const {setParams} = this.props.navigation;
        this.props.store.dispatch({ type: CONNECT });
        this.props.store.dispatch({ type: JOIN, payload: this.state.room });
        setParams({header: <View style={{paddingTop: 25, backgroundColor: 'aliceblue', paddingHorizontal: 10}}>
        <LinearGradient
          colors={['#19e8b3', '#abed57']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
          style={styles.headerStyle}>
              <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{flex: 0.1, justifyContent: 'center'}}>
                      <TouchableHighlight
                      onPress={() => {
                      }}>
                          <Image
                              style={{height: 40}}
                              source={require('../../images/back.png')}
                          />
                      </TouchableHighlight>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{color: '#fff', fontWeight: '600'}}>UserName</Text>
                      <Text style={{color: '#fff'}}>Ak-_ufNcO5L_v_ZHAAAF</Text>
                  </View>
                  <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <TouchableHighlight
                  onPress={() => {
                      Actions.drawerOpen()
                  }}>
                      <Image
                          source={require('../../images/ic_menu.png')}
                      />
                  </TouchableHighlight>
                  </View>
              </View>
          </LinearGradient>
      </View>})
    }
    handleLeave() {
        this.props.store.dispatch({ type: DISCONNECT });
    }
    handleKeyboardHeight() {
        console.log(event);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.joinRoomStyle}>
                    <GradientInput
                        style={styles.inputStyle}
                        onChangeText={(room) => this.setState({room})}
                        value={this.state.room}/>
                        {
                            this.props.room_joined === false &&
                            <WhiteBtn
                                onPress={this.handleJoin}
                                color="#841584">
                                Join
                            </WhiteBtn>
                        }
                        {
                            this.props.room_joined === true &&
                            <WhiteBtn
                                onPress={this.handleLeave}
                                color="#841584">
                                Leave
                            </WhiteBtn>
                        }
                </View>
                {
                    // this should be replaced with ListView
                    this.props.socketids.map((item, index) => (
                        <View key={index} style={styles.connectLstStyle}>
                            <Text>{item}</Text>
                            <ConnectBtn
                                onPress={() => this.onPressExchange(item)}>
                                Connect
                            </ConnectBtn>
                        </View>
                    ))
                }
                {
                    this.props.datachan_stat === true &&
                    <View style={styles.chatContainerStyle}>
                        <KeyboardAvoidingView
                            behavior="position"
                            keyboardVerticalOffset={verticalScale(123)}
                            contentContainerStyle={styles.chatAvoidingViewStyle}>
                            <View style={styles.chatViewStyle}>
                                {
                                    this.state.messages.map((item, index) => (
                                        <MessageText key={index}>
                                            {item}
                                        </MessageText>
                                    ))
                                }
                            </View>
                            <View style={styles.messageViewStyle}>
                                <MessageInput
                                    style={styles.inputStyle}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}/>
                                <SendBtn
                                    onPress={this.handleSend}>
                                    Send
                                </SendBtn>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ connection, routes }) => {
    const { connected, socketids, message, datachan_stat, room_joined } = connection;
	return { connected, socketids, message, datachan_stat, room_joined, routes };
};
export default connect(mapStateToProps, { })(ChatRoom);
