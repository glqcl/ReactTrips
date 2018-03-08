/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Animated,
    Easing,
    Modal
} from 'react-native';

var {screenWidth, screenHeight} = Dimensions.get('window');

export default class HMLoadingVIew extends Component<{}>
{

    static defaultProps = {
        callBack: null
    }

    constructor(props)
    {
        super(props);

        this.state = {
            rotateValue: new Animated.Value(0),
        };
    }

    componentDidMount()
    {
        this.startAnimation();

    }

    startAnimation()
    {
        this.state.rotateValue.setValue(0);
        Animated.timing(this.state.rotateValue, {
                toValue: -360 * this.props.timers,
                duration: 800 * this.props.timers,
                easing: Easing.linear,
            }
        ).start((data) =>
        {
            console.log('finish' + JSON.stringify(data));
            if (data["finished"])
            {
                if (this.props.callBack == null)
                {
                    return;
                }
                this.props.callBack();
            }

        });// 开始spring动画
    }


    render()
    {
        return (

            <Modal ref='Modal' animationType={'none'} transparent={true} onRequestClose={() =>
            {
                this.startAnimation()
            }}
                   onShow={() => this.startAnimation()} visible={this.props.loadingVisible}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Animated.Image
                        style={[{width: 70, height: 70, zIndex: 0, position: 'absolute'},
                            {
                                transform: [{
                                    rotate: this.state.rotateValue.interpolate({
                                        inputRange: [0, 360],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }]
                            }]}
                        source={require('../../../images/tgground.png')}
                        resizeMode="contain"/>
                    <Image style={{width: 20, height: 20, zIndex: 1, position: 'absolute'}}
                           source={require('../../../images/tglogo.png')} resizeMode="contain"/>
                </View>
            </Modal>
        );
    }
}
HMLoadingVIew.defaultProps = {
    timers: 1,
    loadingVisible: true,
}
module.exports = HMLoadingVIew;