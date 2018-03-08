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

const {screenWidth,screenHeight} = Dimensions.get('window')

export default class HotelOrderHeadView extends Component<{}> {

    render() {
        return (
            <View style={{
                backgroundColor:'white',
            }}>
                <View style={{
                    margin:10,
                    width:screenWidth,
                    backgroundColor:'#162D3F',
                    flexDirection:'column',
                    justifyContent:'flex-start',
                    borderRadius:5,
                    borderWidth:0.01,
                    borderColor:'#162D3F',
                }}>
                    <Text style={{
                        paddingTop:10,
                        paddingLeft:5,
                        paddingRight:5,
                        color:'white',
                        fontSize:16
                    }}>
                        长春香格里拉大酒店
                    </Text>
                    <Text style={{
                        color:'#FFFFFF',
                        fontSize:15,
                        paddingTop:10,
                        paddingLeft:5,
                        paddingRight:5,

                    }}>
                        2018年01月13日-2018年01月14日
                    </Text>
                    <Text style={{
                        color:'#CCCCCC',
                        fontSize:15,
                        paddingTop:10,
                        paddingLeft:5,
                        paddingRight:5,
                    }}>
                        房型:公寓房 | 宽带:有宽带
                    </Text>
                    <Text style={{
                        color:'#CCCCCC',
                        fontSize:15,
                        paddingTop:10,
                        paddingLeft:5,
                        paddingRight:5,
                    }}>
                        含早
                    </Text>
                    <Text style={{
                        color:'#CCCCCC',
                        fontSize:15,
                        paddingTop:10,
                        paddingLeft:5,
                        paddingRight:5,
                        paddingBottom:10,
                    }}>
                        可以取消
                    </Text>
                </View>
                <View style={styles.lineStyle}/>

            </View>
        );
    }

}
const styles = StyleSheet.create({

    textTitleStyle: {
        fontSize: 16,
        color: '#666666',
    },
    viewTitleStyle:{
        paddingLeft:16,
    },
    textContentStyle: {
        fontSize: 13,
        color: 'white',
    },
    viewContentStyle: {
        flexDirection:'row',
        position:'absolute',
        right:20,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'white'

    },
    viewApplyStyle:{
        height:28,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:5,
        justifyContent:'center',
        backgroundColor:'#ca5738'

    },
    viewHelpStyle: {
        width:16,
        height:16,
        borderRadius:8,
        borderWidth:0,
        borderColor:'red',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#AAAAAA'
    },
    textHelpStyle: {
        fontSize: 15,
        color: 'white',
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


module.exports = HotelOrderHeadView;