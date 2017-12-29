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
import HMNavigatorBar from '../Main/HMNavigatorBar'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


export default class HMPlaneIndex extends BaseComponent
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
    };  // 注意这里有分号


    popToLast()
    {
        this.props.navigator.pop();
    }

    render()
    {
        return (
            <View style={styles.container}>
                {/*<HMNavigatorBar*/}
                    {/*title={'国内机票'}*/}
                    {/*popToLast={() => this.popToLast()}>*/}
                {/*</HMNavigatorBar>*/}
                <View style={styles.outerViewStytle}>
                    <View style={{width: width, height: 40, flexDirection: 'row'}}>
                        <Text style={{width: width * 0.5,}}>{'单程'}</Text>
                        <Text style={{width: width * 0.5,}}>{'往返'}</Text>
                    </View>
                    <View style={{width: width, height: 40, flexDirection: 'row'}}>
                        <Text style={{width: width * 0.5,}}>{'长春'}</Text>
                        <Text style={{width: width * 0.5,}}>{'北京'}</Text>
                    </View>
                    <View style={{width: width, height: 40, flexDirection: 'row'}}>
                        <Text style={{width: width * 0.5,}}></Text>
                        <Text style={{width: width * 0.5,}}></Text>
                    </View>
                    <View style={{width: width, height: 40, flexDirection: 'row'}}>
                        <Text style={{width: width * 0.5,}}></Text>
                        <Text style={{width: width * 0.5,}}></Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    outerViewStytle: {
        width: width
    },
    container: {
        flex: 1
    },
    innerStytle: {}
});
AppRegistry.registerComponent('TripGroup', () => TripGroup);
