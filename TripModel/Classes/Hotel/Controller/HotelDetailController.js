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
var  HotelRoomPlanView = require('./HotelRoomPlanView');

export default class HotelDetailController extends Component<{}> {
    renderData(fn) {
        var urlString = "http://a.tripg.com/HotelQunar/GetHotelRoomType?Org_id=2652&Client_id=919&PlatformId=14&PayOption=SelfPay,PrePay&Checkout=2018-01-31&ProductId=12&Checkin=2018-01-30&Sign=FE29D133-468D-403B-8428-0168C968CAC1&HotelTgId=174658&NewKey=2dae75e38b83258209916c70c91acaad";
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
            //酒店信息
            let dataBlob = {};
            let sectionIDs = [];
            let rowIDs = [];

            let dataRooms = data["Result"]["Rooms"];

            for (let i=0;i<dataRooms.length;i++){
                //房型
                sectionIDs.push(i);
                dataBlob[i] = dataRooms[i];

                //产品
                rowIDs[i]=[];
                let plans = dataRooms[i]["RatePlans"];
                for (let j=0;j<plans.length;j++){
                    rowIDs[i].push(j);
                    dataBlob[i+':'+j]=plans[j];
                }
            }

            this.setState({
                dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
            });
        });
    }

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getRowData:(dataSource,sectionID,rowID)=>{
                return dataSource[sectionID+':'+rowID];
            },
            sectionHeaderHasChanged:(s1,s2) => s1!== s2,
            getSectionHeaderData:(dataSource,sectionID)=>{
                return dataSource[sectionID];
            }
        });
        this.state = {
            dataSource: ds
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.sectionHeader}
                    contentContainerStyle={styles.listViewStyle}
                />
            </View>
        );
    }
    sectionHeader(headerData,sectionID){
        return (
            <HotelRoomCell headerData={headerData}/>
        )
    }
    renderRow(rowData,sectionID,rowID) {
        return (
            <HotelRoomPlanView rowData={rowData} />
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

module.exports = HotelDetailController;