// JavaScript Document
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
	//定义delayRun函数，延时执行
		function delayRun(code,time) {
			var t=setTimeout(code,time);
		}
		
	$("#main_right #sign_con #firstStep input,#main_right #sign_con #secondStep input").focusAndBlur();//为各input加focusAndBlur入函数

	$("#main_right #sign_con #firstStep input").keydown(function(e) {
		if(e.keyCode==13){
			$("#main_right #sign_con #sign_con_signup").trigger("click");
			return false;
		}
	});
	$("#main_right #sign_con #sign_con_signup").click(function(){//"注册"键按下
		var _email=$("#sign_e-mail").val();
		if(_email.indexOf('@')!=-1){
			boolean_signup=1;
		}
		var _nickname=_email.substring(_email.lastIndexOf("@"),0);
		var emailAdd=_email.substring(_email.lastIndexOf("@")+1,_email.length);
		if (_email != '此处输入你的E-mail……' && _email != '' && _email.indexOf('@')!=-1){
			$.post("service/signup.php",{"func":"signup","email":_email,"nickname":_nickname},function(data){
				if (data=='0'){
					$.get("service/signup.php",{"func":"autopsw"},function(data){
						$("#sign_autopsw").text(data);
					});
					$("#main_right #sign_con #secondStep").slideDown(100);
					delayRun(function(){
						$("#main_right #sign_con #firstStep").slideUp(100);
						switch(emailAdd){
							case "126.com":
								emailAddress="http://www.126.com";
								break;
							case "qq.com":
								emailAddress="http://mail.qq.com";
								break;
							case "gmail.com":
								emailAddress="http://gmail.google.com";
								break;
							case "163.com":
								emailAddress="http://mail.163.com";
								break;
							case "sina.cn":
								emailAddress="http://mail.sina.cn";
								break;
							case "sina.com":
								emailAddress="http://mail.sina.com";
								break;
							case "hotmail.com":
								emailAddress="http://www.hotmail.com";
								break;
							case "sohu.com":
								emailAddress="http://mail.sohu.com";
								break;
							case "yahoo.cn":
								emailAddress="http://mail.yahoo.cn";
								break;
							case "139.com":
								emailAddress="http://mail.139.com";
								break;
							case "189.cn":
								emailAddress="http://mail.189.cn";
								break;
							default:
								$("#main_right #sign_con #thirdStep p #emailAddress").hide();
								break;
						}
						$("#main_right #sign_con #thirdStep p #emailAddress").attr("href",emailAddress);
					},100);
					delayRun(function(){
						autoYCenter($("#main_right"))
					},400);
				} else {
					$('#firstStep .wrong').show();
				}
			});
		} else {
			$('#firstStep .wrong').text('输入错误！');
			$('#firstStep .wrong').show();
		}
	});
	$("#main_right #sign_con #secondStep input").keydown(function(e) {
		if(e.keyCode==13){
			$("#main_right #sign_con #change1").trigger("click");
			return false;
		}
	});
	$("#main_right #sign_con #change1").click(function(){//"更改"密码 键按下
		var _password=$("#sign_password").val();
		if (_password.length<=5){
			$("#main_right #sign_con .wrong").show();
		} else {
			$.post("service/signup.php",{"func":"changepsw","newpsw":_password},function(data){			
					$("#main_right #sign_con #secondStep label:eq(2)").slideDown(100);
					$("#main_right #sign_con #thirdStep").slideDown(100);
					delayRun(function(){
						$("#main_right #sign_con #secondStep").slideUp(100);
					},100);
					delayRun(function(){
						autoYCenter($("#main_right"))
					},400);
			});
			$.get("service/signup.php",{"func":"activatemail"});
		}
	})
	$("#main_right #sign_con #change2").click(function(){
		$.get("service/signup.php",{"func":"activatemail"});
		$("#main_right #sign_con #secondStep label:eq(2)").slideDown(100);
		$("#main_right #sign_con #thirdStep").slideDown(100);
		delayRun(function(){
			$("#main_right #sign_con #secondStep").slideUp(100);
		},100);
		delayRun(function(){
			autoYCenter($("#main_right"))
		},400);
	});
	$("#main_right #sign_con #thirdStep #sign_con_detail").click(function(){//"详细资料"键按下
		location.href="set.html";
	})
	$("#main_right #sign_con #thirdStep #sign_con_go").click(function(){//"开始"键按下
		$.get("service/login.php",{"func":"loadProfile"},function(data){
			location.href="index.html";	
		});
	})
})