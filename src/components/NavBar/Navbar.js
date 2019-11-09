import {
    View, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight
} from 'react-native';
import React, { Component } from 'react';
import commonStyle from '../../commonStyle/commonStyle';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Thumbnail, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this._drawerOpen = this._drawerOpen.bind(this);
    }
    _drawerOpen() {
        Actions.drawerOpen()
    }
    render() {
        const { chatUser } = this.props
        return (
            <Content style={commonStyle.navBarStyles} >
                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                    {this.props.title !== 'Login' &&
                        <View style={{ flexDirection: 'column', justifyContent: 'center', display: 'flex', position: 'absolute' }}>
                            <TouchableOpacity onPress={this._drawerOpen} style={{ height: 23, width: 23, marginLeft: 27, marginTop: 12 }}>
                                <Thumbnail style={commonStyle.menuBurgerStyle} square source={require('../../images/menu_burger.png')} />
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.props.title === 'Chat' ?
                            <View style={{ alignItems: 'center', display: 'flex' }}>
                                <Title style={commonStyle.navbarChatTitleStyles}>{chatUser} & You</Title>
                            </View>
                            :
                            <View style={{ alignItems: 'center', display: 'flex' }}>
                                <Title style={commonStyle.navbarTitleStyles}>{this.props.title}</Title>
                            </View>
                    }

                </View>
            </Content>
        );
    }

}
const mapStateToProps = ({ chatReducer }) => {
    const { chatUser } = chatReducer;
    return { chatUser };
};
export default connect(mapStateToProps, {})(NavBar);
// export default NavBar;
