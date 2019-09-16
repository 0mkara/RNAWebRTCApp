import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import env from 'react-native-config'

class GoogleSignInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigninInProgress: false
        }
        this._signIn = this._signIn.bind(this);
        console.log(env.GOOGLE_CLIENT_ID)
        console.log(env.GOOGLE_ANDROID_CLIENT_ID)
        GoogleSignin.configure({
            scopes: [], // what API you want to access on behalf of the user, default is email and profile
            webClientId: env.GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            androidClientId: env.GOOGLE_ANDROID_CLIENT_ID, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
        } catch (error) {
            console.log(statusCodes)
            console.log(error.code)
        }
    }
    render() {
        return (<GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} />)
    }
}

export default GoogleSignInButton;