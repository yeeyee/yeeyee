$(function(){
	//定义delayRun函数，延时执行
		function delayRun(code,time) {
			var t=setTimeout(code,time);
		}
	//登录框的效果
	//返回顶部
	var $backToTopEle=$('<div id="backToTop"></div>').appendTo($("body")).animate({opacity:0.5},0).click(function(){
		$("html,body").animate({scrollTop:0},200);
    }), backToTopFun = function(){
		var st=$(document).scrollTop();
		(st>0)?$backToTopEle.show(0):$backToTopEle.hide(0);
		 $backToTopEle.css("right",($(window).width()-1000)*0.618-70);
		//IE6下的定位
		if(!window.XMLHttpRequest){
			$backToTopEle.css("top",st+winHeight-166);    
		}
    };
    $(window).bind("scroll",backToTopFun);
    backToTopFun();
	
	//定义focusAndBlur函数
	$.fn.extend({  
		focusAndBlur:function(){  
			$(this).focus(function(){
				var txt=$(this).val();
				if(txt==this.defaultValue){
					$(this).val("").removeClass("grey");
				}
			}).blur(function(){
				var txt=$(this).val();
				if(txt==""){
					$(this).val(this.defaultValue).addClass("grey");
				}
			});	
		}
	});
	
	$("#search input").keydown(function(e) {
		if(e.keyCode==13){
			$('#search div').trigger("click");
			return false;
		}
	});
	
	$.each($("img"),function(){
		if($(this).attr("src")=="http://eiv.baidu.com/hmt/icon/21.gif"){
			$(this).hide();
		}
	});
		$("#black_footer~img").hide();
	
	

});


(function($){
	$.fn.autoTextarea=function(option){
		var opt=$.extend(true,{
					onResize:function(){},//事件触发函数
					animate:true,
					animateDuration:150,
					animateCallback:function(){},//动画完成后的回调函数
					extraSpace:20,
					Maxlimit:1000,
					namespace:"f2er"//命名空间
				},option);
		this.filter('textarea').each(function(){
			var textarea=$(this).css({resize:"none",'overflow-y':"hidden"}),
				origHeight=textarea.height(),//原始高度
				clone=(function(){//复制一份textarea
					var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
						propOb={};
					$.each(props,function(i,prop){
						propOb[prop]=textarea.css(prop);
					});
					return textarea.clone().removeAttr('id').removeAttr('name').css({
						position:'absolute',
						top:0,
						left:-9999
					}).css(propOb).attr('tabIndex',-1).insertBefore(textarea);//返回textarea
				})(),
			lastScrollTop=null,//计算最后滚动高度
			updateResize=function(){
				clone.height(0).val($(this).val()).scrollTop(10000);//隐藏的textarea滚动条位置设置为10000,如果超过这个值,就不会自适应
				//console.log(clone.scrollTop())
				//查找文字的高度
				var scrollTop=Math.max(clone.scrollTop(),origHeight)+opt.extraSpace,
					toChange=$(this).add(clone);//jquery元素组合,这样做有什么意义
				if(lastScrollTop===scrollTop){ return;}//在高度范围内,不做任何改变
				lastScrollTop=scrollTop;
				if(scrollTop>opt.Maxlimit){//超出限制最高限制就出现滚动条
					$(this).css({"overflow-y":""});
					return ;
				}
				opt.onResize.call(this);
				opt.animate && textarea.css('display')==="block"?
					toChange.stop().animate({height:scrollTop}, opt.animateDuration, opt.animateCallback)
                        : toChange.height(scrollTop);
			};
			textarea.unbind('.'+opt.namespace)//通过命名空间解除绑定
					.bind('keyup.'+opt.namespace,updateResize)
					.bind('keydown.'+opt.namespace,updateResize)
					.bind('change.'+opt.namespace,updateResize)
		});
		return this;
	}
})(jQuery)

