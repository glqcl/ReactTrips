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
    Platform, Dimensions
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'
var {width, height} = Dimensions.get('window');
export default class HMAppProcessItem extends Component
{
    static defaultProps = {
        obj: {},
        position: 0,
        length: 0

    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();

    }

    componentDidMount()
    {
        var letfView = this.refs.letfView;
        var rightView = this.refs.rightView;
        var image = this.refs.image;
        if (this.props.position == 0)
        {
            letfView.setNativeProps({
                style: {display: 'none', marginLeft: 26}
            })
            image.setNativeProps({
                style: {marginLeft: 26}
            })
        }
        if (this.props.length - 1 == this.props.position)
        {
            rightView.setNativeProps({
                style: {display: 'none'}
            })
            image.setNativeProps({
                style: {marginRight: 26}
            })
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <View style={{height: 18, flexDirection: HMCommonStyle.row, alignItems: HMCommonStyle.center}}>
                    <View ref='letfView' style={{flex: 1, height: 1, backgroundColor: 'rgb(20,42,64)'}}></View>
                    <Image ref='image' source={{uri: this.props.obj.approval_status} }
                           style={{width: 18, height: 18}}></Image>
                    <View ref='rightView'
                          style={{flex: 1, height: 1, backgroundColor: 'rgb(20,42,64)'}}></View>
                </View>
                <View style={{marginTop: 5, alignItems: HMCommonStyle.center, paddingLeft: 5}}>
                    <Text style={{
                        fontSize: Platform.OS == 'ios' ? 10 : 12,
                        color: HMCommonStyle.black,
                        textAlign: HMCommonStyle.center,
                        height: 15,
                        lineHeight: 15,

                    }}>{this.props.obj.u_name}</Text>
                    <Text style={{
                        fontSize: Platform.OS == 'ios' ? 10 : 12,
                        color: HMCommonStyle.black,
                        textAlign: HMCommonStyle.center,
                        height: 15,
                        lineHeight: 15,

                    }}>{this.props.obj.approval_time}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: HMCommonStyle.center,
    },

});
