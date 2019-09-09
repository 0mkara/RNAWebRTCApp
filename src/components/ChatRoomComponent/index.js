// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    SafeAreaView,
    AsyncStorage,
    BackHandler,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import io from 'socket.io-client/dist/socket.io';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.onPressExchange = this.onPressExchange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.state = {
            text: null,
            room: "private_room",
            messages: []
        }
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
        Alert.alert("Exit app", "Do you want to exit ?", [
            { text: "No", onPress: () => ("no") },
            { text: "Yes", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }

    componentDidUpdate(prevProps) {
        const { message } = this.props;
        const stmsg = this.state.messages;
        if (this.props.message !== prevProps.message && message.from !== undefined) {
            stmsg.push(message)
            this.setState({
                messages: stmsg,
            })
        }
        if (this.props.connected !== prevProps.connected) {
            this.handleJoin();
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
    }
    handleJoin = async () => {
        if (this.props.connected) {
            console.log('Connected')
            this.props.store.dispatch({ type: JOIN, payload: this.state.room });
            this.props.store.dispatch({ type: 'get' })
        }
        console.log(this.state.room);
    }
    handleGet() {
        this.props.store.dispatch({ type: 'get', payload: this.state.room })
    }
    handleLeave() {
        this.props.store.dispatch({ type: DISCONNECT });
    }
    handleKeyboardHeight() {
        console.log(event);
    }
    render() {
        const { messages } = this.state;
        const { socketids } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.joinRoomStyle}>
                    <GradientInput
                        style={styles.inputStyle}
                        onChangeText={(room) => this.setState({ room })}
                        value={this.state.room} />
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
                    socketids.map((item, index) => (
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
                            // keyboardVerticalOffset={verticalScale(123)}
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
                                    onChangeText={(text) => this.setState({ text })}
                                    value={this.state.text} />
                                <SendBtn
                                    onPress={this.handleSend}>
                                    Send
                                </SendBtn>
                            </View>
                            <View>
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
export default connect(mapStateToProps, {})(ChatRoom);
