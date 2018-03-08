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

export default class HotelOrderContentCell extends Component<{}> {

    render() {
        return (
            <View style={
                {
                    flexDirection: 'row',
                    width: screenWidth,
                    height: 50,
                    alignItems:'center',
                    backgroundColor: 'white',
                }
            }>
                <View style={styles.viewTitleStyle}>
                    <Text style={styles.textTitleStyle}>
                        {this.props.titleData}
                    </Text>
                </View>
                <View style={styles.viewContentStyle}>
                    <Text style={styles.textContentStyle}>
                        {this.props.contentData}
                    </Text>
                </View>
                <Image style={{
                    //箭头
                    position:'absolute',
                    right: 16,
                    width: this.props.showJtImgae?10:0,
                    height: this.props.showJtImgae?15:0
                }} source={require('../../../../images/gray_jt.png') }/>

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
        fontSize: 14,
        color: 'black',
    },
    viewContentStyle: {
        position:'absolute',
        left:120,
    },
    text13FontStyle: {
        fontSize: 16,
        color: '#666666',
    },
    imageJTStyle: {
        //箭头
        position:'absolute',
        right: 16,
        width: 10,
        height: 15
    },

});
HotelOrderContentCell.defaultProps={
    titleData:"标题",
    contentData:"内容",
    showJtImgae:true
}

module.exports = HotelOrderContentCell;