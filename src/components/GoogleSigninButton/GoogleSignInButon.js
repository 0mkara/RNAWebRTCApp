import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

class GoogleSignInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigninInProgress: false
        }
        this._signIn = this._signIn.bind(this);
    }
    _signIn() {
        console.log('Hi')
    }
    render() {
        return (<GoogleSigninButton
            style={{ width: 170, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} />)
    }
}

export default GoogleSignInButton;