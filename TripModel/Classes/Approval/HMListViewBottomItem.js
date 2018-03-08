/**
 * Created by mac on 2017/10/26.
 */
/**
 * Created by mac on 2017/10/26.
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    Dimensions
} from 'react-native';


import HMCommonStyle from '../../Stytle/HMCommonStyle'
var {width, height} = Dimensions.get('window');
export default class HMListViewBottomItem extends Component
{
    static defaultProps = {
        jsonObject: {},
        popToLast: null,
    };
    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();
    }

    render()
    {
        var descriptions = this.props.jsonObject.description;
        if (null == descriptions || 'null' == descriptions)
        {
            descriptions = '';
        }

        return (
            <View style={styles.container}>

                <View style={styles.bottomViewStyle}>

                    <Text style={{
                        marginTop: HMCommonStyle.marginTop * 0.5,
                        marginLeft: HMCommonStyle.marginLeft,
                        color: HMCommonStyle.gray
                    }}>{'出差事由'}</Text>

                    <TextInput
                        editable={false}
                        multiline={true}
                        underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                        style={[styles.textInputStytle, {fontSize: Platform.OS == 'ios' ? 12 : 14}]}>{descriptions}</TextInput>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 100,
        marginTop: 10,
        borderTopWidth: HMCommonStyle.borderWidth,
        borderTopColor: HMCommonStyle.gray,
        borderBottomWidth: HMCommonStyle.borderWidth,
        borderBottomColor: HMCommonStyle.gray

    },

    bottomViewStyle: {
        flexDirection: HMCommonStyle.row,
        width: width,
        flex: 1,
        backgroundColor: HMCommonStyle.white,


    },
    textInputStytle: {
        marginLeft: HMCommonStyle.marginLeft * 0.5,
        width: width - 100,
        flexWrap: 'wrap',
        height: 100,
        fontSize: HMCommonStyle.textFont12,

    }
});



