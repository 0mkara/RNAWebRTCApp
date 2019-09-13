// @flow
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    AsyncStorage,
    Modal,
    Alert,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import { Container, Content, Icon, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../commonStyle/commonStyle';
import GoogleSignInButton from '../GoogleSigninButton/GoogleSignInButon';

// import styles from './styles';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            modalVisible: false,
            access_token: ''
        }
        this.goLogin = this.goLogin.bind(this);
        this.goSignup = this.goSignup.bind(this);
        AsyncStorage.getItem('access_token').then((token) => {
            // this.setState({ access_token: token });
            // console.log(token)
            // if (token.length > 0) {
            //     Actions.home_map();
            // }

        })
    }

    goLogin() {
        Actions.login();
    }

    goSignup() {
        Actions.signup();
    }



    render() {
        return (
            <Container style={styles.container}>
                <LinearGradient colors={['#5C4DD0', '#491E5A']} style={styles.linearGradient}>
                    <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Icon name='chatbubbles' style={styles.logoStyle} />
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <GoogleSignInButton style={{ width: '10%' }}></GoogleSignInButton>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button
                                        style={commonStyle.buttonStyle}
                                        title="Login"
                                        onPress={() => this.goLogin()}
                                    >
                                        <Text style={commonStyle.buttonTextStyle}>Login</Text>
                                    </Button>
                                    <Button
                                        style={commonStyle.buttonStyle}
                                        title="Signup"
                                        onPress={() => this.goSignup()}
                                    >
                                        <Text style={commonStyle.buttonTextStyle}>Signup</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Content>
                </LinearGradient>
            </Container >
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin } = login;
    return { isLogin, routes };
};
export default connect(mapStateToProps, {})(SplashScreen);
