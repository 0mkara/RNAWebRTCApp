// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import Navigator from './config/router';
import { addNavigationHelpers } from 'react-navigation';
import store from './config/configureStore';

const App = ({ dispatch, nav }) =>  (
    <Navigator
        navigation={addNavigationHelpers({
            dispatch,
            state: nav
        })}
    />
);

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(App);

const RNAWebRTCApp = () => (
        <Provider store={store}>
            <AppWithNavigation />
        </Provider>
);

export default RNAWebRTCApp;
