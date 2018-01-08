/**
 * @version 1.00
 * @author  焦质晔
 * @update  2015-06-08
 */
nativeXP.SimPannel = function(options){
	return new nativeXP.SimPannel.prototype.init(options);
};
nativeXP.SimPannel.prototype = {
	version: '1.00',
	author: 'jzy',
	construtor: nativeXP.SimPannel, //修正构造函数指针
	init: function(options){
		var outerDom = document.body,
			innerStr = options.pannelHtml || '',
			pMess    = options.pannelMess || '提示信息',
			pStyle   = options.pannelStyle || {width: 250, height: 200},
			stopMove = options.stopMove || 'true',
			attachFn = options.attachFn || null,
			pBtnArr  = options.pannelBtnArr || [];
			
		var thisTemp = this;
		
		if (innerStr == '') return;
		
		//全局变量
		var oWarpDiv = $(outerDom);
		var oWapper  = null;
		
		var styleText = [
							'width:'  + pStyle.width + 'px; ',
							'height:' + pStyle.height + 'px; ',
							'margin-left:' + (-1 * Math.ceil(pStyle.width/2)) + 'px; ',
							'margin-top:' + (-1 * Math.ceil(pStyle.height/2)) + 'px; '
						].join('');
						
		//mainBox 的高度
		var iMainHei = 0;
		if (pBtnArr.length > 0){
			iMainHei = pStyle.height - 90;
		} else {
			iMainHei = pStyle.height - 40;
		}
						
		//alert DOM 结构初始化
		var wrapperHTML = [
							'<div class="simPannelWrapper">',
								'<div class="simPannelBox" style=";' + styleText + '">',
									'<h5 class="simPannelBoxTit">', pMess ,'</h5>',
									'<div class="simPannelMain" style="height:', iMainHei ,'px;">',
										innerStr,
									'</div>',
									'<div class="simPannelAction"></div>',
								'</div>',
							'</div>'
						  ].join('');
						  
		var execute = function(str){
			//判断节点是否存在
			if ($('.simPannelWrapper')[0]) return false;
			
			//插入dom节点  
			$(outerDom).append(str);
			
			//==
			if (attachFn) attachFn();
			
			//获取节点
			var oPannelWrap = oWapper = $('.simPannelWrapper'),
				oPannelBox  = $('.simPannelBox'),
				oAction     = $('.simPannelAction');
			
			//使页面虚化
			filterFn(oWarpDiv, 'add');
			
			//阻止默认事件
			oPannelWrap.on('touchmove', function(ev){
				if (stopMove == 'true'){
					ev.preventDefault();
				}
			}).
			on('click', function(ev){
				//阻止冒泡
				ev.stopPropagation();
				//执行关闭
				close();
			});
			
			//==
			if (pBtnArr.length > 0){
				oPannelBox.on('click', function(ev){
					//阻止冒泡
					ev.stopPropagation();
				});
			}
			
			if (pBtnArr.length > 0){
				for (var i = 0; i < pBtnArr.length; i++){ //处理按钮
					var oNewA       = document.createElement('a');
					oNewA.href      = 'javascript:;';
					oNewA.className = 'simPannelBtn ' + pBtnArr[i].className;
					oNewA.innerHTML = pBtnArr[i].name;
					oNewA.fnEnd     = pBtnArr[i].callback;
					//oNewA.onclick   = function(){btnClick.call(this)}; //给按钮添加点击事件
					$(oNewA).on('click', function(){
						btnClick.call(this);
					});
					oAction.append(oNewA);
				}
			}
		};
		
		//按钮事件
		var btnClick = function(){
			//回调函数
			if (this.fnEnd) this.fnEnd();
			
			if (!$(this).hasClass('confirm')){
				//执行关闭
				close();
			}
		};
		
		//添加虚化方法
		var filterFn = function(obj, type){
			if (type == 'add'){
				obj.addClass('filter');
			} else {
				obj.removeClass('filter');
			}
		};
		
		//关闭方法
		var close = function(){
			
		    setTimeout(function(){
                	    api.closeFrame();
			},800);
			
			//追加 hide 
			oWapper.addClass('f-hide');
			
			//恢复虚化
			filterFn(oWarpDiv, 'del');
			
			document.addEventListener('webkitAnimationEnd', removeEle, false);
			
		    
		};
		
		//移除节点
		var removeEle = function(){
			//移除 节点 
			oWapper.remove();
			//==
			oWapper  = null;
			//解除Pannel对象的引用
			thisTemp = null;
			//解除绑定
			document.removeEventListener('webkitAnimationEnd', removeEle, false);
			
			
		};
		
		//公开关闭方法
		this.close = close;
		
		//执行
		execute(wrapperHTML);
	}
};
nativeXP.SimPannel.prototype.init.prototype = nativeXP.SimPannel.prototype;
