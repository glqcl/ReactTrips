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
    Platform,
} from 'react-native';

import Loading from 'react-native-loading-w';

export default class BaseComponent extends Component
{

    constructor(props)
    {
        super(props);
    }

    initLoading()
    {
        return <Loading ref={'loading'} text={'Loading...'}/>
    }

    hideProgress()
    {
        this.getLoading().dismiss();
    }

    showProgress()
    {
        var self = this;
        this.getLoading().setLoadingTimeout(20000, function ()
        {
            if (null != self && null != self.getLoading())
            {
                self.getLoading().clearLoadingTimeout();
            }
        }).show();
    }

    getLoading()
    {
        return this.refs['loading'];
    }

    componentWillMount()
    {
        // if (Platform.OS === 'android')
        // {
        //
        //     BackHandler.addEventListener("back", this.onBackClicked);
        // } else
        // {
        //
        // }
    }

    componentWillUnmount()
    {
        // if (Platform.OS === 'android')
        // {
        //     BackHandler.removeEventListener("back", this.onBackClicked);
        // } else
        // {
        //     if (null != this.propstManger && null != this.props.navigator.getCurrentRoutes())
        //     {
        //         this.propstManger.addLengeData(this.props.navigator.getCurrentRoutes().length);
        //     }
        // }
    }

    onBackClicked = () =>
    {
        const {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1)
        {
            if (null != this.getLoading() && this.getLoading().isShow)
            {
                this.getLoading().hideProgress();
            }
            else
            {
                navigator.pop();
            }

            return true;//true 表示返回上一页
        }
        return false; // 默认false  表示跳出RN
    }
}
