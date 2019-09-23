// @flow
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import commonStyle from '../../commonStyle/commonStyle';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import env from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Header, Content, Form, Item, Input, Label, Icon, Button } from 'native-base';
// import styles from './styles';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      emailError: false,
      emailPatternError: false,
      passwordError: false,
      confirmpasswordError: false
    };
    this.signup = this.signup.bind(this);
    this.validate = this.validate.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.validateForm && this.state.signup) {
      this.signup();
    }
  }

  validate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.length <= 0) {
      this.setState({ emailError: true });
    } else if (reg.test(this.state.email) === false) {
      this.setState({ emailPatternError: true });
    } else if (this.state.password.length <= 0) {
      this.setState({ passwordError: true });
    } else if (this.state.confirmpassword.length <= 0) {
      this.setState({ confirmpasswordError: true });
    } else {
      this.signup();
    }
  };

  onValueChange = (text, key, keyError) => {
    this.setState({ [key]: text });
    if (this.state[keyError]) {
      this.setState({ [keyError]: false });
    }

    if (key === 'email') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text) === true) {
        this.setState({ emailPatternError: false });
      } else {
        this.setState({ emailPatternError: true });
      }
    }
  };

  async signup() {
    console.log(this.state);
    const name = this.state.name;
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const phone = this.state.phone;
    const url = env.API_HOST + `:` + env.API_PORT + `/api/v1/register`;
    console.log(url);

    axios
      .post(url, { name, username, email, phone, password })
      .then(res => {
        console.log(res);
        if (res.hasOwnProperty('data') && res.data.hasOwnProperty('message') && res.data.message.toLowerCase() === 'registration successful') {
          console.log(res.data.message.toLowerCase());
          Actions.login();
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return (
      // <KeyboardAvoidingView behavior="position">
      //     <ScrollView >
      <Container style={styles.container}>
        <LinearGradient colors={['#5C4DD0', '#491E5A']} style={styles.linearGradient}>
          <Content style={{ padding: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Icon name="chatbubbles" style={commonStyle.logoStyle} />
              <Form>
                <Item floatingLabel>
                  <Label style={styles.labelText}>Enter email</Label>
                  <Input
                    returnKeyType={'next'}
                    getRef={ref => {
                      this.emailInput = ref.wrappedInstance;
                    }}
                    returnKeyType="go"
                    autoFocus
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={text => this.onValueChange(text, 'email', 'emailError')}
                    value={this.state.email}
                  />
                </Item>
                {this.state.emailError && <Text style={commonStyle.errorText}>Email is required</Text>}
                {this.state.emailPatternError && <Text style={commonStyle.errorText}>Enter proper email pattern</Text>}
                <Item floatingLabel>
                  <Label style={styles.labelText}>Enter password</Label>
                  <Input
                    returnKeyType={'next'}
                    getRef={ref => {
                      this.passwordInput = ref.wrappedInstance;
                    }}
                    returnKeyType="go"
                    onSubmitEditing={() => this.confirmInput.focus()}
                    onChangeText={text => this.onValueChange(text, 'password', 'passwordError')}
                    value={this.state.password}
                  />
                </Item>
                {this.state.passwordError && <Text style={commonStyle.errorText}>Password is required</Text>}
                <Item floatingLabel style={commonStyle.inputStyle}>
                  <Label style={styles.labelText}>Confirm password</Label>
                  <Input
                    returnKeyType={'next'}
                    getRef={ref => {
                      this.confirmInput = ref.wrappedInstance;
                    }}
                    returnKeyType="done"
                    onSubmitEditing={() => this.validate()}
                    onChangeText={text => this.onValueChange(text, 'confirmpassword', 'confirmpasswordError')}
                    value={this.state.confirmpassword}
                  />
                </Item>
                {this.state.confirmpasswordError && <Text style={commonStyle.errorText}>Confirm your password</Text>}
              </Form>
              <Button style={commonStyle.buttonStyle} onPress={() => this.validate()} light>
                <Text style={commonStyle.buttonTextStyle}> Sign up </Text>
              </Button>
              <Text style={styles.bottomText} onPress={() => Actions.login()}>
                Already has an account, go to login?
              </Text>
            </View>
          </Content>
        </LinearGradient>
      </Container>
      //     </ScrollView >
      // </KeyboardAvoidingView >
    );
  }
}

const mapStateToProps = ({ connection, routes }) => {
  const { connected, socketids, message, datachan_stat, room_joined } = connection;
  return { connected, socketids, message, datachan_stat, room_joined, routes };
};
export default connect(
  mapStateToProps,
  {}
)(Registration);
