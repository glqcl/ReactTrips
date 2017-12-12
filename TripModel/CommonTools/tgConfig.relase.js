let tgConfig = {
    Title: '差旅天下微站',
    Name: 'web_min',
    Platform: '差旅天下Vue版微站',
    Version: '2.0.0',
    Build: '2.0.0',
    Description: '差旅天下、机票、酒店、用车、会员、 查询、 预订、订单查询',
    TestModel: false,//是否是测试模式  false
    LoadPageAnimate: 'none',// none //invoke
    AjaxTimeOut: 2 * 60 * 1000,//60s
    ClearCacheDataFlag: 20160516 * 10000,
    SubmitLimitCount: 5,
    Author: [{
        Name: 'MXQ(291)',
        TrueName: '孟祥全',
        Email: '137586129@qq.com'
    }],
    Signs: {
        tgSign: 'FE29D133-468D-403B-8428-0168C968CAC1',
        tgPaySign: '5BA6D27F-11A4-4110-8504-A7747D711827'

    },
    ModelKeys: {
        tgBaseKey: 'Key=9A605F6A-1E90-4305-A9B4-AFE498504D62',
        tgUserKey: 'Key=1FFD4573-4C05-4C17-9ECE-13A711A10AEB',
        tgPlaneKey: 'Key=A640D68F-5CBF-4450-BA65-62C8DFA6DE4F',
        tgHotelKey: 'Key=3BD8A90F-4AB8-420C-8261-E5393D62F5E0',
        tgCarKey: 'Key=50E2F65C-5B20-42E7-BC1B-17AF254115D7',
        tgPayKey: 'Key=0561C5E5E1DD4C028260C732F52609A6',
        tgBaiDuAKKey: 'KsjOhHzsO5gXOS5sIcUKrRdh'
    },
    Urls: {
        tgBaseUrl: 'http://baseinfo.tripglobal.cn/BaseInfo.aspx',
        tgHomePicUrl: 'http://www.tripg.cn/phone_api/index_img_carousel.php?project_id=15',
        tgHomeWeatherUrl: 'http://www.tripg.cn/phone_api/get_weather.php?city=%E9%95%BF%E6%98%A5',
        tgHomeSpecialPriceUrl: 'http://www.tripg.cn/phone_api/get_index_recommend_v1.0.0.php',
        tgUserUrl: 'http://crm.tripglobal.cn/Base/Get_CusomterAndMemberInterface.aspx',
        tgPublicUrl: 'http://p.tripg.com/PublicApi.aspx',
        tgUserPointUrl: 'http://www.tripg.cn/phone_api/shop_integral.php',
        tgPlaneUrl: 'http://p.tripg.com/AirTicket/Air.aspx',
        tgPlaneLowerPriceUrl: 'http://flights.ctrip.com/domestic/ajax/Get90DaysLowestPrice',
        tgHotelUrl: 'http://api.tripglobal.cn/Hotel/HotelApitest.aspx',
        tgCarUrl: 'http://f.tripg.com/Car/RentCarInfoApi.aspx',
        tgPayUrl: 'http://payment.tripg.com/PayInterface/PayDefault.aspx',
        tgFeedBackUrl: 'http://www.tripg.cn/phone_api/customer_opinion.php',
        tgPlaneOrderUrl: 'http://p.tripg.com/AirTicket/Air.aspx',
        tgHoteOrderlUrl: 'http://p.tripg.com//OrderQuery.aspx',
        tgCarOrderlUrl: 'http://api.tripglobal.cn/OrderQuery.aspx',
        tgExUrl: 'http://www.tripg.cn/phone_api/mobile_exception_v1.0.0.php',
        tgExBSUrl: 'http://www.tripg.cn/phone_api/mobile_exception_v1.0.0.php',
        tgBaiDuMapUrl: 'http://api.map.baidu.com/geocoder/v2/',
        tgFuzzyHotelListUrl: 'http://a.tripg.com/HotelQunar/GetFuzzyHotelList'
    },
    Times: {
        tgBaseTimersUrl: 'http://baseinfo.tripglobal.cn/BaseInfo.aspx?cmd=GetTimeStamp',
        tgPublicTimersUrl: 'http://api.tripglobal.cn/OrderQuery.aspx?cmd=GetTimeStamp',
        tgUserTimersUrl: 'http://crm.tripglobal.cn/Base/Get_CusomterAndMemberInterface.aspx?cmd=GetTimeStamp',
        tgPlaneTimersUrl: 'http://p.tripg.com/OrderQuery.aspx?cmd=GetTimeStamp',
        tgHotelTimersUrl: 'http://api.tripglobal.cn/OrderQuery.aspx?cmd=GetTimeStamp',
        tgCarTimersUrl: 'http://api.tripglobal.cn/OrderQuery.aspx?cmd=GetTimeStamp',
        tgPayTimersUrl: 'http://payment.tripg.com/PayInterface/PayDefault.aspx?cmd=GetTimeStamp'
    },
    ProductIds: {
        tgPlaneProductId: 0,
        tgHotelProductId: 12,
        tgCarProductId: 13
    },
    PlatformIds: {
        tgPlanePlatformId: 0,
        tgHotelPlatformId: 14,
        tgCarPlatformId: 12
    },
    ImgPathUrl: {
        tgHomeHotelImgPathUrl: 'http://www.tripg.cn/uploads/',
        tgCarImgPathUrl: 'http://mapi.tripglobal.cn/'
    }
}

export default tgConfig
