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


import EventProxy from '../CommonTools/EventProxy'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var letfViewWidth = 60;
var middleWidth = 10;
var cellHeight = 39;
export default class HMListViewCellItem extends Component
{
    static defaultProps = {
        headObject: {},
        jsonObject: {},
        position: 0,
        popToLast: null,
        itemClick: null,
        desPosition: 1,
    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();
    }

    renderCitys(obj)
    {
        if (this.props.itemClick == null) return;

        var self = this;

        this.props.itemClick(obj);
        EventProxy.off('msg');
        // 监听 msg 事件
        EventProxy.on('msg', (msg) =>
        {

            if ('起始日期' == obj)
            {
                self.props.jsonObject.start_date = msg.dateString;
            }
            else if ('到达日期' == obj)
            {
                self.props.jsonObject.end_date = msg.dateString;
            }
            else if ('起始城市' == obj)
            {
                self.props.jsonObject.setout_city = msg.name;
                //alert('你选择了城市====》' + msg.id + '#####' + msg.name);
            }
            else if ('到达城市' == obj)
            {
                self.props.jsonObject.arrive_city = msg.name;
                // alert('你选择了城市====》' + msg.id + '#####' + msg.name);
            }
            self.setState({
                position: 0
            })
        });
    }

    renderGetCell()
    {
        var cellArray = [];
        cellArray.push(<View key={'0'} style={styles.desViewStytle}><Text
            style={styles.textViewStytle}>{'第' + this.props.desPosition + '目的地'}</Text></View>);

        cellArray.push(<View key={'1'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'起始城市'}</Text>

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.renderCitys('起始城市')}>
                    <Text
                        style={[styles.textViewStytle, {marginLeft: 10}]}>{this.props.jsonObject.setout_city}</Text>
                </TouchableOpacity>
                <Text style={[styles.textViewStytle, {
                    color: 'orange',
                    position: 'absolute',
                    left: width * 0.5
                }]}>{'至'}</Text>

                <TouchableOpacity activeOpacity={0.5} style={{
                    position: 'absolute',
                    left: width - 100
                }} onPress={() => this.renderCitys('到达城市')}>
                    <Text style={[styles.textViewStytle]}>{this.props.jsonObject.arrive_city}</Text>
                </TouchableOpacity>
            </View>
        </View>);
        cellArray.push(<View key={'2'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'行程日期'}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.renderCitys('起始日期')}>
                    <Text
                        style={[styles.textViewStytle, {marginLeft: 10}]}>{this.props.jsonObject.start_date}
                    </Text>
                </TouchableOpacity>
                <Text style={
                    [styles.textViewStytle, {
                        color: 'orange',
                        position: 'absolute',
                        left: width * 0.5
                    }]
                }>{'至'}</Text>
                <TouchableOpacity activeOpacity={0.5} style={{
                    position: 'absolute',
                    left: width - 100
                }} onPress={() => this.renderCitys('到达日期')}>
                    <Text style={[styles.textViewStytle]}>{this.props.jsonObject.end_date}</Text>
                </TouchableOpacity>
            </View>
        </View>);
        cellArray.push(<View key={'3'} style={[styles.desViewStytle, {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0,
            borderBottomColor: 'transparent'
        }]}>
            <Text style={styles.textViewStytle}>{'费用申请'}</Text>
            <Text style={[styles.textViewStytle, {
                flex: 1,
                textAlign: 'left',
                marginLeft: width * 0.5 - 70
            }]}>{this.props.jsonObject.product_name}</Text>
        </View>);
        return cellArray;


    }

    render()
    {
        return (
            <View style={styles.container}>
                <View>
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
        width: width - 20,
        height: cellHeight,

    },
    seconViewStytle: {
        flexDirection: 'row',
        flex: 1,
        height: cellHeight,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        backgroundColor: 'transparent'

    },
    desViewStytle: {
        width: width - 20,
        height: cellHeight,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    textViewStytle: {
        marginLeft: 10,
        fontSize: 12,
        color: 'gray',
        backgroundColor: 'transparent'

    }


});

AppRegistry
    .registerComponent(
        'TripGroup'
        , () =>
            TripGroup
    )
;

