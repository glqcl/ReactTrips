
/**
 *  设置动态导航
 * */
nativeXP.openNavtion = function(options){
	
	   return this.init(options);
}

nativeXP.openNavtion.prototype = {
	   version:'1.00',
       author:'xupeng',
       url:"",
       pageParam:{},
       x:"",
       y:"",
       w:"",
       h:"",
       frameGroupName:{},
       nas:{},
       construtor:nativeXP.openNavtion,   //修改构造函数
       init:function(options){
             var  me           = this;
             var  store        = options.store;
             var  tmpId        = store.tmpId;
             var  elemId       = store.elemId;
             var  parentDiv    = $("#"+elemId).parent("div");
             var  parentDivId  = parentDiv.attr("id");
            
       	     me.pageParam      = options.pageParam || {};
       	     me.x              = options.x || 0;
       	     me.y              = options.y || 0;
       	     me.w              = options.w || 'auto';
       	     me.h              = options.h || 'auto';
             me.frameGroupName = options.frameGroupName;
             me.frameGroupUrl  = options.frameGroupUrl;
           
             store.load(function(ret,err){
						
						var html = template(tmpId,ret);
						me.openNewsFramegroup(ret);
						$("#"+elemId).html(html);
       
						var bar  = parentDiv.find("span.bar"),
			            left     = parentDiv.find("ul").offset().left;
			
				        me.nas = new gmu.Navigator( "#"+parentDivId, {
				            select: function( e, index, li ){
				            	   if(li != null){
					                bar.css({
					                    left: li.offsetLeft - left,
					                    width: li.childNodes[0].offsetWidth
					                });

					                nativeXP.setFrameGroupIndex({name:me.frameGroupName,index:index});
				                }
				            },
				            ready: function() {
				            	    
				                bar.appendTo($('#'+ parentDivId).find('.ui-scroller'));
				            }
				        });  
			});
       },
       /**
        *  打开 咨询的 frameGroup
        **/
       openNewsFramegroup:function(ret){
           
           var me    = this;
           var items = ret.list;
           for (var i = 0; i < items.length; i++) {
               var frameObj       = items[i];
               frameObj.title     = frameObj.name;
               frameObj.name      = me.frameGroupName + i;
               frameObj.url       = me.frameGroupUrl;
               frameObj.bounces   = 'false';
               frameObj.pageParam = {};
               frameObj.pageParam.id = frameObj.id;
           }
           api.openFrameGroup({
                name: me.frameGroupName,
                background: '#FFF',
                scrollEnabled: true,
                rect: {
                    x: me.x,
                    y: me.y,
                    w: me.w,
                    h: me.h
                },
                    index: 0,
                    frames: items
                }, function(ret) {
                              
                    var index = ret.index;
                    if(me.nas != {}){
                    	    me.nas.switchTo(index);
                    }
                    
           });

       }
};
