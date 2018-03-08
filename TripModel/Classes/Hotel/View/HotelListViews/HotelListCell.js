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
    Dimensions,
} from 'react-native';


export default class HotelListCell extends Component<{}> {

    render() {
        return (
            <View style={styles.rowStyle}>
                <Image source={{uri: this.props.rowData["img"]}} style={styles.imageStyle}/>
                <View style={styles.textStyle}>
                    <Text style={styles.hotelNameStyle}>{this.props.rowData["hotelname"]}</Text>
                    <Text style={styles.hotelStarStyle}>{this.props.rowData["starratedname"]}</Text>
                    <Text style={styles.hotelAddressStyle}>{this.props.rowData["address"]}</Text>
                </View>
                <View style={styles.lineStyle}/>

            </View>
        );
    }

}
const styles = StyleSheet.create({

    rowStyle: {
        width: 375,
        height: 130,
        flexDirection: 'row',
    },
    imageStyle: {
        width: 130,
        height: 130,
        resizeMode: Image.resizeMode.contain
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
HotelListCell.defaultProps={
    rowData:{}
};
module.exports = HotelListCell;