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
    Platform,
    InteractionManager,
    TouchableOpacity,
    NativeAppEventEmitter,
    Dimensions,


} from 'react-native';


var {width, height} = Dimensions.get('window');
var HMScrollImage = require('../CommonTools/HMScrollImage');
import HMTopItem from './HMTopItem';
import HMMiddleItem from './HMMiddleItem';
import HMBottomItem from './HMBottomItem';
import NetUitl from '../CommonTools/NetUitl';
import HMUrlUtils from '../CommonTools/HMUrlUtils'
import JPushModule from 'jpush-react-native';
import ActionSheet from 'react-native-actionsheet'
import Speech from 'native-speech';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = ['取消', '微信', '支付宝']
const title = '请选择支付方式'


export default class TripGroup extends Component
{

    static defaultProps = {
        titleArray: ['申请出差', '差旅数据', '申请报销'],
        middleArray: ['酒店', '国际机票', '火车票', '用车'],

    };// 注意这里有分号

    constructor(props)
    {
        super(props);
        this.state = {
            picList: [{'title': '', 'picUrl': 'http://business.tripg.cn/home/images/index_image/1504171272.jpg'}],
        };
    }

    componentDidMount()
    {
        InteractionManager.runAfterInteractions(() =>
        {
            this.getPicList();

            if (Platform.OS == 'android')
            {
                JPushModule.addReceiveCustomMsgListener((message) =>
                {
                    //这是默认的通知消息
                    //  this.setState({pushMsg:message});
                });
                JPushModule.addReceiveNotificationListener((map) =>
                {
                    //自定义推送的消息
                    //console.log("alertContent: " + map.alertContent);
                    //extra是可选配置上的附件字段
                    console.log("extras: " + map.extras);
                    var message = JSON.parse(map.extras);
                    this.storeDB(message);//我这里是把内容存在了数据库里面，你可以把这里的message放到state里面显示出来
                    //这里面解析json数据，并存在数据库中，同时显示在通知栏上
                })
                //点击通知进入应用的主页，相当于跳转到制定的页面
                JPushModule.addReceiveOpenNotificationListener((map) =>
                {
                    console.log("Opening notification!");
                    alert("map: " + JSON.stringify(map));
                    //this.props.navigator.replace({name: "HomePage", component: HomePage});
                })
            }
            else
            {
                NativeAppEventEmitter.addListener(
                    'ReceiveNotification',
                    (message) =>
                    {
                        alert("content: " + JSON.stringify(message));
                        //下面就是发送过来的内容，可以用stringfy打印发来的消息
                        //这个是极光的消息id console.log("content:" + message.content);
                        //这是标题 console.log("aps:" + message.aps.sound);
                        //这是声音 console.log("aps:" + message.aps.badge);
                        //这是上标 console.log("aps:" + message.aps.alert);
                        //这是发送通知的主内容 this.storeDB(message); } );
                        console.log("content: " + JSON.stringify(message));
                    })
            }

        });

    }

