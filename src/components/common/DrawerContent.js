import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, ViewPropTypes, Switch, FlatList } from 'react-native';
import { GreenBtn, GradientInput } from '../common';
import { scale, verticalScale } from '../scaling';

const styles = StyleSheet.create({
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
});

class DrawerContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
                value="UserName"/>
              </View>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: scale(30)}}>
                <GreenBtn
                  color="#841584">
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

export default DrawerContent;