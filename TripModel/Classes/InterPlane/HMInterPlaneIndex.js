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
import HMCommonStyle from '../../Stytle/HMCommonStyle'
import Button from 'apsl-react-native-button'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class HMInterPlaneIndex extends BaseComponent
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
        this.props.navigation.navigate('HMInterPlaneList');
    }

    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.outerViewStytle}>
                    <View style={styles.cellViewStyle}>
                        <TouchableOpacity onPress={() => this.renderCitySelected('go')}>
                            <Text style={{width: width * 0.5, textAlign: HMCommonStyle.center}}>{'单程'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.renderCitySelected('back')}>
                            <Text style={{width: width * 0.5, textAlign: HMCommonStyle.center}}>{'往返'}</Text>
                        </TouchableOpacity>
                        <View
                            ref="line"
                            style={styles.diverLineStytle}></View>
                    </View>
                    <View style={[styles.cellViewStyle]}>
                        <Text style={{
                            width: width * 0.45,
                            marginLeft: HMCommonStyle.marginLeft,
                        }}>{'长春'}</Text>
                        <Image source={{uri: 'goback_img'}} style={{width: 20, height: 20}}></Image>
                        <Text style={{
                            width: width * 0.45,
                            textAlign: HMCommonStyle.right,
                            marginRight: HMCommonStyle.marginRight,
                        }}>{'北京'}</Text>
                    </View>

                    <View style={styles.cellViewStyle}>
                        <Text style={{width: width * 0.5, marginLeft: HMCommonStyle.marginLeft}}>{'01月09日'}</Text>

                        <View
                            ref="rightDate"
                            style={styles.rightViewStyle}>
                            <Text style={{textAlign: HMCommonStyle.right}}>{'01月10日'}</Text>
                        </View>
                    </View>

                    <View style={styles.cellViewStyle}>
                        <Text
                            style={{flex: HMCommonStyle.flex, marginLeft: HMCommonStyle.marginLeft}}>{'商务舱/头等舱'}</Text>
                    </View>

                    <View style={styles.cellViewStyle}>
                        <Text style={{flex: HMCommonStyle.flex, marginLeft: HMCommonStyle.marginLeft}}>{'差旅类型'}</Text>
                        <Text style={{flex: HMCommonStyle.flex, textAlign: HMCommonStyle.center}}>{'因公出行'}</Text>
                        <View style={{flex: HMCommonStyle.flex, justifyContent: HMCommonStyle.center}}></View>
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

                    <Button style={[styles.searchButtonStytle]}
                            textStyle={{fontSize: HMCommonStyle.textFont12, color: HMCommonStyle.white}}
                            onPress={() =>
                            {
                                this.renderSearch()
                            }}>
                        {'开始搜索'}
                    </Button>


                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(239,240,243,1.0)',
    },
    outerViewStytle: {
        width: width,
        backgroundColor: 'white'

    },

    cellViewStyle: {
        width: width,
        height: HMCommonStyle.cellHeight,
        flexDirection: HMCommonStyle.row,
        borderBottomWidth: HMCommonStyle.borderWidth,
        borderBottomColor: HMCommonStyle.borderColor,
        alignItems: HMCommonStyle.center
    },

    searchButtonStytle: {
        borderRadius: HMCommonStyle.borderRadius,
        height: HMCommonStyle.cellHeight,
        marginRight: 2 * HMCommonStyle.marginRight,
        marginLeft: 2 * HMCommonStyle.marginLeft,
        backgroundColor: HMCommonStyle.btnColorWithRed,
        borderColor: HMCommonStyle.clear,
        marginTop: HMCommonStyle.marginTop


    },
    diverLineStytle: {
        position: HMCommonStyle.absolute,
        left: 0,
        bottom: 0,
        width: width * 0.5,
        height: HMCommonStyle.borderWidth,
        backgroundColor: HMCommonStyle.black
    },
    rightViewStyle: {

        width: width * 0.5,
        position: HMCommonStyle.absolute,
        left: width,
        justifyContent: HMCommonStyle.center

    }
});
