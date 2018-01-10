/**
 * Created by mac on 2018/1/8.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

var {width, height} = Dimensions.get('window')

export default class HMPlaneHeaderCell extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {

        return (
            <View style={styles.container}>
                <View style={styles.outerViewStytle}>
                    <View style={styles.timeViewStytle}>
                        <Text style={[styles.textViewStytle]}>{'07:30'}</Text>
                        <Image source={{uri:'goplane'}} style={{width:100,height:2}}></Image>
                        <Text style={[styles.textViewStytle]}>{'10:25'}</Text>
                    </View>
                    <View style={{}}>
                        <Text></Text>
                        <Text></Text>
                    </View>
                    <Text></Text>
                    <Text></Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textViewStytle:{
        fontSize:12,
        color:'gray'
    },
    timeViewStytle:{
      flexDirection:'row',
        height:30,

        alignItems:'center'
    },
    outerViewStytle: {
        height: 100,
        width: width,

    }
});




