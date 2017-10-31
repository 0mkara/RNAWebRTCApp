import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { CONNECT, JOIN, CREATE_OFFER, SEND_MESSAGE, DISCONNECT } from '../../actions/types';
import { WhiteBtn, GradientInput, ConnectBtn, MessageInput, SendBtn, MessageText } from '../common';
import { verticalScale } from '../scaling';
import styles from './styles';
import {Actions} from 'react-native-router-flux';

class Chat extends Component {
    render() {
        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}


Chat.navigationOptions = ({ navigation }) => {
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
                          this.handleLeave()
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
                      <Text style={{color: '#fff'}}>Ak-_ufNcO5L_v_ZHAAAF</Text>
                  </View>
                  <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <TouchableOpacity
                  onPress={() => {
                      Actions.drawerOpen()
                  }}>
                      <Image
                          source={require('../../images/ic_menu.png')}
                      />
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
export default connect(mapStateToProps, { })(Chat);