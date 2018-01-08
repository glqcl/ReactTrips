/**
 * Created by mac on 2018/1/8.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
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
                    <View style={{}}>
                        <Text></Text>
                        <Text></Text>
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
    outerViewStytle: {
        height: 100,
        width: width
    }
});




