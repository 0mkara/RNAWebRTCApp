// @flow
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CONNECT, JOIN, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn } from '../common';
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
        this.props.navigation.navigate('ChatScreen', {socketId: socketId});
    }
    handleSend() {
        const messages = this.state.messages;
        messages.push({from: 'self', message: this.state.text});
        this.props.dispatch({ type: SEND_MESSAGE, payload: this.state.text });
        this.setState({
            text: '',
            messages
        });
    }
    handleJoin() {
        this.props.dispatch({ type: CONNECT });
        this.props.dispatch({ type: JOIN, payload: this.state.room });
    }
    handleLeave() {
        const {setParams} = this.props.navigation;
        this.props.dispatch({ type: DISCONNECT });
        setParams({header: null})
    }
    handleKeyboardHeight() {
        console.log(event);
    }
    render() {
        console.log(this.props.datachan_stat);
        console.log(this.state.messages);
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
            </View>
        );
    }
}
ChatRoom.navigationOptions = {
    title: 'Home',
    header: null
};

const mapStateToProps = ({ connection, routes }) => {
    const { connected, socketids, message, datachan_stat, room_joined } = connection;
	return { connected, socketids, message, datachan_stat, room_joined, routes };
};

export default connect(mapStateToProps)(ChatRoom);
