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
import HMCommonStyle from '../../Stytle/HMCommonStyle'
export default class HMListViewCell extends Component
{

    static defaultProps = {

        jsonObject: {},

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
                <Text> 第一目的地</Text>
                <View>
                    <Text>起始城市</Text>
                    <Text>长春</Text>
                    <Text>至</Text>
                    <Text>北京</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        borderColor: HMCommonStyle.gray,
        borderRadius: HMCommonStyle.borderRadius,
        borderWidth: HMCommonStyle.borderWidth
    },


});



