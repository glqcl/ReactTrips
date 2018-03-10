import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';


var {width, height} = Dimensions.get('window');
import HMCommonStyle from '../../Stytle/HMCommonStyle'
import HMApprovalTools from '../Approval/HMApprovalTools'


export default class HMInterPlaneLisCell extends Component
{

    static defaultProps = {
        jsonObject: {},
        callBack: null
    }

    constructor(props)
    {
        super(props);
    }

    /*cell点击事件*/
    renderPopToLast()
    {
        if (this.props.callBack == null)return;

        this.props.callBack(this.props.jsonObject)
    }

    render()
    {
        var obj = this.props.jsonObject.S1[0];

        var valueH = this.props.jsonObject.S1[0].valueH;

        var S1_1 = this.props.jsonObject.S1[1];

        var P = obj.P;
        var A = obj.A;

        let totalTime = obj[11];
        /*飞行时常*/
        let time = HMApprovalTools.sec_to_time(totalTime * 60);

        let imagePath = '../../../images/logo/' + S1_1[0][0] + '.jpg';

        /*中转城市三字码*/
        let transitCityCode = '';

        if (null != obj[13] && null != obj[13][0] && null != obj[0][0])
        {
            transitCityCode = obj[13][0][0];
            ;
        }
        let transitCity = '';

        if (null != transitCityCode && '' != transitCityCode)
        {
            transitCity = P[transitCityCode][2]
        }

        let isStop = '直达';


        if (null != S1_1[0] && null != S1_1[0][10] && S1_1[0][10][0] == '0')
        {
            //经停次数为0
            isStop = '直达';
        }
        else
        {
            isStop = '中转';
        }


        let TotalFare = ['', ''];
        for (let keyH in valueH)
        {
            var hObj = valueH[keyH];
            TotalFare = hObj.TotalFare;

        }



        return (

            <TouchableOpacity onPress={() => this.renderPopToLast()}>
                <View style={styles.container}>
                    <View style={styles.innerViewStytle}>
                        <View>
                            <Text style={{color: 'rgb(56,156,255)', fontSize: HMCommonStyle.textFont18}}>{obj[5]}</Text>
                            <Text style={{
                                fontSize: HMCommonStyle.textFont14,
                                color: HMCommonStyle.gray
                            }}>{P[obj[2]][1]}</Text>
                        </View>

                        <View>
                            <Image style={styles.iconViewStytle} source={{uri: 'inter_arraw'}}></Image>
                            <Text style={styles.stopTextStytle}>{isStop}</Text>
                            <Text style={styles.cityViewStytle}>{transitCity}</Text>
                        </View>
                        <View>
                            <Text
                                style={{color: HMCommonStyle.black, fontSize: HMCommonStyle.textFont18}}>{obj[9]}</Text>
                            <Text style={{
                                fontSize: HMCommonStyle.textFont14,
                                color: HMCommonStyle.gray,
                                textAlign: HMCommonStyle.center
                            }}>{P[obj[6]][1]}</Text>
                        </View>
                        <View>
                            <Text style={{
                                color: HMCommonStyle.btnColorWithRed,
                                fontSize: HMCommonStyle.textFont18
                            }}>{TotalFare[0]}</Text>
                            <Text
                                style={{
                                    fontSize: HMCommonStyle.textFont12,
                                    textAlign: HMCommonStyle.right
                                }}>{'含税价'}</Text>
                        </View>
                    </View>

                    <View style={styles.bottomViewStyle}>
                        <Image style={styles.companyIconStytle} source={{uri: S1_1[0][0]}}
                        ></Image>
                        <Text>{A[S1_1[0][0]][1]}</Text>
                        <View style={styles.lineViewStytle}></View>
                        <Image style={[styles.companyIconStytle, styles.logoIconStytle]}
                               source={require('../../../images/logo/clock.png')}></Image>
                        <Text style={{marginLeft: HMCommonStyle.marginLeft * 0.2}}>{time}</Text>
                    </View>

                    <View style={{height: 2, backgroundColor: HMCommonStyle.lightGray, width: width}}></View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        justifyContent: HMCommonStyle.center,
        backgroundColor: HMCommonStyle.white,

    },

    innerViewStytle: {
        flexDirection: HMCommonStyle.row,
        justifyContent: HMCommonStyle.between,
        margin: HMCommonStyle.margin,
    },
    companyIconStytle: {
        width: 25,
        height: 25,
        marginRight: HMCommonStyle.marginRight * 0.5
    },
    bottomViewStyle: {
        flexDirection: HMCommonStyle.row,
        alignItems: HMCommonStyle.center,
        marginLeft: HMCommonStyle.marginLeft,
        marginBottom: HMCommonStyle.marginBottom

    },
    iconViewStytle: {
        width: 50,
        height: 8,
        alignItems: HMCommonStyle.center,
        marginTop: HMCommonStyle.marginTop
    },
    stopTextStytle: {
        alignItems: HMCommonStyle.center,
        fontSize: HMCommonStyle.textFont12,
        position: HMCommonStyle.absolute,
        top: 10,
        left: 10,
        color: 'rgb(56,156,255)'
    },
    cityViewStytle: {

        alignItems: HMCommonStyle.center,
        fontSize: HMCommonStyle.textFont12,
        position: HMCommonStyle.absolute,
        top: 30,
        left: 10,
        color: 'rgb(56,156,255)'
    },
    lineViewStytle: {
        width: 1,
        height: 15,
        backgroundColor: HMCommonStyle.black,
        marginLeft: HMCommonStyle.marginLeft * 0.5
    },
    logoIconStytle: {
        width: 15,
        height: 15,
        marginLeft: HMCommonStyle.marginLeft
    }

});

