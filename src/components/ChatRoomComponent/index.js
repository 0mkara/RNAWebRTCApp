// @flow
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';

class ChatRoom extends Component {
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
    componentDidUpdate(prevProps) {
        const { message } = this.props;
        const stmsg = this.state.messages;
        if(this.props.message !== prevProps.message && message.from !== undefined) {
            stmsg.push(message)
            this.setState({
                messages: stmsg,
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
        this.props.store.dispatch({ type: CONNECT });
        this.props.store.dispatch({ type: JOIN, payload: this.state.room });
    }
    handleLeave() {
        this.props.store.dispatch({ type: DISCONNECT });
    }
    handleKeyboardHeight() {
        console.log(event);
    }
    render() {
        const { messages } = this.state;
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
                                    messages.map((item, index) => (
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
