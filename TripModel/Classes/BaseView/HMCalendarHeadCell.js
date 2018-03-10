/**
 * Created by mac on 2018/3/10.
 */
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
    Dimensions,
    TouchableOpacity

} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'
import HMApprovalTools from '../Approval/HMApprovalTools'


var {width, height} = Dimensions.get('window');
var cellW = (width - 60) / 6;
var cellH = 44;
var vMargin = 5;

/*临时变量*/
let current = '';
export default class HMCalendarHeadCell extends Component
{
    static defaultProps = {
        title: '',
        callBack: null,
        day: '',
        date: ''
    }

    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        current = HMApprovalTools.getNowFormatDate();
    }

    popToLast(date)
    {
        if (this.props.callBack == null) return;
        this.props.callBack(date);
        current = date
    }

    render()
    {
        return (
            <TouchableOpacity onPress={() => this.popToLast(this.props.date)}>
                <View
                    style={[styles.container, {backgroundColor: current == this.props.date ? HMCommonStyle.lightGray :HMCommonStyle.bgColor}]}>
                    <Text
                        style={{color: HMCommonStyle.white, fontSize: HMCommonStyle.textFont12}}>{this.props.day}</Text>
                    <Text style={{
                        color: HMCommonStyle.white,
                        fontSize: HMCommonStyle.textFont12,
                        marginTop: HMCommonStyle.marginTop * 0.5
                    }}>{HMApprovalTools.getWeek(this.props.date)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: cellW,
        height: cellH,
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.center,
    },

});


