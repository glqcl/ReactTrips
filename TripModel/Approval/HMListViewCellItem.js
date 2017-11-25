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
    TouchableOpacity
} from 'react-native';


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var letfViewWidth = 60;
var middleWidth = 10;
var cellHeight = 40;
export default class HMListViewCellItem extends Component
{
    static defaultProps = {
        headObject: {},
        jsonObject: {},
        position: 0,
        popToLast: null,
        desPosition: 1,
    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();
    }


    renderGetCell()
    {
        var cellArray = [];

        cellArray.push(<View key={'0'} style={styles.desViewStytle}><Text
            style={styles.textViewStytle}>{'第' + this.props.desPosition + '目的地'}</Text></View>);

        cellArray.push(<View key={'1'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'起始城市'}</Text>
                <Text style={[styles.textViewStytle, {marginLeft: 10}]}>{this.props.jsonObject.setout_city}</Text>
                <Text style={[styles.textViewStytle, {
                    color: 'orange',
                    position: 'absolute',
                    left: width * 0.5
                }]}>{'至'}</Text>
                <Text style={[styles.textViewStytle, {position: 'absolute', left: width - 100}]}>{this.props.jsonObject.arrive_city}</Text>
            </View>
        </View>);

        cellArray.push(<View key={'2'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'行程日期'}</Text>
                <Text style={[styles.textViewStytle, {marginLeft: 10}]}>{this.props.jsonObject.start_date}</Text>
                <Text style={[styles.textViewStytle, {
                    color: 'orange',
                    position: 'absolute',
                    left: width * 0.5
                }]}>{'至'}</Text>
                <Text style={[styles.textViewStytle, {position: 'absolute', left: width - 100}]}>{this.props.jsonObject.end_date}</Text>
            </View>
        </View>);

        cellArray.push(<View key={'3'} style={[styles.desViewStytle, {flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={styles.textViewStytle}>{'费用申请'}</Text>
            <Text style={[styles.textViewStytle, {flex: 1, textAlign: 'left',marginLeft:width*0.5-70}]}>{this.props.jsonObject.product_name}</Text>
        </View>);


        return cellArray;


    }

    render()
    {
        return (
            <View style={styles.container}>
                <View
                >
                    {this.renderGetCell()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: cellHeight,
        marginTop: 2,
    },


    cellViewStytle: {
        width: width,
        height: cellHeight
    },
    seconViewStytle: {
        flexDirection: 'row',
        width: width,
        height: cellHeight,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',

    },
    desViewStytle: {
        width: width,
        height: cellHeight,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
    textViewStytle: {
        marginLeft: 10,
        fontSize: 12,
        color: 'gray',
        backgroundColor:'transparent'

    }


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);

