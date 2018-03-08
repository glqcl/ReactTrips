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
    Dimensions
} from 'react-native';

import HMCommonStyle from '../../Stytle/HMCommonStyle'

var {width, height} = Dimensions.get('window');
export default class HMListViewItem extends Component
{

    static defaultProps = {

        jsonObject: {},
        startCity: '',
        endCity: '',
        popToLast: null

    };

    popToLast()
    {
        if (this.props.popToLast == null)return;
        this.props.popToLast();

    }

    render()
    {
        return (
            <View style={styles.container}>

                <Image source={{uri: this.renderImageSourse(this.props.jsonObject)} }
                       style={{
                           width: 27,
                           height: 15,
                           alignItems: HMCommonStyle.center,
                           marginLeft: HMCommonStyle.marginLeft * 0.5
                       }}></Image>

                <Text style={styles.textViewStytle}> {this.props.jsonObject.travel_id}</Text>

                <Text
                    style={styles.textViewStytle}> {this.renderAppCitys(this.props.jsonObject)}</Text>

                <Text style={styles.textViewStytle}> {this.props.jsonObject.start_date}</Text>


            </View>
        );
    }


    renderAppCitys(obj)
    {
        return obj.startCity + '-' + obj.endCity;
    }

    renderImageSourse(obj)
    {


        if (obj.approved_status == 's')
        {
            return "approval_waiting";
        }
        else if (obj.approved_status == 'n')
        {
            return "approval_reject";
        }
        else if (obj.approved_status == 'p')
        {
            return "approval_pass";
        }
        else if (obj.approved_status == 'z')
        {
            return "approval_cancle";
        } else if (obj.approved_status == 'b')
        {
            return "approval_back";
        }
        else
        {
            return "approval_pass";
        }

    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: HMCommonStyle.row,
        height: HMCommonStyle.cellHeight,
        justifyContent: HMCommonStyle.around,
        alignItems: HMCommonStyle.center,
        width: width,
        backgroundColor: HMCommonStyle.white,
        borderBottomWidth: HMCommonStyle.borderWidth,
        borderBottomColor: HMCommonStyle.gray
    },

    textViewStytle: {
        color: HMCommonStyle.black,
        fontSize: HMCommonStyle.textFont12,
        width: 100,
        alignItems: HMCommonStyle.center,
        textAlign: HMCommonStyle.center
    }

});

