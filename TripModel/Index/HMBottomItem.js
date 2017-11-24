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

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var cellW = 60;
var cellH = 40;
var vMargin = 5;


export default class TripGroup extends Component
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
    };  // 注意这里有分号
    render()
    {

        return (

            <View style={styles.container}>

                <Image source={{uri: 'manage', width: Platform.OS=='ios'?25:20, height: Platform.OS=='ios'?25:20}}></Image>

                <Text style={{fontSize:Platform.OS=='ios'?14:10 , color: 'white',marginTop:5}}>{this.props.title}</Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: cellW,
        height: cellH,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'rgba(17,33,49,1.0)',
        borderRadius: 5,
        marginLeft: 5,
        marginTop: vMargin
    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
