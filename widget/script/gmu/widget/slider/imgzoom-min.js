/*
 * Compressed by JSA(www.xidea.org)
 */
(function($){$.Slider.options.imgZoom=true;$.Slider.option("imgZoom",function(){return!!this._options.imgZoom},function(){var B=this,$=B._options.imgZoom,C;$=typeof $==="string"?$:"img";function D(){C&&C.off("load"+B.eventNs,_)}function A(){D();C=B._container.find($).on("load"+B.eventNs,_)}function _(_){var A=_.target||this,$=Math.min(1,B.width/A.naturalWidth,B.height/A.naturalHeight);A.style.width=$*A.naturalWidth+"px"}B.on("ready dom.change",A);B.on("width.change",function(){C&&C.each(_)});B.on("destroy",D)})})(gmu)