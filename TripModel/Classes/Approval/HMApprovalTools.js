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


    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    static sec_to_time = function (s)
    {
        var t;
        if (s > -1)
        {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10)
            {
                t = '0' + hour + "h";
            } else
            {
                t = hour + "h";
            }

            if (min < 10)
            {
                t += "0";
            }
            t += min + "m";
            // if (sec < 10)
            // {
            //     t += "0";
            // }
            // t += sec.toFixed(2);
        }
        return t;
    }

    //获取当前时间，格式YYYY-MM-DD
    static getNowFormatDate()
    {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9)
        {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9)
        {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    // 日期，在原有日期基础上，增加days天数，默认增加1天
    static addDate(date, days)
    {
        if (days == undefined || days == '')
        {
            days = 0;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        // return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
        return this.getFormatDate(day);
    }

    // 日期，在原有日期基础上，增加days天数，默认增加1天
    static addDateByNewDate(date, days)
    {
        if (days == undefined || days == '')
        {
            days = 0;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day);

    }


    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    static getFormatDate(arg)
    {
        if (arg == undefined || arg == '')
        {
            return '';
        }

        var re = arg + '';
        if (re.length < 2)
        {
            re = '0' + re;
        }

        return re;
    }

    /**
     * 是否为Null
     * @param object
     * @returns {Boolean}
     */
    static isNull(object)
    {
        if (object == null || typeof object == "undefined")
        {
            return true;
        }
        return false;
    };

    /**
     * 根据日期字符串获取星期几
     * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
     * @returns {String}
     */
    static getWeek(dateString)
    {
        var date;
        if (this.isNull(dateString))
        {
            date = new Date();
        } else
        {
            var dateArray = dateString.split("-");
            date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
        }
        //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
        //return "星期" + weeks[date.getDay()];
        return "周" + "日一二三四五六".charAt(date.getDay());
    };
}