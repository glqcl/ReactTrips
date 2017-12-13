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
        var selft=this;
        this.getLoading().setLoadingTimeout(20000, function ()
        {
            alert(11111);

            selft.getLoading().clearLoadingTimeout();
        }).show();
    }

    getLoading()
    {
        return this.refs['loading'];
    }

    componentWillMount()
    {
        if (Platform.OS === 'android')
        {

            BackHandler.addEventListener("back", this.onBackClicked);
        } else
        {

        }
    }

    componentWillUnmount()
    {
        if (Platform.OS === 'android')
        {
            BackHandler.removeEventListener("back", this.onBackClicked);
        } else
        {
            this.propstManger.addLengeData(this.props.navigator.getCurrentRoutes().length);
        }
    }

    onBackClicked = () =>
    {
        const {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1)
        {
            if(null!=this.getLoading()&&this.getLoading().isShow)
            {
                alert(1111);
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
