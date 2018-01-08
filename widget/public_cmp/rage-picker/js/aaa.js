function IsPinYear(y) //判断是否闰平年
		{
			return(0 == y % 4 && (y % 100 != 0 || y % 400 == 0));
		}
		var ddd = new Date();
		var yy = ddd.getFullYear();
		var mm = ddd.getMonth() + 1; //获取当前月份的日期 
		var dd = ddd.getDate();
		var ww = ddd.getDay();

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
						//1号前面增加几个空节点
					for(n = 0; n < CurOneWeek; n++) {
						$(".data-number").eq(index).append(htmls)
					}

				}
				var html = "<dl>" +
					"<dt>" + i + "</dt>" +
					" <dd></dd>" +
					"</dl>";
				$(".data-number").eq(index).append(html)
					//遍历所有日期，判断星期6||7
				var AllWeek = new Date(year + "-" + mouth + "-" + i).getDay()
					//				console.log(AllWeek)
				if(AllWeek == 0 || AllWeek == 6) {
					$(".data-number").eq(index).find("dl:not(.empty) dt").eq(i - 1).addClass("ot")
				}
				//今天之前置灰
				if(mouth == mm && i == dd) {
					$(".data-number").eq(index).find("dl:not(.empty)").slice(0, i - 1).addClass("gt")
				}
			}
		}
		var year = yy;
		var mouth = mm;
		for(ii = 0; ii <= 2; ii++) {
			if(mouth > 12) {
				mouth -= mouth - 1
				year = year + 1
			}
			addData(year, mouth, ii)
			mouth++
		}
		$(function() {
				ani()
				var btn = 0;
				var startIndex = 0;
				var endIndex = 0;
				//第90天
				$("dl:not(.gr,.empty)").eq(dd + 58).addClass("ninety")
				$("dl:not(.gr,.empty)").slice(dd + 59).addClass("gt")
				$("body").on("click", "dl:not(.empty)", function() {
					ani()
					if(!$(this).hasClass("ninety")) {
						dataRange(this)
					} else {
						if($("dl.start-bt").length == 0 && $("dl.start-bt").length == 0) {
							//						console.log("没有入住离店")
							$("dl:not(.gr,.empty)").removeClass("start-bt").removeClass("end-bt").removeClass("middle-bt")
							$(this).addClass("start-bt")
							$(this).next().addClass("end-bt")
							btn = 0
						} else {
							dataRange(this)
						}
					}
					//入住离店时间
					var sTime = $(".start-bt").text()
					var eTime = $(".end-bt").text()
						//入住离店月份
					var sMouth = $(".start-bt").siblings('h1').text()
					var eMouth = $(".end-bt").siblings('h1').text()
						//				console.log(sMouth+sTime)
						//				console.log(eMouth+eTime)
						//入住多少天
					var csMouth = sMouth.replace(/年/, '-');
					csMouth = csMouth.replace(/月/, '-') + sTime;
					csMouth = $.trim(csMouth)
					var ceMouth = eMouth.replace(/年/, '-');
					ceMouth = ceMouth.replace(/月/, '-') + eTime;
					ceMouth = $.trim(ceMouth)
					if(ceMouth == '') {
						ceMouth = csMouth
					}
					btnCount_Click(csMouth, ceMouth)
				})

				function btnCount_Click(s1, s2) {
					//				s1 = "2002-1-10"
					//				s2 = "2002-1-11"
					//				console.log(DateDiff(s1, s2))
				}

				//计算天数差的函数，通用  
				function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式  
					var aDate, oDate1, oDate2, iDays
					aDate = sDate1.split("-")
					oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式  
					aDate = sDate2.split("-")
					oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
					iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
					return iDays
				}
				var dataRange = function(ele) {
					$("dl.ninety").removeClass("start-bt")
					$("dl.ninety").next().removeClass("end-bt")
					if(btn == 0 && !$(ele).hasClass("gt")) {
						if($(ele).hasClass("ninety")) {
							return
						}
						$(ele).addClass("start-bt")
						var CurStartIndex = $("dl:not(.empty)").index(ele)
						startIndex = CurStartIndex
						btn = 1
					} else if(btn == 1 && !$(ele).hasClass("gt")) {
						if(!$(ele).hasClass("start-bt")) {
							$(ele).addClass("end-bt")
							var CurEndIndex = $("dl:not(.empty)").index(ele)
							endIndex = CurEndIndex
								//如果选择的时间大于28天
							btn = 2
							if(endIndex - startIndex > 28) {
								$("dl.end-bt").removeClass("end-bt")
								$(".picker-alert").text('亲，酒店只支持连续预定28晚')
								btn = 1
							} else {
								$("dl:not(.empty)").slice(startIndex + 1, endIndex).addClass("middle-bt")
								btn = 2
							}
							//如果离店时间大于入住时间
							if(endIndex < startIndex) {
								$("dl.start-bt").removeClass("start-bt")
								$("dl.end-bt").removeClass("end-bt").addClass("start-bt")
								startIndex = endIndex
								btn = 1
							}
						}
					} else if(!$(ele).hasClass("gt")) {
						$("dl:not(.empty)").removeClass("start-bt").removeClass("middle-bt").removeClass("end-bt")
						$(ele).addClass("start-bt")
						var CurStartIndex = $("dl:not(.empty)").index(ele)
						startIndex = CurStartIndex
						btn = 1
						if($(ele).hasClass("ninety")) {
							$("dl:not(.gr,.empty)").removeClass("start-bt").removeClass("end-bt").removeClass("middle-bt")
							$(ele).addClass("start-bt")
							$(ele).next().addClass("end-bt")
							btn = 0
						}
					}
					$("dl").each(function() {
						if($(this).hasClass('start-bt')) {
							$(".picker-alert").text('请选择离店日期');
							$(".picker-alert").addClass('ani-picker');
							if(endIndex - startIndex > 28) {
								$(".picker-alert").text('亲，酒店只支持连续预定28晚')
								$(".picker-alert").addClass('ani-picker');
							}
							return false;
						}
					})
				}
			})
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
			$(".picker-alert").css('left','-50%')
			$(".picker-alert").stop().animate({'left':'50%'},1000)
		}