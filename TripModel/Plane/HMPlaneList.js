import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {ExpandableList} from "../CommonTools/ExpandableList";
var {width, height} = Dimensions.get('window')

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
                        <Text style={{color: status ? '#FFF' : '#333',width:width}}>{status ? 'close' : 'open'}</Text>
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

    componentDidMount()
    {

    }
    render()
    {

        const {data = []} = this.props;


        let Data = [
            {
                groupHeaderData: {title: 'Dashboard'},
                groupListData: ['Calls', 'Chart', 'Map']
            },
            {
                groupHeaderData: {title: 'Profile'},
                groupListData: ['User', 'Add contact', 'Calendar']
            },
            {
                groupHeaderData: {title: 'Messages'},
                groupListData: ['Inbox', 'Sent', 'Deleted']
            },
            {
                groupHeaderData: {title: 'Settings'},
                groupListData: ['Fill Beer', 'Adjust', 'Alarm']
            }
        ];

        return (
            <View style={styles.container}>
                <ExpandableList
                    data={Data}
                    groupStyle={styles.groupItem}
                    initialOpenGroups={[1]}
                    renderGroupHeader={this._renderGroupHeader}
                    renderGroupListItem={this._renderGroupListItem}
                />
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

