var html = "",
	month = '',
	day = '',
	myDate = new Date();
var minite = myDate.getMinutes();
var hours = myDate.getHours();
var year = myDate.getFullYear();
var months = myDate.getMonth() + 1;
var html4 = "<li></li><li></li>",
	html5 = "<li></li><li></li>";
	for(var i = 0; i < 24; i++) {
		if(i < 10) {
			var a = "0" + i;
		} else {
			var a = i;
		}
		if(i == 0)
			html4 += "<li id='minite_" + i + "' class='selected'><span>" + a + "</span></li>";
		else
			html4 += "<li id='minite_" + i + "'><span>" + a + "</span></li>";
	}
	html4 += "<li></li><li></li>";
	for(var j = 0; j < 60; j += 5) {
		if(j < 10) {
			var b = "0" + j;
		} else {
			var b = j;
		}
		if(j == 0)
			html5 += "<li id='minite_" + j + "' class='selected'><span>" + b + "</span></li>";
		else
			html5 += "<li id='minite_" + j + "'><span>" + b + "</span></li>";
	}
	html4 += "<li></li><li></li>";
	html5 += "<li></li><li></li>";




$(function() {
	today = myDate.getDate();
	var arrDate = [];
	var type = 90; // 火车60天 飞机正常90天 

	setDay = today + type;
	var munAdd = 0;
	for(var i = today; i < setDay; i++) {
		myDate.setDate(i);
		if((myDate.getMonth() + 1) < 10) {
			month = "0" + (myDate.getMonth() + 1);
		} else {
			month = (myDate.getMonth() + 1);
		}
		if((myDate.getDate()) < 10) {
			day = "0" + myDate.getDate();
		} else {
			day = myDate.getDate();
		}
		if(i == today)
			html += "<li class='selected' id='_" + month + "_" + day + "' nowAttr='1'><span>" + month + "月" + day + "日 " + weekday(myDate.getDay()) + "</span></li>";
		else {
			//			if(munAdd == 1) {
			//				html += "<li class='second-bottom' id='_" + month + "_" + day + "' >" + month + "月" + day + "日 " + weekday(myDate.getDay()) + "</li>";
			//			} else if(munAdd == 2) {
			//				html += "<li class='first-bottom' id='_" + month + "_" + day + "' >" + month + "月" + day + "日 " + weekday(myDate.getDay()) + "</li>";
			//			} else {
			html += "<li id='_" + month + "_" + day + "' ><span>" + month + "月" + day + "日 " + weekday(myDate.getDay()) + "</span></li>";
			//			}
		}

		myDate = new Date();
		munAdd++;
	}
	$("ul.mrt-date").html("<li></li><li></li>" + html + "<li></li><li></li>");
	if(parseInt(minite) < 55) {
		var timeHour = parseInt(hours);
	} else {
		var timeHour = parseInt(hours) + 1;
	}
	if(parseInt(minite) % 5 != 0) {
		var timeMinite = parseInt(parseInt(minite) / 5) * 5 + 5;
	} else {
		var timeMinite = parseInt(minite);
	}
	if(timeMinite >= 60) {
		timeMinite = 0
	}
	if(timeHour >= 24) {
		timeHour = 0;
	}
	var timeSecond = 0,
		ok = 0;
	var html2 = "<li></li><li></li>",
		html3 = "<li></li><li></li>";
	for(var i = timeHour + 4; i < 100; i++) {
		if((timeHour + 4) > 23) {
			var timeHour2 = (timeHour + 4) - 24;
		} else {
			var timeHour2 = (timeHour + 4);
		}
		if(timeSecond < Math.abs(24 - timeHour2)) {
			if(i > 23) {
				i = i - 24;
			}
			if(i < 10) {
				var a = "0" + i;
			} else {
				var a = i;
			}
			if(timeHour > 19) {
				var newTimeHour = Math.abs(timeHour + 4 - 24);
			} else {
				var newTimeHour = timeHour + 4;
			}
			if(i == newTimeHour)
				html2 += "<li id='hour_" + i + "'  nowAttr='1' class='selected'><span>" + a + "</span></li>";
			else
				html2 += "<li id='hour_" + i + "'><span>" + a + "</span></li>";
			if(newTimeHour < 4 && !ok) {
				ok = 1;
				$("ul.mrt-date li").eq(2).remove();
				$("ul.mrt-date li").eq(2).addClass("selected").attr("nowAttr", "1");
			}

		}
		timeSecond++;
	}
	

	for(var j = timeMinite; j < 60; j += 5) {
		if(j < 10) {
			var a = "0" + j;
		} else {
			var a = j;
		}
		if(j == timeMinite)
			html3 += "<li id='minite_" + j + "' class='selected'><span>" + a + "</span></li>";
		else
			html3 += "<li id='minite_" + j + "'><span>" + a + "</span></li>";
	}
	html2 += "<li></li><li></li>";
	html3 += "<li></li><li></li>";
	$("ul.mrt-hour").html(html2);
	$("ul.mrt-minite").html(html3);
	//	$("#hour_" + timeHour).addClass("selected").siblings().removeClass("selected");
	//	$("#minite_" + timeMinite).addClass("selected").siblings().removeClass("selected");
	//	$("ul.mrt-hour").scrollTop(50 * (timeHour));
	//	$("ul.mrt-minite").scrollTop(50 * (timeMinite / 5));

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
		latency: 150,
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
	$("div.time-mrt ul").on("scrollstop", function() {
	
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
	
	$("ul.mrt-hour").scrollTop(0);
	$("ul.mrt-minite").scrollTop(0);
	$("ul.mrt-hour").html(html4);
	$("ul.mrt-minite").html(html5);
}

function showDate() {
	var nowMonth = $("ul.mrt-date li.selected").attr("id").split("_");
	var nowHour = $("ul.mrt-hour li.selected").attr("id").split("_");
	var nowMinite = $("ul.mrt-minite li.selected").attr("id").split("_");
	if(months > parseInt(nowMonth[1])) {
		year += 1;
	}
	if(parseInt(nowHour[1]) < 10) {
		nowHour[1] = "0" + parseInt(nowHour[1]);
	}
	if(parseInt(nowMinite[1]) < 10) {
		nowMinite[1] = "0" + parseInt(nowMinite[1]);
	}
	if(parseInt(nowMonth[2]) < 10) {
		nowMonth[2] = "0" + parseInt(nowMonth[2]);
	}
	var dateHmtlText = year + "-" + nowMonth[1] + "-" + nowMonth[2] + " " + nowHour[1] + ":" + nowMinite[1] + ":00";
	var dateHtmlShowType = $("ul.mrt-date li.selected span").html() + " " + $("ul.mrt-hour li.selected span").html() + ":" + $("ul.mrt-minite li.selected span").html();

	window.jsAndJavaa.getDate(dateHtmlShowType,dateHmtlText);
}

function canncelDate(){
		    window.jsAndJavaa.getDate("","");
}