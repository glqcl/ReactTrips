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
    InteractionManager

} from 'react-native';
// import {Loading, EasyLoading} from 'react-native-easy-loading';
import Loading from 'react-native-loading-w';
// import ReactLoading from 'react-loading';

import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'

import Storage from '../CommonTools/DeviceStorage'
import BaseComponent from '../Main/BaseComponent';
import HMNavigatorBar from '../Main/HMNavigatorBar';
import HMListViewItem from '../Approval/HMListViewItem';
// import HMApprovalDetail from './HMApprovalDetail';
import HMUrlUtils from '../CommonTools/HMUrlUtils'
import NetUitl from '../CommonTools/NetUitl'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var page = 1;
var pageSize = 20;
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

    onRefresh(end)
    {

        Storage.get('userInfo').then((userInfo) =>
        {
            page = 1;
            var tempUrl = `${HMUrlUtils.getTravelList}?user_id=${userInfo.Id}&type=3&page=${page}&pageSize=${pageSize}`;
            var self = this;
            // this.getLoading().show();
            this.showProgress();
            NetUitl.get(tempUrl, function (responseText)
            {
                self.hideProgress();
                if (!isFirst)
                {
                    isFirst = true;
                }
                var jsonData = responseText;
                var jsonArray = jsonData.result;
                listArray = jsonArray;
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(listArray),
                });

                if (jsonArray < pageSize)
                {
                    //如果此时刷新的数据就已经是全部数据了，不管怎样都应该将上拉加载组件设置为没有更多数据了的状态 或者通过isShowLoadMore控制其隐藏
                    this.refs.listView.setNoMoreData() //设置为没有更多数据了的状态
                } else
                {
                    //这里调用resetStatus来重置上拉加载的状态 因为此前可上拉加载组件的状态可能已经是无更多数据了 所以进行状态重置 亦可以通        过state控制isShowLoadMore来控制显示上拉加载视图
                    this.refs.listView.resetStatus() //重置上拉加载的状态
                }

                end();

            }, function (error)
            {

                self.hideProgress();
                self.refs.listView.resetStatus() //重置上拉加载的状态
                end();
            });

        });

    }

    onLoadMore(end)
    {
        Storage.get('userInfo').then((userInfo) =>
        {
            page++;
            var tempUrl = `${HMUrlUtils.getTravelList}?user_id=${userInfo.Id}&type=3&page=${page}&pageSize= ${pageSize}`;
            var self = this;
            this.showProgress();
            NetUitl.get(tempUrl, function (responseText)
            {
                self.hideProgress();
                var jsonData = responseText;
                var jsonArray = jsonData.result;
                listArray = listArray.concat(jsonArray);
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(listArray)
                })
                //self.refs.listView.endLoadMore(jsonArray < 20)

                //结束
                end(jsonArray < 20)
            }, function (error)
            {
                self.hideProgress();
                self.refs.listView.endRefresh();
                this.refs.listView.resetStatus() //重置上拉加载的状态
                if (page > 1)
                {
                    page--;
                }
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
        var self = this;
        setTimeout(function ()
        {

            InteractionManager.runAfterInteractions(() =>
            {
                self.refs.listView.beginRefresh();

            });
        }, 500)


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

                {/*<HMNavigatorBar*/}
                {/*title={'我的申请'}*/}
                {/*popToLast={() => this.popToLast()}>*/}
                {/*</HMNavigatorBar>*/}
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="listView"
                    renderRow={(rowData) => this.renderRow(rowData)}
                    onRefresh={(onRefresh) => this.onRefresh(onRefresh)}
                    onLoadMore={(onLoadMore) => this.onLoadMore(onLoadMore)}
                    //其他需要设置的ListView属性
                />

                {this.initLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('TripGroup', () => TripGroup);

