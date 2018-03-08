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

var HotelRoomCell = require('../View/HotelRoomViews/HotelRoomCell');
var HotelRoomPlanView = require('../View/HotelRoomViews/HotelRoomPlanView');
var HotelRoomHeadView = require('../View/HotelRoomViews/HotelRoomHeadView');

var  HotelOrderController = require('./HotelOrderController');

export default class HotelRoomController extends Component<{}> {
    renderData(fn) {
        var urlString = "http://a.tripg.com/HotelQunar/GetHotelRoomType?Org_id=29734&Client_id=2252&PlatformId=14&PayOption=SelfPay,PrePay&Checkout=2018-02-06&ProductId=12&Checkin=2018-02-05&Sign=FE29D133-468D-403B-8428-0168C968CAC1&HotelTgId=145327&NewKey=131aeddbce4f9d64912825c7edb00ec6";
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
                    dataBlob[i+':'+j]= plans[j];
                }
            }
            var originProto = Object.getPrototypeOf(data["Result"]);
            originProto = Object.assign(Object.create(originProto), data["Result"]);
            this.setState({
                hotelData:originProto,
                mySection: this.state.mySection,
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
            dataSource: ds,
            mySection: [],
            hotelData:{}
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ListView ref = 'listView'
                    dataSource={this.state.dataSource}
                    renderRow = {(rowData,sectionID,rowID)=>this.renderRow(rowData,sectionID,rowID)}
                    renderSectionHeader={(headerData,sectionID)=>this.sectionHeader(headerData,sectionID)}
                    renderHeader={(hotelData)=>this.renderHeader(this.state.hotelData)}
                    contentContainerStyle={styles.listViewStyle}

                />
            </View>
        );
    }


    renderHeader(){
        return(
            <HotelRoomHeadView headData = {this.state.hotelData}/>
        )
    }
    changeSection(headerData,sectionID){
        var mySection = this.state.mySection;

        let isPush = true;
        for (let item of mySection.valueOf()){
            if (Number(item) === sectionID){
                isPush = false
            }
        }
        if (isPush){
            mySection.push(Number(sectionID));
        }else {
            mySection.pop(Number(sectionID));
        }

        this.setState({
            hotelData:this.state.hotelData,
            mySection:mySection,
            dataSource:this.state.dataSource,
        })
    }
    sectionHeader(headerData,sectionID){
        return (
            <TouchableOpacity activeOpacity={0.0} onPress={()=>{
                this.changeSection(headerData,sectionID)
            }}>
                <HotelRoomCell ref={sectionID} roomCellData = {headerData} />
            </TouchableOpacity>
        )
    }
    pushOrderController(rowData,sectionID,rowID){
        this.props.navigation.navigate('HotelOrderController',queryModel = {
            "travelType":"1",
            "sharePersons":[]
        })
    }
    renderRow(rowData,sectionID,rowID) {
        for (let item of this.state.mySection.valueOf()){
            if (Number(item) === sectionID){
                return(
                    <TouchableOpacity activeOpacity={0.0} onPress={()=>{
                        this.pushOrderController(rowData,sectionID,rowID)
                    }}>
                        <HotelRoomPlanView rowData={rowData} bedData={this.state.dataSource._dataBlob[sectionID]["bed"]}/>
                    </TouchableOpacity>

                );          
            }
        }

        return (
            <View style={{
                left:0,
                top:0,
                width:screenWidth,
                height:0
            }}/>
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

module.exports = HotelRoomController;