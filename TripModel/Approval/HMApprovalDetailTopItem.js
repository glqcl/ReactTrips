/**
 * Created by mac on 2017/10/30.
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
export default class HMApprovalDetailTopItem extends Component
{
    static defaultProps = {
        jsonObject: {},
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

                <View style={{
                    height: 45 * 3,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(18,32,47,1.0)',
                    borderRadius: 5,
                    margin: 10
                }}>
                    <View style={styles.cellStytle}>
                        <Text style={styles.letfViewStytle}>{'申请单号'}</Text>
                        <Text style={styles.textViewStytle}>{this.props.jsonObject.travel_id}</Text>
                    </View>

                    <View style={styles.lineStytle}/>

                    <View style={styles.cellStytle}>
                        <Text style={styles.letfViewStytle}>{'费用归属'}</Text>
                        <Text style={styles.textViewStytle}>{this.props.jsonObject.costcenter}</Text>
                    </View>
                    <View style={styles.lineStytle}/>
                    <View style={styles.cellStytle}>
                        <Text style={styles.letfViewStytle}>{'出差类型'}</Text>
                        <Text style={styles.textViewStytle}>{this.props.jsonObject.ccType}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45 * 3 + 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        width: width,

    },
    cellStytle: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: 'rgba(18,32,47,1.0)',
        alignItems: 'center',

    },
    lineStytle: {
        height: 0.5,
        backgroundColor: 'gray'
    },

    letfViewStytle: {
        width: 100,
        fontSize: 14,
        color: 'gray',
        marginLeft: 5
    },
    textViewStytle: {
        color: 'white',
        fontSize: 12,

        alignItems: 'center',
        textAlign: 'left',


    }

});

AppRegistry.registerComponent('TripGroup', () => TripGroup);


