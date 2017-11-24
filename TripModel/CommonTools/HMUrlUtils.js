/**
 * Created by mac on 2017/11/2.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

} from 'react-native';


const HMUrlUtils = {
    /*审批列表*/
    getTravelList: 'http://test.tmcapi.tripg.com/index.php/commonApi/commonApi/getTravelList',
    /*审批详情*/
    travelApplyDetail: 'http://test.tmcapi.tripg.com/index.php/commonApi/commonApi/travelApplyDetail?is_show=Y',
    /*获取流程图*/
    getAppProcess: ' http://test.tmcapi.tripg.com/index.php/commonApi/commonApi/getAppProcess',


    /*图片轮播图*/
    scrollUrl: 'http://business.tripg.cn/phone_api/index_img_carousel.php?project_id=14',

};
export default HMUrlUtils;

