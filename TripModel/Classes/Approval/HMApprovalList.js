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


import HMCommonStyle from '../../Stytle/HMCommonStyle'
import BaseComponent from '../Main/BaseComponent';
import HMListViewItem from './HMListViewItem';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'

var {width, height} = Dimensions.get('window');
var page = 1;
var pageSize = 20;

var listArray = []

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

    _onRefresh = () =>
    {
        this.getDataFromNet(false);
    }

    _onLoadMore = () =>
    {
        this.getDataFromNet(true);

    }


    getDataFromNet(isPullUp = false)
    {
        page = isPullUp ? page++ : 1;
        var self = this;
        this.showProgress();
        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {
            var tempUrl = `${HMServerUrl.getTravelList}?user_id=${userInfo.Id}&type=3&page=${page}&pageSize=${pageSize}`;
            NetUitl.get(tempUrl, function (responseText)
            {
                self.hideProgress();
                let jsonData = responseText;
                let jsonArray = jsonData.result;
                if (isPullUp)
                {
                    //加载更多
                    listArray = listArray.concat(jsonArray);
                    if (null != self._pullToRefreshListView)
                    {
                        self._pullToRefreshListView.endLoadMore(jsonArray.length <= pageSize)
                    }

                }
                else
                {
                    listArray = jsonArray;
                    if (null != self._pullToRefreshListView)
                    {
                        self._pullToRefreshListView.endRefresh()
                    }

                }
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(listArray),
                });

            }, function (error)
            {
                self.hideProgress();

                if (null != self._pullToRefreshListView)
                {
                    self._pullToRefreshListView.endRefresh()
                }

            })
        })
    }


    pushToNewsDetail(rowData)
    {
        this.props.navigation.navigate('HMApprovalDetail', {rowData: rowData});
    }

    componentDidMount()
    {
        this._pullToRefreshListView.beginRefresh()
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

                <PullToRefreshListView
                    ref={(component) => this._pullToRefreshListView = component}
                    viewType={PullToRefreshListView.constants.viewType.listView}
                    initialListSize={20}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    pageSize={20}
                    renderRow={(obj) => this.renderRow(obj)}
                    renderHeader={(viewState) => this.renderHeader(viewState)}
                    renderFooter={(viewState) => this.renderFooter(viewState)}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    pullUpDistance={35}
                    pullUpStayDistance={50}
                    pullDownDistance={35}
                    pullDownStayDistance={50}
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
            height: HMCommonStyle.cellHeight,
            backgroundColor: HMCommonStyle.white
        },

        itemHeader: {
            height: 35,
            justifyContent: HMCommonStyle.center,
            alignItems: HMCommonStyle.center,
        },

    });

AppRegistry
    .registerComponent(
        'TripGroup'
        , () =>
            TripGroup
    )
;

