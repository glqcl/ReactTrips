/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

/**----导入外部的组件----**/


import Login from '../Login/Login'
import HMIndex from '../Index/HMIndex'
import HMLaunchImage from '../Main/HMLaunchImage'
import {StackNavigator} from 'react-navigation';
import HMPlaneIndex from '../Plane/HMPlaneIndex';
import HMApprovalList from '../Approval/HMApprovalList';
import HMApprovalDetail from '../Approval/HMApprovalDetail';

export default class BaseRootNavigator extends Component
{
    render()
    {
        return (
            <Navigator/>
        )
    }
}

const styles = StyleSheet.create({
    launchImageStyle: {
        flex: 1
    }
});

// 注册导航
const Navigator = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },
    HMIndex: {
        screen: HMIndex,  // 必须其他都是非必须
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },
    HMLaunchImage: {
        screen: HMLaunchImage,
        navigationOptions: {
            header: null
        }
    },
    HMPlaneIndex: {
        screen: HMPlaneIndex,
        navigationOptions: {
            headerTitle: '国内机票'
        }
    },
    HMApprovalList: {
        screen: HMApprovalList,
        navigationOptions: {
            headerTitle: '申请单列表'
        }
    }
    ,
    HMApprovalDetail: {
        screen: HMApprovalDetail,
        navigationOptions: {
            headerTitle: '申请单详情'
        }
    }

}, {
    navigationOptions: {

        headerStyle: {backgroundColor: 'rgba(7,18,30,1.0)'},
        headerTitleStyle: {color: 'white', fontSize: 16,alignSelf:Platform.OS=='android'?'center':null},
        gesturesEnabled: true,
        headerBackTitle: null,
        headerTintColor: 'white',
        headerRight:null
    },
    initialRouteName: 'HMLaunchImage', // 默认显示界面
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: () =>
    {
        console.log('导航栏切换开始');
    },  // 回调
    onTransitionEnd: () =>
    {
        console.log('导航栏切换结束');
    }  // 回调
})


