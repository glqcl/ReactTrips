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
    TouchableOpacity,
    Platform
} from 'react-native';


var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
export default class HMApprovalDetailItem extends Component
{
    static defaultProps = {
        jsonObject: {},
        pushToAppDetail: null,

    };

    popToLast()
    {

        if (this.props.pushToAppDetail == null)return;
        this.props.pushToAppDetail();
    }

    render()
    {

        var acitonName = '';
        var actionColor = 'rgb(192,65,38)';

        if (this.props.jsonObject.approved_status == 's')
        {
            acitonName = '撤回申请单';

        } else if (this.props.jsonObject.approved_status == 'p')
        {

            if(this.props.jsonObject.assRembuise=='true'||this.props.jsonObject.assRembuise==true)
            {
                actionColor = 'rgb(192,65,38)';
            }
            else
            {
                actionColor = 'rgb(201,201,201)';
            }
            acitonName = '修改申请单';
        }
        else
        {
            actionColor = 'transparent';
        }


        return (
            <View style={styles.container}>
                <View style={styles.outInnerStytle}>
                    <Text style={styles.textViewStytle}>{this.getApprovedStatus(this.props.jsonObject)}</Text>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.popToLast()}
                    >

                        <Text style={[styles.textViewStytle, {
                            backgroundColor: actionColor,
                            borderRadius: 5,
                            color: 'white',
                            height: 30,
                            marginRight: 5,
                            paddingTop: 7,
                            width: 100,

                        }]}> {acitonName}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
            ;
    }

    getApprovedStatus(obj)
    {
        if (obj.approved_status == 's')
        {
            return "申请状态: 审核中";
        }
        else if (obj.approved_status == 'n')
        {
            return "申请状态: 已驳回";
        }
        else if (obj.approved_status == 'p')
        {
            return "申请状态: 已通过";
        }
        else if (obj.approved_status == 'z')
        {
            return "申请状态: 已作废";
        } else if (obj.approved_status == 'b')
        {
            return "申请状态: 已撤回";
        }
        else
        {
            return "申请状态: 已通过";
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 44,
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        width: width - 20,
        marginTop: 10,
        backgroundColor: 'white',

    },


    outInnerStytle: {
        width: width - 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    lineStytle: {
        height: 0.5,
        width: width,
        backgroundColor: 'gray'

    },

    textViewStytle: {
        flexWrap:'wrap',
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',

    }

});

AppRegistry.registerComponent('TripGroup', () => TripGroup);


/**
 * Created by mac on 2017/10/30.
 */
