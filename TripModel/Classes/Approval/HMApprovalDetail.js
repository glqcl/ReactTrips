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
    ScrollView,
    InteractionManager,
    Platform
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
import BaseComponent from '../Main/BaseComponent';
import HMApprovalDetailTopItem from './HMApprovalDetailTopItem';
import HMApprovalMiddleItem from './HMApprovalMiddleItem';
import HMListViewNextPerson from './HMListViewNextPerson';
import HMListViewBottomItem from './HMListViewBottomItem';
import HMListViewCellItem from './HMListViewCellItem';
import HMApprovalTools from './HMApprovalTools';
import HMCommonStyle from '../../Stytle/HMCommonStyle'

var jsonObj = [];
var self = null;
let arrayList = [];

export default class HMApprovalDetail extends BaseComponent
{
    static defaultProps = {
        popToLast: null,
    };
    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        self = this;
        jsonObj = [];
        arrayList = ['起始日期', '到达日期', '起始城市', '到达城市'];
        this.state = {
            jsonObject: {},
            dataSource: [],
            progressArray: [],
            refreshStatus: false
        };
    }

    /*返回到上一界面*/
    popToLast()
    {
        this.props.navigator.pop();

    }

    /*每个cell点击事件*/
    renderItemClick(status, obj)
    {
        if (arrayList[0] == status || arrayList[1] == status)
        {
            this.props.navigation.navigate('HMCalendarView', {
                fn: (params) =>
                {
                    if (arrayList[0] == status)
                    {
                        obj.start_date = params.dateString;
                    }
                    else if (arrayList[1] == status)
                    {
                        obj.end_date = params.dateString;
                    }
                    self.setState({
                        refreshStatus: true,
                    })
                }
            });

        }
        else
        {
            this.props.navigation.navigate('HMCityListView', {
                fn: (params) =>
                {
                    if (arrayList[2] == status)
                    {
                        obj.setout_city = params
                    }
                    else if (arrayList[3] == status)
                    {
                        obj.arrive_city = params
                    }
                    self.setState({
                        refreshStatus: true
                    })
                }
            });
        }
    }

    /*获取订单详情*/
    getApprovalDetail()
    {
        var rowData = this.props.navigation.state.params.rowData;
        var approved_status = rowData.approved_status;
        var tempUrl = '';
        if ('n' == approved_status || 'b' == approved_status)
        {
            var tempUrl = `${HMServerUrl.travelApplyDetail}&user_id=${rowData.ry_people}&travel_id=${rowData.travel_id}&is_show=Y`;
        }
        else
        {
            var tempUrl = `${HMServerUrl.travelApplyDetail}&user_id=${rowData.ry_people}&travel_id=${rowData.travel_id}`;

        }
        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {
            self.showProgress();
            NetUitl.get(tempUrl, function (responseText)
                {
                    self.hideProgress();
                    jsonObj = responseText;

                    jsonObj.travel_id = rowData.travel_id;
                    let cellArray = self.renderSettingCell(jsonObj);

                    self.setState({
                        jsonObject: jsonObj,
                        dataSource: cellArray
                    })
                },
                function (error)
                {
                    self.hideProgress();
                }
            )
        })
    }

    /*设置cell数据*/
    renderSettingCell(jsonData)
    {
        var cellArray = [];
        var travelDetail = jsonData.travelDetail;
        if (null != travelDetail && undefined != travelDetail && travelDetail.length > 0)
        {
            for (let i = 0; i < travelDetail.length; i++)
            {
                var obj = travelDetail[i];
                obj.desPosition = (i + 1);
                cellArray.push(
                    <View key={i} style={styles.cellViewStytle}>
                        <HMListViewCellItem key={i}
                                            itemClick={(status, obj) => self.renderItemClick(status, obj)}
                                            jsonObject={obj}
                                            position={i}/>
                    </View>
                )
            }
        }
        return cellArray;
    }


    componentDidMount()
    {
        self.getApprovalDetail();

        var rowData = this.props.navigation.state.params.rowData;

        HMApprovalTools.renderAppProgress(rowData, function (progressArray)
        {
            self.setState({
                progressArray: progressArray
            })
        })

    }


    actionRollBack()
    {

        var rowData = this.props.navigation.state.params.rowData;
        var approved_status = rowData.approved_status;
        if ('s' == approved_status)
        {

        }
    }

    /*申请单列表*/
    renderApply()
    {
        alert('renderApply');
    }

    /*创建申请单*/
    renderCreate()
    {

    }


    render()
    {
        var rowData = this.props.navigation.state.params.rowData;
        var approved_status = rowData.approved_status;
        let userMessage = null;
        if ('n' == approved_status || 'b' == approved_status)
        {
            userMessage = ( <View style={{flexDirection: HMCommonStyle.row, height: 40, width: width}}>
                <TouchableOpacity activeOpacity={HMCommonStyle.activeOpacity}
                                  onPress={() => this.renderApply()}>
                    <View style={{width: width * 0.5, height: 40, backgroundColor: 'rgb(17,33,49)'}}>
                        <Text style={{
                            paddingTop: 14,
                            fontSize: HMCommonStyle.textFont12,
                            color: HMCommonStyle.white,
                            height: 40,
                            textAlign: HMCommonStyle.center
                        }}>{HMCommon.myApplyName}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={HMCommonStyle.activeOpacity}
                                  onPress={() => this.renderCreate()}>
                    <View style={{width: width * 0.5, height: 40, backgroundColor: 'rgb(192,65,38)'}}>
                        <Text style={{
                            paddingTop: 14,
                            fontSize: HMCommonStyle.textFont12,
                            color: HMCommonStyle.white,
                            textAlign: HMCommonStyle.center
                        }}>{HMCommon.createApply}</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    style={{height: height, flex: 1}}>
                    <HMApprovalDetailTopItem
                        jsonObject={jsonObj}/>
                    <HMApprovalMiddleItem
                        pushToAppDetail={() =>
                        {
                            this.actionRollBack()
                        }}
                        jsonObject={jsonObj}/>
                    <View style={{
                        backgroundColor: 'rgba(239,240,243,1.0)',
                        width: width,
                        marginBottom: HMCommonStyle.marginBottom * 0.5
                    }}>
                        {this.renderSettingCell(jsonObj)}
                    </View>
                    <HMListViewBottomItem
                        jsonObject={jsonObj}
                    />
                    <HMListViewNextPerson
                        jsonObject={jsonObj}/>
                    <ScrollView
                        style={{width: width, marginTop: HMCommonStyle.marginTop}}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={{flexDirection: HMCommonStyle.row}}>{this.state.progressArray}</View>
                    </ScrollView>

                </ScrollView>

                {userMessage}
                {this.initLoading()}
            </View>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        alignItems: HMCommonStyle.center,
        backgroundColor: 'rgba(239,240,243,1.0)'
    },


    spinner: {
        marginBottom: 50
    },

    textViewStytle: {
        color: HMCommonStyle.black,
        fontSize: HMCommonStyle.textFont12,
        width: 100,
        height: 43,
        alignItems: HMCommonStyle.center,
        textAlign: HMCommonStyle.center
    },
    cellViewStytle: {
        borderRadius: HMCommonStyle.borderRadius,
        borderColor: HMCommonStyle.gray,
        borderWidth: HMCommonStyle.borderWidth,
        marginLeft: HMCommonStyle.marginLeft,
        marginRight: HMCommonStyle.marginRight,
        marginTop: HMCommonStyle.marginTop,
        height: 40 * 4,
        backgroundColor: HMCommonStyle.white,

    },
    bottomViewStyle: {
        width: width,
        backgroundColor: HMCommonStyle.white,
        marginTop: HMCommonStyle.marginTop,
        borderBottomWidth: HMCommonStyle.borderWidth,
        borderTopColor: HMCommonStyle.gray,
        borderTopWidth: HMCommonStyle.borderWidth,
        borderBottomColor: HMCommonStyle.gray
    }


});

