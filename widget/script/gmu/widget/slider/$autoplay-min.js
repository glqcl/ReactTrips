/*
 * Compressed by JSA(www.xidea.org)
 */
(function($,_){_.extend(true,$.Slider,{options:{autoPlay:true,interval:4000}});$.Slider.register("autoplay",{_init:function(){var $=this;$.on("slideend ready",$.resume).on("destory",$.stop);$.getEl().on("touchstart"+$.eventNs,_.proxy($.stop,$)).on("touchend"+$.eventNs,_.proxy($.resume,$))},resume:function(){var _=this,$=_._options;if($.autoPlay&&!_._timer)_._timer=setTimeout(function(){_.slideTo(_.index+1);_._timer=null},$.interval);return _},stop:function(){var $=this;if($._timer){clearTimeout($._timer);$._timer=null}return $}})})(gmu,gmu.$)