//https://js.coach/react-native-amap3d?search=mapview
//https://yarnpkg.com/en/package/react-native-amap3d
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
    Image,
    Dimensions,
    Alert
} from 'react-native';

import { MapView } from 'react-native-amap3d'
var {width, height} = Dimensions.get('window');

export default class GeoMapView extends Component<{}> {

    render() {
        _points = Array(1000).fill(0).map(() => ({
            latitude: 39.91095,
            longitude: 116.37296,
        }));

        _onItemPress = point => Alert.alert(this._points.indexOf(point).toString());

        return (
            <View style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <MapView  zoomLevel={12} style={{
                    width:width,
                    height:height,
                }} coordinate={{
                        latitude: 39.91095,
                        longitude: 116.37296,
                    }}
                >
                    <MapView.Marker image='flag' coordinate={{
                        latitude: 39.91095,
                        longitude: 116.37296,
                    }}>
                        <View style={{
                            width:150,
                            height:20,
                        }}>
                            <Text>自定义信息窗体</Text>
                        </View>
                    </MapView.Marker>

                </MapView>

            </View>
        );
    }

}


module.exports = GeoMapView;