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
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'

// import styles from './styles';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalVisible: false
        }
        this.goLogin = this.goLogin.bind(this);
        this.goSignup = this.goSignup.bind(this);
    }

    goLogin() {
        Actions.login();
    }

    goSignup() {
        Actions.signup();
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoStyle}>Logo</Text>
                <View style={styles.bottomButton}>
                    <TouchableOpacity
                        style={styles.inputStyle}
                        title="Login"
                        onPress={() => this.goLogin()}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inputStyle}
                        title="Signup"
                        onPress={() => this.goSignup()}
                    >
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>

            </View >
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin } = login;
    return { isLogin, routes };
};
export default connect(mapStateToProps, {})(SplashScreen);
