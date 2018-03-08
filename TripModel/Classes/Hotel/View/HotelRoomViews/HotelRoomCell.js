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

export default class HotelRoomCell extends Component<{}> {

    render() {
        return (
            <View style={
                {
                    flexDirection: 'row',
                    width: screenWidth,
                    height: roomViewHeight,
                    backgroundColor: 'white',
                }
            }>

                <Image
                    source={{uri:this.props.roomCellData["img"]&&this.props.roomCellData["img"].length>0?this.props.roomCellData["img"]:"roomimage.png"}}
                    style={
                        {
                            position:'absolute',
                            backgroundColor:'rgba(255,255,255,0)',
                            left:10,
                            top:4,
                            alignSelf:'center',
                            width:roomViewHeight-8,
                            height:roomViewHeight-8
                        }
                    }
                />
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'rgba(255,255,255,0)',
                    position:'absolute',
                    top:0,
                    left:roomViewHeight-8+20,
                    right:16,
                    bottom:0,
                }}>
                    <View style={{
                        position:'absolute',
                        left:0,
                        right:0,
                        top:0,
                        bottom:0,
                        zIndex:1,
                        flexDirection:'column',
                        backgroundColor:'rgba(255,255,255,0)',
                    }}>

                        <Text style={[
                            styles.text16FontStyle,
                            {
                                position:'absolute',
                                left:0,
                                top:20,
                                right:0,
                                bottom:roomViewHeight/2.0,
                                textAlign:'left',
                            }
                        ]}>
                            {this.props.roomCellData["roomname"]}
                        </Text>
                        <Text style={[
                            styles.text13FontStyle,
                            {
                                position:'absolute',
                                left:0,
                                top:roomViewHeight/2.0+15,
                                right:0,
                                bottom:0,
                                textAlign:'left',
                            }
                        ]}>
                            {this.props.roomCellData["bed"]}
                        </Text>
                    </View>


                    <Text style={[
                        styles.textPriceFontStyle,
                        {
                            position:'absolute',
                            left:0,
                            right:0,
                            zIndex:2,
                            textAlign:'right',
                            flexWrap:'wrap',
                            backgroundColor:'rgba(255,255,255,0)',
                        }
                    ]}>
                        {this.props.roomCellData["lowestPrice"]}
                    </Text>



                </View>

            </View>
        );
    }

}
const styles = StyleSheet.create({

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
});
HotelRoomCell.defaultProps={
    roomCellData:{}
};

module.exports = HotelRoomCell;