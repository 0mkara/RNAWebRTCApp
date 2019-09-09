// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView
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
            confirmpassword: '',
            nameError: false,
            usernameError: false,
            emailError: false,
            emailPatternError: false,
            passwordError: false,
            phoneError: false,
            phoneNumberError: false,
            phoneLengthError: false,
            confirmpasswordError: false,
            validateForm: false,
            signup: false
        }
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
        if (this.state.name.length > 0) {
            this.setState({ nameError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ nameError: true })
            this.setState({ validateForm: false })
        }
        if (this.state.username.length > 0) {
            this.setState({ usernameError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ usernameError: true })
            this.setState({ validateForm: false })
        }
        if (this.state.email.length > 0) {
            this.setState({ emailError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ emailError: true })
            this.setState({ validateForm: false })
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            this.setState({ emailPatternError: true })
            this.setState({ validateForm: false })
        } else {
            this.setState({ emailPatternError: false })
            this.setState({ validateForm: true })
        }

        if (this.state.password.length > 0) {
            this.setState({ passwordError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ passwordError: true })
            this.setState({ validateForm: false })
        }
        if (this.state.phone.length > 0) {
            this.setState({ phoneError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ phoneError: true })
            this.setState({ validateForm: false })
        }
        if (this.state.confirmpassword.length > 0) {
            this.setState({ confirmpasswordError: false })
            this.setState({ validateForm: true })
        } else {
            this.setState({ confirmpasswordError: true })
            this.setState({ validateForm: false })
        }

        this.setState({ signup: true })
    }

    onValueChange = (text, key, keyError) => {
        this.setState({ [key]: text })
        if (this.state[keyError]) {
            this.setState({ [keyError]: false })
        }

        if (key === 'email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === true) {
                this.setState({ emailPatternError: false })
            } else {
                this.setState({ emailPatternError: true })
            }
        }
        this.setState({ signup: false })
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
                console.log(res);
                if (res.hasOwnProperty('data') && res['data'].hasOwnProperty('message') && res['data']['message'].toLowerCase() === "registration successful") {
                    console.log(res['data']['message'].toLowerCase());
                    Actions.login();
                }
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <ScrollView >
                    <Text>Logo</Text>
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Enter name"
                        onChangeText={(text) => this.onValueChange(text, 'name', 'nameError')}
                        value={this.state.name}
                    />
                    {this.state.nameError && <Text style={styles.errorText}>Name is required</Text>}
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Enter username"
                        onChangeText={(text) => this.onValueChange(text, 'username', 'usernameError')}
                        value={this.state.username}
                    />
                    {this.state.usernameError && <Text style={styles.errorText}>Username is required</Text>}
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Enter Email"
                        required
                        onChangeText={(text) => this.onValueChange(text, 'email', 'emailError')}
                        value={this.state.email}
                    />
                    {this.state.emailError && <Text style={styles.errorText}>Email is required</Text>}
                    {this.state.emailPatternError && <Text style={styles.errorText}>Enter proper email pattern</Text>}
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Enter phone"
                        onChangeText={(text) => this.onValueChange(text, 'phone', 'phoneError')}
                        value={this.state.phone}
                    />
                    {this.state.phoneError && <Text style={styles.errorText}>Phone is required</Text>}
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Enter password"
                        secureTextEntry={true}
                        onChangeText={(text) => this.onValueChange(text, 'password', 'passwordError')}
                        value={this.state.password}
                    />
                    {this.state.passwordError && <Text style={styles.errorText}>Password is required</Text>}
                    <TextInput
                        returnKeyType="go"
                        style={styles.inputStyle}
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        onChangeText={(text) => this.onValueChange(text, 'confirmpassword', 'confirmpasswordError')}
                        value={this.state.confirmpassword}
                    />
                    {this.state.confirmpasswordError && <Text style={styles.errorText}>Confirm your password</Text>}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        title="Signup"
                        onPress={() => this.validate()}
                    >
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottomText}
                        onPress={() => Actions.login()}
                    >
                        Already has an account, go to login?
                </Text>
                </ScrollView>
            </KeyboardAvoidingView >
        );

    }
}

const mapStateToProps = ({ connection, routes }) => {
    const { connected, socketids, message, datachan_stat, room_joined } = connection;
    return { connected, socketids, message, datachan_stat, room_joined, routes };
};
export default connect(mapStateToProps, {})(Registration);
