/**
 * Created by mac on 2017/10/25.
 */
let common_url = 'http://192.168.1.1:8080/';  //服务器地址
let token = '';
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
function fetchRequest(url, method, params = '')
{
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        // "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    console.log('request url:', url, params);  //打印请求参数
    if (params == '')
    {   //如果网络请求中带有参数
        return new Promise(function (resolve, reject)
        {
            fetch(common_url + url, {
                method: method,
                headers: header
            }).then((response) => response.json())
                .then((responseData) =>
                {
                    console.log('res:', url, responseData);  //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) =>
                {
                    console.log('err:', url, err);     //网络请求失败返回的数据
                    reject(err);
                });
        });
    } else
    {   //如果网络请求中没有参数
        return new Promise(function (resolve, reject)
        {
            fetch(common_url + url, {
                method: method,
                headers: header,
                body: JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then((responseData) =>
                {
                    console.log('res:', url, responseData);   //网络请求成功返回的数据
                    resolve(responseData);
                })
                .catch((err) =>
                {
                    console.log('err:', url, err);   //网络请求失败返回的数据
                    reject(err);
                });
        });
    }


    /**
     * 计算NewKey
     * @use var rstText = tgGetNewKeyStr(strMsg);
     * @param {string} urlStr - 服务器时间戳地址
     * @param {string} modelKey - 模块Key
     * @return {string} NewKey串 - '&NewKey=21324165465465234234'
     */
    function tgGetNewKeyStr(urlStr, modelKey)
    {
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
    }


}
