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


import {Loading, EasyLoading} from 'react-native-easy-loading';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

import BaseComponent from '../Main/BaseComponent';
import HMApprovalDetailTopItem from './HMApprovalDetailTopItem';
import HMApprovalMiddleItem from './HMApprovalMiddleItem';
import HMListViewNextPerson from './HMListViewNextPerson';
import HMListViewBottomItem from './HMListViewBottomItem';
import HMListViewCellItem from './HMListViewCellItem';
import HMNavigatorBar from '../Main/HMNavigatorBar';
import HMUrlUtils from '../CommonTools/HMUrlUtils'
import LoadingView from '../CommonTools/LoadingView.js'
import NetUitl from '../CommonTools/NetUitl'
import HMAppProcessItem from '../Approval/HMAppProcessItem'
import HMCalendar from '../CommonTools/HMCalendar'

var cellArray = [];


export default class HMApprovalDetail extends BaseComponent
{
    static defaultProps = {
        popToLast: null
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
    renderItemClick(obj)
    {

        this.props.navigator.push({
            component: HMCalendar,

        })
    }
    getApprovalDetail()
    {
        var tempUrl = `${HMUrlUtils.travelApplyDetail}&user_id=98108&travel_id=${this.props.rowData.travel_id}`;
        cellArray = [];
        var self = this;
        EasyLoading.show();
        NetUitl.get(tempUrl, function (responseText)
            {
                EasyLoading.dismis();
                var jsonData = responseText;
                var travelDetail = jsonData.travelDetail;
                for (var i = 0; i < travelDetail.length; i++)
                {
                    var obj = travelDetail[i];
                    obj.desPosition = (i + 1);
                    cellArray.push(
                        <View key={i} style={styles.cellViewStytle}>
                            <HMListViewCellItem key={i}
                                                itemClick={()=>this.renderItemClick}
                                                jsonObject={obj}
                                                position={i}/>
                        </View>
                    )
                }
                jsonData.travel_id = self.props.rowData.travel_id;
                self.setState({
                    jsonObject: jsonData,
                    dataSource: cellArray,
                    remars: jsonData.description,
                    nextPerson: jsonData.nextAppName,
                })
            },
            function (error)
            {
                EasyLoading.dismis();
            }
        )
        ;

    }


    componentDidMount()
    {

        InteractionManager.runAfterInteractions(() =>
        {
            this.getApprovalDetail();

            this.renderAppProgress();

        });

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
    }


    //获取状态流程图
    renderAppProgress()
    {
        var tempUrl = `${HMUrlUtils.getAppProcess}&travel_id=${this.props.rowData.travel_id}`;
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
                        approval_time = approval_time.substring(0, 10)
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

    pushToDetail()
    {
        alert(1111);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <HMNavigatorBar
                    title={'申请单详情'}
                    popToLast={() => this.popToLast()}>
                </HMNavigatorBar>
                <ScrollView>
                    <HMApprovalDetailTopItem
                        jsonObject={this.state.jsonObject}/>

                    <HMApprovalMiddleItem
                        pushToAppDetail={() =>
                        {
                            this.pushToDetail()
                        }}
                        jsonObject={this.state.jsonObject}/>

                    <View style={{backgroundColor: 'rgba(239,240,243,1.0)', width: width}}>
                        {this.state.dataSource}
                    </View>

                    <HMListViewBottomItem
                        remars={this.state.remars}
                    />
                    <HMListViewNextPerson
                        nextPerson={this.state.nextPerson}/>
                    <View style={{flexDirection: 'row'}}>{this.state.progressArray}</View>
                    <Loading />
                </ScrollView>
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



