/*
 * Compressed by JSA(www.xidea.org)
 */
(function($,A,_){A.extend($.Slider.options,{viewNum:2,travelSize:2});$.Slider.register("multiview",{_arrange:function(C,$){var A=this._items,F=this._options.viewNum,E=$%F,G=0,_=this.perWidth=Math.ceil(C/F),B,D;this._slidePos=new Array(A.length);for(D=A.length;G<D;G++){B=A[G];B.style.cssText+="width:"+_+"px;"+"left:"+(G*-_)+"px;";B.setAttribute("data-index",G);G%F===E&&this._move(G,G<$?-C:G>$?C:0,0,Math.min(F,D-G))}this._container.css("width",_*D)},_move:function(A,F,D,_,C){var B=this.perWidth,$=this._options,E=0;C=C||$.viewNum;for(;E<C;E++)this.origin($.loop?this._circle(A+E):A+E,F+E*B,D,_)},_slide:function(D,A,H,C,B,_,G){var I=this,F=_.viewNum,E=this._items.length,J,$;_.loop||(A=Math.min(A,H>0?D:E-F-D));$=I._circle(D-H*A);_.loop||(H=Math.abs(D-$)/(D-$));A%=E;if(E-A<F){A=E-A;H=-1*H}J=Math.max(0,F-A);if(!G){this._move($,-H*this.perWidth*Math.min(A,F),0,true);this._move(D+J*H,J*H*this.perWidth,0,true)}this._move(D+J*H,C*H,B);this._move($,0,B);this.index=$;return this.trigger("slide",$,D)},prev:function(){var $=this._options,_=$.travelSize;if($.loop||(this.index>0,_=Math.min(this.index,_)))this.slideTo(this.index-_);return this},next:function(){var $=this._options,_=$.travelSize,A=$.viewNum;if($.loop||(this.index+A<this.length&&(_=Math.min(this.length-1-this.index,_))))this.slideTo(this.index+_);return this}})})(gmu,gmu.$)