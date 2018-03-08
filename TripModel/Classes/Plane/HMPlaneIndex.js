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
    Platform,
    TouchableOpacity,
    Switch

} from 'react-native';

import BaseComponent from '../Main/BaseComponent'


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


export default class HMPlaneIndex extends BaseComponent
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
    };  // 注意这里有分号

    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        this.state = {

            value: false
        };
    }

    popToLast()
    {
        this.props.navigator.pop();
    }

    renderCitySelected(status)
    {
        if ('back' == status)
        {
            this.refs.line.setNativeProps({
                style: {left: width * 0.5}
            });
            this.refs.rightDate.setNativeProps({
                style: {left: width * 0.5}
            });
        }
        else
        {
            this.refs.line.setNativeProps({
                style: {left: 0}
            });

            this.refs.rightDate.setNativeProps({
                style: {left: width}
            });
        }
    }

    //开始搜索
    renderSearch()
    {
        this.props.navigation.navigate('HMPlaneList');
    }

    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.outerViewStytle}>
                    <View style={{
                        width: width,
                        height: 40,
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => this.renderCitySelected('go')}>
                            <Text style={{width: width * 0.5, textAlign: 'center'}}>{'单程'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.renderCitySelected('back')}>
                            <Text style={{width: width * 0.5, textAlign: 'center'}}>{'往返'}</Text>
                        </TouchableOpacity>
                        <View
                            ref="line"
                            style={styles.diverLineStytle}></View>
                    </View>

                    <View style={{
                        width: width,
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray'
                    }}>
                        <Text style={{width: width * 0.45, marginLeft: 10}}>{'长春'}</Text>
                        <Image source={{uri: 'goback_img'}} style={{width: 20, height: 20}}></Image>
                        <Text style={{width: width * 0.45, textAlign: 'right', marginRight: 10}}>{'北京'}</Text>
                    </View>
                    <View style={{
                        width: width,
                        height: 40,
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                        alignItems: 'center'
                    }}>
                        <Text style={{width: width * 0.5, marginLeft: 10}}>{'01月09日'}</Text>

                        <View
                            ref="rightDate"
                            style={{
                                width: width * 0.5,
                                position: 'absolute',
                                left: width,
                                justifyContent: 'center'
                            }}>
                            <Text style={{textAlign: 'right'}}>{'01月10日'}</Text>
                        </View>
                    </View>
                    <View style={{
                        width: width,
                        height: 40,
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                        alignItems: 'center'
                    }}>
                        <Text style={{flex: 1, marginLeft: 10}}>{'差旅类型'}</Text>

                        <Text style={{flex: 1, textAlign: 'center'}}>{'因公出行'}</Text>
                        <View style={{flex: 1, justifyContent: 'center'}}></View>
                        <Switch
                            style={{}}
                            //动态改变value
                            value={this.state.value}
                            //当切换开关室回调此方法
                            onValueChange={(value) =>
                            {
                                this.setState({value: value})
                            }}
                        />
                    </View>

                    <View style={{height: 60, width: width, justifyContent: 'center'}}>

                        <TouchableOpacity onPress={() => this.renderSearch()}>

                            <Text style={styles.searchButtonStytle}>{'开始搜索'}</Text>

                        </TouchableOpacity>

                    </View>


                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    outerViewStytle: {
        width: width,
        backgroundColor: 'white'

    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(239,240,243,1.0)',
    },
    searchButtonStytle: {
        borderRadius: 8,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'rgb(192,65,38)',
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 40,
        color: 'white',
    },
    diverLineStytle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: width * 0.5,
        height: 0.5,
        backgroundColor: 'black'
    }
});
AppRegistry.registerComponent('TripGroup', () => TripGroup);
