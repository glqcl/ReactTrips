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
var HotelOrderContentCell = require('../View/HotelOrderViews/HotelOrderContentCell');
var HotelOrderApplyCell = require('../View/HotelOrderViews/HotelOrderApplyCell');
var HotelOrderHeadView = require('../View/HotelOrderViews/HotelOrderHeadView');


export default class HotelOrderController extends Component<{}> {

    render() {
        return (
            <View style={styles.container}>
                <ListView ref = 'listView'
                          dataSource={this.state.dataSource}
                          renderRow = {(rowData)=>this.renderRow(rowData)}
                          contentContainerStyle={styles.listViewStyle}
                          renderHeader={()=>this.renderHeader()}

                />
            </View>
        );
    }
    renderHeader(){
        return (
            <HotelOrderHeadView/>
        );
    }
    renderRow(rowData) {
        var row = rowData["row"];

        if (Number(row) === 0){
            //申请单
                return (
                    <View>
                        <HotelOrderApplyCell />
                        <View style={styles.lineStyle}/>
                    </View>
                );

        }else if (Number(row)===1){
            //房间数
            let height = 150;
            return (
                <View>
                    <HotelOrderContentCell  titleData={"房间数"} contentData={rowData["roomCount"]}/>
                    <View style={styles.lineStyle}/>

                </View>

            );

        }else if (Number(row)===2){
            //入住人
            var count = rowData["count"];
            let height = 50*count;
            return (
                <View style={{
                    width: screenWidth,
                    height: height,
                    backgroundColor: 'green',
                }}>
                    {
                        this.renderPersons(rowData)
                    }
                    <View style={styles.lineStyle}/>

                </View>
            );

        }else if (Number(row)===3){
            //联系人or费用分配
            var isPhone = rowData["isPhone"];
            if (isPhone==="1"){
                return (
                    <View>
                        <HotelOrderContentCell  titleData={"联系电话"} contentData={"18811305154"}/>
                        <View style={styles.lineStyle}/>

                    </View>
                );
            }else {
                return (
                    <View style={{
                        width: screenWidth,
                        height: 50,
                        backgroundColor: 'green',
                    }}>
                        <Text>费用分配</Text>
                    </View>
                );
            }



        }else if (Number(row)===4){
            //最晚到店
            return (
                <View>
                    <HotelOrderContentCell  titleData={"最晚到店"} contentData={"18：00"}/>
                    <View style={styles.lineStyle}/>
                </View>
            );

        }else if (Number(row)===5){
            //住宿偏好
            return (
                <View>
                    <HotelOrderContentCell  titleData={"住宿偏好"} contentData={"无要求"}/>
                    <View style={styles.lineStyle}/>
                </View>
            );

        }
        return <View/>;

    }
    renderPersons(rowData){
        var count = rowData["count"];
        var personArray= [];
        var titleText = "" ;

        for (let i=0;i<count;i++){
            if(i===0){
                titleText = "入住人";
            }else{
                titleText = "";
            }
            personArray.push(

                <HotelOrderContentCell key={i} titleData={titleText} contentData={"金卯刀"} showJtImgae={false}/>
            );
        }

        return personArray;

    }

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log(this.props.queryModel);
        var myData = {
            queryModel:this.props.queryModel,
            travelOff:"1",//差旅开关
        };
        this.state = {
            dataSource: ds.cloneWithRows([{"row":"0"},{"row":"1","showDetail":"1","roomCount":"1"},{"row":"2","count":"3"},{"row":"3","isPhone":"1"},{"row":"4"},{"row":"5"}]),
            orderData:myData,
        };
    }

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listViewStyle: {
        backgroundColor: 'red',
        justifyContent:'flex-start'
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
HotelOrderController.defaultProps={
    queryModel:{
        travelType:"1",
    },

};
module.exports = HotelOrderController;