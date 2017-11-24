/**
 * Created by mac on 2017/10/26.
 */

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
    TouchableOpacity
} from 'react-native';


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class TripGroup extends Component
{

    static defaultProps = {
        titleName: '我的申请',
        middleArray: ['酒店', '国际机票', '火车票', '用车'],
        popToLast: null

    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();

    }

    render()
    {
        return (
            <View style={styles.container}>

                <Text style={{
                    position: 'absolute',
                    left: 0,
                    color: 'white',
                    fontSize: 16,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}> {this.props.titleName}</Text>

                <TouchableOpacity activeOpacity={0.5} onPress={() =>
                {
                    this.popToLast();
                }}>
                    <View style={{
                        width: 44, height: 44, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <Image source={{uri: 'nav_back'} }
                               style={{
                                   width: 10,
                                   height: 17,
                                   alignItems: 'center',
                                   position: 'absolute',
                                   left: 10
                               }}></Image>
                    </View>


                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        width: width,
        backgroundColor: 'rgba(7,18,30,1.0)',
    },

});

AppRegistry.registerComponent('TripGroup', () => TripGroup);

