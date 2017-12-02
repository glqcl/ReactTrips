/**
 * Created by mac on 2017/10/26.
 */
/**
 * Created by mac on 2017/10/26.
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
    TouchableOpacity
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
var holiday = {
    '2015-10-1': '国庆节',
    '2015-9-10': '教师节',
    '2016-1-1': '元旦节',
    '2015-11-11': '双十一'
};

var check = {
    '2015-10-1': 'checked',
    '2015-9-1': 'checked',
    '2015-7-10': 'checked',
    '2015-9-10': 'checked'
};

var headerStyle = {
    backgroundColor: '#3C9BFD',
    color: '#fff',
    fontSize: 15,
    fontWeight: 500,
};


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class HMCalendar extends Component
{

    static defaultProps = {};

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();

    }

    renderPress(str)
    {
        if (this.props.callBack == null)return;
        this.props.callBack(str);
        this.props.navigator.pop();
    }

    render()
    {
        return (
            <CalendarList
                markedDates={{
                    '2017-11-26': {selected: true, marked: true},
                    '2013-09-17': {marked: true},
                    '2013-09-18': {disabled: true}
                }}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) =>
                {
                }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                selected={'2017-11-25'}
                rowHasChanged={(r1, r2) =>
                {
                    return r1.text !== r2.text
                }}
                onDayPress={(day) =>
                {
                    this.renderPress(day)
                }}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
            />
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    }


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);

