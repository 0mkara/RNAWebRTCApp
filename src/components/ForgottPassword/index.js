// @flow
import React, { Component } from 'react';
import {
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
import axios from 'axios';
import env from 'react-native-config'
import { Container, Text, Header, Content, Form, Item, Input, Label, Icon, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../commonStyle/commonStyle';



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
    }

    gotoHomePage() {
        Actions.login();
    }



    render() {
        const { isLogin } = this.props;
        console.log(this.props);
        return (
            <Container style={styles.container} >
                <LinearGradient colors={['#5C4DD0', '#491E5A']} style={commonStyle.linearGradient}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name='chatbubbles' style={commonStyle.logoStyle} />
                            <Form>
                                <Item floatingLabel style={commonStyle.inputStyle}>
                                    <Label style={commonStyle.labelText}>Enter your registered email</Label>
                                    <Input returnKeyType={"next"}
                                        getRef={ref => {
                                            this.userInput = ref.wrappedInstance
                                        }}
                                        autoFocus={true}
                                        onSubmitEditing={() => this.passwordInput.focus()}
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.username} />
                                </Item>
                            </Form>
                            <Button
                                style={commonStyle.buttonStyle}
                                title="Send Email"
                                onPress={() => this.changePassword()}
                            >
                                <Text style={commonStyle.buttonTextStyle}>Send email</Text>
                            </Button>
                            <Text style={styles.bottomText}
                                onPress={() => Actions.login()}
                            >
                                Go to login?
                </Text>
                        </View>
                    </View>
                </LinearGradient>
            </Container>
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin } = login;
    return { isLogin, routes };
};
export default connect(mapStateToProps, {})(ForgotPassword);
