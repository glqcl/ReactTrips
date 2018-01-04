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
import EventProxy from '../CommonTools/EventProxy'
import BaseComponent from '../Main/BaseComponent';
import HMApprovalDetailTopItem from './HMApprovalDetailTopItem';
import HMApprovalMiddleItem from './HMApprovalMiddleItem';
import HMListViewNextPerson from './HMListViewNextPerson';
import HMListViewBottomItem from './HMListViewBottomItem';
import HMListViewCellItem from './HMListViewCellItem';
import HMUrlUtils from '../CommonTools/HMUrlUtils'
import NetUitl from '../CommonTools/NetUitl'
import HMAppProcessItem from '../Approval/HMAppProcessItem'
import HMCalendar from '../CommonTools/HMCalendar'
import SelectCity from '../CityList/SelectCity';
import StorageUtil from '../CommonTools/StorageUtil'
var travelDetail = [];

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
        this.state = {
            jsonObject: {},
            dataSource: [],
            remars: '',
            nextPerson: '',
            showLoading: true,
            progressArray: [],
            isVisible: true,
            size: 37,
            color: "#FFFFFF",
        };
    }

    popToLast()
    {
        this.props.navigator.pop();
    }

    renderItemClick(status)
    {
        var self = this;
        let component = null;
        if (status == '起始城市' || status == '到达城市')
        {
            component = SelectCity;
        }
        else
        {
            component = HMCalendar;
        }
        this.props.navigator.push({
            component: component,
            passProps: {
                //回调
                callBack: (msg) =>
                {
                    EventProxy.trigger('msg', msg);
                }
            }
        })
    }

    getApprovalDetail()
    {
        var rowData = this.props.navigation.state.params.rowData;

        var approved_status = rowData.approved_status;
        var tempUrl = '';
        if ('n' == approved_status || 'b' == approved_status)
        {
            var tempUrl = `${HMUrlUtils.travelApplyDetail}&user_id=${rowData.ry_people}&travel_id=${rowData.travel_id}&is_show=Y`;
        }
        else
        {
            var tempUrl = `${HMUrlUtils.travelApplyDetail}&user_id=${rowData.ry_people}&travel_id=${rowData.travel_id}`;
        }


        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {
            var cellArray = [];
            var self = this;
            this.showProgress();
            NetUitl.get(tempUrl, function (responseText)
                {
                    self.hideProgress();
                    var jsonData = responseText;
                    travelDetail = jsonData.travelDetail;
                    for (var i = 0; i < travelDetail.length; i++)
                    {
                        var obj = travelDetail[i];
                        obj.desPosition = (i + 1);
                        cellArray.push(
                            <View key={i} style={styles.cellViewStytle}>
                                <HMListViewCellItem key={i}
                                                    itemClick={(item) => self.renderItemClick(item)}
                                                    jsonObject={obj}
                                                    position={i}/>
                            </View>
                        )
                    }
                    jsonData.travel_id = rowData.travel_id;
                    var description = jsonData.description;
                    if (description == null || 'null' == description)
                    {
                        description = '';
                    }
                    var nextAppName = jsonData.nextAppName;
                    if (null == nextAppName || 'null' == nextAppName)
                    {
                        nextAppName = '';
                    }
                    self.setState({
                        //remars: description,
                        jsonObject: jsonData,
                        //nextPerson: nextAppName,
                        dataSource: cellArray,
                    })
                },
                function (error)
                {
                    self.hideProgress();
                }
            )

        })



    }

    componentDidMount()
    {

        var self = this;
        setTimeout(function ()
        {
            InteractionManager.runAfterInteractions(() =>
            {
                self.getApprovalDetail();

                self.renderAppProgress();

            });
        }, 500);


    }

    renderImageName(obj)
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
        for (var i = 0; i < travelDetail.length; i++)
        {
            var obj = travelDetail[i];


        }
    }

    //获取状态流程图
    renderAppProgress()
    {
        var rowData = this.props.navigation.state.params.rowData;
        var tempUrl = `${HMUrlUtils.getAppProcess}?travel_id=${rowData.travel_id}`;
        var self = this;
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
                    obj.approval_status = self.renderImageName(obj);
                    obj.approval_time = approval_time;
                    progressArray.push(<HMAppProcessItem key={i}
                                                         length={resultList.length}
                                                         position={i}
                                                         obj={obj}
                    ></HMAppProcessItem>)
                }

                self.setState({
                    progressArray: progressArray
                });


            }

        }, function (error)
        {
            alert(JSON.stringify(error));
        })
    }

    render()
    {

        var rowData = this.props.navigation.state.params.rowData;
        var approved_status = rowData.approved_status;
        let userMessage = null;
        if ('n' == approved_status || 'b' == approved_status)
        {
            userMessage = ( <View style={{flexDirection: 'row', height: 40, width: width}}>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => this.renderApply()}>
                    <View style={{width: width * 0.5, height: 40, backgroundColor: 'rgb(17,33,49)'}}>
                        <Text style={{
                            paddingTop: 14,
                            fontSize: 12,
                            color: 'white',
                            height: 40,
                            textAlign: 'center'
                        }}>{'我的申请单'}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() => this.renderCreate()}>
                    <View style={{width: width * 0.5, height: 40, backgroundColor: 'rgb(192,65,38)'}}>
                        <Text style={{
                            paddingTop: 14,
                            fontSize: 12,
                            color: 'white',
                            textAlign: 'center'
                        }}>{'创建申请单'}</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }

        return (

            <View style={styles.container}>

                {/*<HMNavigatorBar*/}
                {/*title={'申请单详情'}*/}
                {/*popToLast={() => this.popToLast()}>*/}
                {/*</HMNavigatorBar>*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    style={{height: height, flex: 1}}>
                    <HMApprovalDetailTopItem
                        jsonObject={this.state.jsonObject}/>

                    <HMApprovalMiddleItem
                        pushToAppDetail={() =>
                        {
                            this.actionRollBack()
                        }}
                        jsonObject={this.state.jsonObject}/>

                    <View style={{backgroundColor: 'rgba(239,240,243,1.0)', width: width, marginBottom: 5}}>
                        {this.state.dataSource}
                    </View>

                    <HMListViewBottomItem
                        remars={this.state.remars}
                    />
                    <HMListViewNextPerson
                        nextPerson={this.state.nextPerson}/>


                    <ScrollView
                        style={{width: width,marginTop:10}}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        <View style={{flexDirection: 'row'}}>{this.state.progressArray}</View>
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
        alignItems: 'center',
        backgroundColor: 'rgba(239,240,243,1.0)'
    },


    spinner: {
        marginBottom: 50
    },

    textViewStytle: {
        color: 'black',
        fontSize: 12,
        width: 100,
        height: 43,
        alignItems: 'center',
        textAlign: 'center'
    },
    cellViewStytle: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 40 * 4,
        backgroundColor: 'white',

    },
    bottomViewStyle: {
        width: width,
        backgroundColor: 'white',
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        borderBottomColor: 'gray'
    }


});

AppRegistry.registerComponent('TripGroup', () => TripGroup);



