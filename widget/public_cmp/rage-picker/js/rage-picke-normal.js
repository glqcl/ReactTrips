(function($, window, ddocument, undefined) {
	function IsPinYear(y) //判断是否闰平年
	{
		return(0 == y % 4 && (y % 100 != 0 || y % 400 == 0));
	}
	var ddd = new Date();
	var yy = ddd.getFullYear();
	var mm = ddd.getMonth() + 1; //获取当前月份的日期 
	var dd = ddd.getDate();
	var ww = ddd.getDay();
	//查农历
	var LunarDate = {
		madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
		//			HsString: '甲乙丙丁戊己庚辛壬癸',
		//			EbString: '子丑寅卯辰巳午未申酉戌亥',
		NumString: "一二三四五六七八九十",
		MonString: "正二三四五六七八九十冬腊",
		CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
		Year: null,
		Month: null,
		Day: null,
		TheDate: null,
		GetBit: function(m, n) {
			return(m >> n) & 1;
		},
		e2c: function() {
			this.TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
			var total, m, n, k;
			var isEnd = false;
			var tmp = this.TheDate.getFullYear();
			total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38;
			if(this.TheDate.getYear() % 4 == 0 && this.TheDate.getMonth() > 1) {
				total++;
			}
			for(m = 0;; m++) {
				k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
				for(n = k; n >= 0; n--) {
					if(total <= 29 + this.GetBit(this.CalendarData[m], n)) {
						isEnd = true;
						break;
					}
					total = total - 29 - this.GetBit(this.CalendarData[m], n);
				}
				if(isEnd)
					break;
			}
			this.Year = 1921 + m;
			this.Month = k - n + 1;
			this.Day = total;
			if(k == 12) {
				if(this.Month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
					this.Month = 1 - this.Month;
				}
				if(this.Month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
					this.Month--;
				}
			}
		},
		GetcDateString: function() {
			var tmp = "";
			//				tmp += this.HsString.charAt((this.Year - 4) % 10);
			//				tmp += this.EbString.charAt((this.Year - 4) % 12);
			//				tmp += "年 ";
			if(this.Month < 1) {
				tmp += this.MonString.charAt(-this.Month - 1);
			} else {
				tmp += this.MonString.charAt(this.Month - 1);
			}
			tmp += "月";
			tmp += (this.Day < 11) ? "初" : ((this.Day < 20) ? "十" : ((this.Day < 30) ? "廿" : "三十"));
			if(this.Day % 10 != 0 || this.Day == 10) {
				tmp += this.NumString.charAt((this.Day - 1) % 10);
			}
			return tmp;
		},
		GetLunarDay: function(solarYear, solarMonth, solarDay) {
			if(solarYear < 1921 || solarYear > 2020) {
				return "";
			} else {
				solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
				this.e2c(solarYear, solarMonth, solarDay);
				return this.GetcDateString();
			}
		}
	};

	function GetYear(curyear) {
		ddd.setDate(ddd.getDate() + curyear); //获取AddDayCount天后的日期 
		if(ddd.getMonth() == 1 && IsPinYear(ddd.getFullYear())) {
			if(d > 28 && d < 30) {
				d = 29
			}
		}
		if(dd < 10) {
			dd = "0" + ddd.getDate();
		} else {
			dd = ddd.getDate();
		}
		var w = "日一二三四五六".charAt(ddd.getDay());
		//			return mm + "月" + dd + "日" + "星期" + w;
		return year + "-" + mm + "-" + dd;
	}

	function addData(year, mouth, index) {
		//当前月份一共多少天
		var CurAlltoday = new Date(year - 1900, mouth, "0").getDate()
		for(i = 1; i < CurAlltoday + 1; i++) {
			if(i == 1) {
				var BoxDom = "<div class=\"data\">" +
					"<div class=\"data-number\">" +
					"</div>" +
					"</div>"
				$("body").append(BoxDom)
				$(".data-number").eq(index).append("<h1>" + year + "年" + mouth + "月</h1>")
				var htmls = "<dl class=\"empty\">" +
					"<dt></dt>" +
					"<dd></dd>" +
					"</dl>";
				//今天星期几
				var CurOneWeek = new Date(year + "-" + mouth + "-" + "1").getDay()
				if(isAppleMobileDevice()) {
					var CurOneWeek = new Date(year + "/" + mouth + "/" + "1").getDay()
				}

				//1号前面增加几个空节点
				for(n = 0; n < CurOneWeek; n++) {
					$(".data-number").eq(index).append(htmls)
				}

			}
			var nongli = LunarDate.GetLunarDay(year, mouth, i)
			var Curnowli;
			if(nongli.indexOf('初一') > 0) {
				Curnowli = nongli.toString().substring(0, 2)
			} else {
				Curnowli = nongli.toString().substring(2, 4)
			}
			var html = "<dl>" +
				"<dt>" + i + "</dt>" +
				" <dd id=_" + year + "_" + mouth + "_" + i + ">" + Curnowli + "</dd>" +
				"</dl>";
			$(".data-number").eq(index).append(html)
				//遍历所有日期，判断星期6||7
			var AllWeek = new Date(year + "-" + mouth + "-" + i).getDay()
				//				console.log(AllWeek)
			if(AllWeek == 0 || AllWeek == 6) {
				$(".data-number").eq(index).find("dl:not(.empty) dt").eq(i - 1).addClass("ot")
			}
		}
	}
	var year = yy;
	var mouth = mm;
	for(ii = 0; ii <= 8; ii++) {
		if(mouth > 12) {
			mouth -= mouth - 1
			year = year + 1
		}
		addData(year, mouth, ii)
		mouth++
	}
	$("body dl").on('click',function () {
		$('dl').removeClass('normal')
		$(this).addClass('normal').siblings('dl')
		var timeText = $(this).children('dd').attr('id')
		timeText = timeText.replace(/_/g,'-').substring(1)
		var beginDateArr = timeText.split("-");
		var beginDate = beginDateArr[0] + "-" + p(beginDateArr[1]) + "-" + p(beginDateArr[2]);
		
		var param = {};
		param.beginDate = beginDate;
		var selectedDateObj = JSON.stringify(param);
		//js 调用 原生方法
		window.trigpDateInfo.getDateInfo(selectedDateObj);
	});
	
	//创建补0函数
	function p(s) {
		return s < 10 ? '0' + s : s;
	}
	ani()
	var btn = 0;
	var startIndex = 0;
	var endIndex = 0;
		//初始化
	function init() {
		var btn = 0;
		var startIndex = 0;
		var endIndex = 0;
		$("dl").removeClass('start-bt')
		$("dl").removeClass('middle-bt')
		$("dl").removeClass('end-bt')
		$(".picker-alert").text('请选择入住日期')
	}

	function ani() {
		$(".picker-alert").css('left', '-50%')
		$(".picker-alert").stop().animate({
			'left': '50%'
		}, 1000)
	}

	function isAppleMobileDevice() {
		return(/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
	}
	var holiday = {
		"_2017_1_1": "元旦",
		"_2017_1_27": "除夕",
		"_2017_1_28": "春节",
		"_2017_2_11": "元宵",
		"_2017_4_4": "清明",
		"_2017_5_1": "劳动",
		"_2017_5_30": "端午",
		"_2017_10_1": "国庆",
		"_2017_10_4": "中秋"
	};
	$("#_2017_1_1").text('元旦').addClass('ot')
	$("#_2017_1_27").text('除夕').addClass('ot')
	$("#_2017_1_28").text('春节').addClass('ot')
	$("#_2017_2_11").text('清明').addClass('ot')
	$("#_2017_5_1").text('劳动').addClass('ot')
	$("#_2017_5_30").text('端午').addClass('ot')
	$("#_2017_10_1").text('国庆').addClass('ot')
	$("#_2017_10_4").text('中秋').addClass('ot')
})(jQuery, window, document)