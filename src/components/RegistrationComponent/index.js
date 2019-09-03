// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'

// import styles from './styles';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.signup = this.signup.bind(this);
    }

    async signup() {
        console.log('Hi')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Logo</Text>
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
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Button
                    style={styles.loginBtn}
                    onPress={this.signup}
                    title="Registration"
                    color="#841584"
                    accessibilityLabel="Login"
                />
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
