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


let TMC_ApiServer = 'http://test.tmcapi.tripg.com/index.php/commonApi/commonApi/';
let GW_Server = 'http://business.tripg.cn/';
let C_Server = 'http://c.tripg.com/';
let A_Server = 'http://a.tripg.com/';
let P_Server = 'http://p.tripg.com/';

const HMUrlUtils = {

    /*审批列表*/
    getTravelList: TMC_ApiServer + 'getTravelList',
    
    /*审批详情*/
    travelApplyDetail: TMC_ApiServer + 'travelApplyDetail?is_show=Y',

    /*获取流程图*/
    getAppProcess: TMC_ApiServer + 'getAppProcess',

    /*图片轮播图*/
    scrollUrl: GW_Server + 'phone_api/index_img_carousel.php?project_id=14',

    CusomterUrl: C_Server + 'Base/Get_CusomterAndMemberInterface.aspx',

    /*机票查询列表*/
    GetFlightList: A_Server + 'QunarAir/GetFlightList',

    /*国际机票查询列表*/
    InterAirList: P_Server + 'AirTicket/InterAir.aspx',


};
export default HMUrlUtils;

