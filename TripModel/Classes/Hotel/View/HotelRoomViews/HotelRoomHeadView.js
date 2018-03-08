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
    ListView,
    Image,
    Alert,
    TouchableOpacity,
    Dimensions,

} from 'react-native';

var {screenWidth,screenHeight} = Dimensions.get('window');

var imgHeight = 187;

var sixColor = '#666666';
var mainColor = '#0159A3';

export default class HotelRoomHeadView extends Component<{}> {

    render() {
        return (
           <View style={
               {
                   flexDirection: 'column',
                   justifyContent:'flex-start',
                   width: screenWidth,
                   height: imgHeight+200,
                   backgroundColor: 'white',
               }}>
               <View style={
                   {
                       flexDirection: 'column',
                       width: screenWidth,
                       height: imgHeight,
                       backgroundColor: 'red',
                   }}>
                   <Image style={{
                       flex:1,
                       zIndex:1
                   }} source={{uri:this.props.headData.img&&this.props.headData.img.length>0?this.props.headData.img:"roomimage.png"}}/>
                   <View style={{
                       position:'absolute',
                       bottom:0,
                       left:0,
                       right:0,
                       height:42,
                       zIndex:2,
                       backgroundColor:'rgba(0,0,0,0.6)',
                       flexDirection:'column'
                   }}>
                       <View style={{
                           position:'absolute',
                           left:0,
                           right:0,
                           top:0,
                           bottom:0,
                           zIndex:0,
                           flexDirection:'column',
                           backgroundColor:'rgba(0,0,0,0)',
                       }}>
                           <Text style={{
                               position:'absolute',
                               left:0,
                               top:0,
                               width:screenWidth,
                               height:21,
                               paddingLeft:16,
                               textAlign:'left',
                               fontSize: 16,
                               color: 'white',
                           }}>{this.props.headData.hotelname}</Text>
                           <Text style={{
                               position:'absolute',
                               left:0,
                               bottom:0,
                               height:21,
                               paddingLeft:16,
                               textAlign:'left',
                               fontSize: 16,
                               color: 'white',
                           }}>{this.props.headData.starRatedName}</Text>
                       </View>
                       <View style={{
                           position:'absolute',
                           left:0,
                           right:0,
                           top:0,
                           bottom:0,
                           zIndex:1,
                           flexDirection:'row',
                           justifyContent:'flex-end',
                           backgroundColor:'rgba(0,0,0,0)',
                       }}>

                           <Image style={{
                               width:21,
                               height:17,
                               alignSelf:'center'
                           }} source={{uri:this.props.headData.Images&&this.props.headData.Images.length>0?'photowhite':'photowhite'}}/>
                           <Text style={{
                               textAlign:'right',
                               fontSize: 12,
                               color: 'white',
                               paddingRight:10,
                               paddingLeft:5,
                               alignSelf:'center'
                           }}>{this.props.headData.Images&&this.props.headData.Images.length>0?this.props.headData.Images.length+'张':''}</Text>

                       </View>

                   </View>
               </View >

               <View style={
                   {
                       flexDirection: 'row',
                       width: screenWidth,
                       height: 50,
                       backgroundColor: 'white',
                   }}>
                   <Text style={{
                       alignSelf:'center',
                       paddingLeft:15,
                       fontSize: 16,
                   }}>{this.props.headData.address}</Text>

                   <Image style={{
                       //箭头
                       position: 'absolute',
                       right:15,
                       alignSelf:'center',
                       width: 10,
                       height: 15
                   }} source={require('../../../../images/gray_jt.png')}/>
                   <Text style={{
                       position: 'absolute',
                       right:35,
                       alignSelf:'center',
                       textAlign: 'right',
                       color:'#1A4B74'
                   }}>
                       地图
                   </Text>
                   <View style={styles.lineStyle}/>
               </View>
               <View style={
                   {
                       flexDirection: 'row',
                       width: screenWidth,
                       height: 50,
                       backgroundColor: 'white',
                   }}>
                   <Text style={{
                       alignSelf:'center',
                       paddingLeft:15,
                       fontSize: 16,
                   }}>酒店详情</Text>

                   <Image style={{
                       //箭头
                       position: 'absolute',
                       right:15,
                       alignSelf:'center',
                       width: 10,
                       height: 15
                   }} source={require('../../../../images/gray_jt.png')}/>
                   <Text style={{
                       position: 'absolute',
                       right:35,
                       alignSelf:'center',
                       textAlign: 'right',
                       color:'#1A4B74'
                   }}>
                       服务
                   </Text>
                   <View style={styles.lineStyle}/>
               </View>
               <View style={
                   {
                       flexDirection: 'row',
                       width: screenWidth,
                       height: 50,
                       backgroundColor: 'white',
                   }}>
                   <Image style={{
                       alignSelf:'center',
                       left:15,
                       width:16,
                       height:16,
                   }} source={require('../../../../images/gray_data.png')}/>
                   <View style={{
                       position:'absolute',
                       alignSelf:'center',
                       left:62,
                       width:2,
                       height:16,
                       backgroundColor:'#E5E5E5',
                   }}/>
                   <Text style={{
                       position:'absolute',
                       alignSelf:'center',
                       left:84,
                   }}>{'02月02日-02月03日'}</Text>

                   <Image style={{
                       //箭头
                       position: 'absolute',
                       right:15,
                       alignSelf:'center',
                       width: 10,
                       height: 15
                   }} source={require('../../../../images/gray_jt.png')}/>
                   <Text style={{
                       position: 'absolute',
                       right:35,
                       alignSelf:'center',
                       textAlign: 'right',
                       color:'#999999'
                   }}>
                       共一晚
                   </Text>
                   <View style={styles.lineStyle}/>
               </View>

               <View style={
                   {
                       flexDirection: 'row',
                       width: screenWidth,
                       height: 50,
                       backgroundColor: 'white',
                   }}>
                   <View style={{
                       flexDirection:'row',
                       marginLeft:15,
                       marginRight:70,
                       flex:1,
                       backgroundColor:'white',
                       justifyContent:'space-between',
                       alignItems:'center'
                   }}>
                       <View style={[styles.screenGroundStyle,{borderColor:sixColor}]}>
                           <Text style={[styles.screenTextStyle,{color:sixColor}]}>含早</Text>
                       </View>
                       <View style={[styles.screenGroundStyle,{borderColor:sixColor}]}>
                           <Text style={[styles.screenTextStyle,{color:sixColor}]}>大床</Text>
                       </View>
                       <View style={[styles.screenGroundStyle,{borderColor:sixColor}]}>
                           <Text style={[styles.screenTextStyle,{color:sixColor}]}>自营</Text>
                       </View>
                       <View style={[styles.screenGroundStyle,{borderColor:sixColor}]}>
                           <Text style={[styles.screenTextStyle,{color:sixColor}]}>到店付</Text>
                       </View>
                       <View style={[styles.screenGroundStyle,{borderColor:sixColor}]}>
                           <Text style={[styles.screenTextStyle,{color:sixColor}]}>免费取消</Text>
                       </View>
                   </View>
                   <Image style={{
                       //箭头
                       position: 'absolute',
                       right:15,
                       alignSelf:'center',
                       width: 10,
                       height: 15
                   }} source={require('../../../../images/gray_jt.png')}/>
                   <Text style={{
                       position: 'absolute',
                       right:35,
                       alignSelf:'center',
                       textAlign: 'right',
                       color:'#1A4B74'
                   }}>
                       筛选
                   </Text>
               </View>
           </View>
        );
    }

}
const styles = StyleSheet.create({
    lineStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 0.5,
        backgroundColor: '#f2f2f2',
    },
    text16FontStyle: {
        fontSize: 16,
        color: 'black',
    },
    textPriceFontStyle: {
        fontSize: 20,
        color: '#ca5738',
    },
    text13FontStyle: {
        fontSize: 16,
        color: '#666666',
    },
    screenTextStyle:{
        fontSize:12,
        paddingHorizontal:5
    },
    screenGroundStyle:{
        borderRadius:4,
        borderWidth:1,
        height:25,
        justifyContent:'center',
        alignItems:'center'
    }
});

HotelRoomHeadView.defaultProps={
    headData:{
        hoteltgid:"",
        img:"",
        hotelname: "长春木棉花宾馆南湖大路三店",
        starRatedName: "二星级/其他",
        address: "朝阳区南湖大路与辉南街交汇",
        intro: "",//酒店简介
        renovationTime:"",//装修时间
        serviceitem: "暖气,24小时热水,不接待外宾",//房间设施
        entertainmentfacilities: "",//酒店设施
        est2list: "无线上网的公共区域",//酒店服务
        roomfacilities: "无烟房,宽带,空调,唤醒服务,行李寄存",//酒店服务
        conferenceamenities:"",//酒店服务
        Images:[]

    }
}

module.exports = HotelRoomHeadView;