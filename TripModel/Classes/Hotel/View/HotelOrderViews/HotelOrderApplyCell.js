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

export default class HotelOrderApplyCell extends Component<{}> {

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
                        关联申请单
                    </Text>
                </View>
                <View style={styles.viewContentStyle}>
                    <View style={styles.viewHelpStyle}>
                        <Text style={styles.textHelpStyle}>
                            ?
                        </Text>
                    </View>
                    <View style={styles.viewApplyStyle}>
                        <Text style={styles.textContentStyle}>
                            请先关联申请单
                        </Text>
                    </View>

                </View>

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
});


module.exports = HotelOrderApplyCell;