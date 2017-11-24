/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var testDemo = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1,height:height, width: width, flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor: 'orange', width: 50, height: 100 ,alignSelf:'stretch'}}></View>
                    <View style={{backgroundColor: 'purple', width: 50, height: 100}}></View>
                    <View style={{backgroundColor: 'yellow', width: 50, height: 100}}></View>

                </View>

            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
    },

});

// 输出类
module.exports = testDemo;
