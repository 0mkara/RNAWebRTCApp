import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import env from 'react-native-config';
import axios from 'axios';

class GoogleSignInButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigninInProgress: false
    };
    this._signIn = this._signIn.bind(this);
    console.log(env.GOOGLE_CLIENT_ID);
    console.log(env.GOOGLE_ANDROID_CLIENT_ID);
    const configure = {
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId: env.GOOGLE_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      androidClientId: env.GOOGLE_ANDROID_CLIENT_ID // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    };
    GoogleSignin.configure(configure);
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const idToken = userInfo.idToken;

      axios
        .post(`${env.API_HOST}:${env.API_PORT}/api/v1/auth/google`, { idToken })
        .then(res => {
          console.log('LOGGED IN', res);
          axios
            .get(`${env.API_HOST}:${env.API_PORT}/api/v1/login?grant_type=client_credentials&client_id=google@letsgo&client_secret=Va4a8bFFhTJZdybnzyhjHjj6P9UVh7UL`)
            .then(res => {
              console.log('ACCESS', res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log('authGOOGLE', err);
        });
    } catch (error) {
      // console.log(statusCodes)
      console.log('SIGNIN', error);
    }
  };
  render() {
    return (
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      />
    );
  }
}

export default GoogleSignInButton;
