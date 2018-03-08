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


var {width, height} = Dimensions.get('window');
import HMCommonStyle from '../../Stytle/HMCommonStyle'
export default class HMTopItem extends Component
{
    static defaultProps = {
        title: '',
        maxLoops: 10,
        popToIndex: null
    };  // 注意这里有分号
    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.cellClick(this.props.title)}>

                    <Image source={{
                        uri: 'topcircle',
                        width: width / 4.1,
                        height: width / 4.1
                    }}></Image>

                    <Text style={{
                        marginTop: HMCommonStyle.marginTop * 0.5,
                        fontSize: Platform.OS == 'android' ? 14 : 12,
                        marginTop: HMCommonStyle.marginTop * 0.5,
                        color: HMCommonStyle.white,
                        backgroundColor: HMCommonStyle.clear,
                        textAlign: HMCommonStyle.center
                    }}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    cellClick(title)
    {
        if (this.props.popToIndex == null)return;

        this.props.popToIndex(title);

    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 3,
        height: 90,
        alignItems: HMCommonStyle.center,
        justifyContent: HMCommonStyle.around
    },
    innerStytle: {}


});
