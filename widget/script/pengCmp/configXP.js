configXP  = {};
//tmcdomain = 'http://test.api.tripg.com/';      
//configXP.tmcJieKouPlatform   = 'http://test.api.tripg.com';
//configXP.tmcJieKouPlatform = 'http://192.168.105.31:22421';

configXP.developmentVersion = true;             //true 是3.0      false 2.0
configXP.tmcJieKouPlatform  = 'http://tmcapi.tripglobal.cn';   //http://a.tripg.com/ http://tmcapi.tripglobal.cn
configXP.phpJieKouPlatform  = 'http://template.tripg.com';
configXP.tripgPlatform      = 'http://tmcapi.tripg.com';
configXP.PropagatePlatform  = 'http://propagate.tripg.com';

if(configXP.developmentVersion){
	configXP.tmcJieKouPlatform  = 'http://a.tripg.com';            //http://a.tripg.com/ http://tmcapi.tripglobal.cn
	configXP.phpJieKouPlatform  = 'http://test.template.tripg.com';
	configXP.tripgPlatform      = 'http://test.tmcapi.tripg.com';
	configXP.PropagatePlatform  = 'http://test.propagate.tripg.com';
	//configXP.PropagatePlatform  = 'http://propagate.tripg.com';
}

configXP.urls = {  
	writeRow              :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/writeRow',
	createNote            :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/createNote',
	uploadFileWrite       :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/uploadFileWrite',
	getProductType        :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getProductType',
	AddMarkPoint          :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getTravelTransit',
    personList            :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getTransitList',
    personDetail          :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getTravelOrder',
    userInfobusinessOrder :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getAirTicketAll',
    getMyTravelList       :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getMyTravelList',
    writeList             :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/writeList',
    getTravelWrite        :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/getTravelWrite',
    writeNote             :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/writeNote',
    writeNoteUpdate       :  configXP.tripgPlatform + "/index.php/commonApi/mobileApi/writeNoteUpdate",
    writeNotedel          :  configXP.tripgPlatform + '/index.php/commonApi/mobileApi/writeNotedel'
}

configXP.waijieUrl = {
	kefuUrl               : 'http://www.aikf.com/ask/h5/tripg.cn.htm',
	ruzhuzhinanUrl        : 'http://show.tripg.com/v-U710H34ETE',
	jiaxincloud           : 'http://web.jiaxincloud.com/gray/mobile.html?&thirdJson=%257B%257D&bg=007AFF&dialogLogo=0&dialogType=1&lang=cn&orgName=ntdsmha2b3g5aq&appName=w757&appChannel=20001&jump='
}


configXP.tmcUrls = {
	GetComHotelList       : configXP.tmcJieKouPlatform + '/HotelQunar/GetComHotelList',    //获取酒店列表（新）
	GetFuzzyHotelList     : configXP.tmcJieKouPlatform + '/HotelQunar/GetFuzzyHotelList'
}

configXP.phpUrls = {
	GetStandardTravel     : configXP.phpJieKouPlatform + '/Public/Travel/',
	GetCityList           : configXP.phpJieKouPlatform + '/Public/Air/'
}

configXP.phpSign = {
	Sign : 'FE29D133-468D-403B-8428-0168C968CAC1',
	Key  : 'Key=A640D68F-5CBF-4450-BA65-62C8DFA6DE4F'
}

configXP.tmcSign = {
	Sign : 'FE29D133-468D-403B-8428-0168C968CAC1',
	Key  : 'Key=3BD8A90F-4AB8-420C-8261-E5393D62F5E0',
	hotelSign :'FE29D133-468D-403B-8428-0168C968CAC1',
	hotelKey  :'Key=3BD8A90F-4AB8-420C-8261-E5393D62F5E0'
}

configXP.tmcKey = {
	tgHotelKey : 'Key=3BD8A90F-4AB8-420C-8261-E5393D62F5E0'
}



