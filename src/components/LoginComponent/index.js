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
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import env from 'react-native-config'
import { login } from '../../actions/LoginAction';


// import styles from './styles';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this._storeAccessToken = this._storeAccessToken.bind(this);
        this.gotoHomePage = this.gotoHomePage.bind(this);
    }

    _storeAccessToken = async (token) => {
        try {
            await AsyncStorage.setItem('access_token', 'BUOT8LRKML2537A7VFX');
        } catch (error) {
            // Error saving data
            console.error(error);
        }
    };

    handleLogin = () => {
        console.log(env.API_HOST + `:` + env.API_PORT + `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=DemoUserName2&password=ss5852s5s85`)
        this.setState({ modalVisible: true });
        // axios.get(env.API_HOST + `:` + env.API_PORT + `/api/v1/login?grant_type=password&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read&username=DemoUserName2&password=ss5852s5s85`)
        //     .then((res) => {
        //         console.log(res)
        //         if (res.hasOwnProperty('data') && res['data'].hasOwnProperty('access_token')) {
        //             this._storeAccessToken(res['data']['access_token']);
        //             this.setState({ modalVisible: true });
        //             this.props.store.dispatch(login(true));
        //         }
        //     })
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
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter password"
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Signup"
                    onPress={() => this.handleLogin()}
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
    const { isLogin } = login;
    return { isLogin, routes };
};
export default connect(mapStateToProps, {})(Login);
