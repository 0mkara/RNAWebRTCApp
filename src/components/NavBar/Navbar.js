import {
    View, Image, StatusBar, Text, TouchableWithoutFeedback
} from 'react-native';
import React, { Component } from 'react';
import commonStyle from '../../commonStyle/commonStyle';
import { Left, Thumbnail } from 'native-base';

class NavBar extends Component {

    render() {
        return (
            <View style={commonStyle.backgroundStyle}>
                <StatusBar />
                <View style={{ flex: 1 }}>
                    <Left>
                        <Thumbnail source={this.drawerImage} />
                    </Left>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={commonStyle.navbarTitleStyles}>{this.props.title}</Text>
                    </View>
                </View>
            </View >
        );
    }

}

export default NavBar;