configXP.localKey = {
	UrlPathRemote               : 'trigp_urlPathRemote',                //请求路径
    historySelectCityAddress    : 'trigp_hisSelCityAddr',               //历史缓存到达城市信息
    historyAirportCitySel       : 'trigp_hisAirportCitySel',            //历史缓存机场信息
    historyStationCitySel       : 'trigp_historyStationCitySel',        //历史缓存当前车站
    historyInfoCitySel          : 'trigp_historyInfo',                  //历史缓存当前城市
    historyInfoAirPortCitySel   : 'trign_historyInfoAirPortCitySel',    //历史缓存机场城市
    historyInfoHotelCitySel     : 'trign_historyInfoHotelCitySel',      //历史缓存酒店城市
    historyInfoHotelCityTmc3Sel : 'trign_historyInfoHotelCityTmc3Sel',  //历史缓存酒店tmc3城市
    historyInfoStationCitySel   : 'trign_historyInfoStationCitySel',    //历史缓存火车站城市
    historyDomesticSel          : 'trigp_historyDomestic',              //历史缓存当前国内机票
    historyDomesticTmc3Sel      : 'trigp_historyTmc3Domestic',          //历史缓存当前国内机票tmc3城市
    historyShenpiSel            : 'trigp_historyShenpi',                //历史缓存审批当前城市
    historyInternationalSel     : 'trigp_historyInternational',         //历史缓存当前国际机票
    historyStationCity2Sel      : 'trigp_historyStationCity2Sel',       //历史缓存火车站2的信息
    historyStationCityTmc3Sel   : 'trigp_historyStationCityTmc3Sel',    //历史缓存火车站tmc3的信息
    historyNationality          : 'trigp_historyNationality',           //历史缓存国籍城市信息
    cityListArr                 : 'trigp_cityListArr',                  //缓存城市信息
    get_station_city            : 'trigp_GetStation_city',              //缓存火车站城市
    historyKeyWordStationSel    : 'trigp_GetKeyWordStation',            //缓存关键字商圈搜索
    historyKeyWordListSel       : 'trigp_GetKeyWordListSel',            //缓存关键字各项商圈信息
    historyShenpiDomesticSel    : 'trigp_historyShenpiDomesticSel',     //缓存审批的国内城市信息
    historyShenpiInternationSel : 'trigp_historyShenpiInternationSel',  //缓存审批的国际城市信息
    historyHangbandongtaiSel    : 'trigp_historyHangbandongtaiSel'      //缓存航班动态城市信息
    
}

configXP.productionEnvir     = true;      //true代表生产环境    false代表测试环境

configXP.historySel = {
	hisSelectCitySelIndex         :  20,     //控制送达城市缓存        n 条数据历史记录
	hisAirportCitySelIndex        :  6,     //控制机场信息缓存        n 条数据历史记录
	hisStationCityIndex           :  6,     //控制当前车站信息缓存    n 条数据历史记录
	hisInfoCityIndex              :  6,     //控制当前城市信息缓存    n 条数据历史记录 
	historyInfoAirPortCityIndex   :  6,     //历史缓存机场城市        n 条数据历史记录
    historyInfoHotelCityIndex     :  6,     //历史缓存酒店城市        n 条数据历史记录
    historyInfoStationCityIndex   :  6,     //历史缓存火车站城市      n 条数据历史记录
	historyDomesticIndex          :  6,     //控制当前国际信息缓存    n 条数据历史记录
	historyShenpiIndex            :  6,     //控制当前审批的缓存      n 条数据历史记录
	historyInternationalIndex     :  6,     //控制当前国内信息缓存    n 条数据历史记录
	historyStationCity2Index      :  6,     //控制当前火车站2信息缓存 n 条数据历史记录
	historyNationalityIndex       :  6,     //控制缓存当前城市        n 条数据历史记录 
	historyKeyWordStationIndex    :  6,     //控制关键字商圈搜索      n 条数据历史记录
	historyShenpiDomesticIndex    :  6,     //控制审批的国内缓冲数据  n 条数据历史记录
	historyShenpiInternationIndex :  6,     //控制审批的国际缓冲数据  n 条数据历史记录
	historyHangbandongtaiIndex    :  6      //控制航班动态的缓存数据  n 条数据历史记录
}

configXP.localDataKey = {
	CityShenpiInfo               : "trigp_CityShenpiInfo",               //审批的城市缓存
	CityDomesticInfo             : "trigp_CityDomesticInfo",             //国内机票城市缓存
	CityInternationalInfo        : "trigp_InternationalInfo",            //国际机票城市缓存
    CityStationInfo              : "trigp_CityStationInfo",              //火车站城市缓存
    CityHotelInfo                : "trigp_CityHotelInfo",                //酒店城市缓存
    CityShenpiDomesticInfo       : "trigp_CityShenpiDomesticInfo",       //审批的国内城市
    CityShenpiInternaltionInfo   : "trigp_CityShenpiInternaltionInfo",   //审批的国际城市
    CityShenpiHangbandongtaiInfo : "trigp_CityShenpiHangbandongtaiInfo", //审批的航班动态城市
    Shaixuan1Info                : "trigp_Shaixuan1Info",                //换成Shaixuan1Info
    CityCarAirportInfo           : "trigp_cityCarAirportsInfo",       //用车的机场
    CityCarStationInfo           : "trigp_cityCarStationsInfo",       //用车的火车站
    CityCarAirportCityInfo       : "trigp_cityCarAirportsCityInfo",       //用车的机场城市
    CityCarStationCityInfo       : "trigp_cityCarStationsCityInfo"        //用车的火车站城市

}

