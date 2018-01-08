	nativeXP = {};
	/** 
	 * 启动 原生 window
	 * nativeXP.openWin({url:'aa.html',pageParam:{a:"1111",b:"222",bounces:false,slidBackEnabled:true}});
	 */
	nativeXP.openWin = function(options){
	    return new nativeXP.openWin.prototype.init(options);
	}
	
	nativeXP.openWin.prototype = {
	    version:'1.00',
	    author:'xupeng',
	    construtor:nativeXP.openWin,   //修改构造函数
	    init:function(options){
	        var slidBackEnabled = true;
	        var url             = options.url;
	        var name            = options.name          || url.substring(0,url.lastIndexOf("."));
	        var pageParam       = options.pageParam;
	        var bounces         = options.bounces       || false;
	        var softInputMode   = options.softInputMode || 'auto';
	        var reload          = options.reload        || false;
	
	        if(options.slidBackEnabled != null){
	            slidBackEnabled = options.slidBackEnabled;
	        }
	        animation     = options.animation || {
								                         type:"movein",                //动画类型（详见动画类型常量）
								                         subType:"from_right",         //动画子类型（详见动画子类型常量）
								                         duration:300
								                  }
	        api.openWin({
	                    name: name,
	                    url : url,
	                    pageParam: pageParam,
	                    bounces:bounces,
	                    allowEdit:true,
	                    animation:animation,
	                    softInputMode:softInputMode,
	                    reload:reload,
	                    slidBackEnabled:slidBackEnabled
	        });
	    }
	}
	
	nativeXP.getUrlName = function(url){
	    
	    return url.substring(0,url.lastIndexOf("."));
	}
	
	/**
	 * 启动 原生 frame
	 * {url:'a.html',pageParam:{a:'qq',b:'22'},x:100,y:200,w:300,h:500,bounces:false}
	 **/
	nativeXP.openFrame = function(options){
	    return new nativeXP.openFrame.prototype.init(options);
	}
	
	nativeXP.openFrame.prototype = {
	     version:'1.00',
	      author:'xupeng',
	  construtor:nativeXP.openFrame,
	        init:function(options){
	            var url       = options.url;
	            var frame     = options.name || url.substring(0,url.lastIndexOf("."));
	            var pageParam = options.pageParam;
	            var x         = options.x   ||  0;
	            var y         = options.y   ||  0;
	            var w         = options.w   || 'auto';
	            var h         = options.h   || 'auto';
	            var bounces   = options.bounces   || false;
	            var animation = options.animation || null;
	            var softInputMode  = options.softInputMode || 'auto';
	            var scaleEnabled   = options.scaleEnabled  || false;
	            var reload         = options.reload        || false;
	            api.openFrame({
	                          name: frame,
	                          url:  url,
	                          rect: {
	                             x: x,
	                             y: y,
	                             w: w,
	                             h: h
	                          },
	                          pageParam:pageParam,
	                          bounces: bounces,
	                          vScrollBarEnabled: false,
	                          hScrollBarEnabled: false,
	                          animation:animation,
	                          allowEdit:true,
	                          reload:reload,
	                          scaleEnabled:scaleEnabled,
	                          softInputMode:softInputMode,
	                          delay: 200
	             });
	
	        }
	}
	
	/***
	 * 设置原生frame显示 或 隐藏
	 **/
	nativeXP.showframe = function(type,isBoolean){
	        var isBoolean = isBoolean || false;
	        api.setFrameAttr({
	            name  : type,
	            hidden: isBoolean
	        });
	}
	
	nativeXP.showgroup = function(type,isBoolean) {
	        var isBoolean = isBoolean || false;
	        api.setFrameGroupAttr({
	              name: type,
	              hidden: isBoolean
	        });
	}
	
	
	/**
	 * 循环设置 frame 隐藏
	 * ["name1","name2","name3","name4","name5"]
	 **/
	nativeXP.showframeHideMore = function(arr){
	    for(var i=0;i<arr.length;i++){
	        api.setFrameAttr({
	            name  : arr[i],
	            hidden: true
	        });
	    }
	}
	
	/**
	 * 循环设置 frameGroup 隐藏
	 * ["name1","name2","name3","name3","name5"]
	 **/
	nativeXP.showgroupHideMore = function(arr){
	    
	    for(var i=0;i<arr.length;i++){
	        api.setFrameGroupAttr({
	            name: arr[i],
	            hidden: true
	        });
	    }
	}
	
	nativeXP.setFrameGroupIndex = function setFrameGroupIndex(type,frameIndex,scroll) {
	           var scroll = scroll || true;
	           api.setFrameGroupIndex({
	                           name: type,
	                           index: frameIndex,
	                           scroll: scroll
	           });
	}
	
	/**
	 * 吐司
	 ***/
	
	nativeXP.toast = function(options){
	    var msg        = options.msg        ||  '';
	    var duration   = options.duration   ||  2000;
	    var location   = options.location   ||  'bottom';
	    api.toast({
	              msg: msg,
	              duration: duration,
	              location: location
	    });
	}
	
	
	/**
	 *  封装 store 存入数据
	 *  var store1  = new nativeXP.store({
	 *			                   
	 *		elemId : "listDiv",      //html  标签的 
	 *	    param  : {},             //向后台 传入 参数信息
	 *                               //访问   后台的  地址
	 *      url    : 'http://192.168.16.139:8080/agent_web_temp/orderCtr/list_order.do?pageIndex=1&pageSize=10',
	 *      tmpId  : 'listTemplate'         
	 *			                 
	 *	});
	 * ***/
	nativeXP.store = function(options){
	
	     this.init(options);
	}
	
	
	/***
	 * store 的 扩展方法
	 * init  初始化方法
	 * load  渲染方法
	 * reload 重新加载
	 * add   添加数据
	 * clear 清空对象
	 * ***/
	nativeXP.store.prototype = {
	     version:'1.00',
	     author :'xupeng',
	     url    :'',
	     param  :{},
	     elemId :'',
	     tmpId  :'',
	     list   :[],
	     tmpLocalList:[],
	     refesh :{},
	     animate:"",
	     animateStep:0,
	     localKey:"",
	     localSelectdKey:"",
	     construtor:nativeXP.store,   //修改构造函数
	     init : function(options){
	            this.url             = options.url;
	            this.param           = options.param || {};
	            this.elemId          = options.elemId;
	            this.tmpId           = options.tmpId;
	            this.animate         = options.animate;
	            this.animateStep     = options.animateStep;
	            this.localKey        = options.localKey;
	            this.localSelectdKey = options.localSelectdKey;
	     },
	     load:function(params,fn){
	            if(params == null){
	               params = {};
	            }
	            
	            if(typeof params == "function"){
	               fn = params;
	               params = {};
	            }
	            params.isMerger = params.isMerger || true;
	
	            //显示加载中......
	            showAnimate(1);
				
				var connectionType = api.connectionType;
				if(connectionType != "none"){
					this.getDataInTemp(params,fn);	
				}else{
					this.getLocalDataInTemp();   
				}
				  
	     },
	     reload:function(fn){
	            //显示加载中......
	            showAnimate(1);
	            
	            this.getDataInTemp({},fn);
	     },
	     pagingLoad:function(refesh,params,fn){
	     
	            if(params == null){
	               params = {};
	            }
	            
	            if(typeof params == "function"){
	               fn = params;
	               params = {};
	            }
	            
	            params.isMerger = params.isMerger || true;
	            params.page  = 1;
	            this.clear(refesh);
	            this.list = [];
	            
	            //显示加载中......
	            showAnimate(1);
	
				var connectionType = api.connectionType;
				if(connectionType != "none"){
				    this.getPagingDataInTmp(refesh,null,params,fn);
				}else{
					this.getLocalDataInTemp(); 
				}
				this.refesh = refesh;
				this.clearLocalStroage();
		
	     },
	     pagingAdd:function(refesh,dir,params,fn){
	            
	            if(params == null){
	               params = {};
	            }
	            
	            if(typeof params == "function"){
	               fn = params;
	               params = {};
	            }
	   
	            params.isMerger = params.isMerger || true;
	            this.getPagingDataInTmp(refesh,dir,params,fn);	
	     },
	     getDataInTemp:function(params,fn){
	     
	             var data        = {};  
	             var me          = this;
	             var isMerger    = params.isMerger;
	             var page = params.page;
	             if(isMerger != null){
	                 if(isMerger){
					      for(var temp in params){
							  me.param[temp] = params[temp];
						  }
					 }else{
					          me.param = params;
					 }
	             } 
	             if(fn == null){
	                     var paramStr = nativeXP.tgParmsFun(me.param);
			             //获取ajax信息
					     api.ajax({
								    url      : me.url + "?" + paramStr,
								    method   : 'get' ,
								    dataType : 'json',
								    returnAll: false ,
								    timeout  : 30    
								},function(ret,err){
									
									//隐藏loading
	                                showAnimate(-1);
								    
								    if (ret) {
			                              var html = template(me.tmpId,ret);
			                              $("#"+me.elemId).html(html);
								          
								          for(var key in ret)
										  {
			
												if(nativeXP.type(ret[key]) == '[object Array]'){
				                                      me.list = ret[key];
				                                      if(ret[key].length == 0){
				                                            $(".ui-refresh-down").hide();
				                                      }
												  
												}
										  }
								    }else{
								    	      //隐藏loading
	                                      showAnimate(-1);
	                                      api.toast({
										     msg: '对不起,网络出现异常,请稍候重试',
										     duration: 2000,
										     location: 'bottom'
										  });
								    } 
						 });
				 }else{
				 
				        //获取ajax信息
					    api.ajax({
								    url      : me.url,
								    method   : 'get' ,
								    dataType : 'json',
								    returnAll: false ,
								    timeout  : 30    ,
								    data:{
								        values: me.param
								    }
			
			
						},fn);
						api.hideProgress();
				 
				 }
	     },
	     getLocalDataInTemp:function(){
	     	     var me   = this;
	     	     api.hideProgress();
	     	     var ret  = store.get(me.localReq);
	     	     var html = template(me.tmpId,ret);
				 $("#"+me.elemId).append(html);
	     },
	     getPagingDataInTmp:function(refesh,dir,params,fn){
	             var data         = {};
	             var me           = this;
	             var isMerger     = params.isMerger;
	             var refesh       = refesh;
	             var dir          = dir;
	             var page         = params.page;      
	             var airportsList = params.airportsList;
	             var animate      = me.animate;
	             var redirect     = params.Redirect;
	             this.refesh      = refesh;
	             params.airportsList = null;
	             
	             if(isMerger != null){
	                 
	                 if(isMerger){
					      for(var temp in params){
							  me.param[temp] = params[temp];
						  }
					 }else{
					          me.param = params;
					 }
	             } 
	             
	          
	             if(fn == null){
	                     var paramStr = nativeXP.tgParmsFun(me.param);
			             //获取ajax信息
					     api.ajax({
								    url      : me.url + "?" + paramStr,
								    method   : 'get' ,
								    dataType : 'json',
								    returnAll: false ,
								    timeout  : 30    
								},function(ret,err){
								    
								    //隐藏loading
	                                showAnimate(-1);
								    
								    if (ret) {
								    	      var code      = ret.code;
								    	      var totalPage = ret.totalPage;
								    	      var page      = params.page;
								    	      if(code != '1'){
								    	      	   if(page == 1){
									    	     	   refesh.disable();
	                                                   $(".ui-refresh-down").hide();
	                                                   $("body div").hide();
	                                                   $("center").show();
	                                                   $('div[dataCmp="dataList"]').hide();
	                                               }else{
	                                                   $("body div").show();
	                                                   $("center").hide();
	                                                   $('div[dataCmp="dataList"]').show();
	                                               }
								    	      }else{
	                                                $("body div").show();
	                                                $("center").hide();
	                                                $('div[dataCmp="dataList"]').show();
								    	      }
								    	     
								    	      if(page == '1'){
								    	      	   api.refreshHeaderLoadDone();
								    	      }
	
								    	      if(params.page == totalPage){
								    	      	    refesh.disable();
										        $(".ui-refresh-down").hide();
										  }
								    	  
								    	      var page     = ret.page;
								    	      var pageSize = ret.pageSize;
								
	                                      var html = template(me.tmpId,ret);
								          $("#"+me.elemId).append(html);
								          for(var key in ret)
										  {
											  	if(nativeXP.type(ret[key]) == '[object Array]'){
				                                      nativeXP.mergeArr(me.list,ret[key]);
												      if(ret[key].length == 0){
				                                           refesh.disable();
										                   $(".ui-refresh-down").hide();
										                   if(params.page == '1'){
								    	      	                      $("#"+me.elemId).append('<div style="text-align:center">本页暂无数据</div>');
										                   }
												      }  
												      if(params.page > 1){
												           refesh.afterDataLoading(dir);    //数据加载完成后改变状态
												      }
												      refesh._options.page += 1;
												}
										  }
			                              me.refesh = refesh; 
	                                      api.refreshHeaderLoadDone();
	                                    
								    }else{
								          //隐藏loading
	                                      showAnimate(-1);
	                                      api.toast({
										     msg: '对不起,网络出现异常,请稍候重试',
										     duration: 2000,
										     location: 'bottom'
										  });
								    }
							   	   
						 });
				 }else{
				     
				        //获取ajax信息
					    api.ajax({
								    url      : me.url,
								    method   : 'get' ,
								    dataType : 'json',
								    returnAll: false ,
								    timeout  : 30    ,
								    data:{
								        values: me.param
								    }
			
			
						},fn);
						api.hideProgress();
				 
				 }
	     
	     },
	     animationList:function(options){
	      
	            if(options == null){
	            	    options = {};
	            }
	            var me         = this;
	            var index      = options.index || 0  ;
	            var end        = options.end   || 200;
	            var step       = options.step  || 20 ;
	            var animate    = me.animate;
	             
	            if(animate != ""){
	
	                var length     = $('#'+me.elemId).children().length;
	                var elemList   = $('#'+me.elemId).children();
	            
	                var time       = 0.2;
	                var delay      = 0.3;	
	                var step       = me.animateStep || 0.2;
	
	                
	                for(var i=0 ; i < length ; i++){
				            delay += step;
				            
				            var elem = elemList[i];
				    
				            
				            $(elem).css('-webkit-animation', animate + ' '+time+'s linear forwards');
				            $(elem).css('-webkit-animation-delay', delay+'s');		                
			         }
	            
	            }
	            
	     },
	     setAirportsInfo:function(ret,airportsList){
	 
	        var myDate = new Date();
			var year   = myDate.getFullYear();     //获取完整的年份(4位,1970-????)
	        var month  = myDate.getMonth() + 1;    //获取当前月份(0-11,0代表1月)
	        if(month < 10){
	         	 month = "0" + month;
	        }
	        var dates  = myDate.getDate();         //获取当前日(1-31)
	        if(dates < 10){
	         	 dates = "0" + dates;
	        }
	        taskDate      = year  + "-"+ month + "-" + dates;
	 
	     	for(var key in ret)
		    {
			  	if(nativeXP.type(ret[key]) == '[object Array]'){
	                  
	                   for(var i=0;i<ret[key].length;i++){
	                   	    var depAirport         = nativeXP.jsonObjFilter("port_code",ret[key][i].depAirport,airportsList);
	                   	    var arrAirport         = nativeXP.jsonObjFilter("port_code",ret[key][i].arrAirport,airportsList); 
	                   	    var depDateTimeHouMin  = ret[key][i].depDateTime.split(" ")[1];
	                   	    var arrDateTimehouMin  = ret[key][i].arrDateTime.split(" ")[1];
	                   	    ret[key][i].depDateTimeHouMin = depDateTimeHouMin.substring(0,depDateTimeHouMin.length-3);
	                   	    ret[key][i].arrDateTimehouMin = arrDateTimehouMin.substring(0,arrDateTimehouMin.length-3);
	                   	    if(depAirport != null){
	                   	    	         ret[key][i].depAirportName = depAirport.cn_name;
	                   	    }
	                   	    if(arrAirport != null){
	                   	    	         ret[key][i].arrAirportName = arrAirport.cn_name;
	                   	    }
	
	                   	    if(ret[key][i].taskDate != null){
	                   	    	         if(ret[key][i].taskDate == taskDate){
	                   	    	         	ret[key][i].isNews = true;
	                   	    	         }
	                   	    }
	                   	    
	                   	    
	                   	
	                   }
				      
				}
		    }
	     	
	     },
	     loadTmpLocalList:function(logic,key){
	 	        var me  = this;
	 	        var ret = {};
	            var animate     = me.animate;
	            me.tmpLocalList =  Enumerable.From(me.list)
	            .Where(function (x) {
	            	       return eval(logic);
	            })
	            .ToArray();
	            me.clearClose(me.refesh);
	
	            if(key == null){
	                 ret.OrderList = me.tmpLocalList;	
	            }else{
	            	     ret[key]      = me.tmpLocalList;	
	            }
	            var html = template(me.tmpId,ret);
	            $("#"+me.elemId).append(html);
		        if(animate != null){
		                me.animationList();
		        }
	     },
	     loadTmpRemoteList:function(key){
	     	    var me  = this;
	            var ret = {};
	            me.clearLocalStroage();
	            var animate = me.animate;
	            me.clearClose(me.refesh);
	            if(key == null){
	                 ret.OrderList = me.list;	
	            }else{
	            	     ret[key]      = me.list;	
	            }
	            var html = template(me.tmpId,ret);
		        $("#"+me.elemId).append(html);
		        if(animate != null){
		                me.animationList();
		        }
	     },
	     getRemoteList:function(){
	     	     return this.list;
	     },
	     getTmpLocalList:function(){
	     	     return this.tmpLocalList; 
	     },
	     clear:function(refesh){
	
	             $("#"+this.elemId).empty();
	             //$(".ui-refresh-down").show();
	             //refesh.enable();
	     },
	     clearLocalStroage:function(){
	     	     store.set(this.localSelectdKey,[]);
	     },
	     clearClose:function(refesh){
	     	     $("#"+this.elemId).empty();
	             $(".ui-refresh-down").hide();
	             refesh.disable();
	     },
	     findByObjFilter:function(key,value){
	             return nativeXP.jsonObjFilter(key , value , this.list);
	            
	     },
	     findByArrFilter:function(key,value){
	             return nativeXP.jsonArrFilter(key , value , this.list);
	     }
	};
	
	/**
	 *  封装 submit 提交方法
	 * **/
	nativeXP.submit = function(options,fn){
	     
	     return new nativeXP.submit.prototype.init(options,fn);
	}
	
	nativeXP.submit.prototype = {
	     
	     init:function(options,fn){
	          
	          //显示加载中......
	          api.showProgress({
				    style: 'default',
				    animationType: 'fade',
				    title : '提交中...',
				    text  : '',
				    modal : false
			  });
	          var url     =  options.url;
	          var params  =  {};
	          var param   =  options.param;
	          var method  =  options.method || "post";
	          
	          if(typeof options == "function"){
	              fn = options;
	          }
	 
	          if(param != null){
	              for(var temp in param){
					  params[temp] = param[temp];
			      }
	          }
	         
	          //获取ajax信息
			  api.ajax({
						    url      : url,
						    method   : method ,
						    dataType : 'json',
						    returnAll: false ,
						    timeout  : 30    ,
						    data:{
						        values: params
						    }
			  },fn);
			 
			
	     }
	}
	
	/*
	 * 封装 拍照 逻辑
	 * **/
	nativeXP.camera  = function(options,fn){
	      return new nativeXP.camera.prototype.init(options,fn);
	}
	
	nativeXP.camera.prototype = {
	
	      init:function(options,fn){
	              var operation        = options.operation        || 'camera';
	              var encodingType     = options.encodingType     || 'jpg';
	              var mediaValue       = options.mediaValue       || 'pic';   
	              var destinationType  = options.destinationType  || 'url';
	              var allowEdit        = options.allowEdit        || true ;
	              var quality          = options.quality          || 50; 
	              var saveToPhotoAlbum = options.saveToPhotoAlbum || true; 
	              var targetWidth      = options.targetWidth;
	              var targetHeight     = options.targetHeight;
	             
	              if(fn == null){
			              api.getPicture({
								sourceType      : operation,
								encodingType    : encodingType,
								mediaValue      : mediaValue,
								destinationType : destinationType,
								allowEdit       : allowEdit,
								quality         : quality,
								targetWidth     : targetWidth,
								targetHeight    : targetHeight,
								saveToPhotoAlbum: saveToPhotoAlbum
						  }, function(ret, err) {
								if (ret) {
								    if(ret.data != ""){
								            var options  = {};
								            options.path = ret.data; 
									        nativeXP.FNImageClip(options);
									}
								} 
						  });
				  }else{
				  	      api.getPicture({
								sourceType      : operation,
								encodingType    : encodingType,
								mediaValue      : mediaValue,
								destinationType : destinationType,
								allowEdit       : allowEdit,
								quality         : quality,
							    targetWidth     : targetWidth,
								targetHeight    : targetHeight,
	                            saveToPhotoAlbum: saveToPhotoAlbum
						  }, fn);
				  }
	      
	      }
	}
	
	/*
	 * 封装 图片 裁剪
	 **/
	nativeXP.FNImageClip = function(options){
	       return new nativeXP.FNImageClip.prototype.init(options);
	}
	
	nativeXP.FNImageClip.prototype = {
	        
	        init:function(options){
	              var path        = options.path;
	              var FNImageClip = api.require('FNImageClip');
				  FNImageClip.open({
					    rect: {
					        x: 0,
					        y: 0,
					        w: api.winWidth,
					        h: api.winHeight
					    },
					    srcPath: path,
					    style: {
					        mask: 'rgba(0,0,0,0)',
					        clip: {
					            w: 100,
					            h: 100,
					            x: 50,
					            y: 50,
					            borderColor: '#0f0',
					            borderWidth: 1,
					            appearance: 'rectangle'
					        }
					    },
					    fixedOn: api.frameName
					}, function(ret, err){        
					    if( ret ){
					        alert( JSON.stringify( ret ) );
					    }else{
					        alert( JSON.stringify( err ) );
					    }
					});
	        
	        }
	}
	
	
	/***
	 * 封装 remote 和 local 信息同步 
	 * */
	nativeXP.localStore = function(options){
	      
	      return new nativeXP.localStore.prototype.init(options);
	}
	
	nativeXP.localStore.prototype = {
	   
	      init:function(options){
	           var url      =  options.url;
	           var param    =  options.params;
	           var method   =  options.method  || 'get';
	           var localKey =  options.localKey;
	           //获取ajax信息
			   api.ajax({
				     url      : url,
				     method   : method,
				     dataType : 'json',
				     returnAll: false ,
				     timeout  : 30    ,
				     data:{
				        values: param
				     }
			   },function(ret,err){
			         store.set(localKey, ret.Result);  
			   });
	      }
	}
	
	nativeXP.localStorage = {
	    set: function(key, val, exp) {
	        store.set(key, { val:val, exp:exp, time:new Date().getTime() });
	    },
	    get: function(key) {
	        var info = store.get(key);
	        if (!info) { return null }
	        if (new Date().getTime() - info.time > info.exp) { return null }
	        return info.val;
	    }
	};
	
	/**
	 *   获得对象的 具体 类型
	 * */
	nativeXP.type = function(v){
	     return Object.prototype.toString.call(v);
	}
	
	/**
	 *   JSON 查询 对象
	 * **/
	nativeXP.jsonObjFilter = function(key , value , list){
		 var dataVal = {};
	     for(var i=0 ; i<list.length ; i++){
	            var obj  = list[i];
	            if(obj!=null){
	            	    if(obj[key] == value){
		               dataVal  =  obj;
		               dataVal.xp_index = i;
		               return dataVal;
		            }
	            }
	     }
	     return dataVal;
	}
	
	/*
	 *   判断是否是 为空对象{}
	 */
	nativeXP.isEmptyObject = function(obj){
		var t;
		for(t in obj){
			return false;
		}
		return true;
	}
	
	/*
	 *  JSON 查询 集合
	 * **/
	nativeXP.jsonArrFilter = function(key , value , list){
	     var newArr = [];
	     for(var i=0 ; i<list.length ; i++){
	            var obj  = list[i];
	            if(obj[key] == value){
	               newArr.push(obj);
	            }
	     }
	     return newArr;
	}
	
	/*
	 * JSON集合中 移除 元素
	 */
	nativeXP.jsonArrRemove = function(key,value,list){
		 for(var i=0 ; i<list.length ; i++){
	            var obj  = list[i];
	            if(obj[key] == value){
	               list.splice(i,1);
	            }
	     }
		 return list;
	}
	
	
	/**
	 *   集合合并
	 */
	nativeXP.mergeArr = function(oldArr,newArr){
	    for(var i=0 ; i<newArr.length ; i++){
	        var newObj = newArr[i];
	        oldArr.push(newObj);
	    }
	    return oldArr;
	}
	
	
	/**
	 *  获得 当前日期 后几个月
	 */
	nativeXP.complementFutureDate = function(numMonth){
		
		    var complDate = [];  
	        var curDate = new Date();  
	        var y = curDate.getFullYear();  
	        var m = curDate.getMonth() + 1;  
	        //第一次装入当前月(格式yyyy-mm)  
	        complDate[0] = y + "-" + (m.toString().length == 1 ? "0" + m : m);  
	        m++;  
	        //第一次已经装入,numMonth少计算一次  
	        for (var i = 1; i < numMonth; i++, m++) {  
	            if (m == 13) {  
	                //到12月后,前推一年  
	                y++;  
	                m = 1; //再从1月往前推  
	            }  
	            complDate[i] = y + "-" + (m.toString().length == 1 ? "0" + m : m);  
	        }  
	        return complDate;  
	}
	
	//判断数组是否重复
	nativeXP.isArrRepeat = function(ary){
		var repeatName = "";
		var nary=ary.sort();
		for(var i=0;i<ary.length;i++){ 
			if (nary[i]==nary[i+1]){ 
			    repeatName = nary[i];
			    return repeatName;
			}
		
		}
	    return repeatName;
	}
	
	//通过日期 获取 星期几
	nativeXP.getWeekByDate = function(date){
		var week     = new Date(date).getDay();
		var weekText = "周一";
		switch(week)
	    {
	       case 1:
		       weekText = "周一";
		       break;
	       case 2:
		       weekText = "周二";
		       break;
		   case 3:
			   weekText = "周三";
			   break;
	       case 4:
		       weekText = "周四";
		       break;
	       case 5:
		       weekText = "周五";
		       break;
		   case 6:
			   weekText = "周六";
			   break;       
	       default:
	           weekText = "周日";
			   break;    
	     }
	     return weekText;
	}
	
	//获得前后日期 的方法
	nativeXP.getNextDay = function(AddDayCount,ymd) {
		    var date = "";
		    var dd   = {};
		    if(ymd == null){
		    	    dd   = new Date();
		    }else{
		    	    dd   = new Date(ymd);
		    }
	            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
	        var y = dd.getFullYear();;    
	        var m = dd.getMonth()+1;//获取当前月份的日期    
	        var d = dd.getDate();    
	        date += y + "-";
	        if (m >= 10 ) 
	        { 
	            date += m + "-"; 
	        } 
	        else
	        { 
	            date += "0" + m + "-"; 
	        } 
	        if (d >= 10 ) 
	        { 
	            date += d ; 
	        } 
	        else
	        { 
	            date += "0" + d ; 
	        } 
	 
	        return date;    
	}
	
	 //获得前后日期 的方法
	nativeXP.DateDiff = function(strDateStart,  strDateEnd) {
		   var strSeparator = "-"; //日期分隔符
		   var oDate1;
		   var oDate2;
		   var iDays;
		   oDate1= strDateStart.split(strSeparator);
		   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
		   var strDateE = {};
		   if(strDateEnd == null){
		   	   strDateE = new Date();
		   }else{
		   	   oDate2= strDateEnd.split(strSeparator);
		       strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
		   }
		   
		   var dateStart   = new Date(strDateStart); 
		   var dateEnd     = new Date(strDateE);
		   
		   strDateEnd = dateEnd.getFullYear() +"-" + (dateEnd.getMonth() + 1) + "-" + dateEnd.getDate();
		    
		   iDays = parseInt(Math.abs(dateStart - dateEnd) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
		   if(dateStart < dateEnd){
		   	   iDays = 0 - iDays;
		   }else{
		   	   if(strDateStart != strDateEnd){
		   	   	    iDays += 1;
		   	   }
		   }
		   
		   return iDays ;    
	}
	
	//获得js前后多少天的方法
	nativeXP.GetDateStr = function(AddDayCount,date){
		   var dd  =  null;
		   if(date == null){
		   	   dd  =  new Date();
		   }else{
		   	   dd  =  new Date(date);
		   }
		  
		   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
		   var y = dd.getFullYear();   
		   var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
		   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
		   return y+"-"+m+"-"+d;   
	}
	
	
	//JSON对象转换成URL
	nativeXP.tgParmsFun = function(parmData) {
		var s = [];
		function add(key, value) {
	        s[s.length] = key + "=" + value;
		};
	
		for (prefix in parmData) {
		
			if (parmData[prefix]) {
				add(prefix, parmData[prefix]);
			}
		}
		return s.join("&");
	}
	
	
	
	
