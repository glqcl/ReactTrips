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
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

var forge = require('node-forge');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var LogoSign = '986CD980-17CA-4FF4-A158-6067D2721A56';
var LogoKey = 'Key=9DE65DF9-84A3-47C4-901A-681443F5591C';
import Toast, {DURATION} from 'react-native-easy-toast'
import CryptoJS from 'crypto-js'
import HMIndex from '../Index/HMIndex';
import NetUitl from '../CommonTools/NetUitl';
import tgUtil from '../CommonTools/tgUtil';
import BaseComponent from '../Main/BaseComponent';
import HMUrlUtils from '../CommonTools/HMUrlUtils'


import Storage from '../CommonTools/DeviceStorage'

export default class TripGroup extends BaseComponent
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: 'YDCS007',
            password: '000000',
            tempUrl: ''
        };
    }

    login()
    {
        if ('' == this.state.username)
        {
            this.refs.toast.show('用户名不能为空!');
            return;
        }
        if ('' == this.state.password)
        {
            this.refs.toast.show('密码不能为空!');
            return;
        }
        var timeMd5Int = Date.parse(new Date());
        timeMd5Int = (timeMd5Int / 1000);
        var username = this.state.username;
        var password = this.state.password;
        var passmd5String = CryptoJS.MD5(password).toString();
        var passMd5 = username + parseInt(timeMd5Int / 60) + passmd5String;
        passMd5 = CryptoJS.MD5(passMd5);
        var parmData = {
            TimeStamp: timeMd5Int + '',
            Sign: LogoSign,
            cmd: 'UserCheck',
            UserName: username,
            PasswordKey: passMd5
        };
        var urlData = tgUtil.tgParmsToUrl(parmData);
        urlData += tgUtil.tgGetNewKeyStr(urlData, LogoKey);
        var tempUrl = `${HMUrlUtils.CusomterUrl}?${urlData}`;
        this.showProgress();
        var self = this;
        NetUitl.get(tempUrl, function (responseText)
        {
            self.hideProgress();
            var Code = responseText.Code;
            var Message = responseText.Message;

            if (0 == Code)
            {
                Storage.save('userInfo', responseText.Datas)
                self.props.navigator.push({
                    component: HMIndex
                })
            }
            else
            {
                self.refs.toast.show(Message);
            }
        }, function (error)
        {
            self.hideProgress();
        })
    }

    render()
    {
        return (
            <View style={[styles.container]}>

                <Image source={{uri: 'loginbg'}} style={styles.bgStytle}/>

                <View style={styles.outerViewStytle}>

                    <View style={{alignItems: 'center', width: width, marginTop: 50}}>

                        <View style={styles.innerStytle}>
                            <TextInput ref='username' placeholder='请输入账号'
                                       returnKeyType={'done'}
                                       value={'YDCS007'}
                                       underlineColorAndroid='transparent'
                                       style={styles.textInputStytle}
                                       onChangeText={(text) =>
                                       {
                                           this.setState({username: text})
                                       }}

                            ></TextInput>

                            <TextInput ref='password'
                                       secureTextEntry={true}
                                       returnKeyType={'done'}
                                       value={'000000'}
                                       underlineColorAndroid='transparent'
                                       placeholder='请输入密码' style={styles.textInputStytle}
                                       onChangeText={(text) =>
                                       {
                                           this.setState({password: text})
                                       }}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.loginStytle}
                                activeOpacity={0.5} onPress={() =>
                            {
                                this.login()
                            }}>
                                <Text style={[styles.textStytle, {backgroundColor: 'transparent'}]}>{'登录'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 20, width: width * 0.85, backgroundColor: 'rgba(0,0,0,0)'}}>
                            <Text style={{color: 'red', fontSize: 12}}>忘记密码?</Text>
                            <Text style={{color: 'gray', fontSize: 12}}>请使用差旅天下集团版账户登录</Text>
                            <Text style={{color: 'gray', fontSize: 12}}>如需帮助,可拨打客服电话：300-6568-777</Text>
                        </View>

                        <Toast ref="toast"/>

                        {this.initLoading()}

                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,

    },

    bgStytle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        // resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor: 'rgba(0,0,0,0)',
    },
    outerViewStytle: {
        position: 'absolute',
        top: 0,
        left: 0,

    },
    innerStytle: {
        marginTop: Platform.OS == 'ios' ? 200 : 180,
        alignItems: 'center',

    },
    textInputStytle: {
        paddingLeft: 5,
        width: width * 0.85,
        height: 44,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        fontSize: 12

    },
    loginStytle: {
        height: 44,
        width: width * 0.85,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStytle: {

        textAlign: 'center',
        fontSize: 12,
        color: 'white',

    }


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);
