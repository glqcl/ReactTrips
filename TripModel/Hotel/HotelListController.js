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
    TouchableOpacity
} from 'react-native';

export default class HotelListController extends Component<{}> {
    renderData(fn) {
        const urlString = "http://a.tripg.com/HotelQunar/GetComHotelList?Bizsectionname=&ChainName=&ProductId=12&OrderBy=&User_Code=&StarRatedId=5&Hotelname=&CheckOut=2018-02-12&Longitude=&SectionName=&Sign=FE29D133-468D-403B-8428-0168C968CAC1&CityId=346&LowestPrice=&OrderName=&PageSize=15&PlatformId=14&ChainId=&KeyWord=&CheckIn=2018-02-10&Kilometre=&Client_id=1111&Org_id=12267&Latitude=&PageNumber=1&HotelTgId=&HighestPrice=&QueryType=&NewKey=7302131b3c22b2f6f8aacaa261ad4aab";
        fetch(urlString)
            .then((response) => response.json())
            .then((responseJson) => {

                if (null != fn) {
                    fn(responseJson)
                }

            })
            .catch((error) => {
                alert(JSON.stringify(error));

            });


    }

    componentDidMount() {
        this.renderData((data) => {

            // alert(JSON.stringify();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data["Result"]["data"]),
            });
        });
    }

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    contentContainerStyle={styles.listViewStyle}
                />
            </View>
        );
    }



    renderRow(rowData) {

        return (
            <TouchableOpacity activeOpacity={0.8} >

                <View style={styles.rowStyle}>
                    <Image source={{uri: rowData["img"]}} style={styles.imageStyle}/>
                    <View style={styles.textStyle}>
                        <Text style={styles.hotelNameStyle}>{rowData["hotelname"]}</Text>
                        <Text style={styles.hotelStarStyle}>{rowData["starratedname"]}</Text>
                        <Text style={styles.hotelAddressStyle}>{rowData["address"]}</Text>
                    </View>
                    <View style={styles.lineStyle}/>

                </View>
            </TouchableOpacity>

        )
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
    imageStyle: {
        width: 130,
        height: 130,
        resizeMode: Image.resizeMode.contain
    },
    textStyle: {
        flex: 1,
    },
    rowStyle: {
        width: 375,
        height: 130,
        flexDirection: 'row',
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

module.exports = HotelListController;