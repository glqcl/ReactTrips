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
    TouchableOpacity

} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var HMScrollImage = require('../CommonTools/HMScrollImage');
import HMTopItem from './HMTopItem';
import HMMiddleItem from './HMMiddleItem';
import HMBottomItem from './HMBottomItem';
// import HMApprovalList from '../Approval/HMApprovalList';
// import HMPlaneIndex from '../Plane/HMPlaneIndex';
import NetUitl from '../CommonTools/NetUitl';
import HMUrlUtils from '../CommonTools/HMUrlUtils'



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
        });
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

    getMiddleView()
    {

        var middleItemArray = [];
        for (var i = 0; i < this.props.middleArray.length; i++)
        {
            middleItemArray.push(<HMMiddleItem key={i}
                                               title={this.props.middleArray[i]}/>)
        }
        return middleItemArray;
    }


    rednderPlane()
    {


        this.props.navigation.navigate('HMPlaneIndex');

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
                                    marginTop: 5, fontSize: 14, color: 'white', width: ((width - 20) / 3),
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
