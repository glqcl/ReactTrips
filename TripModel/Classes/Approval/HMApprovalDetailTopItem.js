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
    TouchableOpacity, Dimensions
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'

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
                    justifyContent: HMCommonStyle.center,
                    backgroundColor: HMCommonStyle.bgColor,
                    borderRadius: HMCommonStyle.borderRadius,
                    margin: HMCommonStyle.margin
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
        justifyContent: HMCommonStyle.center,
        backgroundColor: HMCommonStyle.white,
        borderRadius: HMCommonStyle.borderRadius,
        width: width,

    },
    cellStytle: {
        flexDirection: HMCommonStyle.row,
        height: HMCommonStyle.cellHeight,
        backgroundColor: HMCommonStyle.clear,
        alignItems: HMCommonStyle.center,


    },
    lineStytle: {
        height: 0.5,
        backgroundColor: HMCommonStyle.lightGray
    },

    letfViewStytle: {
        width: 100,
        fontSize: HMCommonStyle.textFont14,
        color: HMCommonStyle.gray,
        marginLeft: HMCommonStyle.marginLeft * 0.5
    },
    textViewStytle: {
        color: HMCommonStyle.white,
        fontSize: HMCommonStyle.textFont12,

        alignItems: HMCommonStyle.center,
        textAlign: HMCommonStyle.left,


    }

});

