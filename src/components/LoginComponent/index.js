// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    AsyncStorage,
    Modal,
    Alert,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import env from 'react-native-config'
import { login, set_access_token } from '../../actions/LoginAction';


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
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.validate = this.validate.bind(this);
        this.gotoHomePage = this.gotoHomePage.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }




    validate = () => {
        if (this.state.username.length <= 0) {
            this.setState({ userNameError: true });
            this.userInput.focus();
        }
        else if (this.state.password.length <= 0) {
            this.setState({ passwordError: true })
            this.passwordInput.focus();
        }
        else {
            this.handleLogin()
        }
    }

    onValueChange = (text, key, keyError) => {
        this.setState({ [key]: text })
        if (this.state[keyError]) {
            this.setState({ [keyError]: false })
        }
    }

    handleLogin = () => {
        console.log(env.API_HOST + `:` + env.API_PORT + `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=DemoUserName2&password=ss5852s5s85`)
        let name = this.state.username;
        let password = this.state.password;
        axios.get(env.API_HOST + `:` + env.API_PORT + `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=` + name + `&password=` + password + ``)
            .then((res) => {
                console.log(res)
                if (res.hasOwnProperty('data') && res['data'].hasOwnProperty('access_token')) {
                    console.log(res['data']['access_token']);
                    AsyncStorage.setItem('access_token', res['data']['access_token']);
                    ToastAndroid.show("Success", ToastAndroid.LONG)
                    this.gotoHomePage()
                    this.props.store.dispatch(login(true));
                    this.props.store.dispatch(set_access_token(res['data']['access_token']));

                }
            })
    }

    gotoHomePage() {
        console.log('OK is pressed');
        Actions.home_map();
    }



    render() {
        const { isLogin } = this.props;
        console.log(this.props);
        return (
            <View style={styles.container}>
                {this.state.modalVisible && Alert.alert(
                    'Login status',
                    'Login is successfull',
                    [
                        { text: 'OK', onPress: () => this.gotoHomePage() },
                    ]
                )}
                <Text>Logo</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter username"
                    returnKeyType={"next"}
                    ref={(input) => { this.userInput = input }}
                    autoFocus={true}
                    onSubmitEditing={() => { this.passwordInput.focus() }}
                    onChangeText={(text) => this.onValueChange(text, 'username', 'userNameError')}
                    value={this.state.username}
                />
                {this.state.userNameError && <Text style={styles.errorText}>User name is required</Text>}
                <TextInput
                    style={styles.inputStyle}
                    ref={(input) => { this.passwordInput = input }}
                    placeholder="Enter password"
                    returnKeyType={"done"}
                    onSubmitEditing={() => { this.validate() }}
                    onChangeText={(text) => this.onValueChange(text, 'password', 'passwordError')}
                    value={this.state.password}
                />
                {this.state.passwordError && <Text style={styles.errorText}>Password is required</Text>}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Login"
                    onPress={() => this.validate()}
                >

                    <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>
                <Text style={styles.bottomText}
                    onPress={() => Actions.signup()}
                >
                    Don't has Account, go to registration?
                </Text>
                <Text style={styles.bottomText}
                    onPress={() => Actions.forgottpassword()}
                >
                    Forgot your password?
                </Text>
            </View>
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin, access_token } = login;
    return { isLogin, access_token, routes };
};
export default connect(mapStateToProps, {})(Login);
