/**
 * Created by mac on 2017/11/21.
 */
/**
 * 所有组件的基类
 * 实现android端物理返回键的监听
 */
import React, {Component} from 'react';

import Singleton from '../CommonTools/Singleton';
import {
    BackHandler,
    Platform,
} from 'react-native';

let singleton=new Singleton();

export default class BaseComponent extends Component
{

    constructor(props)
    {
        super(props);
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

    //返回 ;//return  true 表示返回上一页  false  表示跳出RN
    // onBackClicked = () =>
    // { // 默认 表示跳出RN
    //     return false;
    // }


    onBackClicked = () =>
    {
        const {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1)
        {
            navigator.pop();

            singleton.hideProgress();
            return true;//true 表示返回上一页
        }
        return false; // 默认false  表示跳出RN
    }


    /*
     //复制此方法到 继承该组件的地方即可

     //BACK物理按键监听
     onBackClicked = () => {
     const {navigator} = this.props;
     if (navigator && navigator.getCurrentRoutes().length > 1) {
     navigator.pop();
     return true;//true 表示返回上一页
     }
     return false; // 默认false  表示跳出RN
     }
     */

}
