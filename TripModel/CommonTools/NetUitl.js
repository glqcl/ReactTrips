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

class NetUitl extends React.Component
{
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, successCallback, failureCallBack)
    {

        console.log("请求url="+url);
        fetch(url,
            {
                method: 'GET',
            })
            .then((response) => response.text())
            .then((responseText) =>
            {

                if (Platform.OS === 'android')
                {
                    //responseText = responseText.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars.

                }
                successCallback(JSON.parse(responseText))
            })
            .catch((error) =>
            {

                failureCallBack(error)
            }).done();

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
        var tempUrl='';
        for (var Key in params){
            tempUrl =tempUrl+'&'+''+Key+'='+params[Key]+'';
        }
        tempUrl=  tempUrl.substring(1,str.length-1);
        console.log("请求url="+url+"？"+tempUrl);
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                // 'token': headers
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.text())
            .then((responseText) =>
            {
                if (Platform.OS === 'android')
                {
                    // responseText = responseText.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars.
                }
                successCallback(JSON.parse(responseText))
            })
            .catch((error) =>
            {

                failureCallBack(error)
            }).done();
    }

}

module.exports = NetUitl;
