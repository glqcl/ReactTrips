/**
 * Created by mac on 2017/10/26.
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
    ListView,
    TouchableOpacity,
    InteractionManager,
    Dimensions

} from 'react-native';


import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'

import StorageUtil from '../CommonTools/StorageUtil'
import BaseComponent from '../Main/BaseComponent';
import HMListViewItem from '../Approval/HMListViewItem';
import HMUrlUtils from '../CommonTools/HMUrlUtils'
import NetUitl from '../CommonTools/NetUitl'

var {width, height} = Dimensions.get('window');
var page = 1;
var pageSize = 300;
var isFirst = false;

var listArray = [{
    "id": "9515",
    "current_approver": "98108",
    "name": "金卯刀",
    "username": "YDCS007",
    "costcenter": "测试成本中心1",
    "dept_id": "2652",
    "remark": "",
    "description": "1234",
    "estimated_amounts": "760.00",
    "startCity": "长春",
    "endCity": "北京",
    "start_date": "2017-02-14",
    "end_date": "2017-02-14",
    "ry_people": "98108",
    "dept_name": "测试组2",
    "approved_status": "s",
    "complete_status": "N",
    "travel_id": "20701",
    "app_property": null,
    "cities_collection": null,
    "peopleCount": 1,
    "peopleName": "金卯刀",
    "approvalName": "",
    "redStatus": "2"
}]

export default class HMApprovalList extends BaseComponent
{
    popToLast()
    {
        this.props.navigator.pop();
    }
    static defaultProps()
    {

    }
    constructor(props)
    {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(listArray),
        };
    }
    onLoadMore()
    {
        this.getDataFromNet(true);
    }
    onRefresh()
    {
        this.getDataFromNet(false);
    }

    getDataFromNet(isPullUp = false)
    {
        page = isPullUp ? page++ : 1;
        var self = this;
        this.showProgress();
        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {
            var tempUrl = `${HMUrlUtils.getTravelList}?user_id=${userInfo.Id}&type=3&page=${page}&pageSize=${pageSize}`;
            NetUitl.get(tempUrl, function (responseText)
            {
                self.hideProgress();
                let jsonData = responseText;
                let jsonArray = jsonData.result;
                if (isPullUp)
                {
                    //加载更多
                    listArray = listArray.concat(jsonArray);
                    self.refs.listView.endLoadMore(jsonArray.length < pageSize);
                }
                else
                {
                    listArray = jsonArray;
                    self.refs.listView.endRefresh()
                    self.refs.listView.resetStatus() //重置上拉加载的状态
                }
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(listArray),
                });

            }, function (error)
            {
                self.hideProgress();
                self.refs.listView.resetStatus() //重置上拉加载的状态
                self.refs.listView.endRefresh()
            })
        })
    }


    pushToNewsDetail(rowData)
    {
        this.props.navigation.navigate('HMApprovalDetail', {rowData: rowData});
        // this.props.navigator.push({
        //     component: HMApprovalDetail,
        //     title: '申请单详情',
        //     passProps: {rowData}
        // })


    }

    componentDidMount()
    {
        this.refs.listView.beginRefresh();
    }

    renderRow(rowData)
    {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() =>
            {
                this.pushToNewsDetail(rowData)
            }}>
                <View style={styles.cellStyle}>
                    <HMListViewItem
                        jsonObject={rowData}/>
                </View>
            </TouchableOpacity>
        );
    }

    render()
    {
        return (
            <View style={styles.container}>

                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="listView"
                    renderRow={(rowData) => this.renderRow(rowData)}
                    onRefresh={() => this.onRefresh()}
                    onLoadMore={() => this.onLoadMore()}
                />

                {this.initLoading()}
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(239,240,243,1.0)',
        },
        cellStyle: {
            width: width,
            height: 44,
            backgroundColor: 'white'
        },
        header: {
            height: 64,
            backgroundColor: '#293447',
        },

        separator: {
            height: 1,
            backgroundColor: '#CCCCCC',
        },
        bottomInnerViewStyle: {}

    });

AppRegistry
    .registerComponent(
        'TripGroup'
        , () =>
            TripGroup
    )
;

