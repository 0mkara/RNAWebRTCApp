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
import axios from 'axios';
import env from 'react-native-config'



// import styles from './styles';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            modalVisible: false
        }
        this.changePassword = this.changePassword.bind(this);
        this.gotoHomePage = this.gotoHomePage.bind(this);
    }


    async changePassword() {
        console.log('Clicked')
    }

    gotoHomePage() {
        console.log('OK is pressed');
        Actions.login();
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
                    placeholder="Enter your registered email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.username}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Signup"
                    onPress={() => this.changePassword()}
                >
                    <Text style={styles.buttonText}>Send email</Text>
                </TouchableOpacity>
                <Text style={styles.bottomText}
                    onPress={() => Actions.login()}
                >
                    Go to login?
                </Text>
            </View>
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin } = login;
    return { isLogin, routes };
};
export default connect(mapStateToProps, {})(ForgotPassword);
