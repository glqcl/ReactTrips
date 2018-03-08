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
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'
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

        var nextAppName = this.props.jsonObject.nextAppName;
        if (null == nextAppName || 'null' == nextAppName)
        {
            nextAppName = '';
        }
        return (
            <View style={styles.container}>
                <Text style={{
                    marginLeft: 5,
                    color: HMCommonStyle.gray,
                    fontSize: Platform.OS == 'ios' ? 12 : 14
                }}>{'下一步审批人'}</Text>
                <Text style={{
                    width: width - 100,
                    textAlign: HMCommonStyle.center,
                    fontSize: Platform.OS == 'ios' ? 12 : 14,
                    color: HMCommonStyle.black
                }}>{nextAppName}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: HMCommonStyle.white,
        flexDirection: HMCommonStyle.row,
        alignItems: HMCommonStyle.center,
        height: cellHeight,
    },
});
