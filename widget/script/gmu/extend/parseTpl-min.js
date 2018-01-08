/*
 * Compressed by JSA(www.xidea.org)
 */
(function(_,$){_.parseTpl=function($,A){var _="var __p=[];"+"with(obj||{}){__p.push('"+$.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(_,$){return"',"+$.replace(/\\'/,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(_,$){return"');"+$.replace(/\\'/,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join(\"\");",B=new Function("obj",_);return A?B(A):B}})(Zepto)