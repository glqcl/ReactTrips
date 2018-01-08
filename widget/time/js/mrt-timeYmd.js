

$(function() { 
	function weekday(x) {
		switch(x) {
			case 0:
				return "周日";
				break;
			case 1:
				return "周一";
				break;
			case 2:
				return "周二";
				break;
			case 3:
				return "周三";
				break;
			case 4:
				return "周四";
				break;
			case 5:
				return "周五";
				break;
			case 6:
				return "周六";
				break;
		}
	}
	var special = jQuery.event.special,
		uid1 = 'D' + (+new Date()),
		uid2 = 'D' + (+new Date() + 1);
	special.scrollstart = {
		setup: function() {
			var timer,
				handler = function(evt) {
					var _self = this,
						_args = arguments;
					if(timer) {
						clearTimeout(timer);
					} else {
						evt.type = 'scrollstart';
						jQuery.event.dispatch.apply(_self, _args);
					}

					timer = setTimeout(function() {
						timer = null;
					}, special.scrollstop.latency);
				};
			jQuery(this).bind('scroll', handler).data(uid1, handler);
		},
		teardown: function() {
			jQuery(this).unbind('scroll', jQuery(this).data(uid1));
		}
	};
	special.scrollstop = {
		latency: 20,
		setup: function() {
			var timer,
				handler = function(evt) {
					var _self = this,
						_args = arguments;
					if(timer) {
						clearTimeout(timer);
					}
					timer = setTimeout(function() {
						timer = null;
						evt.type = 'scrollstop';
						jQuery.event.dispatch.apply(_self, _args);
					}, special.scrollstop.latency);
				};
			jQuery(this).bind('scroll', handler).data(uid2, handler);
			
		},
		teardown: function() {
			jQuery(this).unbind('scroll', jQuery(this).data(uid2));
		}
	};
	

	
	
    
	
	$("div.time-mrt ul").on("scrollstop", function(e) {
		/*var nowYear  =  $('.mrt-date').children('li[class="selected"]').children("span").text();
	    var nowMonth =  $('.mrt-hour').children('li[class="selected"]').children("span").text();
	    var nowDay   =  $('.mrt-minite').children('li[class="selected"]').children("span").text();
	    var nowDate  =  nowYear +"-"+ nowMonth +"-"+ nowDay;*/
	
		offsetLeft = $(this).width() / 2 + $(this).offset().left;
		offsetTop = $(this).offset().top + $(this).height() / 2;
		var ele = document.elementFromPoint(offsetLeft, offsetTop);
		$(ele).parent().addClass("selected").siblings().removeClass("selected");
	
		var scrollTop = "";
		scrollTop = $(this).scrollTop();
		if(scrollTop % 50 != 0) {
			topH = Math.round(scrollTop / 50) * 50;
			$(this).animate({
				"scrollTop": topH
			}, 200);
		}
		if($(this).hasClass("mrt-date")) {
			changeTime($(this));
		}
		if($(this).hasClass("mrt-hour")) {
			changeTime2($(this));
		}
	});
	var ookk = 0;
	var changeTime = function(ele) {
		if(!ookk) {
			ookk = 1;
			returnTime();
			if(ele.find("li.selected").attr("nowattr") != "1") {
				resetTime();
			} else { 
				$("ul.mrt-hour").scrollTop(0);
				$("ul.mrt-minite").scrollTop(0);
				$("ul.mrt-hour").html(html2);
				$("ul.mrt-minite").html(html3);
			}
		}

	}
	var changeTime2 = function(ele) {
		if(!ookk) { 
			ookk = 1;
			returnTime();  
			if(ele.find("li.selected").attr("nowattr") != "1") {
				$("ul.mrt-minite").scrollTop(0); 
				$("ul.mrt-minite").html(html5);
			} else {  
				$("ul.mrt-minite").scrollTop(0); 
				$("ul.mrt-minite").html(html3);
			} 
		} 
	}
	var returnTime = function() {
		setTimeout(function() {
			ookk = 0
		}, 300)
	}

	$("div.time-mrt ul").on("scroll", function() {
		//		$(this).find("li").removeClass();
//		offsetLeft = $(this).width() / 2 + $(this).offset().left;
//		offsetTop = $(this).offset().top + $(this).height() / 2;
//		var ele = document.elementFromPoint(offsetLeft, offsetTop);
//		$(ele).parent().addClass("selected").siblings().removeClass("selected");
		//		$(ele).next().addClass("second-bottom");
		//		$(ele).next().next().addClass("first-bottom");
		//		$(ele).prev().addClass("second-top");
		//		$(ele).prev().prev().addClass("first-bottom");

	})
});

var resetTime = function() {
	return;
	$("ul.mrt-hour").scrollTop(0);
	$("ul.mrt-minite").scrollTop(0);
	$("ul.mrt-hour").html(html4);
	$("ul.mrt-minite").html(html5);
}

function showDate() {
	setTimeout(function(){
		
		var nowYear  =  $('.mrt-date').children('li[class="selected"]').children("span").text();
	    var nowMonth =  $('.mrt-hour').children('li[class="selected"]').children("span").text();
	    var nowDay   =  $('.mrt-minite').children('li[class="selected"]').children("span").text();
	    var nowDate  =  nowYear +"-"+ nowMonth +"-"+ nowDay;  
	    var selectedDateObj = {};
	    selectedDateObj.oper = 1;
	    selectedDateObj.date     = nowDate;
	    //js 调用 原生方法
	    window.trigp.sendParam(JSON.stringify(selectedDateObj));
	    reload();
	 },800);
}

function canncelDate(){
	
    var selectedDateObj = {};
    selectedDateObj.oper = 0;
    //js 调用 原生方法
    window.trigp.sendParam(JSON.stringify(selectedDateObj));
    reload();
	//js 调用 原生方法
	//window.trigp.closeWin();
}

//初始化时间
function reload(){
		    	    $(".mrt-date").children('li').children('span').parent("li").removeClass("selected");
		        $(".mrt-hour").children('li').children('span').parent("li").removeClass("selected");
		        $(".mrt-minite").children("li").children('span').parent("li").removeClass("selected");
		        $("ul.mrt-date").scrollTop(0);
				$("ul.mrt-hour").scrollTop(0);
				$("ul.mrt-minite").scrollTop(0);
}