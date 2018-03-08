/**
 * Created by mac on 2017/11/21.
 */
/**
 * 所有组件的基类
 * 实现android端物理返回键的监听
 */
import React, {Component} from 'react';

import {
    BackHandler,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform,

} from 'react-native';

// import Toast from 'react-native-root-toast'; // 引入类库
var TGLoadingVIew = require('../BaseView/HMLoadingVIew');

var request = require('superagent');

var self = null;

var isLoading = false;

export default class BaseComponent extends Component
{
    constructor(props)
    {
        super(props);
        isLoading = false
        self = this;
        this.state = {
            isLoading: false
        }
    }

    initLoading()
    {
        return <TGLoadingVIew
            callBack={() => this.hideProgress()}
            timers={90} loadingVisible={isLoading}/>
    }

    hideProgress()
    {
        isLoading = false;
        this.setState({
            isLoading: isLoading
        });
    }

    showProgress()
    {
        isLoading = true;
        this.setState({
            isLoading: isLoading
        });
    }


    showToast(message)
    {
        // // 通过调用 Toast.show(message, options); 可以在屏幕上显示一个toast，并返回一个toast实例
        // let toast = Toast.show(message, {
        //     duration: Toast.durations.LONG, // toast显示时长
        //     position: Toast.positions.BOTTOM, // toast位置
        //     shadow: true, // toast是否出现阴影
        //     animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        //     hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        //     delay: 0, // toast显示的延时
        //     onShow: () =>
        //     {
        //         // toast出现回调（动画开始时）
        //     },
        //     onShown: () =>
        //     {
        //         // toast出现回调（动画结束时）
        //     },
        //     onHide: () =>
        //     {
        //         // toast隐藏回调（动画开始时）
        //     },
        //     onHidden: () =>
        //     {
        //         // toast隐藏回调（动画结束时）
        //     }
        // });
    }

    _renderActivityIndicator()
    {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{marginRight: 10,}}
                animating={true}

                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{marginRight: 10,}}

                    styleAttr={'Small'}/>

            ) : (
                <ActivityIndicatorIOS
                    style={{marginRight: 10,}}
                    animating={true}

                    size={'small'}/>
            )
    }
}

const styles = StyleSheet.create({
    launchImageStyle: {
        flex: 1
    },
    itemHeader: {
        height: 35,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        backgroundColor: 'blue',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

});




