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
    Platform,
    Dimensions
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'
import Button from 'apsl-react-native-button'
var {width, height} = Dimensions.get('window');
var actionColor = 'rgb(192,65,38)';

export default class HMApprovalDetailItem extends Component
{
    static defaultProps = {
        jsonObject: {},
        pushToAppDetail: null,
    };
    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        actionColor = 'rgb(192,65,38)';
    }

    popToLast()
    {
        if (this.props.pushToAppDetail == null)return;
        this.props.pushToAppDetail();
    }

    render()
    {

        var acitonName = '';


        if (this.props.jsonObject.approved_status == 's')
        {
            acitonName = '撤回申请单';

        } else if (this.props.jsonObject.approved_status == 'p')
        {

            if (this.props.jsonObject.assRembuise == 'true' || this.props.jsonObject.assRembuise == true)
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

                    <Button style={[styles.btnViewStytle]}
                            textStyle={{fontSize: HMCommonStyle.textFont12, color: HMCommonStyle.white}}
                            onPress={()=>{this.popToLast()}}

                    >
                        {acitonName}
                    </Button>
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
        flexDirection: HMCommonStyle.row,
        height: HMCommonStyle.cellHeight,
        marginRight: HMCommonStyle.marginRight,
        marginLeft: HMCommonStyle.marginLeft,
        borderWidth: HMCommonStyle.borderWidth,
        borderColor: HMCommonStyle.gray,
        borderRadius: HMCommonStyle.borderRadius,
        width: width - 20,
        marginTop: HMCommonStyle.marginTop,
        backgroundColor: HMCommonStyle.white,
        justifyContent: HMCommonStyle.center
    },


    outInnerStytle: {
        width: width - 20,
        alignItems: HMCommonStyle.center,
        flexDirection: HMCommonStyle.row,
        justifyContent: HMCommonStyle.between,
    },

    lineStytle: {
        height: 0.5,
        width: width,
        backgroundColor: HMCommonStyle.gray
    },

    textViewStytle: {
        flexWrap: 'wrap',
        fontSize: HMCommonStyle.textFont12,
        textAlign: HMCommonStyle.center,
        color: HMCommonStyle.gray,
        marginLeft:HMCommonStyle.marginLeft,
    },
    btnViewStytle: {
        borderRadius: HMCommonStyle.borderRadius,
        height: 28,
        marginRight: HMCommonStyle.marginRight * 0.5,
        borderColor: HMCommonStyle.clear,
        width: 80,
        backgroundColor: actionColor,
        marginTop: 6
    }

});


/**
 * Created by mac on 2017/10/30.
 */
