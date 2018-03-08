/**
 * Created by mac on 2018/3/7.
 */


import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    Text,
    ListView,
    Platform,
    Dimensions,
    StyleSheet,
    Alert
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class HMCalendarView extends Component
{
    constructor(props)
    {
        super(props);

    }

    componentWillMount()
    {

    }

    componentDidMount()
    {

    }


    renderSelectedDate(day)
    {
        this.props.navigation.state.params.fn(day);
        this.props.navigation.goBack();
    }

    render()
    {
        return (
            <CalendarList
                current={'2018-03-07'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) =>
                {
                    console.log('now these months are visible', months);
                }}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                selected={'2018-03-17'}
                onDayPress={(day)=>this.renderSelectedDate(day)}
                markedDates={{
                    '2018-05-16': {selected: true, marked: true},
                    '2018-05-17': {marked: true},
                    '2018-05-18': {disabled: true}
                }}

            />
        );
    }
};

const styles = StyleSheet.create({})