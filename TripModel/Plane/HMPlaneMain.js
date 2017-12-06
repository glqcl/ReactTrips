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
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    Platform


} from 'react-native';

var forge = require('node-forge');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

import Toast, {DURATION} from 'react-native-easy-toast'


import HMIndex from '../Index/HMIndex';

export default class HMPlaneMain extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

}

render()
{
    return (
        <View style={[styles.container]}>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,

    },


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);
