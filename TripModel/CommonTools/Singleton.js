/**
 * Created by mac on 2017/11/25.
 */
let instance = null;

import {Loading, EasyLoading} from 'react-native-easy-loading';

export default class Singleton {

    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    showProgress(){
        EasyLoading.show();
    }

    hideProgress(){
        EasyLoading.dismis();
    }

    getLoadingView()
    {
        // return (<Loading />)
    }
}