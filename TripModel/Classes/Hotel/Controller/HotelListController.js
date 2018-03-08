/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh';


import tgUtil from "../../CommonTools/tgUtil";
import BaseComponent from "../../Main/BaseComponent";
import HotelRoomController from './HotelRoomController';
import HotelListCell from '../View/HotelListViews/HotelListCell';

var queryData = require('../Model/HotelMainQueryData');
var HotelSign = "FE29D133-468D-403B-8428-0168C968CAC1";
var HotelKey = "3BD8A90F-4AB8-420C-8261-E5393D62F5E0";
var PageNumber = 1;
var listArray = [];

let self = null;

export default class HotelListController extends BaseComponent<{}>
{

    // 构造
    constructor(props)
    {
        super(props);
        // 初始状态
        self = this;
    }

    renderData(fn)
    {
        const urlString = "http://a.tripg.com/HotelQunar/GetComHotelList";
        queryData["PageNumber"] = PageNumber;
        queryData["User_Code"] = "";
        queryData["Sign"] = HotelSign;
        var urlData = tgUtil.tgParmsToUrl(queryData);
        queryData["NewKey"] = tgUtil.tgGetNewKeyStr(urlData, HotelKey);
        this.showProgress();
        NetUitl.post(urlString, queryData, function (responseText)
        {
            self.hideProgress();
            if (Number(responseText["Code"]) === 1200)
            {
                fn(responseText)
            }
        }, function (error)
        {

        });
    }

    componentDidMount()
    {

        this.renderData((data) =>
        {
            var newArray = data["Result"]["data"];
            if (PageNumber === 1)
            {
                listArray = newArray;
                this.refs.listView.endRefresh();
                this.refs.listView.resetStatus() //重置上拉加载的状态
            } else
            {
                listArray = [...listArray, ...newArray];
                this.refs.listView.endLoadMore(newArray.length < 20);
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(listArray),
            });
        });
    }

    constructor(props)
    {
        super(props);
        var ds = new SwRefreshListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }

    render()
    {
        return (
            <View style={styles.container}>
                {this.returnLoading()}
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    ref="listView"
                    renderRow={(rowData) => this.renderRow(rowData)}
                    contentContainerStyle={styles.listViewStyle}
                    onRefresh={() => this.onRefresh()}
                    onLoadMore={() => this.onLoadMore()}
                />

            </View>


        );
    }

    onRefresh()
    {
        PageNumber = 1;
        this.refs.listView.beginRefresh();
        this.componentDidMount();
    }

    onLoadMore()
    {
        PageNumber++;
        this.componentDidMount();
    }

    renderRow(rowData)
    {

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.pushRoomController()}>
                <HotelListCell rowData={rowData}/>
            </TouchableOpacity>
        )
    }

    renderHeader(viewState)
    {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)

        switch (pullState)
        {
            case refresh_none:
                return (

                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.pullDownRefresh}</Text>
                    </View>
                )
            case refresh_idle:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.pullDownRefresh}{pullDistancePercent}%</Text>
                    </View>
                )
            case will_refresh:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.songShouRefresh}{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case refreshing:
                return (
                    <View style={[styles.itemHeader, {flexDirection: 'row'}]}>
                        {this._renderActivityIndicator()}<Text>{HMCommon.pullDownRefreshing}</Text>
                    </View>
                )
        }
    }

    renderFooter(viewState)
    {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState)
        {
            case load_more_none:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.pullUpMore}</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.pullUpMore}{pullDistancePercent}%</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.pullUpMore}{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={[styles.itemHeader, {flexDirection: 'row'}]}>
                        {this._renderActivityIndicator()}<Text>{HMCommon.pullUpLoading}...</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View
                        style={styles.itemHeader}>
                        <Text>{HMCommon.netMoreData}</Text>
                    </View>
                )
        }
    }


    pushRoomController()
    {
        this.props.navigation.navigate('HotelRoomController',)
    }

}


const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
    },
    listViewStyle: {
        backgroundColor: 'white',
        zIndex: 0,
    },
    imageStyle: {
        width: 130,
        height: 130,
        resizeMode: Image.resizeMode.contain
    },
    textStyle: {
        flex: 1,
    },

    hotelNameStyle: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 16,
        color: 'black',
    },
    hotelStarStyle: {
        position: 'relative',
        left: 20,
        fontSize: 13,
        color: '#535353',
        marginTop: 65 - 6.5
    },
    hotelAddressStyle: {
        position: 'relative',
        color: '#535353',
        top: 13,
        left: 20,
        fontSize: 13

    },
    lineStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#f2f2f2',

    },

});

module.exports = HotelListController;