if(window.localStorage){
	  	 var storage = window.localStorage;
	  	 var resultArr    = storage.getItem(configXP.localKey.UrlPathRemote);

	  	 if(resultArr != null){
	             resultArr = JSON.parse(resultArr);
	  	 	 	 for(var i=0 ; i<resultArr.length ; i++){
				  	  var data   = resultArr[i];
				  	  var module = data.module;
				  	 
				  	  if(module == "GetComHotelList"){
				  	  	  configXP.tmcUrls[module] = data.official;
				  	  }else if(module == "GetStandardTravel" || module == "GetCityList"){
				  	  	  configXP.phpUrls[module] = data.official;
				  	  }else{
				  	  	  configXP.urls[module]    = data.official;
				  	  }
				  	  
				  }
	  	 	 
	  	 }
	  	 
}

function showAnimate(x){
            if(x > 0){
                if($("#loadingImg").size() < 1){
                    $("body").append('<div id="loadingImg"><img src="http://mapi.tripg.com/source/images/a1.svg" ><img src="http://mapi.tripg.com/source/images/a2.svg" ></div>'); 
                }
            }else{
                $("#loadingImg").remove();
            }
} 


function showPublicAnimate(x){
            if(x > 0){
                if($("#loadingImg").size() < 1){
                    $("body").append('<div id="loadingImg"><img src="http://mapi.tripg.com/source/images/a1.svg" ><img src="http://mapi.tripg.com/source/images/a2.svg" ></div>'); 
                }
            }else{
                $("#loadingImg").remove();
            }
} 



//计算NewKey
function tgGetNewKeyStr(urlStr, modelKey) {
	var lastTime = (new Date()).getTime();
	if ($.trim(urlStr) == '') return;
	var parmsStr = '';
	var parmsTempStr = '';
	var parmsArry = [];


	//escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z
	//encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z
	//encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z

	//urlStr = decodeURI(urlStr);
	if (urlStr.indexOf('?') != -1) {
		parmsStr = urlStr.substr(urlStr.indexOf('?') + 1);
	} else {
		parmsStr = urlStr;
	}
	parmsTempStr = decodeURIComponent(parmsStr);
	if (parmsTempStr != '') {
		parmsStr = decodeURIComponent(parmsTempStr);
	}

	if (parmsStr.indexOf('&') != -1) {
		var tempArry = parmsStr.split('&');
		for (var i in tempArry) {
			if (tempArry[i].split('=')[1]) {
				parmsArry.push(tempArry[i]);
			}
		}
		parmsArry.push(modelKey);
	} else {
		parmsArry.push(parmsStr);
		parmsArry.push(modelKey);
	}

	var tempArry = parmsArry.sort();
	var tempStr = '';

	var parmI = 1;
	for (var i in tempArry) {
		tempStr += (parmI++) + ' ' + tempArry[i] + '\r\n';
	}

	var parmsArrySortedStr = tempArry.join('');
	parmsArrySortedStr = parmsArrySortedStr.toString(CryptoJS.enc.Utf8);
	var newKeyStr = '&NewKey=' + CryptoJS.MD5(parmsArrySortedStr).toString().replace(/-/g, '').toLowerCase();
	var curTime = (new Date()).getTime();
	return newKeyStr;
}

//JSON对象转换成URL
function tgParmsFun(parmData) {
	var s = [];

	function add(key, value) {
		value = (value == null ? '' : value);
		if (value.length > 0)
			value = (value == undefined ? '' : value);
		if (value != '') {
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		}
		if(value == 0){
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		}
	};

	for (prefix in parmData) {
			add(prefix, parmData[prefix]);
	}
	return s.join("&");
}

configXP.Encrypt = function(word , key){
	 var key = CryptoJS.enc.Utf8.parse(key);   
     var srcs = CryptoJS.enc.Utf8.parse(word);  
     var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});  
     return encrypted.toString();  
}



$.ajax({
		url: "http://open.tripg.com/s/1495695209490?project=h5",
		type: "get",
		dataType: "json",
		success: function(data) {
			  if(window.localStorage){
			  	 var storage = window.localStorage;
			  	 var Code      = data.Code;
			  	 if(Code == "200"){
			  	 	var resultArr = data.Result;
			  	 	if(resultArr != null){
			  	 		if(resultArr.length > 0){
			  	 			storage.setItem(configXP.localKey.UrlPathRemote,JSON.stringify(resultArr));
			  	 		}
			  	 	}
			  	 }
			  	 
			  }
			  
		}
});
