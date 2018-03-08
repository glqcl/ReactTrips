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

var {screenWidth,screenHeight} = Dimensions.get('window')
var roomViewHeight = 110;
export default class HotelRoomPlanView extends Component<{}> {

    render() {

            if("qunar"===this.props.rowData["channelcode"]){
                this.props.rowData["refundDescription"] = "不可取消"
            }
            let arr = ['（','(','('];
            for (let item of arr) {
                if (this.props.rowData["productroomname"].includes(item) ) {
                    this.props.rowData["productroomname"] = this.props.rowData["productroomname"].substring(0,this.props.rowData["productroomname"].indexOf(item,0));
                    // this.props.rowData["productroomname"] = this.props.rowData["productroomname"].substring(0,this.props.rowData["productroomname"].index(item))
                }
            }
        return (
            <View style={
                {
                    width:screenWidth,
                    height:110,

                }
            }>

                <View style={
                    {
                        position:'absolute',
                        left:0,
                        top:0,
                        right:0,
                        bottom:0,
                        zIndex:1,
                        flexDirection:'column',
                        justifyContent:'flex-start',
                        backgroundColor:'rgba(255,255,255,0)',
                    }
                }>
                    <Text style={[
                        {
                            paddingLeft:10,
                            paddingTop:8,
                            textAlign:'left',
                            color:'black',
                            fontSize:16,
                        }
                    ]}>

                        {
                            this.props.bedData +' ' + this.props.rowData["breakfirstDescription"]

                        }
                    </Text>
                    <Text style={[
                        {
                            paddingLeft:10,
                            paddingTop:8,
                            textAlign:'left',
                            color:'#666666',
                            fontSize:13,
                        }
                    ]}>

                        {
                            this.props.rowData["refundDescription"]

                        }
                    </Text>
                    <Text style={[
                        {
                            paddingLeft:10,
                            paddingTop:8,
                            textAlign:'left',
                            color:'#666666',
                            fontSize:13,
                        }
                    ]}>

                        {
                            this.props.rowData["productroomname"]

                        }
                    </Text>

                </View>

                <View style={styles.lineStyle}/>

            </View>
        );
    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listViewStyle: {
        backgroundColor: 'white',

    },
    rowStyle: {
        width: 375,
        height: 130,
        backgroundColor: 'red',
        flexDirection: 'row',
    },

    sectionImgStyle:{

    },

    text16FontStyle: {
        fontSize: 16,
        color: '#666666',
    },
    textPriceFontStyle: {
        fontSize: 20,
        color: '#ca5738',
    },
    text13FontStyle: {
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

    lineStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: '#f2f2f2',
    },


});
HotelRoomPlanView.defaultProps={
    rowData:{},
    bedData:""
};

module.exports = HotelRoomPlanView;