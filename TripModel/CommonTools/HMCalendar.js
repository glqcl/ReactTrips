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
        alert(str);
    }


    render()
    {
        return (
            <View style={styles.container}>
                <Calendar
                    touchEvent={this.press}
                    headerStyle={headerStyle}
                    holiday={holiday}
                    check={check}
                />
            </View>
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

