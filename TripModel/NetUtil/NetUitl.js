/**
 * Created by mac on 2017/11/2.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

let request = require('superagent');

import BaseComponent from '../Classes/Main/BaseComponent';

let self = null;
class NetUitl extends BaseComponent
{

    // 构造
    constructor(props)
    {
        super(props);
        self = this;
        // 初始状态
        this.state = {};
    }

    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, successCallback, failureCallBack)
    {

        request.get(url)
            .retry(2)//该方法可以设置最大尝试次数（失败次数），默认值为 3。
            // .set('API-Key', 'foobar')
            // .set('Accept', 'application/json')
            .timeout({
                response: 50000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .end(function (err, res)
            {
                if (res)
                {
                    successCallback(JSON.parse(res.text))
                }
                else
                {
                    // if (err.timeout)
                    // {
                    //
                    //     self.showToast(HMCommon.netTimeOut)
                    // }
                    // else
                    // {
                    //
                    //     self.showToast(HMCommon.netError)
                    // }
                    failureCallBack(err)
                }

            });

    }

    static getImageList(url, successCallback, failureCallBack)
    {

        fetch(url,
            {
                method: 'GET',
            })
            .then((response) => response.text())
            .then((responseText) =>
            {

                if (Platform.OS === 'android')
                {
                    responseText = responseText.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars.

                }
                successCallback(JSON.parse(responseText))
            })
            .catch((error) =>
            {

                failureCallBack(error)
            }).done();

    }


    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url, params, successCallback, failureCallBack)
    {
        request.post(url)
            .send(params)
            .end(function (err, res)
            {
                if (res)
                {
                    successCallback(JSON.parse(res.text))
                }
                else
                {
                    failureCallBack(error)
                }
            });
    }

}

module.exports = NetUitl;
