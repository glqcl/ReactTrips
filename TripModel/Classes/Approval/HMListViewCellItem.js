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
    Dimensions,
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'

var {width, height} = Dimensions.get('window');
var letfViewWidth = 60;
var middleWidth = 10;
var cellHeight = 39;
var self = null;
export default class HMListViewCellItem extends Component
{

    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        self = this;
    }

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
        this.props.itemClick(obj, this.props.jsonObject);
    }

    renderGetCell()
    {
        if(null!=this.props.jsonObj)
        {
            alert(this.props.jsonObj);
        }
        var cellArray = [];
        cellArray.push(<View key={'0'} style={styles.desViewStytle}><Text
            style={styles.textViewStytle}>{'第' + this.props.desPosition + '目的地'}</Text></View>);

        cellArray.push(<View key={'1'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'起始城市'}</Text>

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.renderCitys('起始城市')}>
                    <Text
                        style={[styles.textViewStytle, {marginLeft: HMCommonStyle.marginLeft}]}>{this.props.jsonObject.setout_city}</Text>
                </TouchableOpacity>
                <Text style={[styles.textViewStytle, {
                    color: HMCommonStyle.btnColorWithRed,
                    position: HMCommonStyle.absolute,
                    left: width * 0.5
                }]}>{'至'}</Text>

                <TouchableOpacity activeOpacity={0.5} style={{
                    position: HMCommonStyle.absolute,
                    left: width - 150
                }} onPress={() => this.renderCitys('到达城市')}>
                    <Text style={[styles.textViewStytle]}>{this.props.jsonObject.arrive_city}</Text>
                </TouchableOpacity>
            </View>
        </View>);
        cellArray.push(<View key={'2'} style={styles.cellViewStytle}>
            <View style={styles.seconViewStytle}>
                <Text style={styles.textViewStytle}>{'行程日期'}</Text>
                <TouchableOpacity activeOpacity={HMCommonStyle.activeOpacity} onPress={() => this.renderCitys('起始日期')}>
                    <Text
                        style={[styles.textViewStytle, {marginLeft: HMCommonStyle.marginLeft}]}>{this.props.jsonObject.start_date}
                    </Text>
                </TouchableOpacity>
                <Text style={
                    [styles.textViewStytle, {
                        color: HMCommonStyle.btnColorWithRed,
                        position: HMCommonStyle.absolute,
                        left: width * 0.5
                    }]
                }>{'至'}</Text>
                <TouchableOpacity activeOpacity={0.5} style={{
                    position: HMCommonStyle.absolute,
                    left: width - 150
                }} onPress={() => this.renderCitys('到达日期')}>
                    <Text style={[styles.textViewStytle]}>{this.props.jsonObject.end_date}</Text>
                </TouchableOpacity>
            </View>
        </View>);
        cellArray.push(<View key={'3'} style={[styles.desViewStytle, {
            flexDirection: HMCommonStyle.row,
            alignItems: HMCommonStyle.center,
            borderBottomWidth: 0,
            borderBottomColor: HMCommonStyle.clear
        }]}>
            <Text style={styles.textViewStytle}>{'费用申请'}</Text>
            <Text style={[styles.textViewStytle, {
                flex: 1,
                textAlign: HMCommonStyle.left,
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
        flexDirection: HMCommonStyle.row,
        flex: 1,
        height: cellHeight,
        alignItems: HMCommonStyle.center,
        borderBottomWidth: HMCommonStyle.borderWidth,
        borderBottomColor: HMCommonStyle.gray,
        backgroundColor: HMCommonStyle.clear

    },
    desViewStytle: {
        width: width - 20,
        height: cellHeight,
        borderBottomColor: HMCommonStyle.gray,
        borderBottomWidth: HMCommonStyle.borderWidth,
        justifyContent: HMCommonStyle.center,
        backgroundColor: HMCommonStyle.clear
    },
    textViewStytle: {
        marginLeft: HMCommonStyle.marginLeft,
        fontSize: HMCommonStyle.textFont12,
        color: HMCommonStyle.gray,
        backgroundColor: HMCommonStyle.clear
    }
});



