var list_DetailFrm = false;
/**
* AUI JAVASCRIPT PLUGIN
* aui-indexid-list.js 索引列表
* version 0.0.2
* Copyright (c) 2015 auicss.com @流浪男  QQ：343757327  群：344869952
*/
(function(window){
	var IndexedList = function(){
		_init();
	}
	var listArr = document.querySelectorAll(".aui-indexed-list li");
	var indexedWrap = document.querySelector(".aui-indexed-list");
	// 搜索类
	var searchWrap = document.querySelector(".aui-searchbar-wrap");
	var searchBar = document.querySelector(".aui-searchbar");
	var clearBtn = document.getElementById("aui-searchbar-clear");
	var searchInput = document.getElementById("aui-searchbar-input");
	var searchCancel = document.getElementById("aui-searchbar-cancel");
	// 右侧bar
	var bar = document.querySelector(".aui-indexed-list-bar");
	// 重置bar高度
	var barList = document.querySelectorAll(".aui-indexed-list-bar a");
	var barH = bar.offsetHeight;
	var newBarH = barList.length*16;
	var _init = function(){

		indexedWrap.style.height = (window.innerHeight-searchWrap.offsetHeight)+"px";
		searchBar.addEventListener("tap",function(){
			searchWrap.classList.add("focus");
			searchInput.focus();
		}, false)
		clearBtn.addEventListener("tap",function(){
			searchInput.value = '';
			api.setFrameAttr({
		         name  : 'city_listDetail_frm',
		         hidden: true
		    });
		}, false)
		searchCancel.addEventListener("tap",function(){
			api.setFrameAttr({
		         name  : 'city_listDetail_frm',
		         hidden: true
		    });
			searchWrap.classList.remove("focus");
			searchInput.value = '';
			searchInput.blur();
		}, false)
		searchInput.addEventListener("input",function(){
			
			var keyword    = searchInput.value;
		    var regChinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
			if(keyword == ""){
				api.setFrameAttr({
			         name  : 'city_listDetail_frm',
			         hidden: true
			    });
				return;
			}
			if(regChinese.test(keyword)){
			    setInfoFrame("dataValue",keyword);
			}else if(1 <= keyword.length && keyword.length < 5){
                keyword = (keyword || '').toUpperCase();
                setInfoFrame("dataSpac",keyword);
			
			}else if(keyword.length > 4){
				keyword       = (keyword || '').toUpperCase();
				setInfoFrame("dataTags",keyword);
			}
		},false);

        
		bar.style.height = newBarH+"px";
		//bar.style.top = "50%";
		//bar.style.marginTop = "-"+((newBarH-searchWrap.offsetHeight)/2)+"px";
        bar.style.top = "50px"; 
		bar.addEventListener('touchstart', function(event) {
			bar.style.opacity = "1";
			scrollTop(event);
		}, false);
		// 监听bar滑动
		bar.addEventListener('touchmove', function(event) {
			scrollTop(event);
		}, false);
		document.body.addEventListener('touchend', function(event) {
			removeToast(event);
		}, false);
		document.body.addEventListener('touchcancel', function(event) {
			removeToast(event);
		}, false);
	}
	var scrollTop = function (event){
	    event.preventDefault();
		var clientX = event.changedTouches[0].clientX;
		var clientY = event.changedTouches[0].clientY;
		var _thisBar = document.elementFromPoint(clientX, clientY);
		if(clientX < window.innerWidth & clientY < window.innerHeight & clientY > 0){
			var thisValue = _thisBar.getAttribute("data-value");
			if(thisValue){
				var groupElement = indexedWrap.querySelector('[data-group="' + thisValue + '"]');
				if(thisValue != 'search' & thisValue != '*'){
					
					document.querySelector(".aui-indexed-list-toast").textContent = thisValue;
					document.querySelector(".aui-indexed-list-toast").classList.add("active");
					document.querySelector(".aui-indexed-list-toast").style.top = clientY+'px';
				}
				if (groupElement) {
					indexedWrap.scrollTop = groupElement.offsetTop;
				}
			}else{
				document.querySelector(".aui-indexed-list-toast").textContent = '';
				document.querySelector(".aui-indexed-list-toast").classList.remove("active");
			}
		}
	}
	var removeToast = function(event){
		bar.style.opacity = "0.6";
		document.querySelector(".aui-indexed-list-toast").classList.remove("active");
		bar.classList.remove('active');
	}
	window.auiIndexedList = IndexedList;
})(window);

/*
 * 设置frame里的索引值
 */
function setInfoFrame(dataAttr,keyword){
	    var paramArr  = [];
	    var elemLiArr = [];

	    if(dataAttr == "dataValue"){
	    	    elemLiArr     = $('#cityListElemId li[dataValue="'+keyword+'"]');   
	    	    if(elemLiArr.length == 0){
	    	    	      elemLiArr     = $('#cityListElemId li[dataValue^="'+keyword+'"]');
	    	    }
	    }else{
	    	    elemLiArr     = $('#cityListElemId li[dataSpac^="'+keyword+'"]');
	    	    if(elemLiArr.length == 0){
	    	    	      //判断是不是三字码
	    	    	      if(keyword.length == 3){
	    	    	      	  elemLiArr = $('#cityListElemId li[dataSzm="'+keyword+'"]');
	    	    	      	  if(elemLiArr.length > 0){
	    	    	      	  	  dataAttr   = "dataSzm";
	    	    	      	  }
	    	    	      }
	    	    	      
	    	    	      if(elemLiArr.length == 0){
	    	    	      	  elemLiArr     = $('#cityListElemId li[dataTags^="'+keyword+'"]');
	    	    	      	  if(elemLiArr.length > 0){
	    	    	      	  	  dataAttr   = "dataTags";
	    	    	      	  }
	    	    	      }
	    	    }
	    }
	    var elemLen  = elemLiArr.length;
        var height   = pageParam.height + $('#group-search').height();
	    for(var i=0;i<elemLiArr.length;i++){
	        var param = {};
			var elemLi      = elemLiArr[i];
			param.text      = $(elemLi).attr("dataValue");
			param.dataTags  = $(elemLi).attr("dataTags");  
			param.dataSpac  = $(elemLi).attr("dataSpac");
			param.dataSzm   = $(elemLi).attr("dataSzm");
			param.dataCt    = $(elemLi).attr("dataCt");
			if($(elemLi).attr("dataCityId")==null){
				param.dataCityId="";
			}
			param.dataCityId= $(elemLi).attr("dataCityId");
			paramArr.push(param);
	    }
	    pageParam.key       = dataAttr;
		pageParam.paramArr  = paramArr;

	    if(list_DetailFrm){
		    store.set("req_localCityList" , pageParam);
			api.execScript({
			    frameName: 'city_listDetail_frm',
			    script: 'list_detail()'
			});
			api.setFrameAttr({
	            name  : 'city_listDetail_frm',
	            hidden: false
	        });
		}else{
			nativeXP.openFrame({url:'city_listDetail_frm.html',y:height,pageParam:pageParam});
	        list_DetailFrm = true;
		}
}
