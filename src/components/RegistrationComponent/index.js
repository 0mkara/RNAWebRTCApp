// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import env from 'react-native-config'

// import styles from './styles';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            confirmpassword: ''
        }
        this.signup = this.signup.bind(this);
    }

    async signup() {
        console.log(this.state)
        const name = this.state['name']
        const username = this.state['username']
        const email = this.state['email']
        const password = this.state['password']
        const phone = this.state['phone']

        axios.post(env.API_HOST + `:` + env.API_PORT + `/api/v1/register?grant_type=client_credentials&client_id=client@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL&scope=read`, { name, username, email, phone, password })
            .then((res) => {
                console.log(res)
                if (res.hasOwnProperty('data') && res['data'].hasOwnProperty('message') && res['data']['message'].toLowerCase() === "registration successful") {
                    this._storeAccessToken(res['data']['access_token']);
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Logo</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter name"
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter username"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter Email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter password"
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Confirm password"
                    onChangeText={(text) => this.setState({ confirmpassword: text })}
                    value={this.state.confirmpassword}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter phone"
                    onChangeText={(text) => this.setState({ phone: text })}
                    value={this.state.phone}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Signup"
                    onPress={() => this.signup()}
                >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                <Text style={styles.bottomText}
                    onPress={() => Actions.login()}
                >
                    Already has an account, go to login?
                </Text>
            </View>
        );

    }
}

const mapStateToProps = ({ connection, routes }) => {
    const { connected, socketids, message, datachan_stat, room_joined } = connection;
    return { connected, socketids, message, datachan_stat, room_joined, routes };
};
export default connect(mapStateToProps, {})(Registration);
