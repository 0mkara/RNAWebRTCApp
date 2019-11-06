import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, ViewPropTypes, FlatList } from 'react-native';
import { GreenBtn, GradientInput } from './common';
import { scale, verticalScale } from './scaling';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { login } from '../actions/LoginAction';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import { AsyncStorage } from 'react-native';

import { Container, Text, Header, Content, Icon, Button, ListItem, Left, Body, Right, Switch } from 'native-base';
import commonStyle from '../commonStyle/commonStyle';
import styles from './SplashScreen/styles';

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatlistData: [
        {
          key: 'a',
          name: 'Audio',
          status: false
        },
        {
          key: 'v',
          name: 'Video',
          status: false
        }
      ]
    }
    this.logout = this.logout.bind(this);
  }
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  logout = () => {
    // AsyncStorage.clear();
    Actions.splash();
  }

  render() {
    const { flatlistData } = this.state;
    const { isLogin } = this.props;
    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#7BFFB8', '#11361C']} style={commonStyle.linearGradient}>
          <Content style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', margin: 10, padding: 10 }}>
              <Icon name='person' style={commonStyle.navBarImage} />
            </View>
            <ListItem style={commonStyle.sideBarList}>
              <Body>
                <TouchableOpacity onPress={() => { Actions.user_listing() }}>
                  <Text style={commonStyle.sideBarListText}>User</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            <ListItem style={commonStyle.sideBarList}>
              <Body>
                <TouchableOpacity>
                  <Text style={commonStyle.sideBarListText} onPress={() => { Actions.profile() }}>Profile</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            <ListItem style={commonStyle.sideBarList}>
              <Body>
                <TouchableOpacity>
                  <Text style={commonStyle.sideBarListText}>Logout</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
          </Content>
        </LinearGradient>
      </Container >
    );
  }
}
export default DrawerContent;
