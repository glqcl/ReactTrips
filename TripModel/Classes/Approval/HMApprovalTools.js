/**
 * Created by mac on 2018/3/8.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';
import HMAppProcessItem from './HMAppProcessItem'

export default class HMApprovalTools
{
    /*根据不同状态，返回不同图片*/
    static renderImageName(obj)
    {
        var approval_status = obj.approval_status;

        if ('p' == approval_status)
        {
            return 'new_approval_pass'
        }
        else if ('z' == approval_status)
        {
            return 'new_approval_cancle'
        }
        else if ('f' == approval_status)
        {
            return 'new_approval_start'
        }
        else if ('cf' == approval_status)
        {
            return 'new_approval_cancle'
        }
        else if ('b' == approval_status)
        {
            return 'approval_rooback'
        }
        else if ('gx' == approval_status)
        {
            return 'approval_update'
        }
        else if ('n' == approval_status)
        {
            return 'new_approval_refuse'
        }
    }

    //获取状态流程图
    static renderAppProgress(rowData, fn)
    {

        var tempUrl = `${HMServerUrl.getAppProcess}?travel_id=${rowData.travel_id}`;
        NetUitl.get(tempUrl, function (ret)
        {
            if (ret.code == '1')
            {
                var resultList = ret.result;
                var progressArray = [];
                for (let i = 0; i < resultList.length; i++)
                {
                    var obj = resultList[i];
                    var approval_time = obj.approval_time;
                    if (approval_time.length > 10)
                    {
                        approval_time = approval_time.substring(0, 10);
                    }
                    obj.approval_status = HMApprovalTools.renderImageName(obj);
                    obj.approval_time = approval_time;
                    progressArray.push(
                        <HMAppProcessItem key={i}
                                          length={resultList.length}
                                          position={i}
                                          obj={obj}
                        ></HMAppProcessItem>)
                }
                if (null != fn)
                {
                    fn(progressArray)
                }
            }

        }, function (error)
        {
            console.log('获取流程图失败' + error);
        })
    }
}