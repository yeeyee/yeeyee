$(function(){
	//定义autoYCenter函数，自动垂直居中
	function autoYCenter($a){
		winHeight=$(window).height();
		if((winHeight)<($a.height()+35+11+25)){
			z=0;
		}else{
			z=($(window).height()-$a.height())/2-30;
		}
		$a.animate({"margin-top":z},200);
	}
	autoYCenter($("#main_right"));
	autoYCenter($("#main_left"));
		
	$(window).bind("resize",function(){
		autoYCenter($("#main_right"));
		autoYCenter($("#main_left"));
	});
	$(window).scroll(function(){
		autoYCenter($("#main_right"));
		autoYCenter($("#main_left"));
	});
	
	set=window.setInterval(function(){
		autoYCenter($("#main_right"));
		if($("#black_top #status #user a").text()=="登录▼"){
			location.href="index.html";
		}
	},1000);
	//定义delayRun函数，延时执行
		function delayRun(code,time) {
			var t=setTimeout(code,time);
		}
	$("#main_right #set_con input").focusAndBlur();//为各input加focusAndBlur入函数
	
	//定义发布框图片上传函数

		picUpload_fun();

		function picUpload_fun(){
			var btnUpload=$('#inputForm_photo');
			var status=$('#status');
			new AjaxUpload(btnUpload, {
				action: 'service/uploadpic2.php',
				name: 'uploadfile',
				onSubmit: function(file, ext){
					 if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){ 
						$("#system_message").text("Sorry……只能上传 JPG, PNG or GIF 格式的图片。").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -70px"});
						return false;
					}
					$("#system_message").text("Uploading……").slideDown(100).css({"background-image":"url(../images/others/loading.gif)","background-position":"0 3px"});
				},
				onComplete: function(file, response){
					if(response){
						
						$("#system_message").text("上传成功！").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -46px"});
						delayRun(function(){
							$("#system_message").slideUp(100);
						},1500);
						$("#inputForm_photo a:eq(1)").text(response);
					}else{
						$("#system_message").text("上传失败……").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -70px"});
					}
				}
			});	
			
			//$("#inputForm_photo").mouseleave(function(){
//				$("input[type='file']").css("display","none");
//			})
//			$("input[type='file']").css("z-index","-1");
			$("#inputForm_photo").click(function(){

				//$("input[type='file']").trigger("click");
				//if($("#black_top #status #user a").text()=="登录▼"){
//					$("input[type='file']").css("z-index","-1");
//					statusLit("请先登录吧，在右上角哦！","error",15,"left",38.2,80);
//					if($("#loginForm").css("display")=="none"){
//						$("#black_top #status #user a").trigger("click");
//					}
//				}else{
//					$("input[type='file']").css("z-index","2147483583");
//				}
			});
		}
	
	//处理密码输入框的变化
		var passwordInput2=('<input type="password" name="sign_password'+'" id="sign_password'+4+'" value="" />');
		$("#main_right #set_con #sign_password").focus(function(){
			var txt=$(this).val();
			if(txt==this.defaultValue){
				$(this).val("").removeClass("grey");
			}
			$(this).after(passwordInput2);
			$("#sign_password4").focus().blur(function(){
				var txt=$(this).val();
				if(txt==""){
					$("#sign_password").slideDown(0);
					$(this).remove();
				}
			});
			$(this).slideUp(0);
		}).blur(function(){
			var txt=$(this).val();
			if(txt==""){
				$(this).val(this.defaultValue).addClass("grey");
			}
		});	
	//用户设置 按钮
		$("#userSet").click(function(){
			$("#userImgSet_div,#contractSet_div,#profileSet_div,#userPasswordSet_div").hide();
			$("#userSet_div").show();
			delayRun(function(){
				autoYCenter($("#main_right"))
			},300);
			$("#statusLit").remove();
		})
		$("#userSet_div input").keydown(function(e) {
			if(e.keyCode==13){
				$('#save1').trigger("click");
				return false;
			}
		});
	//头像设置 按钮
		$("#userImgSet").click(function(){
			$("#userSet_div,#contractSet_div,#profileSet_div,#userPasswordSet_div").hide();
			$("#userImgSet_div").show();
			delayRun(function(){
				autoYCenter($("#main_right"))
			},300);
			$("#statusLit").remove();
		});
	//密码设置 按钮
		$("#userPasswordSet").click(function(){
			$("#userSet_div,#contractSet_div,#profileSet_div,#userImgSet_div").hide();
			$("#userPasswordSet_div").show();
			delayRun(function(){
				autoYCenter($("#main_right"))
			},300);
			$("#statusLit").remove();
		});
		$("#userPasswordSet_div input").keydown(function(e) {
			if(e.keyCode==13){
				$('#savepassword').trigger("click");
				return false;
			}
		});
	//联系设置 按钮
		$("#contractSet").click(function(){
			$("#userSet_div,#userImgSet_div,#profileSet_div,#userPasswordSet_div").hide();
			$("#contractSet_div").show();
			delayRun(function(){
				autoYCenter($("#main_right"))
			},300);
			$("#statusLit").remove();
		});
		$("#contractSet_div input").keydown(function(e) {
			if(e.keyCode==13){
				$('#save3').trigger("click");
				return false;
			}
		});
	//个人资料 按钮
		$("#profileSet").click(function(){
			$("#userSet_div,#userImgSet_div,#contractSet_div,#userPasswordSet_div").hide();
			$("#profileSet_div").show();
			delayRun(function(){
				autoYCenter($("#main_right"))
			},300);
			$("#statusLit").remove();
		});
		$("#profileSet_div input").keydown(function(e) {
			if(e.keyCode==13){
				$('#save4').trigger("click");
				return false;
			}
		});
		
		$("#main_right #set_con #sections span").click(function(){
			$("#main_right #set_con #sections span").removeClass("click");
			$(this).addClass("click");
		})
		
/////////////////////////////////////////////////////////////////////////////////////////////////
	$.get("service/login.php",{"func":"loadProfile"},function(data){
		loadProfile();
		avatar();
	});
	$('#save1').click(function(){
		var _nickname;
		if ($("#sign_nickName").val()=='我的昵称……') $("#sign_nickName").val('');
		_nickname=$("#sign_nickName").val();
		if (_nickname!=''){
			statusLit("保存中……","wait",15,"left",38.2,($(window).height()/2));
			$.post('service/setting.php',{"func":"save1","nickname":_nickname},function(data){
				if (data=='0') {
					statusLit("保存成功！","tick",15,"left",38.2,($(window).height()/2));	
					saveAll();
				}
			})
		} else {
			statusLit("保存失败……","error",15,"left",38.2,($(window).height()/2));
		}
	});
	$('#save2').click(function(){
		var _filename;
		if($("#file_upload_name").val()!=''){
			statusLit("保存中……","wait",15,"left",38.2,($(window).height()/2));
			_filename=$("#inputForm_photo a:eq(1)").text();
			$.post('service/setting.php',{"func":"save2","filename":_filename},function(data){
				if (data=='0') {
					statusLit("保存成功！","tick",15,"left",38.2,($(window).height()/2));	
					avatar();	
				}
			});
		}else{
			statusLit("保存失败……","error",15,"left",38.2,($(window).height()/2));
		}
	});
	$('#save3').click(function(){
		statusLit("保存中……","wait",15,"left",38.2,($(window).height()/2));
		var _phone,_shortnum,_qq,_weibo,_renren;
		if ($("#sign_phone").val()=='我的手机长号……') $("#sign_phone").val('');
		if ($("#sign_ShortNum").val()=='我的手机短号……') $("#sign_ShortNum").val('');
		if ($("#sign_qq").val()=='我的QQ号码……') $("#sign_qq").val('');
		if ($("#sign_weibo").val()=='我的微博地址……') $("#sign_weibo").val('');
		if ($("#sign_renren").val()=='我的人人首页……') $("#sign_renren").val('');
		_phone=$("#sign_phone").val();
		_shortnum=$("#sign_ShortNum").val();
		_qq=$("#sign_qq").val();
		_weibo=$("#sign_weibo").val();
		_renren=$("#sign_renren").val();
		$.post('service/setting.php',{"func":"save3","phone":_phone,"shortnum":_shortnum,"qq":_qq,"weibo":_weibo,"renren":_renren},function(data){
			statusLit("保存成功！","tick",15,"left",38.2,($(window).height()/2));	
			saveAll();
		},"text");
	});
	$('#save4').click(function(){
		statusLit("保存中……","wait",15,"left",38.2,($(window).height()/2));
		var _realname,_grade,_degree,_college,_note,_major;
		if ($("#sign_realName").val()=='我的真实姓名……') $("#sign_realName").val('');
		if ($("#sign_grade").val()=='我的入学年级……') $("#sign_grade").val('');
		if ($("#sign_degree").val()=='我的学历……') $("#sign_degree").val('');
		if ($("#sign_college").val()=='我的学院……') $("#sign_college").val('');
		if ($("#sign_major").val()=='我的专业……') $("#sign_major").val('');
		if ($("#sign_note").val()=='我的备注……') $("#sign_note").val('');
		_realname=$("#sign_realName").val();
		_grade=$("#sign_grade").val();
		_degree=$("#sign_degree").val();
		_college=$("#sign_college").val();
		_major=$("#sign_major").val();
		_note=$("#sign_note").val();
		$.post('service/setting.php',{"func":"save4","realname":_realname,"grade":_grade,"degree":_degree,"college":_college,"major":_major,"note":_note},function(data){
			statusLit("保存成功！","tick",15,"left",38.2,($(window).height()/2));	
			saveAll();
		},"text");
	});
	$('#savepassword').click(function(){
		statusLit("保存中……","wait",15,"left",38.2,($(window).height()/2));
		var _old,_password,_check;
		if ($("#sign_password_old").val()=='我的易易原密码') $("#sign_password_old").val('');
		if ($("#sign_password_new").val()=='我的易易新密码，不少于6位……') $("#sign_password_new").val('');
		if ($("#sign_password_check").val()=='确认新密码') $("#sign_password_check").val('');
		_old=$("#sign_password_old").val();
		_password=$("#sign_password_new").val();
		_check=$("#sign_password_check").val();
		if (_password != _check){
			statusLit("两次输入的新密码不同，<br />请重新输入！","error",3,"left",38.2,($(window).height()/2));	
		} else {
			$.post('service/setting.php',{"func":"savepassword","old":_old,"new":_password},function(data){
				if (data=='0'){
					statusLit("保存成功！","tick",15,"left",38.2,($(window).height()/2));	
				}
				else {
					$('#sign_password_wrong').text('原密码错误，请重新输入！');
					statusLit("原密码错误，<br />请重新输入！","error",3,"left",38.2,($(window).height()/2));	
				}
			},"text");
		}
	});
	
	
	function statusLit(text,statusPic,marginTop,LOrR,rlPrercent,statusLitTop){
		$("#statusLit").remove();
		$("body").append('<div id="statusLit" class="popup" style="'+LOrR+':'+rlPrercent+'%;"><div><img src="images/others/'+statusPic+'.gif" width="46" height="44" alt="tick" /></div><div style="margin-top:'+marginTop+'px;">'+text+'<p>(3.82秒后此提示消失~)</p></div></div>')
		$("#statusLit").css({"top":statusLitTop});
		$("#statusLit").delay(3820).slideUp(200,function(){
			$("#statusLit").remove();
		});
	}

	function avatar(){
		$.getJSON('service/login.php',{"func":"checklogin"},function(data){
			if(data){
				$("#currentavatar,#currentavatar2").html('<img src="/uploads/userspic/'+data.avatar+'" height="50" width="50" alt="用户'+data.nickname+'的头像"/>');
				$("#user").html('<a><img height="25" width="25" alt="user" src="/uploads/userspic/'+data.avatar+'">'+data.nickname+'▼</a>');
				$("img").load(function(e){
					autoYCenter($("#main_right"));
				});
			}
			else{
				$("#currentavatar").text("用户头像未设定");
			}
		});
	}
	
	function loadProfile(){
		$.getJSON('service/setting.php',{"func":"profile"},function(data){
			
					$("#sign_nickName").val(data.nickname);
					$("#userInfo_userName").text(data.nickname);
					$("#userInfo_email").html('<a>E-mail：'+data.email+'</a>');
					$("#sign_phone").val(data.phone);
					$("#sign_ShortNum").val(data.shortnum);
					$("#sign_qq").val(data.qq);
					$("#sign_weibo").val(data.weibo);
					$("#sign_renren").val(data.renren);
					$("#sign_realName").val(data.realname);
					$("#sign_grade").val(data.grade);
					$("#sign_college").val(data.college);
					$("#sign_major").val(data.major);
					$("#sign_note").val(data.note);
					$("#sign_degree").val(data.degree);
					
					$("input:text").trigger("blur");
					$.each($("input:text"),function(){
						if($(this).attr("value").indexOf("……")==-1){
							$(this).removeClass("grey");
						}
					});
					
					if(data.auth=="y"){
						$("#userName div img").remove();
						$("#userInfo_userName").after('<div><a href="auth.html" target="_blank"><img src="images/others/sc.gif" width="96" height="25" alt="sc" /></a></div>');
						$("#userName div img").unbind("hover");
						$("#userName div img").hover(function(){
							statusLit2("该用户得到了<b>校友认证</b>！<br />了解详情，请狠狠地点击图标！","sc2",3,$(this).offset().left-150,$(this).offset().top+30);
						},function(){
							$("#statusLit").remove();
						});
					}
					$("#userInfo_signintimes").text("你的登录次数："+(data.signintimes-1));
			
			
		});
	}
	
	
	function statusLit2(text,statusPic,marginTop,statusLitLeft,statusLitTop){
		$("#statusLit").remove();
		$("body").append('<div id="statusLit" class="popup"><div><img src="images/others/'+statusPic+'.gif" width="46" height="44" alt="tick" /></div><div style="margin-top:'+marginTop+'px;">'+text+'<p>(3.82秒后此提示消失~)</p></div></div>');
		$("#statusLit").css({"left":(statusLitLeft)});
		$("#statusLit").css({"top":(statusLitTop-$(window).scrollTop())});
		$("#statusLit").delay(3820).slideUp(200,function(){
			$("#statusLit").remove();
		});
	}

});