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

var cellH = (height / 4) / 2.1;
var cellW = ((width - 20) / 3) / 1.3
var hMargin = ( ((width - 20) / 3) * 1.7 - 2 * cellW) / 3
var vMargin = 10

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
        borderRadius: 8,
        marginLeft: hMargin,
        marginTop: vMargin,


    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
