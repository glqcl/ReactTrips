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


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var letfViewWidth = 60;
var middleWidth = 10;
var cellHeight = 44;
export default class HMListViewNextPerson extends Component
{
    static defaultProps = {
        jsonObject: {},
        position: 0,
        popToLast: null
    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Text style={{marginLeft:5}}>{'下一步审批人'}</Text>
                <Text style={{width:width-100, textAlign:'center'}}>{this.props.jsonObject.nextAppName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor:'white',
        flexDirection: 'row',
        alignItems:'center',
        height: cellHeight,

    },


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);

