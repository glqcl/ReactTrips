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
    TouchableOpacity,
    Platform

} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class TripGroup extends Component
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
        popToIndex: null
    };  // 注意这里有分号
    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.cellClick(this.props.title)}>

                    <Image source={{
                        uri: 'topcircle',
                        width: width / 4,
                        height: width / 4
                    }}></Image>

                    <Text style={{
                        marginTop: 5,
                        fontSize: 12,
                        marginTop: 5,
                        color: 'white',
                        textAlign: 'center'
                    }}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    cellClick(title)
    {
        if (this.props.popToIndex == null)return;

        this.props.popToIndex(title);

    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 3,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
