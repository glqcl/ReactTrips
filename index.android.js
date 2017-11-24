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

} from 'react-native';


import Login from './TripModel/Login/Login'
import {Navigator} from 'react-native-deprecated-custom-components';

export default class TripGroup extends Component
{
    render()
    {
        return (
            <Navigator
                initialRoute={{name: '启动页', component: Login}}
                configureScene={() =>
                {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) =>
                {
                    let Component = route.component;
                    return <Component{...route.passProps} navigator={navigator}/>
                }}
            >
            </Navigator>
        );
    }
}


AppRegistry.registerComponent('TripGroup', () => TripGroup);
