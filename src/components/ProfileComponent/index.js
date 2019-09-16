/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-console */
// @flow
import React, { Component } from 'react';
import {
    View,
    TextInput,
    AsyncStorage,
    Modal,
    Alert,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { Container, Text, Header, Content, Form, Item, Input, Label, Icon, ActionSheet, Thumbnail, Button } from 'native-base';

import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import env from 'react-native-config'
import { login, set_access_token } from '../../actions/LoginAction';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../commonStyle/commonStyle';
import { set_editability, set_user_info } from '../../actions/ProfileAction';
import querystring from 'querystring';


// import styles from './styles';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userInfo.name,
            email: this.props.userInfo.email,
            phone: this.props.userInfo.phone,
            username: this.props.userInfo.username,
            about: 'About',
            oldName: this.props.userInfo.name,
            oldEmail: this.props.userInfo.email,
            oldPhone: this.props.userInfo.phone,
            oldUsername: this.props.userInfo.username,
            oldAbout: 'About'
        }
        this.saveInfo = this.saveInfo.bind(this);
        this.enadleEdit = this.enadleEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('PREVIOUS PROPS')
        console.log(prevProps)
    }


    enadleEdit() {
        const currentState = this.props.formEnabled;
        this.props.store.dispatch(set_editability(!currentState));
    }

    saveInfo() {
        console.log('info is saved');
        this.props.store.dispatch(set_editability(false));
        this.setState({ oldName: this.state.name })
        this.setState({ oldEmail: this.state.email })
        this.setState({ oldPhone: this.state.phone })
        this.setState({ oldAbout: this.state.about })
        AsyncStorage.getItem('access_token')
            .then(token => {
                //console.log(token)
                console.log(env.API_HOST + `:` + env.API_PORT + `/api/v1/auth/me?access_token=${token}&name=${this.state.name}&email=${this.state.email}&phone=${this.state.phone}&id=${this.props.userInfo.id}`)
                const userInfo = {
                    avatar: "",
                    email: this.state.email,
                    id: this.props.userInfo.id,
                    name: this.state.name,
                    phone: this.state.phone,
                    username: this.state.username,
                }
                console.log(userInfo)
                axios.post(env.API_HOST + `:` + env.API_PORT + `/api/v1/auth/me?access_token=${token}`, userInfo)
                    .then(res => {
                        console.log(res);
                        if (res.hasOwnProperty('data') && res['data']['message'] === 'Profile Updated') {
                            this.props.store.dispatch(set_user_info(userInfo));
                        }
                    })
            })

    }
    cancelEdit() {
        this.setState({ name: this.state.oldName })
        this.setState({ email: this.state.oldEmail })
        this.setState({ phone: this.state.oldPhone })
        this.setState({ about: this.state.oldAbout })
        this.props.store.dispatch(set_editability(false));
    }



    render() {
        const { isLogin, formEnabled, userInfo } = this.props;
        console.log('property')
        console.log(this.props);
        return (
            <Container style={styles.container} >
                <LinearGradient colors={['#5C4DD0', '#491E5A']} style={styles.linearGradient}>
                    {/* <Header /> */}
                    <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 27 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Thumbnail style={styles.profileImageStyle} large source={require('../../images/profile.jpeg')}></Thumbnail>
                            <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: '28%' }}>
                                <Icon style={styles.imageUploadIcon} name='camera' ></Icon>
                            </TouchableOpacity>
                        </View>
                        <Label style={commonStyle.labelText}>Name</Label>
                        <Item style={{ marginBottom: 5, borderBottomWidth: formEnabled ? 1 : 0, padding: 0, margin: 0 }}>
                            <Icon style={{ color: '#fff' }} active name='person' />
                            <Input
                                aufocus={true}
                                style={commonStyle.inputStyle}
                                editable={formEnabled}
                                value={this.state.name}
                                onChangeText={text => this.setState({ name: text })} />
                        </Item>
                        <Label style={commonStyle.labelText}>Username</Label>
                        <Item style={{ marginBottom: 5, borderBottomWidth: formEnabled ? 1 : 0, padding: 0, margin: 0 }}>
                            <Icon style={{ color: '#fff' }} active name='person' />
                            <Input
                                style={commonStyle.inputStyle}
                                editable={formEnabled}
                                value={this.state.username}
                                onChangeText={text => this.setState({ username: text })} />
                        </Item>
                        <Label style={commonStyle.labelText}>Email</Label>
                        <Item style={{ marginBottom: 5, borderBottomWidth: formEnabled ? 1 : 0 }}>
                            <Icon style={{ color: '#fff' }} active type="FontAwesome" name="envelope" />
                            <Input
                                getRef={ref => {
                                    this.emailInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                editable={formEnabled}
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })} />
                        </Item>
                        <Label style={commonStyle.labelText}>Phone</Label>
                        <Item style={{ marginBottom: 5, borderBottomWidth: formEnabled ? 1 : 0 }}>
                            <Icon style={{ color: '#fff' }} active type="FontAwesome" name="phone" />
                            <Input
                                getRef={ref => {
                                    this.phoneInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                editable={formEnabled}
                                value={this.state.phone}
                                onChangeText={text => this.setState({ phone: text })} />
                        </Item>
                        <Label style={commonStyle.labelText}>About</Label>
                        <Item style={{ marginBottom: 5, borderBottomWidth: formEnabled ? 1 : 0 }}>
                            <Icon style={{ color: '#fff' }} active name="person" />
                            <Input
                                getRef={ref => {
                                    this.aboutInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                editable={formEnabled}
                                value={this.state.about}
                                onChangeText={text => this.setState({ about: text })} />
                        </Item>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Button onPress={() => { formEnabled ? this.saveInfo() : this.enadleEdit() }} style={commonStyle.buttonStyle} >
                                    <Text style={commonStyle.buttonTextStyle}>{formEnabled ? 'Save' : 'Edit'}</Text>
                                </Button>
                                {formEnabled ? <Button onPress={() => { this.cancelEdit() }} style={commonStyle.buttonStyle} >

                                    <Text style={commonStyle.buttonTextStyle}>Cancel</Text>
                                </Button> : null}
                            </View>
                        </View>

                    </Content>
                </LinearGradient >
            </Container >
        );

    }
}

const mapStateToProps = ({ login, routes, profile }) => {
    const { isLogin, access_token } = login;
    const { formEnabled, userInfo } = profile;
    return { isLogin, access_token, routes, formEnabled, userInfo };
};
export default connect(mapStateToProps, {})(Profile);
