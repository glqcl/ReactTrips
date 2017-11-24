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

var height=Platform.OS=='ios'?170:155;
var cellW = Platform.OS == 'ios' ? 90 : 85;
var cellH = (height-10)/2;



var hMargin = ((width - 145 - cellW * 2)) / 4;
var vMargin = 10;


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

                <Image source={{uri: 'hotel', width: 20, height: 20}}></Image>

                <Text style={{marginTop: 5, fontSize: 12, color: 'white'}}>{this.props.title}</Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: cellW,
        height: cellH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#323141',
        borderRadius: 5,
        marginLeft: hMargin,
        marginTop: vMargin,

    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
