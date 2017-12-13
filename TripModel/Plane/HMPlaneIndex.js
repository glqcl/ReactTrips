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
    Platform

} from 'react-native';

import BaseComponent from '../Main/BaseComponent'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var cellW = 60;
var cellH = 40;
var vMargin = 5;


export default class HMPlaneIndex extends BaseComponent
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
    };  // 注意这里有分号
    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.outerViewStytle}>
                    <View style={{width: width, height: 40,flexDirection:'row'}}>
                        <Text style={{width:width*0.5,backgroundColor:'red'}}></Text>
                        <Text style={{width:width*0.5,backgroundColor:'green'}}></Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    outerViewStytle: {
        width:width
    },
    container: {
        flex:1

    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
