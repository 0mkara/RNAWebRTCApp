import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, ViewPropTypes, Switch, AsyncStorage } from 'react-native';
import { CONNECT, JOIN, SEND_MESSAGE, DISCONNECT, SETUSER, GETUSER } from '../../actions/types';
import { GreenBtn, GradientInput } from '../common';
import { scale, verticalScale } from '../scaling';

var DeviceInfo = require('react-native-device-info');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  linearGradient: {
    flex: 1,
    width: '100%'
  },
  inputStyle: {
    color: 'aliceblue',
    height: verticalScale(26),
    width: scale(116),
    margin: scale(2),
    textAlign: 'center',
    backgroundColor: '#3A19A5',
    fontSize: 12,
  },
  inputContainerStyle: {
    height: verticalScale(30),
    width: scale(120),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(2.6),
  }
};

class DrawerContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      audioStatus: false,
      videoStatus: false
    }
  }
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  changeAudioStatus(){
    const { audioStatus } = this.state;
    this.setState({
      audioStatus: audioStatus ? false : true
    })
  }

  handleUserNameChange() {
    let data;
    AsyncStorage.getItem('socketID', (err, result) => {
      data = {
        socketId: result,
        device_id: DeviceInfo.getUniqueID(),
        username: this.state.username
      }
      this.props.dispatch({ type: SETUSER, payload: data });
      this.props.dispatch({
        type:'CHANGE_USERNAME',
        username: this.state.username
      })
      this.props.navigation.navigate('DrawerClose')
    });
  }

  changeVideoStatus(){
    const { videoStatus } = this.state;
    this.setState({
      videoStatus: videoStatus ? false : true
    })
  }

  render() {
    const { audioStatus, videoStatus } = this.state;
    let thisVar = this;
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#350BAC', '#1CAEC5']} style={styles.linearGradient}>
          <View style={{backgroundColor: 'transparent', paddingTop: 60, flex: 1, justifyContent: 'flex-start'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: scale(30)}}>
                <GradientInput
                inputTextStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}/>
              </View>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: scale(30)}}>
                <GreenBtn
                  color="#841584"
                  onPress={() => {
                    thisVar.handleUserNameChange()
                  }}>
                  Change
                </GreenBtn>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', backgroundColor: 'transparent'}}>Audio</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 10,justifyContent: 'center'}}>
                  <Switch
                  onTintColor="#7ED321"
                  onValueChange={() => {
                    thisVar.changeAudioStatus()
                  }} value={audioStatus} style={{backgroundColor: '#4A4A4A', borderRadius: 20}} />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', backgroundColor: 'transparent'}}>Video</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 10,justifyContent: 'center'}}>
                  <Switch
                  onTintColor="#7ED321"
                  onValueChange={() => {
                    thisVar.changeVideoStatus()
                  }} value={videoStatus} style={{backgroundColor: '#4A4A4A', borderRadius: 20}} />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = ({ connection, routes }) => {
  const { connected, socketids, message, datachan_stat, room_joined } = connection;
  return { connected, socketids, message, datachan_stat, room_joined, routes };
};

export default connect(mapStateToProps)(DrawerContent);