/**
 * Created by guangqiang on 2017/8/27.
 */

/** 公共样式表 **/
import {
    Platform,
    Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('window');

const HMCommon = {

    netError: '网络出现异常,请稍后重试!',
    netTimeOut: '网络请求超时,请稍后重试!',
    netMoreData: '亲，没有更多数据了!',
    pullUpMore: '上拉加载更多...',
    pullDownRefresh: '下拉刷新...',
    songShouRefresh: '松手刷新...',
    pullDownRefreshing: '正在刷新中...',
    pullUpLoading: '正在加载更多...',

    loginName: '登录',
    myApplyName: '我的申请单',
    createApply: '创建申请单',

}

export default HMCommon;