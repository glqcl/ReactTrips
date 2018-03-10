import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ListView
} from 'react-native';
var {width, height} = Dimensions.get('window');
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import HMInterPlaneLisCell from './HMInterPlaneLisCell'
import HMCommonStyle from '../../Stytle/HMCommonStyle'
import HMCalendarHeadView from '../BaseView/HMCalendarHeadView'
import BaseComponent from '../Main/BaseComponent'
import HMApprovalTools from '../Approval/HMApprovalTools'
import Button from 'apsl-react-native-button'

let self = null;
var listArray = [];

export default class HMInterPlaneList extends BaseComponent
{
    constructor(props)
    {
        super(props);
        self = this;
        listArray = [];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

        this.state = {
            dataSource: ds.cloneWithRows(listArray),
            dateSelected: HMApprovalTools.getNowFormatDate()

        };
    }

    componentDidMount()
    {
        this._pullToRefreshListView.beginRefresh()
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
        let parmData = {
            arrCity: 'LAX',
            TimeStamp: '1520559390',
            cmd: 'queryflights',
            searchPriority: 'ADT',
            departureDate: this.state.dateSelected,
            stopType: 'A',
            Sign: '986CD980-17CA-4FF4-A158-6067D2721A56',
            travelType: 'OW',
            depCity: 'BJS'
        }
        var urlData = Encrypt.tgParmsToUrl(parmData);
        urlData += Encrypt.tgGetNewKeyStr(urlData, '7E056506-BCF7-4273-B101-36D158153F5D');
        var tempUrl = `${HMServerUrl.InterAirList}?${urlData}`;

        console.log('机票查询列表url=' + tempUrl);

        var self = this;

        self.showProgress();

        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {
            NetUitl.get(tempUrl, function (responseText)
            {

                self.hideProgress();

                if (responseText.Code == 0)
                {
                    listArray = [];
                    let Result = responseText.Result;
                    let F = Result.F;
                    let H = Result.H;
                    let P = Result.P;
                    let A = Result.A;
                    let J = Result.J;
                    let R = Result.R;

                    for (var keyF in F)
                    {
                        var valueF = F[keyF];
                        var valueH = H[keyF];
                        var S0 = valueF.S1[0]
                        let S0Array = [];
                        for (let keyS in S0)
                        {
                            S0Array.push(S0[keyS]);
                        }
                        valueF.S0Array = S0Array;
                        S0.valueH = valueH;
                        S0.P = P;
                        S0.A = A;
                        S0.J = J;
                        S0.R = R;
                        listArray.push(valueF)
                    }

                    self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(listArray),
                    });
                    if (isPullUp)
                    {
                        self._pullToRefreshListView.endLoadMore(true)
                    }
                    else
                    {
                        self._pullToRefreshListView.endRefresh();
                    }
                }
                else
                {
                    self.showToast(responseText.Message);
                }


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

    renderCellClick(jsonObj)
    {
        alert(JSON.stringify(jsonObj))
    }

    renderRow(obj)
    {
        return <HMInterPlaneLisCell
            callBack={(jsonObj) => this.renderCellClick(jsonObj)}
            jsonObject={obj}
        />
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

    popToLast(date)
    {
        this.setState({
            dateSelected: date
        })
        this.getDataFromNet()
    }

    /*日历点击事件*/
    renderCalClick()
    {
        this.props.navigation.navigate('HMCalendarView', {
            fn: (params) =>
            {
                this.setState({
                    dateSelected: params.dateString
                })
                self.getDataFromNet();
            }
        });
    }

    render()
    {
        return (<View style={styles.container}>


            <View style={styles.calendarViewStytle}>
                <HMCalendarHeadView
                    callBack={(date) => this.popToLast(date)}
                    currentDate={this.state.dateSelected}
                ></HMCalendarHeadView>

                <TouchableOpacity onPress={() => this.renderCalClick()}>
                    <Text style={styles.textViewStytle}>{'日历'}</Text>
                </TouchableOpacity>
            </View>

            <Button style={[styles.textHintViewStytle]}
                    textStyle={{fontSize: HMCommonStyle.textFont12, color: HMCommonStyle.btnColorWithRed}}
            >
                {'航班起降地均为当前时间'}
            </Button>

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
        </View>)


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(239,240,243,1.0)',
    },
    itemHeader: {
        height: 35,
        justifyContent: HMCommonStyle.center,
        alignItems: HMCommonStyle.center,
    },
    calendarViewStytle: {
        height: 44,
        backgroundColor: HMCommonStyle.bgColor,
        flexDirection: HMCommonStyle.row
    },
    textViewStytle: {
        width: 60,
        color: HMCommonStyle.white,
        textAlign: HMCommonStyle.center,
        fontSize:HMCommonStyle.textFont12,
        marginTop:16
    },
    textHintViewStytle: {
        height: HMCommonStyle.cellHeight * 0.8,
        borderRadius: HMCommonStyle.borderRadius,
        borderColor: HMCommonStyle.lightGray,
        backgroundColor: HMCommonStyle.white,
        margin: HMCommonStyle.margin*0.5,
        marginBottom:5,
    }


});

