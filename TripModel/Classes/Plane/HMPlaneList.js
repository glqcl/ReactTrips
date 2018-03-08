import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {ExpandableList} from "../../Tools/ExpandableList";
var {width, height} = Dimensions.get('window');
import HMUrlUtils from '../../NetUtil/HMServerUrl'
import StorageUtil from '../../Tools/StorageUtil'
import NetUitl from '../../NetUtil/NetUitl'
import HMPlaneHeaderCell from './HMPlaneHeaderCell'


export default class HMPlaneList extends Component
{

    constructor(props)
    {
        super(props);
    }

    _renderGroupHeader({item, groupId, status, toggleStatus})
    {
        return (
            <View style={[styles.headContainer, status && styles.headChosenContainer]}>
                <Text style={[styles.headTitleText, status && styles.headChosenTitleText]}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleStatus(true)}>
                    <View style={styles.touchArea}>
                        <Text style={{color: status ? '#FFF' : '#333', width: width}}>{status ? 'close' : 'open'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderGroupListItem({item, groupId, rowId})
    {
        return (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
            </View>
        );
    }


    renderPlaneList()
    {
        //http://a.tripg.com/QunarAir/GetFlightList?arr=CGQ&date=2018-01-09&companyCode=919&dpt=PEK
        //http://a.tripg.com/QunarAir/GetFlightInfo?arr=CGQ&date=2018-01-09&flightNum=CA1609&dpt=PEK&TimeStamp=1515401989&Sign=600DCA44-D71A-41F1-9B73-EB3A560B3429&companyCode=919&NewKey=3a34fd02225ec9813e30489f0af71048
        StorageUtil.getJsonObject('userInfo').then(userInfo =>
        {

            let tempUrl = `${HMUrlUtils.GetFlightList}?arr=CGQ&date=2018-01-09&companyCode=919&dpt=PEK`;

            NetUitl.get(tempUrl, function (response)
            {
                alert(JSON.stringify(response));
            }, function (error)
            {

            })

        })


    }

    componentDidMount()
    {
        this.renderPlaneList();
    }

    render()
    {

        const {data = []} = this.props;
        let Data = [
            {
                groupHeaderData: {title: 'Dashboard'},
                // groupListData: ['Calls', 'Chart', 'Map']
            },
            {
                groupHeaderData: {title: 'Profile'},
                //groupListData: ['User', 'Add contact', 'Calendar']
            },
            {
                groupHeaderData: {title: 'Messages'},
                //groupListData: ['Inbox', 'Sent', 'Deleted']
            },
            {
                groupHeaderData: {title: 'Settings'},
                // groupListData: ['Fill Beer', 'Adjust', 'Alarm']
            }
        ];

        return (
            <View style={styles.container}>
                {/*<ExpandableList*/}
                    {/*data={Data}*/}
                    {/*groupStyle={styles.groupItem}*/}
                    {/*initialOpenGroups={[1]}*/}
                    {/*renderGroupHeader={this._renderGroupHeader}*/}
                    {/*renderGroupListItem={this._renderGroupListItem}*/}
                {/*/>*/}

                <HMPlaneHeaderCell />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        borderTopColor: '#DDD',
        borderTopWidth: 1
    },
    groupItem: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,

    },
    headContainer: {
        paddingHorizontal: 15,
        height: 55,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headChosenContainer: {
        backgroundColor: '#CF5942'
    },
    headTitleText: {
        flex: 1,
        color: '#333',
        fontWeight: 'bold'
    },
    headChosenTitleText: {
        color: '#FFF'
    },
    touchArea: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemContainer: {
        height: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#D76852'
    },
    listItemText: {
        color: '#FFF'
    }
});

