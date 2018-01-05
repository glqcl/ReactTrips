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
                <View style={styles.outerViewStytle}>
                    <View style={{
                        width: width,
                        height: 40,
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                        alignItems:'center'
                    }}>
                        <Text style={{width: width * 0.5, textAlign: 'center'}}>{'单程'}</Text>
                        <Text style={{width: width * 0.5, textAlign: 'center'}}>{'往返'}</Text>
                    </View>
                    <View style={{width: width, height: 40, flexDirection: 'row',alignItems:'center'}}>
                        <Text style={{width: width * 0.45,marginLeft:10}}>{'长春'}</Text>
                        <Image source={{uri: 'goback_img'}} style={{width: 20, height: 20}}></Image>
                        <Text style={{width: width * 0.45,textAlign:'right',marginRight:10}}>{'北京'}</Text>
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