    componentWillUnmount()
    {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    topItemClick(title)
    {

        if (this.props.titleArray[0] == title)
        {
            this.props.navigation.navigate('HMApprovalList');
            // this.props.navigation.navigate('FlatListExample');
            // this.props.navigator.push({
            //     component: HMApprovalList
            // })
        }
    }

    getPicList()
    {
        var imgList = [];
        var self = this;
        NetUitl.getImageList(HMUrlUtils.scrollUrl, function (success)
        {
            var jsonData = success;
            var Code = jsonData.Code;
            if (Code == '1')
            {
                var jsonArray = jsonData.Result;
                for (var i = 0; i < jsonArray.length; i++)
                {
                    var Data = jsonArray[i];
                    var params = {};
                    params.title = Data.title;
                    params.picUrl = Data.imgRoute;
                    imgList.push(params);
                }
                self.setState({picList: imgList})
            }
        }, function (error)
        {

        });

    }

    getTopView()
    {

        var topItemArray = [];
        for (var i = 0; i < this.props.titleArray.length; i++)
        {
            topItemArray.push(<HMTopItem key={i}
                                         title={this.props.titleArray[i]}
                                         popToIndex={(title) => this.topItemClick(title)}/>)
        }
        return topItemArray;
    }

    renderMiddleClick(positon)
    {
        if(0==positon)
        {
            this.props.navigation.navigate('HotelMainController');
        }
    }

    getMiddleView()
    {

        var middleItemArray = [];
        for (var i = 0; i < this.props.middleArray.length; i++)
        {
            middleItemArray.push(<HMMiddleItem key={i}
                                               position={i}
                                               callBack={(positon)=>this.renderMiddleClick(positon)}
                                               title={this.props.middleArray[i]}/>)
        }
        return middleItemArray;
    }

    handlePress(i)
    {
        alert(i);

        if (i == 1)
        {
            Speech.speak('您选择了微信', () => alert('callback'));
        }
        else if (i == 2)
        {
            Speech.speak('您选择了支付宝', () => alert('callback'));
        }
    }

    rednderPlane()
    {
        this.props.navigation.navigate('HMPlaneIndex');
        // this.refs.actionSheet.show();
        // this.props.navigator.push({
        //     component: HMPlaneIndex
        // })
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Image source={{uri: 'index_bg'}} style={styles.bgStyle}>
                </Image>
                <View style={styles.outerViewStytle}>
                    <HMScrollImage imageDataArr={this.state.picList}/>
                    <View style={[styles.topViewStyle]}>
                        {this.getTopView()}
                    </View>
                    <View style={[styles.middleViewStytle]}>
                        <TouchableOpacity style={styles.leftViewStyle} opacity={0.5}
                                          onPress={() => this.rednderPlane() }>
                            <View style={{height: height / 4}}>
                                <Image source={{uri: 'plane_icon'}} style={{
                                    width: ((width - 20) / 3),
                                    height: ((width - 20) / 3),
                                }}/>
                                <Text style={{
                                    marginTop: 5,
                                    fontSize: Platform.OS == 'ios' ? 12 : 14,
                                    color: 'white',
                                    width: ((width - 20) / 3),
                                    textAlign: 'center'
                                }}>{'国内机票'}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.rightViewStyle}>
                            {this.getMiddleView()}
                        </View>
                    </View>

                    <View style={styles.bottomViewStytle}>
                        <View>
                            <HMBottomItem
                                title={'差旅管控'}/>
                        </View>

                        <View>
                            <HMBottomItem
                                title={'我的差旅'}/>
                        </View>
                    </View>
                    <Image source={{uri: 'record'}}
                           style={{
                               width: Platform.OS == 'ios' ? 80 : 60,
                               height: Platform.OS == 'ios' ? 80 : 60,
                               position: 'absolute',
                               left: (width - 60) * 0.5,
                               bottom: Platform.OS == 'ios' ? 10 : 30
                           }}></Image>

                </View>


                <ActionSheet
                    ref='actionSheet'
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height

    },
    outerViewStytle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },

    bgStyle: {
        width: width,
        height: height
    },
    topViewStyle: {
        marginTop: 10,
        flexDirection: 'row',
        height: (height - 200) * 0.25,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    middleViewStytle: {
        height: (height - 200) * 0.5,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    rightViewStyle: {
        width: ((width - 20) / 3) * 1.65,
        height: height / 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    leftViewStyle: {
        marginTop: 10,
        width: ((width - 20) / 3) * 1.35,
        height: height / 4,
        borderRadius: 8,
        backgroundColor: '#323141',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomViewStytle: {
        position: 'absolute',
        height: Platform.OS == 'ios' ? 60 : 70,
        bottom: 0,
        left: 0,
        width: width,
        backgroundColor: 'rgba(17,33,49,1.0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

AppRegistry.registerComponent('TripGroup', () => TripGroup);
