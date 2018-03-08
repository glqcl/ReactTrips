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
    Platform,
    TouchableOpacity,
    Dimensions

} from 'react-native';


var {width, height} = Dimensions.get('window');
import HMCommonStyle from '../../Stytle/HMCommonStyle'

var cellH = (height / 4) / 2.1;
var cellW = ((width - 20) / 3) / 1.3
var hMargin = ( ((width - 20) / 3) * 1.7 - 2 * cellW) / 3
var vMargin = 10

export default class HMMiddleItem extends Component
{
    static defaultProps = {
        title: '',
        position: 0,
        maxLoops: 10,
        callBack: null,
    };  // 注意这里有分号

    renderCallBack()
    {
        if (this.props.callBack == null)return;
        this.props.callBack(this.props.position);
    }

    render()
    {
        return (
            <View >
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.renderCallBack()}>
                    <View style={styles.container}>
                        <Image source={{uri: 'hotel', width: 20, height: 20}}></Image>
                        <Text style={{
                            marginTop: HMCommonStyle.marginTop * 0.5,
                            fontSize: HMCommonStyle.textFont12,
                            color: HMCommonStyle.white
                        }}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: cellW,
        height: cellH,
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.center,
        backgroundColor: '#323141',
        borderRadius: HMCommonStyle.borderRadius,
        marginLeft: hMargin,
        marginTop: vMargin,


    },
    innerStytle: {}


});
