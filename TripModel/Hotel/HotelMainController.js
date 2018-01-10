import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
var {width, height} = Dimensions.get('window');

export default class HotelMainController extends Component<{}>
{


    constructor(props)
    {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['定位城市', '日历控件', '关键字', '星级价格', '差旅类型', '搜索']),
        };
    }

    render()
    {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }


    renderRow(rowData)
    {
        if (rowData === '定位城市')
        {
            return (
                <View style={styles.betweenRowStyle}>
                    <View style={styles.betweenGroundStyle}>
                        <View style={styles.cityStyle}>
                            <Text style={styles.textHihtStyle}>目的地</Text>
                            <Text style={styles.textContentStyle}>长春</Text>
                            <View style={styles.lineStyle}/>
                        </View>
                        <Image source={require('../../images/gray_jt.png')}
                               style={styles.imageJTStyle}
                        />
                    </View>

                    <Image source={require('../../images/myPosition.png')}
                           style={styles.imagePositionStyle}
                    />
                    <View style={styles.lineStyle}/>

                </View>
            );
        } else if (rowData === '日历控件')
        {
            return (
                <View style={styles.betweenRowStyle}>
                    <View style={styles.dateStyle}>
                        <Text style={styles.textContentStyle}>01月10日</Text>
                        <Text style={styles.textHihtStyle}> 今天</Text>
                        <Text style={styles.textHihtStyle}> -- </Text>
                        <Text style={styles.textContentStyle}>01月11日</Text>
                        <Text style={styles.textHihtStyle}> 明天</Text>
                    </View>
                    <Image source={require('../../images/gray_jt.png')}
                           style={styles.imageJTStyle}
                    />
                    <View style={styles.lineStyle}/>

                </View>
            );
        } else if (rowData === '关键字')
        {
            return (
                <View style={styles.betweenRowStyle}>
                    <Text style={styles.textDefaultStyle}>关键字/位置/品牌/酒店名</Text>
                    <Image source={require('../../images/gray_jt.png')}

                           style={styles.imageJTStyle}
                    />
                    <View style={styles.lineStyle}/>

                </View>
            );
        } else if (rowData === '星级价格')
        {
            return (
                <View style={styles.betweenRowStyle}>
                    <Text style={styles.textDefaultStyle}>星际/价格</Text>
                    <View style={styles.lineStyle}/>
                    <Image source={require('../../images/gray_jt.png')}
                           style={styles.imageJTStyle}
                    />
                </View>
            );
        } else if (rowData === '差旅类型')
        {
            return (
                <View style={styles.betweenRowStyle}>
                    <Text style={styles.titleStyle}>差旅类型</Text>
                    <Text style={styles.textContentCenterStyle}>因公出行</Text>
                    <Image source={require('../../images/switch_orange.png')}

                           style={styles.switchStyle}
                    />
                    <View style={styles.lineStyle}/>

                </View>
            );
        } else
        {
            return (
                <TouchableOpacity activeOpacity={0.9} onPress={this.searchController}>
                    <View style={styles.searchRowStyle}>
                        <View style={styles.searchButtonStyle}>
                            <Text style={styles.searchTextStyle}>开始搜索</Text>
                        </View>
                        <View style={styles.lineStyle}/>
                    </View>
                </TouchableOpacity>
            );
        }
    }


}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'white',
    },

    betweenRowStyle: {
        // 横向平铺
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: 45,
        paddingLeft: 16,
        paddingRight: 16
    },
    searchRowStyle: {
        // 搜索
        flex: 1,
        width: width,
        height: 70,
        paddingLeft: 16,
        paddingRight: 16
    },
    searchButtonStyle: {
        // 搜索按钮
        flex: 1,
        position: 'relative',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#CB5738',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchTextStyle: {
        color: 'white',
        fontSize: 20
    },
    betweenGroundStyle: {
        // 横向平铺
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cityStyle: {
        //城市
        flexDirection: 'column',
        justifyContent: 'center',
    },

    lineStyle: {
        //line
        position: 'absolute',
        bottom: 0,
        left: 15,
        right: 15,
        height: 0.5,
        backgroundColor: '#f2f2f2',

    },
    switchStyle: {
        //开关
        width: 51,
        height: 20
    },
    dateStyle: {
        //日历
        alignItems: 'center',
        flexDirection: 'row',

    },
//图片
    imageJTStyle: {
        //箭头
        marginRight: 0.01,
        width: 10,
        height: 15
    },
    imagePositionStyle: {
        //定位
        marginLeft: 10,
        marginRight: 0.01,
        width: 31,
        height: 27
    },


    textDefaultStyle: {
        fontSize: 20,
        color: '#cccccc'
    },
    textHihtStyle: {
        fontSize: 12,
        color: '#333333'
    },
    textContentStyle: {
        fontSize: 16,
        color: 'black'
    },
    textContentCenterStyle: {
        fontSize: 20,
        color: 'black',
    },
    titleStyle: {
        fontSize: 16,
        color: '#666666'
    },

});

module.exports = HotelMainController;