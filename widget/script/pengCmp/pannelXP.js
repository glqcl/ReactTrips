/**
 * @version 1.00
 * @author  徐鹏
 * @update  2015-06-08
 */
nativeXP.Pannel = function(options){
	return new nativeXP.Pannel.prototype.init(options);
};
nativeXP.Pannel.prototype = {
	version: '1.00',
	author: 'peng',
	construtor: nativeXP.Pannel, //修正构造函数指针
	init: function(options){
		
		this.winOuter = document.body;
		this.pSrc     = options.PSrc    || '';
		this.pHtml    = options.PHtml   || '';
		this.pStyle   = options.PStyle  || {width: 300, height: 200};
		this.pBtnArr  = options.PBtnArr || [];
		var thisTemp  = this;
		
		if (!this.pSrc && !this.pHtml) return;
		
		var styleText = [
							'width:'  + this.pStyle.width + 'px; ',
							'height:' + (this.pStyle.height - 20) + 'px; ',
							'margin-left:' + (-1 * Math.ceil(this.pStyle.width/2)) + 'px; ',
							'margin-top:' +  ((-1 * Math.ceil(this.pStyle.height/2)) + 20) + 'px; '
						].join('');
		
		//mainBox 的高度
		var iMainHei = 0;
		if (this.pBtnArr.length > 0){
			iMainHei = this.pStyle.height - 100;
		} else {
			iMainHei = this.pStyle.height - 50;
		}

		//alert DOM 结构初始化
		var wraptHTML = [
							'<div class="pannelWrapper" >',
								'<div class="pannelBox"   style=";' + styleText + '">',
									  this.pSrc ? '<iframe id="iframeChild" frameborder="0" allowtransparency="true" scroll="no" src="' + this.pSrc + '"></iframe>' : this.pHtml,
						             '<div class="pannelAction"></div>',
								'</div>',
							'</div>'
						].join('');
		
		//执行execu方法
		this.execu(wraptHTML);
	},
	execu: function(str){
		//判断节点是否存在
		if ($('.pannelWrapper')[0]) return false;
		
		//初始化一些变量
		var thisTemp  = this;
		
		//插入dom节点  
		$(this.winOuter).append(str);

		//获取节点
		var oPannelWrap = $('.pannelWrapper'),
			oPannelBox  = $('.pannelBox'),
			oAction     = $('.pannelAction');
		
		//整体阻止事件冒泡
		oPannelBox.on('tap', function(ev){
			//阻止冒泡
			ev.stopPropagation();
		});
		
		//阻止默认事件
		oPannelWrap.on('touchmove', function(ev){
			//ev.preventDefault();
		});
		
		if (this.pBtnArr.length > 0){
			for (var i = 0; i < this.pBtnArr.length; i++){ //处理按钮
				var oNewA       = document.createElement('a');
				oNewA.href      = 'javascript:;';
				oNewA.className = 'pannelBtn ' + this.pBtnArr[i].className;
				oNewA.innerHTML = this.pBtnArr[i].name;
				oNewA.fnEnd     = this.pBtnArr[i].callback;
				//oNewA.onclick   = function(){btnClick.call(this)}; //给按钮添加点击事件
				$(oNewA).on('tap', function(){
					btnClick.call(this);
				});
				oAction.append(oNewA);
			}
		}
		
		//给右上角关闭按钮绑定关闭事件
		$('body').on('click', '.pannelClose' ,function(ev){
			//阻止冒泡
			ev.stopPropagation();
			//执行关闭
			close();
			
			//关闭frame
			window.setTimeout(function(){
				api.closeFrame();
			},300);
			
	
		});
		
		//按钮事件
		function btnClick(){
			//回调函数
			if (this.fnEnd) this.fnEnd();
			
			if (!$(this).hasClass('confirm')){
				//执行关闭
				close();
			}
		}
		
		//关闭方法
		function close(){
			//追加 hide 
			oPannelWrap.addClass('f-hide');
			
			document.addEventListener('webkitAnimationEnd', removeEle, false);
		}
		
		
		
		
		//移除节点
		function removeEle(){
			//移除 节点 
			oPannelWrap.remove();
			//解除Pannel对象的引用
			thisTemp = null;
			//解除绑定
			document.removeEventListener('webkitAnimationEnd', removeEle, false);
		}
		
		//公开关闭方法
		this.close  = close;
	}
};
nativeXP.Pannel.prototype.init.prototype = nativeXP.Pannel.prototype;
