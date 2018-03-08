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
    Platform,
    Dimensions

} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'

var {width, height} = Dimensions.get('window');
var cellW = Platform.OS=='ios'?80:60;
var cellH = 40;
var vMargin = 5;


export default class HMBottomItem extends Component
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
    };  // 注意这里有分号
    render()
    {

        return (

            <View style={styles.container}>

                <Image source={{uri: 'manage', width: Platform.OS=='ios'?25:20, height: Platform.OS=='ios'?25: 20}}></Image>

                <Text style={{fontSize:Platform.OS=='ios'?12:10 , color: HMCommonStyle.white,marginTop:HMCommonStyle.marginTop*0.5,display:'flex'}}>{this.props.title}</Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: cellW,
        height: cellH,
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.between,
        backgroundColor:'rgba(17,33,49,1.0)',
        borderRadius: HMCommonStyle.borderRadius,
        marginLeft: HMCommonStyle.marginLeft*0.5,
        marginTop: vMargin
    },
    innerStytle: {}


});

