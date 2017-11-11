import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { CREATE_OFFER, SEND_MESSAGE } from '../../actions/types';
import { MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import Realm from 'realm';
import StateManager from '../../actions/StateManager';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.state = {
            text: null,
            messages: [],
            messageInputMarginBottom: 0,
            messagesSchema: {
                name: 'Message',
                properties: {
                  from:  'string',
                  message: 'string',
                }
            }
        }
    }
    static propTypes = {
      dispatch: PropTypes.func,
      message: PropTypes.object,
      navigation: PropTypes.object,
    }
    componentDidMount() {
        const { messages, messagesSchema } = this.state;
        const { state } = this.props.navigation;
        let storedMessages = [];
        this.props.dispatch({ type: CREATE_OFFER, payload: state.params.socketId });
        Realm.open({schema: [messagesSchema]})
        .then(realm => {
            console.log('realm database abcd', realm.objects('Message'));
            console.log(realm.objects('Message').length);
            let messages = realm.objects('Message');
            for (let i = 0; i < messages.length; i++) {
                storedMessages.push(messages[i]);
            }
            this.setState({
                messages: storedMessages
            })
        });
    }
    handleSend() {
        const { messages, messagesSchema } = this.state;
        let storedMessages = [];
        this.props.dispatch({ type: SEND_MESSAGE, payload: this.state.text });
        Realm.open({schema: [messagesSchema]})
        .then(realm => {
          realm.write(() => {
            const newMessage = realm.create('Message', {from: 'self', message: this.state.text});
            messages.push(newMessage)
          })
          this.setState({
              text: '',
              messages
          })
        });
    }
    componentWillReceiveProps(nextProps) {
        const { messages, messagesSchema } = this.state;
        if(nextProps.message.from !== undefined) {
            Realm.open({schema: [messagesSchema]})
            .then(realm => {
              realm.write(() => {
                const newMessage = realm.create('Message', nextProps.message);
                messages.push(newMessage)
              })
              this.setState({
                  text: '',
                  messages
              })
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.chatAvoidingViewStyle} behavior="position">
                    <View style={styles.chatViewStyle}>
                        {
                            this.state.messages.map((item, index) => (
                                <MessageText key={index}>
                                    {item}
                                </MessageText>
                            ))
                        }
                    </View>
                    <View style={[styles.messageViewStyle, {marginBottom: this.state.messageInputMarginBottom}]}>
                        <View style={styles.messageInputWrapper}>
                            <MessageInput
                                style={styles.inputStyle}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                onEndEditing={() => {
                                    this.setState({
                                        messageInputMarginBottom: 0
                                    })
                                }}
                                onFocus={() => {
                                    this.setState({
                                        messageInputMarginBottom: 65
                                    })
                                }}/>
                            <SendBtn
                                onPress={this.handleSend}>
                                Send
                            </SendBtn>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


Chat.navigationOptions = ({ navigation }) => {
    const { state, goBack } = navigation;
    return {
        header: <View style={{paddingTop: 25, backgroundColor: 'aliceblue', paddingHorizontal: 10}}>
        <LinearGradient
          colors={['#19e8b3', '#abed57']}
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
          style={styles.headerStyle}>
              <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{flex: 0.1, justifyContent: 'center'}}>
                      <TouchableOpacity
                      onPress={() => {
                        const MessagesSchema = {
                            name: 'Message',
                            properties: {
                              from:  'string',
                              message: 'string',
                            }
                        };
                        Realm.open({schema: [MessagesSchema]})
                        .then(realm => {
                            realm.write(() => {
                                let Messages = realm.objects('Message');
                                realm.delete(Messages);

                                StateManager.getInstance().receiveData({
                                    disconnect: true
                                })
                                goBack()
                            })
                        });
                      }}>
                        <View style={{backgroundColor: 'transparent'}}>
                          <Image
                              style={{height: 40, backgroundColor: 'transparent'}}
                              source={require('../../images/back.png')}
                          />
                        </View>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{color: '#fff', fontWeight: '600'}}>UserName</Text>
                      <Text style={{color: '#fff'}}>{state.params.socketId}</Text>
                  </View>
                  <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <TouchableOpacity
                      onPress={() => {
                          navigation.navigate('DrawerOpen')
                      }}>
                      <Image source={require('../../images/ic_menu.png')}/>
                  </TouchableOpacity>
                  </View>
              </View>
          </LinearGradient>
      </View>,
    }
};

const mapStateToProps = ({ connection, routes }) => {
    const { connected, socketids, message, datachan_stat, room_joined } = connection;
	return { connected, socketids, message, datachan_stat, room_joined, routes };
};
export default connect(mapStateToProps)(Chat);
