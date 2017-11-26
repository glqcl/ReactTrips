/**
 * Created by mac on 2017/11/25.
 */
let instance = null;
var name = '';

export default class Singleton {

    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }


    setProgressLoading(name){
        this.name=name;
    }

    getProgressLoading(){
        return this.name;
    }


}