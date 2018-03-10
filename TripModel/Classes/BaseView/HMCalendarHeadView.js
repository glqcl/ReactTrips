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
    ScrollView

} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'
import HMCalendarHeadCell from '../BaseView/HMCalendarHeadCell'
import HMApprovalTools from '../Approval/HMApprovalTools'

var {width, height} = Dimensions.get('window');
var cellW = (width - 80) / 6;
var cellH = 60;
var vMargin = 5;


export default class HMCalendarHeadView extends Component
{
    static defaultProps = {
        callBack: null,
        currentDate:''
    };
    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        this.state = {
            current: ''
        };
    }

    popToLast(date)
    {
        if (this.props.callBack == null) return;

        this.props.callBack(date);

        this.setState({
            current: date,
        })
    }

    renderCalendar()
    {
        let listArray = [];
        for (let i = 0; i < 20; i++)
        {
            var day = HMApprovalTools.addDate(this.props.currentDate, (i))

            var date = HMApprovalTools.addDateByNewDate(this.props.currentDate, (i))
            listArray.push(
                <HMCalendarHeadCell
                    day={day}
                    date={date}
                    callBack={(date) => this.popToLast(date)}
                    key={i}>
                </HMCalendarHeadCell>)
        }
        return listArray;
    }

    render()
    {
        return (<ScrollView

            horizontal={true}>
            {this.renderCalendar()}
        </ScrollView>)


    }
}

const styles = StyleSheet.create({
    container: {
        width: HMCommonStyle.width - 60,
    },
    innerStytle: {}


});


