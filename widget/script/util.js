nativeXP = {};
/**
 *  domainCfg 全局变量
 * ***/
domainCfg = {};

domainCfg.domain = 'http://jingwang18.com/jw/mobile/interface';
//登陆
domainCfg.login  = domainCfg.domain + '/merLogin'; 

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
        var url       = options.url;
        var name      = url.substring(0,url.lastIndexOf("."));
        var pageParam = options.pageParam;
        var bounces   = options.bounces || false;
        if(options.slidBackEnabled!=null){
            slidBackEnabled = options.slidBackEnabled;
        }
        api.openWin({
                    name: name,
                    url : url,
                    pageParam: pageParam,
                    bounces:bounces,
                    allowEdit:true,
                    animation:{
                         type:"movein",                //动画类型（详见动画类型常量）
                         subType:"from_right",         //动画子类型（详见动画子类型常量）
                         duration:300
                    },
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
            var frame     = url.substring(0,url.lastIndexOf("."));
            var pageParam = options.pageParam;
            var x         = options.x   ||  0;
            var y         = options.y   ||  0;
            var w         = options.w   || 'auto';
            var h         = options.h   || 'auto';
            var bounces   = options.bounces   || false;
            var animation = options.animation || null;
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

nativeXP.setFrameGroupIndex = function setFrameGroupIndex(frameIndex,type,scroll) {
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
     refesh :{},
     construtor:nativeXP.store,   //修改构造函数
     init : function(options){
            this.url    = options.url;
            this.param  = options.param || {};
            this.elemId = options.elemId;
            this.tmpId  = options.tmpId;
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
            api.showProgress({
				    style: 'default',
				    animationType: 'fade',
				    title : '努力加载中...',
				    text  : '请稍后...',
				    modal : false
			});
			this.getDataInTemp(params,fn);	     
     },
     reload:function(fn){
            //显示加载中......
            api.showProgress({
				    style: 'default',
				    animationType: 'fade',
				    title : '努力加载中...',
				    text  : '请稍后...',
				    modal : false
			});
            this.getDataInTemp({},fn);	
     },
     pagingLoad:function(params,refesh,dir,fn){
            if(params == null){
               params = {};
            }
            params.isMerger = params.isMerger || true;
			this.getPagingDataInTmp(params,refesh,dir);	
     },
     getDataInTemp:function(params,fn){
     
             var data        = {};  
             var me          = this;
             var isMerger    = params.isMerger;
             var currentPage = params.currentPage;
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
							},function(ret,err){
							    api.hideProgress();
							    if (ret) {
		
							          var html = template(me.tmpId,ret);
							          $("#"+me.elemId).append(html);
							          
							          for(var key in ret)
									  {
		
										if(nativeXP.type(ret[key]) == '[object Array]'){
		                                      nativeXP.mergeArr(me.list,ret[key]);
		                                      if(ret[key].length == 0){
		                                            $(".ui-refresh-down").hide();
		                                      }
										  
										}
									  }
							    }else{
							          alert(JSON.stringify(err));
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
     getPagingDataInTmp:function(params,refesh,dir,fn){
     
             var data     = {};  
             var me       = this;
             var isMerger = params.isMerger;
             var refesh   = refesh;
             var dir      = dir;
             var currentPage = params.start;

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
							},function(ret,err){
							    api.hideProgress();
							    if (ret) {
							          var html = template(me.tmpId,ret);
							          $("#"+me.elemId).append(html);
							          
							          for(var key in ret)
									  {
		
										if(nativeXP.type(ret[key]) == '[object Array]'){
		                                      nativeXP.mergeArr(me.list,ret[key]);
										      if(ret[key].length == 0){
		                                           refesh.disable();
								                   $(".ui-refresh-down").hide();
										      }
										        
										      if(currentPage > 1){
										              
										           refesh.afterDataLoading(dir);    //数据加载完成后改变状态
										             
										      }
										      refesh._options.currentPage += refesh._options.pageSize;
										}
									  }
		                              me.refesh = refesh;
							    }else{
							          alert(JSON.stringify(err));
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
     clear:function(){
             $("#"+this.elemId).empty();
             $(".ui-refresh-down").show();
     },
     findByObjFilter:function(key,value){
             return nativeXP.jsonObjFilter(key , value , this.list);
            
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
          
          var url     =  options.url;
          var params  =  {};
          var param   =  options.param;
          if($('form').length > 0){
          
              param  = $('form').serializeJson();
          }  
          
          if(typeof options == "function"){
              fn = options;
          }
          if(url == null){
              url = $('form').attr("action");
          }
          
          if(param != null){
              for(var temp in param){
				  params[temp] = param[temp];
		      }
          }
          //获取ajax信息
		  api.ajax({
					    url      : url,
					    method   : 'post' ,
					    dataType : 'json',
					    returnAll: false ,
					    timeout  : 30    ,
					    data:{
					        values: params
					    }
		  },fn);
		 
		
     }
}

/**
 *  封装 localStore 存入数据
 *  init   初始化
 *  set    设置对象
 *  get    获得对象
 *  remove 删除某一对象
 *  clear  清空全部对象
 * */
nativeXP.localStore = function(options){
     this.init(options);
}


nativeXP.localStore.prototype = {
     init:function(options){
     
     },
     set : function(key, value){
        //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
        //这时一般在setItem之前，先removeItem()就ok了
        if( this.get(key) !== null )
            this.remove(key);
        localStorage.setItem(key, value);
    },
    //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
    get : function(key){
        var v = localStorage.getItem(key);
        return v === undefined ? null : v;
    },
    remove : function(key){ localStorage.removeItem(key); },
    clear : function(){ localStorage.clear(); },
    each : function(fn){
        var n = localStorage.length, i = 0, fn = fn || function(){}, key;
        for(; i<n; i++){
            key = localStorage.key(i);
            if( fn.call(this, key, this.get(key)) === false )
                break;
            //如果内容被删除，则总长度和索引都同步减少
            if( localStorage.length < n ){
                n --;
                i --;
            }
        }
    }
}

/**
 *   获得对象的 具体 类型
 * */
nativeXP.type = function(v){
     return Object.prototype.toString.call(v);
}

/**
 *   JSON 查询
 * **/
nativeXP.jsonObjFilter = function(key , value , list){

     for(var i=0 ; i<list.length ; i++){
            var obj  = list[i];
            if(obj[key] == value){
               return obj;
            }
     }
}


/**
 *   集合合并
 */
nativeXP.mergeArr = function(oldArr,newArr){
    for(var i=0 ; i<newArr.length ; i++){
        var newObj = newArr[i];
        oldArr.push(newObj);
    }
}







