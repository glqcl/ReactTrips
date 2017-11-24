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
    Platform


} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


import HMIndex from '../Index/HMIndex';

export default class TripGroup extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    login()
    {
        if ('' == this.state.username)
        {
            alert('用户名不能为空!');
            return;
        }
        if ('' == this.state.password)
        {
            alert('密码不能为空!');
            return;
        }
        if (this.state.username == '111' && this.state.password == '111')
        {
            this.props.navigator.replace({
                component: HMIndex
            })
        }
    }

    render()
    {
        return (
            <View style={[styles.container]}>

                <Image source={{uri: 'loginbg'}} style={styles.bgStytle}/>

                <View style={styles.outerViewStytle}>

                    <View style={{alignItems: 'center', width: width, marginTop: 20}}>

                        <View style={styles.innerStytle}>
                            <TextInput ref='username' placeholder='请输入账号'
                                       returnKeyType={'done'}
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
                                <Text style={[styles.textStytle]}>登录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 20, width: width * 0.85, backgroundColor: 'rgba(0,0,0,0)'}}>
                            <Text style={{color: 'red', fontSize: 12}}>忘记密码?</Text>
                            <Text style={{color: 'gray', fontSize: 12}}>请使用差旅天下集团版账户登录</Text>
                            <Text style={{color: 'gray', fontSize: 12}}>如需帮助,可拨打客服电话：300-6568-777</Text>
                        </View>

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
        marginTop: Platform.OS=='ios'?200:180,
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
