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
    AsyncStorage,
    Dimensions
} from 'react-native';

var forge = require('node-forge');
var {width, height} = Dimensions.get('window');
var LogoSign = '986CD980-17CA-4FF4-A158-6067D2721A56';
var LogoKey = 'Key=9DE65DF9-84A3-47C4-901A-681443F5591C';
import CryptoJS from 'crypto-js'
import Encrypt from '../../MD5/Encrypt';
import BaseComponent from '../Main/BaseComponent';
import HMCommonStyle from '../../Stytle/HMCommonStyle'

var self = null;
export default class HMLogin extends BaseComponent
{
    constructor(props)
    {
        super(props);
        self = this;
        this.state = {
            username: 'YDCS007',
            password: '000000',
        };
    }

    login()
    {
        if ('' == this.state.username)
        {
            this.showToast('用户名不能为空!');
            return;
        }
        if ('' == this.state.password)
        {
            this.showToast('密码不能为空!');
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
        var urlData = Encrypt.tgParmsToUrl(parmData);
        urlData += Encrypt.tgGetNewKeyStr(urlData, LogoKey);
        var tempUrl = `${HMServerUrl.CusomterUrl}?${urlData}`;
        this.showProgress();
        NetUitl.get(tempUrl, function (responseText)
        {
            self.hideProgress();
            var Code = responseText.Code;
            var Message = responseText.Message;
            if (0 == Code)
            {
                StorageUtil.saveJsonObject('userInfo', responseText.Datas);
                self.props.navigation.navigate('HMIndex');
            }
            else
            {
                self.showToast(Message);
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
                                       value={this.state.username}
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
                                       value={this.state.password}
                                       underlineColorAndroid='transparent'
                                       placeholder='请输入密码' style={styles.textInputStytle}
                                       onChangeText={(text) =>
                                       {
                                           this.setState({password: text})
                                       }}
                            ></TextInput>

                            <TouchableOpacity
                                style={styles.loginStytle}
                                activeOpacity={HMCommonStyle.activeOpacity} onPress={() =>
                            {
                                this.login()
                            }}>
                                <Text
                                    style={[styles.textStytle, {backgroundColor: HMCommonStyle.clear}]}>{HMCommon.loginName}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginTop: HMCommonStyle.marginTop,
                            width: width * 0.85,
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}>
                            <Text style={{color: HMCommonStyle.btnColorWithRed, fontSize: HMCommonStyle.textFont12}}>忘记密码?</Text>
                            <Text style={{
                                color: HMCommonStyle.gray,
                                fontSize: HMCommonStyle.textFont12,
                                marginTop: HMCommonStyle.marginTop * 0.5
                            }}>请使用差旅天下集团版账户登录</Text>
                            <Text style={{
                                color: HMCommonStyle.gray,
                                fontSize: HMCommonStyle.textFont12,
                                marginTop: HMCommonStyle.marginTop * 0.5
                            }}>如需帮助,可拨打客服电话：300-6568-777</Text>
                        </View>

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
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.center,
        width: null,
        height: null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        // resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor: 'rgba(0,0,0,0)',
    },
    outerViewStytle: {
        position: HMCommonStyle.absolute,
        top: 0,
        left: 0,
    },
    innerStytle: {
        marginTop: Platform.OS == 'ios' ? 200 : 180,
        alignItems: HMCommonStyle.center,
    },
    textInputStytle: {
        paddingLeft: HMCommonStyle.paddingLeft * 0.5,
        width: width * 0.85,
        height: HMCommonStyle.cellHeight,
        backgroundColor: HMCommonStyle.white,
        marginTop: HMCommonStyle.marginTop,
        borderRadius: HMCommonStyle.borderRadius,
        borderWidth: HMCommonStyle.borderWidth,
        fontSize: HMCommonStyle.textFont12
    },
    loginStytle: {
        height: HMCommonStyle.cellHeight,
        width: width * 0.85,
        marginTop: HMCommonStyle.marginTop,
        borderRadius: HMCommonStyle.borderRadius,
        backgroundColor: HMCommonStyle.btnColorWithRed,
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.center,
    },
    textStytle: {

        textAlign: HMCommonStyle.center,
        fontSize: HMCommonStyle.textFont12,
        color: HMCommonStyle.white,

    },
    spinner: {
        position: HMCommonStyle.absolute,
        top: height * 0.5,
        left: width * 0.5,
        marginBottom: 50,
    },
});


