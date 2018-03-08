/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import  './TripModel/Stytle/Global';  // 导出全局属性
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

} from 'react-native';

import App from './TripModel/Classes/Main/App'

export default class TripGroup extends Component
{
    render()
    {
        return (
          <App/>
        );
    }
}







AppRegistry.registerComponent('TripGroup', () => TripGroup);
