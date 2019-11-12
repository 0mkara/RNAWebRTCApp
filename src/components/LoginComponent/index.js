// @flow
import React, { Component } from 'react';
import { View, TextInput, AsyncStorage, Modal, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Text, Header, Content, Form, Item, Input, Label, Icon, Button } from 'native-base';

import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import env from 'react-native-config';
import { login, set_access_token } from '../../actions/LoginAction';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../commonStyle/commonStyle';
import { set_user_info } from '../../actions/ProfileAction';

// import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalVisible: false,
      userNameError: false,
      passwordError: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.validate = this.validate.bind(this);
    this.gotoHomePage = this.gotoHomePage.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

    // this.gotoHomePage()
  }

  validate = () => {
    this.handleLogin();

    if (this.state.username.length <= 0) {
      this.setState({ userNameError: true });
      this.userInput.focus();
    } else if (this.state.password.length <= 0) {
      this.setState({ passwordError: true });
      this.passwordInput.focus();
    } else {
      this.handleLogin();
    }
  };

  onValueChange = (text, key, keyError) => {
    this.setState({ [key]: text });
    if (this.state[keyError]) {
      this.setState({ [keyError]: false });
    }
  };

  handleLogin = () => {
    const name = this.state.username;
    const password = this.state.password;
    // this.gotoHomePage()
    // this.props.store.dispatch(login(true));
    const url =
      env.API_HOST +
      `:` +
      env.API_PORT +
      `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=${name}&password=${password}`;

      // ! FOR DEVELOPMENT ONLY
      // const url =
      // env.API_HOST +
      // `:` +
      // env.API_PORT +
      // `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=a@a.com&password=1234`;
    axios
      .get(url)
      .then(res => {
        if (res.hasOwnProperty('data') && res.data.hasOwnProperty('access_token')) {
          const token = res.data.access_token;
          axios
            .get(env.API_HOST + `:` + env.API_PORT + `/api/v1/auth/me?access_token=${token}`)
            .then(info => {
              this.props.store.dispatch(set_user_info(info.data));
              AsyncStorage.setItem('access_token', res.data.access_token);
              ToastAndroid.show('Success', ToastAndroid.LONG);
              this.gotoHomePage();
              this.props.store.dispatch(login(true));
              this.props.store.dispatch(set_access_token(res.data.access_token));
            })
            .catch(err => {
              console.error(err);
            });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  gotoHomePage() {
    Actions.profile();
  }

  render() {
    const { isLogin } = this.props;
    return (
      <Container style={styles.container}>
        <LinearGradient colors={['#5C4DD0', '#491E5A']} style={styles.linearGradient}>
          {/* <Header /> */}
          <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
            <View style={styles.formStyle}>
              <Icon name="chatbubbles" style={commonStyle.logoStyle} />
              <Form>
                <Item floatingLabel style={commonStyle.inputStyle}>
                  <Label style={styles.labelText}>Email</Label>
                  <Input
                    returnKeyType={'next'}
                    style={commonStyle.inputStyle}
                    getRef={ref => {
                      this.userInput = ref.wrappedInstance;
                    }}
                    autoFocus
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={text => this.onValueChange(text, 'username', 'userNameError')}
                    value={this.state.username}
                  />
                </Item>
                {this.state.userNameError && <Text style={styles.errorText}>Email is required</Text>}
                <Item floatingLabel>
                  <Label style={styles.labelText}>Password</Label>
                  <Input
                    returnKeyType={'done'}
                    style={commonStyle.inputStyle}
                    getRef={ref => {
                      this.passwordInput = ref.wrappedInstance;
                    }}
                    onSubmitEditing={() => {
                      this.validate();
                    }}
                    onChangeText={text => this.onValueChange(text, 'password', 'passwordError')}
                    value={this.state.password}
                  />
                </Item>
                {this.state.passwordError && <Text style={styles.errorText}>Password is required</Text>}
              </Form>
              <Button style={commonStyle.buttonStyle} onPress={() => this.validate()}>
                <Text style={commonStyle.buttonTextStyle}>Login</Text>
              </Button>
              <Text style={styles.bottomText} onPress={() => Actions.signup()}>
                Don't has Account, go to registration?
              </Text>
              <Text style={styles.bottomText} onPress={() => Actions.forgottpassword()}>
                Forgot your password?
              </Text>
            </View>
          </Content>
        </LinearGradient>
      </Container>
    );
  }
}

const mapStateToProps = ({ login, routes, profile }) => {
  const { isLogin, access_token } = login;
  return { isLogin, access_token, routes };
};
export default connect(
  mapStateToProps,
  {}
)(Login);
