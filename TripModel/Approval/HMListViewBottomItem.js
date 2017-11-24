/**
 * Created by mac on 2017/10/26.
 */
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
    TouchableOpacity,
    TextInput
} from 'react-native';


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class HMListViewBottomItem extends Component
{
    static defaultProps = {
        jsonObject: {},
        popToLast: null,
        remars:'',
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

                <View style={styles.bottomViewStyle}>

                    <Text style={{marginTop: 5, marginLeft: 10}}>{'出差事由'}</Text>

                    <TextInput
                        editable={false}
                        multiline={true}

                        underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                        style={styles.textInputStytle}>{this.props.remars}</TextInput>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        marginTop: 10,
        borderTopWidth:0.5,
        borderTopColor:'gray',
        backgroundColor: 'white',
        borderBottomWidth:0.5,
        borderBottomColor:'gray'

    },

    bottomViewStyle: {
        flexDirection: 'row',
        width: width,
        height: 100,


    },
    textInputStytle: {
        marginLeft: 5,
        width: width - 100,
        flexWrap: 'wrap',
        height: 100,
        fontSize: 12,

    }
});

AppRegistry.registerComponent('TripGroup', () => TripGroup);

