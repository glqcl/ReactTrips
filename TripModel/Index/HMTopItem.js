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
                        width: Platform.OS == 'ios' ? 80 : 85,
                        height: Platform.OS == 'ios' ? 80 : 85
                    }}></Image>

                    <Text style={{
                        marginTop: 5,
                        fontSize: 12,
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
        width: 70,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    innerStytle: {}


});


AppRegistry.registerComponent('TripGroup', () => TripGroup);
