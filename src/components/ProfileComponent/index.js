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
import { Container, Text, Header, Content, Form, Item, Input, Label, Icon, ActionSheet, Thumbnail } from 'native-base';

import { connect } from 'react-redux';
import styles from './styles';
import { Actions } from 'react-native-router-flux'
import axios from 'axios';
import env from 'react-native-config'
import { login, set_access_token } from '../../actions/LoginAction';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../../commonStyle/commonStyle';



// import styles from './styles';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Demo name',
            email: 'Demo email',
            phone: 'Demo phone',
            about: 'About',
            nameDisabled: true,
            emailDisabled: true,
            phoneDisabled: true,
            aboutDisabled: true
        }
    }

    enadleEdit(inputField, focusField) {
        const currentState = this.state[inputField + 'Disabled'];
        this.setState({ [inputField + 'Disabled']: !currentState })
        console.log([inputField + 'Input'])
        // this[focusField].focus()
    }



    render() {
        const { isLogin } = this.props;
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
                        <Item style={{ marginTop: 5, marginBottom: 5 }}>
                            <Icon style={{ color: '#fff' }} active name='person' />
                            <Input
                                ref={x => this.nameInput = x}
                                style={commonStyle.inputStyle}
                                disabled={this.state.nameDisabled}
                                value={this.state.name}
                                onChangeText={text => this.setState({ name: text })} />
                            <TouchableOpacity onPress={() => { this.enadleEdit('name', 'nameInput') }} >
                                <Icon style={{ color: '#fff' }} active type="FontAwesome" name="edit" />
                            </TouchableOpacity>
                        </Item>
                        <Label style={commonStyle.labelText}>Email</Label>
                        <Item style={{ marginTop: 5, marginBottom: 5 }}>
                            <Icon style={{ color: '#fff' }} active type="FontAwesome" name="envelope" />
                            <Input
                                getRef={ref => {
                                    this.emailInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                disabled={this.state.emailDisabled}
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })} />
                            <TouchableOpacity onPress={() => { this.enadleEdit('email') }} >
                                <Icon style={{ color: '#fff' }} active type="FontAwesome" name="edit" />
                            </TouchableOpacity>
                        </Item>
                        <Label style={commonStyle.labelText}>Phone</Label>
                        <Item style={{ marginTop: 5, marginBottom: 5 }}>
                            <Icon style={{ color: '#fff' }} active type="FontAwesome" name="phone" />
                            <Input
                                getRef={ref => {
                                    this.phoneInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                disabled={this.state.phoneDisabled}
                                value={this.state.phone}
                                onChangeText={text => this.setState({ phone: text })} />
                            <TouchableOpacity onPress={() => { this.enadleEdit('phone') }} >
                                <Icon style={{ color: '#fff' }} active type="FontAwesome" name="edit" />
                            </TouchableOpacity>
                        </Item>
                        <Label style={commonStyle.labelText}>About</Label>
                        <Item style={{ marginTop: 5, marginBottom: 5 }}>
                            <Icon style={{ color: '#fff' }} active type="FontAwesome" name="user" />
                            <Input
                                getRef={ref => {
                                    this.aboutInput = ref.wrappedInstance
                                }}
                                style={commonStyle.inputStyle}
                                disabled={this.state.aboutDisabled}
                                value={this.state.about}
                                onChangeText={text => this.setState({ about: text })} />
                            <TouchableOpacity onPress={() => { this.enadleEdit('about') }} >
                                <Icon style={{ color: '#fff' }} active type="FontAwesome" name="edit" />
                            </TouchableOpacity>
                        </Item>
                    </Content>
                </LinearGradient >
            </Container >
        );

    }
}

const mapStateToProps = ({ login, routes }) => {
    const { isLogin, access_token } = login;
    return { isLogin, access_token, routes };
};
export default connect(mapStateToProps, {})(Profile);
