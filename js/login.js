$(function(){
 booleanUser=0;		

//主顺序-打包成函数
	var MAIN_FUNCTION_LOGIN=[
		function(){
			$.get("service/login.php",{"func":"showsign"},function(data){
				drawSign(data);
				takeone_fun();	
			});
		},function(){
			checklogin();
		},function(){
			$.get("service/login.php",{"func":"loadLoginForm"},function(data){
				drawLoginForm(data);
				$("#loginButton").click(login);
				logout();
				takeone_fun();
			});
		},function(){
			user_click_fun();
		}
	]
	$(document).queue("MAIN_FUNCTION_QUEUE_LOGIN",MAIN_FUNCTION_LOGIN);
	
	takeone_fun();
	
	function takeone_fun(){
		$(document).dequeue("MAIN_FUNCTION_QUEUE_LOGIN");
	}
	
	
//函数定义
function user_click_fun(){
	$("#black_top #status #user").click(function(){
		if(booleanUser==0){
				$("#loginForm").slideDown(100);
				$(this).children("a").hover(function(){  //重置hover 不变的样式
					$(this).css({"background-color":"#FFF","color":"#999"});
				},function(){
					$(this).css({"background-color":"#FFF","color":"#999"});
				});
				$(this).children("a").css({"background-color":"#FFF","color":"#999","padding-bottom":"14px"});//使得black_top_user a稍有下拉
				$("#loginForm form input").focusAndBlur();//对于"用户登录"使用focus Blur
				$("#loginForm form input").keydown(function(e) {
					if(e.keyCode==13){
						$("#loginForm #loginButton").trigger("click");
					}
				});
		}else if(booleanUser==1){
				$(this).children("a").css({"background-color":"","color":"#fff","padding-bottom":"6px"});
				$("#loginForm").slideUp(100);//登录框1消失
				$(this).children("a").hover(function(){
					$(this).css({"background-color":"#616161","color":"#fff"});
				},function(){
					$(this).css({"background-color":"","color":"#fff"});
				})
		}
		booleanUser=!booleanUser;
	})
	takeone_fun();
}

function checklogin(){
	$.getJSON("service/login.php",{"func":"checklogin"},function(data){
		if(data!=0){
			$("#user").html('<a><img height="25" width="25" alt="user" src="/uploads/userspic/'+data.avatar+'">'+data.nickname+'▼</a>');
		}else{
			$("#user").html('<a>登录▼</a>');
		}
		//$("#user").html(data).ready(function(e){
			//alert(signintimes);
			//if(signintimes==1){
//				firstGuiding();
//			}
		//});	
		takeone_fun();
	});
}
function logout(){
	$("#logoutButton").click(function(){
		booleanUser=!booleanUser;
			$.get("service/login.php",{"func":"logout"},function(data){
				if (data==1){
					$("#user a").text("注销中……").css({"background-color":"","color":"#fff","padding-bottom":"0px"});
					$("#inputForm_up,#main_more_okOrNo #main_more_no").trigger("click");
					$("#card_more2").trigger("click");
					$.get("service/login.php",{"func":"showsign"},function(data){
						drawSign(data);
					});
					checklogin();
					$("#loginForm").slideUp(200,function(){
						$.get("service/login.php",{"func":"loadLoginForm"},function(data){
							drawLoginForm(data);
							$("#loginButton").click(login);
						});
					});
				}
			},'text');
		$("#black_footer #sMessages").html('');
		$("input[type='file']").css("z-index","-1");//////超时空穿越，哇咔咔
	});
}
function login(){
	var _email,_password,loginStatus;
	_email=$("#email").val();
	_password=$("#password").val();
	$.post("service/login.php",{"func":"login","email":_email,"password":_password},function(data){
		if(data!=0){
			$("#sign a").remove();
			$("#user a").text("登录中……").css({"background-color":"","color":"#fff","padding-bottom":"6px"});
			$("#inputForm_up").trigger("click");
			$("#card_more2").trigger("click");
			booleanUser=!booleanUser;
			$("#loginForm").slideUp(200,function(){							
				$.get("service/login.php",{"func":"loadLoginForm"},function(data){
					drawLoginForm(data);
					logout();
				});
			});
			checklogin();				
		} else {
			$("#findPassword").slideUp(100).delay(100).slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","padding-left":"16px"});
			$("#findPassword").text("E-mail或密码错误，忘记密码？");
		}
	},"text");
	$("input[type='file']").css("z-index","2147483583");//又再超时空穿越，哇咔咔
}
//draw函数
	function drawLoginForm(data){
		if(data==1){
			$("#loginForm").html(
				'<form>'+
					'<input id="email" class="grey" type="text" name="email" value="你的E-mail……" />'+
					'<input id="password" class="grey" type="password" name="password" value="......" />'+
					'<div id="loginButton">登录</div>'+
					'<a id="findPassword" href="/findpassword.html" target="_blank">忘记密码？</a>'+
				'</form>'
			);
			$("#loginForm").css({"height":"135px"});
		}else{
			$("#loginForm").html(
				'<a href="set.html" target="_blank"><div id="loginForm2_set">个人设置</div><a>'+
				'<a><div id="logoutButton">退出</div></a>'
			)
			$("#loginForm").css({"height":"85px"});
		}
	}
	function drawSign(data){
		if(data){
			$("#sign").html('<a href="signup.html">注册▼</a>');
		}
	}


//定义delayRun函数，延时执行
	function delayRun(code,time) {
		var t=setTimeout(code,time);
	}	
});