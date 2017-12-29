// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, {Component} from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View,
//
// } from 'react-native';
//
//
// import HMLaunchImage from './TripModel/Main/HMLaunchImage'
// import {Navigator} from 'react-native-deprecated-custom-components';
//
// export default class TripGroup extends Component
// {
//     render()
//     {
//         return (
//             <Navigator
//                 initialRoute={{name: '启动页', component: HMLaunchImage}}
//                 configureScene={() =>
//                 {
//                     return Navigator.SceneConfigs.PushFromRight;
//                 }}
//                 renderScene={(route, navigator) =>
//                 {
//                     let Component = route.component;
//                     return <Component{...route.passProps} navigator={navigator}/>
//                 }}
//             >
//             </Navigator>
//         );
//     }
// }
//
//
// AppRegistry.registerComponent('TripGroup', () => TripGroup);


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

} from 'react-native';

import App from './TripModel/Main/App'

export default class TripGroup extends Component
{
    render()
    {
        return (
            <App/>
        );
    }
}







AppRegistry.registerComponent('TripGroup', () => TripGroup);

