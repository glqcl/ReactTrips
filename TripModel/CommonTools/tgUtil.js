import CryptoJS from 'crypto-js'

export default {

    /**
     * DES 加密
     * @use var rstText = encryptByDES(strMsg);
     * @param {string} message - 待加密字符串
     * @return {string} - 加密后字符串
     */
    tgDES(message) {
        var keyHex = CryptoJS.enc.Utf8.parse(nicaineStr);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var rst = encrypted.toString();
        return rst;
    },

    /**
     * 计算NewKey
     * @use var rstText = tgGetNewKeyStr(strMsg);
     * @param {string} urlStr - 服务器时间戳地址
     * @param {string} modelKey - 模块Key
     * @return {string} NewKey串 - '&NewKey=21324165465465234234'
     */
    tgGetNewKeyStr(urlStr, modelKey) {
        var lastTime = (new Date()).getTime();
        if (this.trim(urlStr) == '') return;
        var parmsStr = '';
        var parmsTempStr = '';
        var parmsArry = [];
        //escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z
        //encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z
        //encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z

        //urlStr = decodeURI(urlStr);
        if (urlStr.indexOf('?') != -1)
        {
            parmsStr = urlStr.substr(urlStr.indexOf('?') + 1);
        } else
        {
            parmsStr = urlStr;
        }
        parmsTempStr = decodeURIComponent(parmsStr);
        if (parmsTempStr != '')
        {
            parmsStr = decodeURIComponent(parmsTempStr);
        }
        //console.log('原始串:\r\n' + parmsStr);
        if (parmsStr.indexOf('&') != -1)
        {
            var tempArry = parmsStr.split('&');
            for (var i in tempArry)
            {
                if (tempArry[i].split('=')[1])
                {
                    parmsArry.push(tempArry[i]);
                }
            }
            parmsArry.push(modelKey);
        } else
        {
            parmsArry.push(parmsStr);
            parmsArry.push(modelKey);
        }

        var tempArry = parmsArry.sort();
        var tempStr = '';
        var parmI = 1;
        for (var i in tempArry)
        {
            tempStr += (parmI++) + ' ' + tempArry[i] + '\r\n';
        }

        var parmsArrySortedStr = tempArry.join('');

        parmsArrySortedStr = CryptoJS.enc.Utf8.parse(parmsArrySortedStr);


        var newKeyStr = '&NewKey=' + CryptoJS.MD5(parmsArrySortedStr).toString().replace(/-/g, '').toLowerCase();
        var curTime = (new Date()).getTime();
        return newKeyStr;
    },

    /**
     * JSON对象转换成URL
     * @use var rstText = tgParmsFun(strMsg);
     * @param {string} JsonData - json格式参数
     * @return {string} - 'a=1&b=2&c=3'
     */
    tgParmsToUrl(JsonData) {
        var s = [];

        function add(key, value)
        {
            value = (value == null ? '' : value);
            if (value.length > 0)
                value = (value == undefined ? '' : value);
            if (value != '')
            {
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            }
        }

        for (var prefix in JsonData)
        {
            if (JsonData[prefix])
            {
                add(prefix, JsonData[prefix]);
            }
        }
        return s.join("&");
    },

    /**
     * 去前后空格
     * @use var rstText = trim(strMsg);
     * @param {string} str - 需要去空格的字符串
     * @return {string} - 无前后空格的字符串
     */
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     *获取服务器时间戳
     * @use var rstText = tgGetTimeStampByServer(url, modelSign);
     * @param {string} serverUrl - 服务器时间戳地址
     * @param {string} modelSign - 模块Sign
     * @return {number} - 时间戳 无毫秒
     */
    tgGetTimeStampByServer(serverUrl, modelSign) {
        return new Date().getTime() / 1000;
    },

    /**
     * 获取当前时间
     * @use var rstText = tgNowTime(strMsg);
     * @param {string}  -
     * @return {string} - 如 2017-01-01 00:00:00
     */
    tgNowTime() {
        return this.tgDatePattern(new Date(), 'yyyy-MM-dd HH:mm:ss');
    },

    /**
     * 时间字符串转时间对象
     * @use var rstText = tgToDate(strMsg);
     * @param {string} dateStr -
     * @return {string} - Date Object
     */
    tgToDate(dateStr) {
        if (dateStr)
        {
            if (dateStr.length == 0)
                return '';
            return new Date(Date.parse(dateStr.replace(/-/g, "/")));
        } else
        {
            return '';
        }
    },

    /**
     * 格式话时间对象
     * @use var rstText = tgDatePattern(strMsg);
     * @param {string} dateObj -
     * @param {string} fmt - 'yyyy-MM-dd HH:mm:ss'
     * @return {string} -
     */
    tgDatePattern(dateObj, fmt) {
        var thatDate = dateObj;
        if (thatDate)
        {
            var o = {
                "M+": thatDate.getMonth() + 1, //月份
                "d+": thatDate.getDate(), //日
                "h+": thatDate.getHours() % 12 == 0 ? 12 : thatDate.getHours() % 12, //小时
                "H+": thatDate.getHours(), //小时
                "m+": thatDate.getMinutes(), //分
                "s+": thatDate.getSeconds(), //秒
                "q+": Math.floor((thatDate.getMonth() + 3) / 3), //季度
                "S": thatDate.getMilliseconds() //毫秒
            };
            var week = {
                "0": "日",
                "1": "一",
                "2": "二",
                "3": "三",
                "4": "四",
                "5": "五",
                "6": "六"
            };
            if (/(y+)/.test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, (thatDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[thatDate.getDay() + ""]);
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(fmt))
                {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        } else
        {
            return '';
        }
    },

    /**
     * 日期 加上(+-)值
     * @use var rstText = tgDateAdd(strMsg);
     * @param {interval} interval - 日期要操作的部分
     * @param {number} number- (+-)值
     * @return {date} - Date Object
     */
    tgDateAdd(interval, number, date) {
        switch (interval.toLowerCase())
        {
            case "y":
                return new Date(date.setFullYear(date.getFullYear() + number));
            case "m":
                return new Date(date.setMonth(date.getMonth() + number));
            case "d":
                return new Date(date.setDate(date.getDate() + number));
            case "w":
                return new Date(date.setDate(date.getDate() + 7 * number));
            case "h":
                return new Date(date.setHours(date.getHours() + number));
            case "n":
                return new Date(date.setMinutes(date.getMinutes() + number));
            case "s":
                return new Date(date.setSeconds(date.getSeconds() + number));
            case "l":
                return new Date(date.setMilliseconds(date.getMilliseconds() + number));
        }
    },

    /**
     * 计算2个日期间隔的天数
     * @use var rstText = abc(strMsg);
     * @param {string} startDateStr - 第一个日期
     * @param {string} endDateStr - 第二个日期
     * @return {number} - days 间隔天数
     */
    tgDateDiffDays(startDateStr, endDateStr) {
        var startTime = new Date(Date.parse(startDateStr.replace(/-/g, "/"))).getTime();
        var endTime = new Date(Date.parse(endDateStr.replace(/-/g, "/"))).getTime();
        var days = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
        return days;
    },

    /**
     * JSON 返回key数组
     * @use var rstText = tgJsonKeys(strMsg);
     * @param {JSON} jsonObj - Json Data Object
     * @return {string} - Key Array()
     */
    tgJsonKeys(jsonObj) {
        var jsonkeyArry = new Array();
        for (var jsonKey in jsonObj)
        {
            jsonkeyArry.push(jsonKey);
        }
        return jsonkeyArry;
    },

    /**
     * JSON 返回val数组
     * @use var rstText = tgJsonVals(strMsg);
     * @param {JSON} jsonObj - Json Data Object
     * @return {Array} -  value Array()
     */
    tgJsonVals(jsonObj) {
        var jsonvalArry = new Array();
        for (var jsonKey in jsonObj)
        {
            jsonvalArry.push(jsonObj[jsonKey]);
        }
        return jsonvalArry;
    },

    /**
     * JSON 对象 返回key对应的val值
     * @use var rstText = tgJsonKeyForVal(strMsg);
     * @param {JSON} jsonObj - Json Data Object
     * @param {string} jsonKey - Json string key
     * @return {Object} - Json string value
     */
    tgJsonKeyForVal(jsonObj, jsonKey) {
        if (jsonObj[jsonKey] != undefined && jsonObj[jsonKey] != null)
        {
            return jsonObj[jsonKey];
        } else
        {
            for (var itemkey in jsonObj)
            {
                if (jsonKey == itemkey)
                {
                    return jsonObj[itemkey];
                }
            }
            return "";
        }
    },

    /**
     * JSON 数据 值为null时 显示为 '' 空字符串
     * @use var rstText = tgJsonTrimNull(strMsg);
     * @param {string} val - val
     * @return {string} - undefined or null to ''
     */
    tgJsonTrimNull(val) {
        var rst = '';
        if (val !== undefined)
        {
            rst = (val == null ? '' : val);
        }
        return rst;
    }
}
