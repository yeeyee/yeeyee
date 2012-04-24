var var_sMessage_name='',var_sMessage_sc;
$(function(){
//初始化参数 卡片类：
	var maxcardEx=0,maxcardNow=0,maxcardDi=0;
	var cardPointer=0,cardStep=5;
	var cardStep_Now=parseInt($(window).height()/150);
	if(cardStep_Now>5){
		cardStep=cardStep_Now;
	}
//初始化参数 控制类：
	var navtype=1,cid=0,method=0,searchKey="yeenosearch",auth=0;
	var inputboxClosed=0,inputboxEmpty=0,inputboxDeafault=0;//发布框的参数
	var descpStatus=[];var descpContent=[],descpContent2;
//初始化操作
	//设定某任查看全部用户
		$("#main_left #category #authInfo input").attr("checked",false);
	
	//定时检查新信息
		set=window.setInterval(function(){
			//loadstream_all_new();
//			if(maxMid>0){
//				$("#card_more .card_main").text("有 "+maxMid+" 条新信息，点此刷新信息");
//				$("#card_more").slideDown(200);
//			}else{
//				$("#card_more").slideUp(200);
//			}
//			loadsms();
		},15000);//15秒
	//定义搜索框
		$("#black_top #search div").click(function(){
			searchKey=$("#black_top #search input").val();

			cid=0;
			initializtion2_1();
		});
	//定义滚动加载
		var boolean_delayRun=0;
		$(window).scroll(function(){
			y1=$(window).scrollTop();
			h2=$(window).height();
			h1=$("#main_right").height();
			if(boolean_delayRun==0){
				delayRun(function(){
				if((y1+h2)>h1 && (h1>h2)){
					cardPointer+=cardStep;
					loadStream();
				}
				boolean_delayRun=0;
			},500);
				boolean_delayRun=1;	
			}
		});
	//定义“返回主信息流”小条
	$("#card_back").click(function(){
		auth=0;	
		$("#authInfo~hr").slideDown(100);
		$("#authInfo").slideDown(100);
		$("#card_back").slideUp(100);
		initializtion2_1();		
	});
	
	//main_left的nav表定义
		$("#main_left #con #class #nav div:eq(0),#main_left #con #class #nav div:eq(1),#main_left #con #class #nav div:eq(2)").click(function(){
			switch($(this).text()){
				case "物品信息":
					navtype=1;cid=0;searchKey="yeenosearch";method=0;

					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					$("#classForm1 .emptySquare:eq(0)").trigger("click");
					$("#classForm1 .emptySquare:eq(0)").prev().attr("checked",'checked');
					break;
				case "校园信息":
					navtype=2;cid=0;searchKey="yeenosearch";method=0;

					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					$("#classForm1 .emptySquare:eq(1)").trigger("click");
					$("#classForm1 .emptySquare:eq(1)").prev().attr("checked",'checked');
					break;
				case "有爱商店":
					navtype=3;cid=0;searchKey="yeenosearch";method=1;

					$("#inputForm_uishop #inputForm_uishop_checkbox").attr({"checked":"true","disabled":"true"});
					$("#classForm1 .emptySquare:eq(2)").trigger("click");
					$("#classForm1 .emptySquare:eq(2)").prev().attr("checked",'checked');
					break;
				case "图书漂流":
					navtype=4;cid=0;searchKey="yeenosearch";method=0;

					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					$("#classForm1 .emptySquare:eq(3)").trigger("click");
					$("#classForm1 .emptySquare:eq(3)").prev().attr("checked",'checked');
					break;
				default:
					break;
			}
			$("#main_left #con #class #nav div").removeClass("click");
			$(this).addClass("click");
			
			initializtion2_1();
		});
	//main_left的校友认证过滤
		$("#main_left #category #authInfo input").click(function(){
			if($("#main_left #category #authInfo input").attr("checked")=="checked"){
				auth=1;
				initializtion2_1();
			}else{
				auth=0;
				initializtion2_1();
			}
		});
	//发布框动作系列-inputForm_name点击判断是否登录
		$("#inputForm_name").blur(function(){
			var txt=$(this).val();
			if(txt==""){
				$(this).addClass("grey");
				switch(navtype){
					case 1:
						$(this).val($("#inputForm_nameAndPrice span:eq(0)").text());
						
						break;
					case 2:
						$(this).val($("#inputForm_nameAndPrice span:eq(1)").text());
						break;
					case 3:
						$(this).val($("#inputForm_nameAndPrice span:eq(0)").text());
						break;
					case 4:
						$(this).val($("#inputForm_nameAndPrice span:eq(2)").text());
						break;
				}
				inputboxDeafault=0;
				inputboxEmpty=1;
			}
		})
	//发布框动作系列-inputForm_words的focusAndBlur
		$("#inputForm_words textarea").css("line-height","29px");
		var orgTextHeight=$("#inputForm_words textarea").height();
		$("#inputForm_words textarea").focus(function(){
			var txt=$(this).val();
			$(this).removeClass("grey").removeClass("bigFont");
			if(txt==this.defaultValue){
				$(this).val("");
				$("#inputForm_words textarea").css("line-height","16px");
			}
			$("#inputForm_words").slideDown(200);
			$("#inputForm_photoUp").slideDown(200);
		}).blur(function(){
			var txt=$(this).val();
			if(txt==""){
				$(this).animate({height:orgTextHeight},200);
				$(this).val(this.defaultValue).addClass("grey").addClass("bigFont");
				$("#inputForm_words textarea").css("line-height","29px");
			}
		});
	//发布框动作系列-input_price的focusAndBlur
		$("#input_price").focusAndBlur();
		$("#input_price").focus(function(){
			$(this).removeClass("grey");
		});
		$("#input_price").keyup(function(e){
			var inputPrice=$(this).val();
			if(isNaN(inputPrice) && inputPrice!=''){
				$("#system_message").text("请确认输入的物品价格是数字。").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -70px"});
			}else{
				$("#system_message").slideUp(100);
			}
		});
	//发布框动作系列-inputForm_words的高度自适应插件
		$("#inputForm_words textarea").autoTextarea({
			onResize:function(){
				$(this).css({opacity:0.8});
			},
			animateCallback:function(){
				$(this).css({opacity:1});
			},
			animateDuration:200,
			// More extra space:
			extraSpace:10
		});
	//发布框动作系列-inputForm_up控制的收起
		$("#inputForm_up").click(function(){
			inputboxClosed=0;
			$("#inputForm_left").css({"border-right":"0","width":"548px"});
			$("#inputForm_right2").fadeOut(0);
			$("#inputForm_right1").fadeOut(0);
			$("#inputForm_photoUp").slideUp(0);
			$("#file_upload_queue").slideUp(0);
			$("#system_message").slideUp(0);
			$("#inputForm_words").slideUp(0);
			$("#input_price").animate({width:0},0).fadeOut(0);
			$("#inputForm_name").animate({width:548},0);
			$("#inputForm_href_div").slideUp(100);
			if(($("#inputForm_href_input").val()=="和这信息相关的网址"||$("#inputForm_href_input").val()=="")&&$("#inputForm_href_div").css("display")!="none"){
				$("#inputForm_href").trigger("click");
			}
		});
	//发布框动作系列-图片上传			
		picUpload_fun();
	//发布框动作系列-超链接
		$("#inputForm_href").toggle(function(){
			$("#inputForm_href_div").slideDown(200);
			$("#inputForm_href").css("background-position","0px -93px");
			$("#inputForm_href").unbind("focus");
			$("#inputForm_href").hover(function(){
				$("#inputForm_href").css("background-position","0px -71px");
			},function(){
				$("#inputForm_href").css("background-position","0px -93px");
			})	
		},function(){
			$("#inputForm_href_div").slideUp(200);
			$("#inputForm_href").css("background-position","0px 5px");
			$("#inputForm_href").unbind("focus");
			$("#inputForm_href").hover(function(){
				$("#inputForm_href").css("background-position","0px -112px");
			},function(){
				$("#inputForm_href").css("background-position","0px 5px");
			})
			$("#inputForm_href_input").val("");
			$("#inputForm_href_input").trigger("blur");
		});
		$("#inputForm_href_input").focusAndBlur();
		$("#inputForm_href_input").focus(function(){
			$(this).removeClass("grey");
		})
	//发布框动作系列-重置按钮
		$("#inputForm_no").click(function(){
			inputForm_no_fun();
			if($("#inputForm_photo").text()!="图片"){
				$("#inputForm_photo").trigger("click");
			}
		});
	//发布框动作系列-发布按钮
		$("#inputForm_ok").click(function(){
			var _name,_price,_descp,_cid,_check,_pic;
			_name=$("#inputForm_name").val();
			_price=$("#input_price").val();
			_descp=$("#inputForm_words textarea").val().replace(/\n/g,'<br />');

			_href=$("#inputForm_href_input").val();
			
			if($("#inputForm_addclass1").text()=="目录"){
				$("#classForm1 .emptySquare:first").trigger("click");
			}
			if($("#inputForm_addclass2").text()=="分类"){
				$("#classForm2 .emptySquare:last").trigger("click");
			}

			_type=$("#classForm1 input:checked").val()
			_cid=$("#classForm2 input:checked").val()

			_pic=$("#inputForm_photo a:eq(1)").text();
			_uishop=$("#inputForm_uishop_checkbox").attr("checked");
			
			_check=true;
			if (_name==''||_name==$("#inputForm_nameAndPrice span:eq(2)").text()||_name==$("#inputForm_nameAndPrice span:eq(0)").text()||_name==$("#inputForm_nameAndPrice span:eq(1)").text()) _check=false;
			if ($("#input_price").css("display")=="none" ||$("#input_price").val()=="此物品价格") _price='';
			if (isNaN(_price)) _check=false;
			if (_price!='') _check=true;
			if (_descp==''||_descp=='有什么特别的事要跟大家说呢') _check=false;
			if (_href==''||_href=='和这信息相关的网址'){
				_href='';
			}else if(_href.indexOf("http://")<=-1){
				_href="http://"+_href;
			}
			if(_uishop=="checked"){
				_uishop=1;
			}else{
				_uishop=0;
			}
			if($("#black_top #status #user a").text()=="登录▼"){
				statusLit("请先登录吧，在右上角哦！","error",15,"left",38.2,80);
				if($("#loginForm").css("display")=="none"){
					$("#black_top #status #user a").trigger("click");
				}
			}else if(_check){
				$.post("service/stream.php",{"func":"post","name":_name,"price":_price,"descp":_descp,"href":_href,"cid":_cid,"pic":_pic,"uishop":_uishop,"type":_type},function(data){
					if (data=='0'){
						//重置	
						inputForm_no_fun();
						
						$("#inputForm_photo a:eq(0)").text('图片');
						$("input[type='file']").css("z-index","2147483583");
						$("#inputForm_photo").css("background-position","0px 5px");
						$("#inputForm_photo").hover(function(){
							$("#inputForm_photo").css("background-position","0px -112px");
						},function(){
							$("#inputForm_photo").css("background-position","0px 5px");
						})
						//提示
						statusLit("恭喜啊，发布成功了！<br />静候佳音吧！","tick",3,"left",38.2,80);

						$("#system_message").delay(100).slideUp(200);	
						delayRun(function(){
							$("#inputForm_up").trigger("click");	
						},2360);
						//刷新
						initializtion2_1();
					} else {
						$('#system_message').show();
						$('#system_message').text('发布不成功哦，你的账户还没激活。').css({"background-position":"0 -70px"});
					}
				},"text");
			}else {
				$('#system_message').show();
				$('#system_message').text('发布不成功哦，你是否漏填了些什么信息？').css({"background-position":"0 -70px"});
			}
		});	

	
//初始化函数
	//定时检查新信息
		set=window.setInterval(function(){
			loadStream_new_check();
			if(maxcardDi>0){
				$("#card_more .card_main").text("有 "+maxcardDi+" 条新信息，点此刷新信息");
				$("#card_more").slideDown(200);
			}else{
				$("#card_more").slideUp(200);
			}
			loadsms();
		},1500);//15秒
	//定义"更多"小条
		$("#card_more2").click(function(){
			initializtionALL();
		});
	//载入左侧的分类列表
		function loadCategory(){
			$.getJSON("service/stream.php",{"func":"loadcategorylist","type":navtype,"method":method,"searchKey":searchKey,"auth":auth},function(data){
				drawCategory(data);
				takeone();
			},"text");
		}
	//为了classform2
		function loadCategory_onlyform(temptype){
			$.getJSON("service/stream.php",{"func":"loadcategorylist","type":temptype,"method":method,"searchKey":searchKey,"auth":auth},function(data){
				drawCategory_onlyform(data);
				takeone3();
			},"text");
		}
	//初始化信息流的指标maxcardEx
		function loadStream_new(){
			maxcardEx=0;maxcardDi=0;
			$.get("service/streamCheckNew.php",{"func":"loadStreamCheck","type":navtype,"cid":cid,"method":method,"searchKey":searchKey,"auth":auth},function(data){
				maxcardEx=data;
				
				takeone();
			},"text");
		}
		function loadStream_new_check(){
			$.get("service/streamCheckNew.php",{"func":"loadStreamCheck","type":navtype,"cid":cid,"method":method,"searchKey":searchKey,"auth":auth},function(data){
				maxcardNow=data;
				
				maxcardDi=maxcardNow-maxcardEx;
				//alert(maxcardDi);
			},"text");
		}
	//载入信息流
		function loadStream(){
			$("#card_more2 .card_main").text("加载中，请稍后……（点此刷新）");
			$.get("service/streamCheckNew.php",{"func":"loadStreamCheck","type":navtype,"cid":cid,"method":method,"searchKey":searchKey,"auth":auth},function(data){
					maxcardNow=data;
					maxcardDi=maxcardNow-maxcardEx;
					cardPointer+=maxcardDi;
					
					if(maxcardNow<(cardPointer+cardStep)){
						$("#card_more2 .card_main").text("加载完毕，到底部（点此刷新）。");
					}else{
						$("#card_more2 .card_main").text("加载中，请稍后……（点此刷新）");
					}
					$.getJSON("service/stream.php",{"func":"loadstream","cardPointer":cardPointer,"cardStep":cardStep,"type":navtype,"cid":cid,"method":method,"searchKey":searchKey,"auth":auth},function(data){
						drawCards(data);
						$.each($(".card_user_words"),function(){							
							var sid=$(this).parents("tbody").find(".card_goods_sid").text();
							if(descpStatus[sid]==undefined) descpStatus[sid]=0;
							$(this).parent().parent().find(".click2open").unbind("click");
							$(this).parent().parent().find(".click2open").click(function(){
								if(descpStatus[sid]==0){
									$(this).text("收起");
									$(this).parent().find(".card_user_words1").hide();
									$(this).parent().find(".card_user_words2").show();
									//$(document).scrollTop();
									$("html,body").animate({scrollTop:$(this).parent().find(".card_user_words2").offset().top-60},1000);
								}else{
									$(this).text("展开");
									$(this).parent().find(".card_user_words2").hide();
									$(this).parent().find(".card_user_words1").show();
								}
								descpStatus[sid]=!descpStatus[sid];
							});
						})
						
						$(".card_main_tab_go").unbind("click");
						$(".card_main_tab_go").click(function(){
							detail($(this));
						});
						
						$(".card .card_main .card_withdraw").unbind("click");
						$(".card .card_main .card_withdraw").click(function(){
							withdraw_msg($(this));
						});

						$(".card_user_name img").unbind("hover");
						$(".card_user_name img").hover(function(){
							statusLit2("该用户得到了<b>校友认证</b>！<br />了解详情，请狠狠地点击图标！","sc2",3,$(this).offset().left-130,$(this).offset().top+20);
						},function(){
							$("#statusLit").remove();
						});
						
						$(".card_goods img").unbind("hover");
						$(".card_goods img").hover(function(){
							statusLit3("该用户选择了<b>存放到有爱商店</b>！<br />了解详情，请狠狠地点击图标！","ui",3,$(this).offset().left-130,$(this).offset().top+20);
						},function(){
							$("#statusLit3").remove();
						});
						
						$(".card_main_tab_user img").unbind("click");
						$(".card_main_tab_user img").click(function(){
							auth=$(this).attr("alt");
							$("#authInfo~hr").slideUp(100);
							$("#authInfo").slideUp(100);
							$("#card_back").slideDown(100)
							initializtion2_1();
						});

						takeone();
					},"text");
			},"text");
		}
	//左侧每个分类的点击函数
		function allcategoryli(){
			$.each($("#main_left #con #class #allcategory>li"),function(){
				$(this).click(function(){
					cid=$(this).attr("id").replace("category_","");
					$("#main_left #con #class #allcategory>li").removeClass("main_left_li_click");
					$(this).addClass("main_left_li_click");
					//$("#classForm2 form ul").find("#"+temp).trigger("click");
					$("#classForm2").find("#classForm2_"+cid+"~label").trigger("click").prev().attr("checked",'checked');
					
					initializtion2_2();
				});
			});
		}
	//定义发布框的表现类型
		function inputFormType(navtype){
			switch(navtype){
				case 1:
					if(inputboxClosed==0){
						$("#input_price").animate({width:0},0).fadeOut(0);
						$("#inputForm_name").animate({width:548},0);
					}else if(inputboxClosed==1){
						$("#inputForm_name").animate({width:300},100);
						$("#input_price").delay(150).show(0).animate({width:110},0);
					}
					if(inputboxEmpty==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
						inputboxEmpty=1;
						$(this).addClass("grey");
					}
					if(inputboxDeafault==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
						$(this).addClass("grey");
					}
								
					$("#inputForm_name").unbind("focus");
					$("#inputForm_name").focus(function(){
						inputboxClosed=1;
						$("#inputForm_words").slideDown(0);
						$("#file_upload_queue").slideDown(0);
						$("#inputForm_photoUp").slideDown(0);
						$("#inputForm_right1").fadeIn(0);
						$("#inputForm_right2").fadeIn(0);
						$("#inputForm_left").css({"border-right":"2px solid #999","width":"437px"});
						$("#inputForm_name").animate({width:300},100);
						$("#input_price").delay(150).show(0).animate({width:110},0);
						if($("#inputForm_href_input").val()!="和这信息相关的网址"&&$("#inputForm_href_input").val()!=""){
							$("#inputForm_href_div").slideDown(0);
						}
						if($(this).val()==$("#inputForm_nameAndPrice span:eq(0)").text()){
							inputboxDeafault=0;
						}
						if(inputboxDeafault==0){
							$(this).val("");
							inputboxEmpty=0;
						}
					})
					$("#inputForm_name").unbind("keyup");
					$("#inputForm_name").keyup(function(e){
						if($(this).val()==""){
							inputboxEmpty=0;
						}else if($(this).val()==$("#inputForm_nameAndPrice span:eq(0)").text()){
							inputboxDeafault=0;
						}else{
							inputboxEmpty=1;
							inputboxDeafault=1;
							$(this).removeClass("grey");
						}
					});
					$("#inputForm_uishop").show();
					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					break;
				case 2:
					if(inputboxClosed==0){
						$("#input_price").animate({width:0},0).fadeOut(0);
						$("#inputForm_name").animate({width:548},0);
					}else if(inputboxClosed==1){
						$("#input_price").animate({width:0},100).fadeOut(100);
						$("#inputForm_name").delay(250).animate({width:428},100);
					}
					if(inputboxEmpty==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(1)").text());
						inputboxEmpty=1;
						$(this).addClass("grey");
					}
					if(inputboxDeafault==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(1)").text());
						$(this).addClass("grey");
					}
					
					$("#inputForm_name").unbind("focus");
					$("#inputForm_name").focus(function(){
						inputboxClosed=1;
						$("#inputForm_words").slideDown(0);
						$("#file_upload_queue").slideDown(0);
						$("#inputForm_photoUp").slideDown(0);
						$("#inputForm_right1").fadeIn(0);
						$("#inputForm_right2").fadeIn(0);
						$("#inputForm_left").css({"border-right":"2px solid #999","width":"437px"});
						$("#input_price").animate({width:0},100).fadeOut(100);
						$("#inputForm_name").delay(250).animate({width:428},100);
						
						if($(this).val()==$("#inputForm_nameAndPrice span:eq(1)").text()){
							inputboxDeafault=0;
						}
						if(inputboxDeafault==0){
							$(this).val("");
							inputboxEmpty=0;
						}
					})
					
					$("#inputForm_name").unbind("keyup");
					$("#inputForm_name").keyup(function(e){
						if($(this).val()==""){
							inputboxEmpty=0;
						}else if($(this).val()==$("#inputForm_nameAndPrice span:eq(1)").text()){
							inputboxDeafault=0;
						}else{
							inputboxEmpty=1;
							inputboxDeafault=1;
							$(this).removeClass("grey");
						}
					});
					$("#inputForm_uishop").hide();
					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					break;
				case 3:
					if(inputboxClosed==0){
						$("#input_price").animate({width:0},0).fadeOut(0);
						$("#inputForm_name").animate({width:548},0);
					}else if(inputboxClosed==1){
						$("#inputForm_name").animate({width:300},100);
						$("#input_price").delay(150).show(0).animate({width:110},0);
					}
					if(inputboxEmpty==0){
	
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
						inputboxEmpty=1;
						$(this).addClass("grey");
					}
					if(inputboxDeafault==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
						$(this).addClass("grey");
					}
					
					$("#inputForm_name").unbind("focus");
					$("#inputForm_name").focus(function(){
						inputboxClosed=1;
						$("#inputForm_words").slideDown(0);
						$("#file_upload_queue").slideDown(0);
						$("#inputForm_photoUp").slideDown(0);
						$("#inputForm_right1").fadeIn(0);
						$("#inputForm_right2").fadeIn(0);
						$("#inputForm_left").css({"border-right":"2px solid #999","width":"437px"});
						$("#inputForm_name").animate({width:300},100);
						$("#input_price").delay(150).show(0).animate({width:110},0);
						
						if($(this).val()==$("#inputForm_nameAndPrice span:eq(0)").text()){
							inputboxDeafault=0;
						}
						if(inputboxDeafault==0){
							$(this).val("");
							inputboxEmpty=0;
						}
					})
					$("#inputForm_name").unbind("keyup");
					$("#inputForm_name").keyup(function(e){
						if($(this).val()==""){
							inputboxEmpty=0;
						}else if($(this).val()==$("#inputForm_nameAndPrice span:eq(0)").text()){
							inputboxDeafault=0;
						}else{
							inputboxEmpty=1;
							inputboxDeafault=1;
							$(this).removeClass("grey");
						}
					});
					$("#inputForm_uishop").show();
					$("#inputForm_uishop #inputForm_uishop_checkbox").attr({"checked":"true","disabled":"true"});
					break;
				case 4:
					if(inputboxClosed==0){
						$("#input_price").animate({width:0},0).fadeOut(0);
						$("#inputForm_name").animate({width:548},0);
					}else if(inputboxClosed==1){
						$("#input_price").animate({width:0},100).fadeOut(100);
						$("#inputForm_name").delay(250).animate({width:428},100);
					}
					if(inputboxEmpty==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(2)").text());
						inputboxEmpty=1;
						$(this).addClass("grey");
					}
					if(inputboxDeafault==0){
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(2)").text());
						$(this).addClass("grey");
					}
					
					
					$("#inputForm_name").unbind("focus");
					$("#inputForm_name").focus(function(){
						inputboxClosed=1;
						$("#inputForm_words").slideDown(0);
						$("#file_upload_queue").slideDown(0);
						$("#inputForm_photoUp").slideDown(0);
						$("#inputForm_right1").fadeIn(0);
						$("#inputForm_right2").fadeIn(0);
						$("#inputForm_left").css({"border-right":"2px solid #999","width":"437px"});
						$("#input_price").animate({width:0},100).fadeOut(100);
						$("#inputForm_name").delay(250).animate({width:428},100);
						
						if($(this).val()==$("#inputForm_nameAndPrice span:eq(2)").text()){
							inputboxDeafault=0;
						}
						if(inputboxDeafault==0){
							$(this).val("");
							inputboxEmpty=0;
						}
					})
					$("#inputForm_name").unbind("keyup");
					$("#inputForm_name").keyup(function(e){
						if($(this).val()==""){
							inputboxEmpty=0;
						}else if($(this).val()==$("#inputForm_nameAndPrice span:eq(2)").text()){
							inputboxDeafault=0;
						}else{
							inputboxEmpty=1;
							inputboxDeafault=1;
							$(this).removeClass("grey");
						}
					});
					$("#inputForm_uishop").hide();
					$("#inputForm_uishop #inputForm_uishop_checkbox").removeAttr("checked").removeAttr("disabled");
					break;
				default:
					break;
			}
		}
	//定义发布框的重置大部分函数
		 function inputForm_no_fun(){
			 //恢复默认值
				$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
				switch(navtype){
					case 1:
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(0)").text());
						break;
					case 2:
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(1)").text());
						break;
					case 3:
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(2)").text());
						break;
					case 4:
						$("#inputForm_name").val($("#inputForm_nameAndPrice span:eq(3)").text());
						break;
					default:
						break;
				}
				$("#inputForm_words textarea").val("有什么特别的事要跟大家说呢");
				$("#input_price").val("此物品价格");
				//先focus一下
				$("#inputForm_name").trigger("focus");
				$("#inputForm_words textarea").trigger("focus");
				$("#input_price").trigger("focus");
				//再blur一下
				$("#inputForm_name").trigger("blur");
				$("#inputForm_words textarea").trigger("blur");
				$("#input_price").trigger("blur");
	
				if($("#inputForm_href_div").css("display")!="none"){
					$("#inputForm_href").trigger("click");
				}
				
				$("#classForm2 .emptySquare:last").trigger("click");
				$("#classForm2 .emptySquare:last").prev().attr("checked",'checked');
				$("#system_message").slideUp(100);	
			 
		 }
	 //定义发布框图片上传函数
		 function picUpload_fun(){
			var btnUpload=$('#inputForm_photo');
			var status=$('#status');
			new AjaxUpload(btnUpload, {
				action: 'service/uploadpic.php',
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
						$("input[type='file']").css("z-index","-1");
						$("#inputForm_photo").css("background-position","0px -93px");
						$("#inputForm_photo").hover(function(){
							$("#inputForm_photo").css("background-position","0px -71px");
						},function(){
							$("#inputForm_photo").css("background-position","0px -93px");
						})	
						$("#inputForm_photo").click(function(){
							$.get("service/uploadpic.php",{"func":"cancelPic","file":$("#inputForm_photo a:eq(1)").text()},function(data){
								$("#inputForm_photo a:eq(0)").text('图片');
								$("input[type='file']").css("z-index","2147483583");
								$("#inputForm_photo").css("background-position","0px 5px");
								$("#inputForm_photo").hover(function(){
									$("#inputForm_photo").css("background-position","0px -112px");
								},function(){
									$("#inputForm_photo").css("background-position","0px 5px");
								})
							},"text")
						});
			
						$("#inputForm_photo a:eq(0)").text(file);
						$("#inputForm_photo a:eq(1)").text(response);
						
						$("#system_message").text("上传成功！").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -46px"});
						delayRun(function(){
							$("#system_message").slideUp(500);
						},1500);
					}else{
						$("#system_message").text("上传失败……").slideDown(100).css({"background-image":"url(../images/others/more_less_right_wrong.gif)","background-position":"0 -70px"});
					}
				}
			});	
			
			$("#inputForm_photo").mouseleave(function(){
				$("input[type='file']").css("display","none");
			})
			$("input[type='file']").css("z-index","-1");
			$("#inputForm_photo").click(function(){
				if($("#black_top #status #user a").text()=="登录▼"){
					$("input[type='file']").css("z-index","-1");
					statusLit("请先登录吧，在右上角哦！","error",15,"left",38.2,80);
					if($("#loginForm").css("display")=="none"){
						$("#black_top #status #user a").trigger("click");
					}
				}else{
					$("input[type='file']").css("z-index","2147483583");
				}
			});
		}
	//定义分类列表classForm1的动作
		var boolen_addclass1=0;//指示目录下拉表的状态
		$("#inputForm_addclass1").click(addclass1_click1);
		
		function addclass1_click1(e){
			if(boolen_addclass1==0){
				$("#classForm1").slideDown(100).css({"top":$(this).offset().top+25,"left":$(this).offset().left});
			}else if(boolen_addclass1==1){
				$("#classForm1").slideUp(100);
			}
			boolen_addclass1=!boolen_addclass1;
			e.stopPropagation();
		}
		function addclass1_click2(){
			$("#inputForm_addclass1").css({"background-position":"0px 5px"});
			$("#inputForm_addclass1 a").text("目录");//改变字样
			$("#inputForm_addclass1").hover(function(){
				$(this).css({"background-position":"0px 5px"});
			},function(){
				$(this).css({"background-position":"0px -112px"});
			});
		}
	//定义分类列表classForm2的动作
		var boolen_addclass2=0;//指示分类下拉表的状态
		$("#inputForm_addclass2").click(addclass2_click1);	
		
		function addclass2_click1(e){			
			if(boolen_addclass2==0){
				$("#classForm2").css({"height":"auto"});
				if($("#classForm2").height()>=300){
					$("#classForm2").css("height",300);
				}
				$("#classForm2").slideDown(100).css({"top":$(this).offset().top+25,"left":$(this).offset().left});
			}else if(boolen_addclass2==1){
				$("#classForm2").slideUp(100);
			}
			boolen_addclass2=!boolen_addclass2;
			e.stopPropagation();
		}
		function addclass2_click2(){
			$("#inputForm_addclass2").css({"background-position":"0px 5px"});
			$("#inputForm_addclass2 a").text("分类");//改变字样
			$("#inputForm_addclass2").hover(function(){
				$(this).css({"background-position":"0px 5px"});
			},function(){
				$(this).css({"background-position":"0px -112px"});
			});
		}
	//联系TA
		var previoussid=-1;
		function detail($obj){
			if($("#black_top #status #user a").text()=="登录▼"){
				statusLit("请先登录吧，在右上角哦！","error",15,"right",61.8,($(window).height()*0.382));		
				if($("#loginForm").css("display")=="none"){
					$("#black_top #status #user a").trigger("click");
				}
			}else{
				sid=$obj.parent().parent().find(".card_goods_sid").text();
				$("#class").hide();
				if (previoussid==sid){
					$("#main_more").slideUp(100);
					$("#class").delay(100).slideDown(100);
					previoussid=-1;
				}else{
					previoussid=sid;
					var MAIN_FUNCTION_DETAIL=[
						function(){	
							drawDetail();
						},function(){
							$.getJSON('service/setting.php',{"func":"profile"},function(data){
								if (data){
									$("#main_more_contract_e-mail").val(data.email);
									$("#main_more_contract_phone").val(data.phone);
									$("#main_more_contract_ShortNum").val(data.shortnum);
									$("#main_more_contract_realname").val(data.realname);
									$("#main_more_contract_qq").val(data.qq);
									$("#main_more_contract_weibo").val(data.weibo);
									$("#main_more_contract_renren").val(data.renren);
									$("#main_more_contract_note").val(data.note);
								}
								takeone_detail();
							});	
						},function(){
							$("#main_more").slideDown(100);
							main_list_reY();
							$("#main_more_user>div>#authBig").unbind("hover");
							$("#main_more_user>div>#authBig").hover(function(){
								statusLit2("该用户得到了<b>校友认证</b>！<br />了解详情，请狠狠地点击图标！","sc2",3,$(this).offset().left-150,$(this).offset().top+30);
							},function(){
								$("#statusLit").remove();
							});
							
							$("#main_more_method img").unbind("hover");
							$("#main_more_method img").hover(function(){
								statusLit3("该用户选择了<b>存放到有爱商店</b>！<br />了解详情，请狠狠地点击图标！","ui",3,$(this).offset().left-130,$(this).offset().top+20);
							},function(){
								$("#statusLit3").remove();
							});
							takeone_detail();
						},function(){
							$("#main_more_contract_more~tr").hide();
							//main_more_contract_more的切换
							$("#main_more_contract_more").toggle(function(){
								$("#main_more_contract_more td").css({"background-position":"3px -17px"});
								$("#main_more_contract_more~tr").fadeIn(100,function(){
									$("#main_more_wapper").animate({scrollTop: $("#main_more_contract_more").offset().top},100);
								});
							},function(){
								$("#main_more_wapper").animate({scrollTop: 0}, 100,function(){
									$("#main_more_contract_more~tr").fadeOut(100);
									$("#main_more_contract_more td").css({"background-position":"3px 9px"});
								});
							})
							takeone_detail();
						},function(){
							var descpStatus2=0;
							$("#main_more_words .click2open").click(function(){
								if(descpStatus2==0){
									$(this).text("收起");
									tempsid=$("#main_more_id").text();
									$.each($(".card"),function(){
										if(tempsid==$(this).find(".card_goods_sid").text()){
											$(this).find(".click2open").trigger("click");											
										}
									});
									
								}else{
									$(this).text("展开");
									tempsid=$("#main_more_id").text();
									$.each($(".card"),function(){
										if(tempsid==$(this).find(".card_goods_sid").text()){
											$(this).find(".click2open").trigger("click");
										}
									});
								}
								descpStatus2=!descpStatus2;
							});
							//main_more_ok
							$("#main_more_ok").click(function(){
								var email,phone,shortnum,qq,weibo,renren,note;
								if ($("#main_more_contract_phone").val()=='你的手机长号……'||$("#main_more_contract_phone").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_phone").val('');
								if ($("#main_more_contract_ShortNum").val()=='你的手机短号……'||$("#main_more_contract_ShortNum").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_ShortNum").val('');
								if ($("#main_more_contract_realname").val()=='你的名字……'||$("#main_more_contract_realname").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_realname").val('');
								if ($("#main_more_contract_qq").val()=='你的QQ号码……'||$("#main_more_contract_qq").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_qq").val('');
								if ($("#main_more_contract_weibo").val()=='你的微博地址……'||$("#main_more_contract_weibo").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_weibo").val('');
								if ($("#main_more_contract_renren").val()=='你的人人首页……'||$("#main_more_contract_renren").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_renren").val('');
								if ($("#main_more_contract_note").val()=='你的备注……'||$("#main_more_contract_note").parent().next().find("input:checked").attr("checked")!="checked") $("#main_more_contract_note").val('');
								email=$("#main_more_contract_email").val();
								phone=$("#main_more_contract_phone").val();
								shortnum=$("#main_more_contract_ShortNum").val();
								realname=$("#main_more_contract_realname").val();
								qq=$("#main_more_contract_qq").val();
								weibo=$("#main_more_contract_weibo").val();
								renren=$("#main_more_contract_renren").val();
								
								$.post('service/stream.php',{"func":"sendemail","type":navtype,"email":email,"phone":phone,"shortnum":shortnum,"realname":realname,"qq":qq,"weibo":weibo,"renren":renren},function(data){
									if(data==1){
										statusLit("你的信息已发到对方邮箱。<br />","tick",3,"right",61.8,($(window).height()*0.382));	
									}else{
										statusLit("系统发信失败。<br />","error",3,"right",61.8,($(window).height()*0.382));
									}
								});	
								
								
								drawTargetprofile(function(e){
									main_list_reY();
									$("#main_more_user>div>#authBig").unbind("hover");
									$("#main_more_user>div>#authBig").hover(function(){
										statusLit2("该用户得到了<b>校友认证</b>！<br />了解详情，请狠狠地点击图标！","sc2",3,$(this).offset().left-150,$(this).offset().top+30);
									},function(){
										$("#statusLit").remove();
									});
									
									$("#main_more_method img").unbind("hover");
										$("#main_more_method img").hover(function(){
											statusLit3("该用户选择了<b>存放到有爱商店</b>！<br />了解详情，请狠狠地点击图标！","ui",3,$(this).offset().left-130,$(this).offset().top+20);
										},function(){
											$("#statusLit3").remove();
									});
									
									$("#main_more_no").click(function(){
										$('#main_more').slideUp(100);
										$('#class').delay(100).slideDown(100);
										$('#main_more').empty();
									});
								});
								
							});
							$("#main_more_no").click(function(){
								$("#main_more").slideUp(100);
								$("#class").delay(100).slideDown(100);
								$("#main_more").empty();
							});
							takeone_detail();
						},function(){
						}
					]
					$(document).queue("MAIN_FUNCTION_QUEUE_DETAIL",MAIN_FUNCTION_DETAIL);
					takeone_detail();
				}
			}
		}
	//撤回 函数
		function withdraw_msg($obj){	
			$obj=$obj.parents(".card");
			var sid=$obj.find(".card_goods_sid").text();
			$.get("service/stream.php",{"func":"withdraw","type":navtype,"sid":sid},function(data){
				if(data){
					statusLit("撤回成功！","tick",15,"left",38.2,$(window).height()/2);
					if ($("#main_more #main_more_id").text()==sid) {
						$("#main_more").slideUp(200,function(){
							$("#class").slideDown(200);
							
						});
					}
					$obj.slideUp(500,function(){
						$obj.remove();
					});
					initializtion2_3();
				}
			});
		}
	//私信函数
		function loadsms(){//检测新消息
			script='';
			$.getJSON("service/stream.php",{"func":"loadsms"},function(json){
				//以下的操作为取出uid，并对其排序，sort函数采用自定义的方式，相当于默认方法的倒序！
					var a=[];
					$.each(json,function(){
						a[a.length]=this.uid;
					});
					a.sort(function(a,b){
						return b-a;
					})
					
				for(var i=0;i<a.length;i++){
					script+=('addsMessages_name(\''+json[a[i]].nickname+'\','+json[a[i]].uid+',\''+json[a[i]].auth+'\')');
				}
				$("#black_footer").append('<script id="temp">'+script+'</script>');
				$("#black_footer script").remove();
				//takeone();
			});
		}
	//判断是否加载完成
		function imagess(url,$imgid,callback){   
			var img=new Image();
			if($.browser.msie){
				img.onreadystatechange=function(){
					if(img.readyState=="complete"||img.readyState=="loaded"){
						callback(img,$imgid);
					}
				}       
			}else{
				img.onload=function(){
					if(img.complete==true){
						callback(img,$imgid);
					}
				}       
			}
			//如果因为网络或图片的原因发生异常，则显示该图片
			img.onerror=function(){
				img.src='uploads/itemspic/sysPics/error.png';
			}
			img.src=url;
		}

	//显示图片
		function checkimg(obj,$imgid){
			$imgid.attr("src",obj.src);
			heightH=$imgid.height();
			widthW=$imgid.width();
			arrPicH2W=heightH/widthW;
			if(arrPicH2W<=1.3){
				$imgid.attr("width",120);
				$imgid.attr("height",Number(arrPicH2W*$imgid.width()));
			}else{
				$imgid.attr("height",130);
				$imgid.attr("width",Number($imgid.height()/arrPicH2W));
			}
		}
		
		
	//draw函数
		function drawCategory(json){
			//以下的操作为取出cid，并对其排序，sort函数采用自定义的方式，相当于默认方法的倒序！
				var a=[];
				$.each(json,function(){
					a[a.length]=this.cid;
				});
				a.sort(function(a,b){
					return a-b;
				})
				$("#allcategory").empty();
				$("#classForm2 form ul").empty();
			//取得json数组的key，从key取val
				for(var i=0;i<a.length;i++){
					$("#allcategory").append('<li id="category_'+json[a[i]].cid+'"><a class="main_left_class" >'+json[a[i]].cname+'</a><a class="main_left_num">('+json[a[i]].num+')</a></li>');
					$("#classForm2 form ul").append('<li><input id="classForm2_'+json[a[i]].cid+'" name="classForm2" type="radio" value="'+json[a[i]].cid+'" /><label for="classForm2_'+json[a[i]].cid+'" class="emptySquare">'+json[a[i]].cname+'</label></li>');
				};
		}
		function drawCategory_onlyform(json){
			//以下的操作为取出cid，并对其排序，sort函数采用自定义的方式，相当于默认方法的倒序！
				var a=[];
				$.each(json,function(){
					a[a.length]=this.cid;
				});
				a.sort(function(a,b){
					return a-b;
				})
				$("#classForm2 form ul").empty();
			//取得json数组的key，从key取val
				for(var i=0;i<a.length;i++){
					$("#classForm2 form ul").append('<li><input id="classForm2_'+json[a[i]].cid+'" name="classForm2" type="radio" value="'+json[a[i]].cid+'" /><label for="classForm2_'+json[a[i]].cid+'" class="emptySquare">'+json[a[i]].cname+'</label></li>');
					
				};
		}
	//draw函数
		function drawDetail(){
			$("#main_more").empty();
			$.getJSON("service/stream.php",{"func":"loaddetail","type":navtype,"sid":sid},function(json){
				if (json.avatar) avatarDetail='<img src="/uploads/userspic/'+json.avatar+'" height="47" width="47" alt="用户 '+json.nickname+' 的头像"/>';
				if (json.pic) picDetail='<img src="/uploads/itemspic/'+json.pic+'" width="150" height="100" alt="goods" />';else picDetail='';
				if (json.price) priceDetail='￥'+json.price ;else priceDetail='无';
				if (json.method==1){
					methodDetail='通过有爱商店 <a href="uishop.html" target="_blank"><img src="images/others/ui.gif" width="32" height="15" alt="uishop" /></a>';
				}else{
					methodDetail='直接联系';
				}
				userNameDetail='<span style="height:23px; line-height:23px;">'+json.nickname+'</span><a id="sMessageBig" onclick="addsMessages_name(\''+json.nickname+'\','+json.uid+',\''+json.auth+'\')"><img width="60" height="25" alt="私信聊天" src="images/others/chatBig.gif"></a>';
				if (json.auth=='y'){
					userNameDetail+='<a id="authBig" href="auth.html" target="_blank"><img width="96" height="25" alt="中山大学校友认证" src="images/others/sc.gif"></a>';
				}
				
				descpCards2=json.descp;//////////////////////////////////
				
				while(descpCards2.indexOf("<br />")!=-1){
					descpCards2=descpCards2.replace("<br />","");
				}
				
				if(descpCards2.substring(120,121)){
					descpCards2=descpCards2.substring(0,120)+' …… '+'</span>';
					descpCards2+='<a class="click2open">展开</a>';
					
				}else{
					descpCards2=descpCards2+'</span>';
				}///////////////////////////////////////////////////////////////
				
				$("#main_more").append(
					'<span id="main_more_id" style="display:none">'+json.sid+'</span>'+
					'<div id="main_more_user">'+avatarDetail+
						'<div>'+userNameDetail+'</div>'+
					'</div>'+
					'<div id="main_more_wapper">'+
						'<div id="main_more_goodsname"><span>物品名称：</span><span>'+json.nickname+'</span></div>'+
						'<div id="main_more_goodsprice"><span>物品价格：</span><span>'+priceDetail+'</span></div>'+
						'<div id="main_more_method"><span>联系方式：</span><span>'+methodDetail+'</span></div>'+
						'<div id="main_more_words"><span class="grey bigFont">'+json.nickname+'</span> <span>说：</span><span id="leftQuote"><img src="images/others/leftQuote.gif" width="12" height="12" alt="leftQuote" /> </span><span class="words">'+descpCards2+'<span id="rightQuote"> <img src="images/others/rightQuote.gif" width="12" height="12" alt="rightQuote" /></span></div>'+
						'<div id="main_more_contract">'+
							'<form>'+
								'<table>'+
									'<tr>'+
										'<td colspan="3">你想告诉<span class="grey bigFont">'+json.nickname+'</span>的信息：</td>'+
									'</tr>'+
									'<tr>'+
										'<td colspan="3" id="main_more_contract_tips">以下信息将发送给<span class="grey">'+json.nickname+'</span>，易易将会充分保护你的隐私，其他人无法通过此次操作获得你的信息。</td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">E-mail</td>'+
										'<td class="main_more_contract_td2"><input type="text" name="main_more_contract_e-mail" id="main_more_contract_e-mail" class="grey"  value="" readonly="readonly" /></td>'+
										'<td><input type="checkbox" value="y" id="email_checkbox" disabled="true" checked="checked"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">手机号码</td>'+
										'<td><input type="text" name="main_more_contract_phoneLong" id="main_more_contract_phone" class="grey"  value="你的手机长号……" /></td>'+
										'<td><input type="checkbox" value="y" id="phone_checkbox" checked="checked" /></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder" id="main_more_contract_more">'+
										'<td colspan="3">添加可选信息，方便<span class="grey">'+json.nickname+'</span>联系你吧！</td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">姓名</td>'+
										'<td><input type="text" name="main_more_contract_realname" id="main_more_contract_realname" class="grey"  value="你的名字……" /></td>'+
										'<td><input type="checkbox" value="y" id="realname_checkbox" checked="checked"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">QQ</td>'+
										'<td><input type="text" name="main_more_contract_qq" id="main_more_contract_qq" class="grey"  value="你的QQ号码……" /></td>'+
										'<td><input type="checkbox" value="y" id="qq_checkbox" checked="checked"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">手机短号</td>'+
										'<td><input type="text" name="main_more_contract_phoneShort" id="main_more_contract_ShortNum" class="grey"  value="你的手机短号……" /></td>'+
										'<td><input type="checkbox" value="y" id="shortnum_checkbox" checked="checked"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">微博地址</td>'+
										'<td><input type="text" name="main_more_contract_weibo" id="main_more_contract_weibo" class="grey"  value="你的微博地址……" /></td>'+
										'<td><input type="checkbox" value="y" id="weibo_checkbox" checked="checked"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">人人首页</td>'+
										'<td><input type="text" name="main_more_contract_renren" id="main_more_contract_renren" class="grey"  value="你的人人首页……" /></td>'+
										'<td><input type="checkbox" value="y" id="renren_checkbox" checked="checked"/></td>'+
									'</tr>'+
									'<tr>'+
										'<td class="main_more_contract_td1">备注</td>'+
										'<td><input type="text" name="main_more_contract_other" id="main_more_contract_note" class="grey"  value="你的备注……" /></td>'+
										'<td><input type="checkbox" value="y" id="note_checkbox" checked="checked"/></td>'+
									'</tr>'+
								'</table>'+
							'</form>'+
						'</div>'+
					'</div>'+
					'<div id="main_more_okOrNo">'+
						'<div class="bigFont" id="main_more_ok">确认</div>'+
						'<div class="bigFont" id="main_more_no">取消</div>'+
					'</div>'
				);
				
				takeone_detail();
			});
		}
	//draw函数
		function drawTargetprofile(code){
			$("#main_more").empty();
			$.getJSON("service/stream.php",{"func":"targetprofile","type":navtype},function(json){
				if (json.avatar) avatarDetail='<img src="/uploads/userspic/'+json.avatar+'" height="47" width="47" alt="用户 '+json.nickname+' 的头像"/>';
				if (json.pic) picDetail='<img src="/uploads/itemspic/'+json.pic+'" width="150" height="100" alt="goods" />';else picDetail='';
				if (json.price) priceDetail='￥'+json.price ;else priceDetail='无';
				if (json.method==1){
					methodDetail='通过有爱商店 <a href="uishop.html" target="_blank"><img src="images/others/ui.gif" width="32" height="15" alt="uishop" /></a>';
				}else{
					methodDetail='直接联系';
				}
				userNameDetail='<span style="height:23px; line-height:23px;">'+json.nickname+'</span><a id="sMessageBig" onclick="addsMessages_nam(\''+json.nickname+'\','+json.uid+',\''+json.auth+'\')"><img width="60" height="25" alt="私信聊天" src="images/others/chatBig.gif"></a>';
				if (json.auth=='y'){
					userNameDetail+='<a id="authBig" href="auth.html" target="_blank"><img width="96" height="25" alt="中山大学校友认证" src="images/others/sc.gif"></a>';
				}
				$("#main_more").append(
					'<span id="main_more_id" style="display:none">'+json.sid+'</span>'+
					'<div id="main_more_user">'+avatarDetail+
						'<div>'+userNameDetail+'</div>'+
					'</div>'+
					'<div id="main_more_wapper">'+
						'<div id="main_more_goodsname"><span>物品名称：</span><span>'+json.nickname+'</span></div>'+
						'<div id="main_more_goodsprice"><span>物品价格：</span><span>'+priceDetail+'</span></div>'+
						'<div id="main_more_method"><span>联系方式：</span><span>'+methodDetail+'</span></div>'+
						'<div id="main_more_words"><span class="grey bigFont">'+json.nickname+'</span> <span>说：</span><span id="leftQuote"><img src="images/others/leftQuote.gif" width="12" height="12" alt="leftQuote" /> </span><span id="words">'+json.descp+'</span><span id="rightQuote"> <img src="images/others/rightQuote.gif" width="12" height="12" alt="rightQuote" /></span></div>'+
						'<div id="main_more_contract">'+
							'<form>'+
								'<table>'+
									'<tr>'+
										'<td colspan="2"><span class="grey bigFont">'+json.nickname+'</span> 的个人信息：</td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">E-mail</td>'+
										'<td class="main_more_contract_td2"><input type="text" name="main_more_contract_e-mail" id="main_more_contract_e-mail" class="grey"  value="'+json.email+'" readonly="readonly" /></td>'+
										'<td><input type="checkbox" value="email" id="CheckboxGroup2_7"  style="visibility:hidden"/></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">手机号码</td>'+
										'<td><input type="text" name="main_more_contract_phoneLong" id="main_more_contract_phone" class="grey" readonly="readonly" value="'+json.phone+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">姓名</td>'+
										'<td><input type="text" name="main_more_contract_realname" id="main_more_contract_realname" class="grey" readonly="readonly" value="'+json.realname+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">QQ</td>'+
										'<td><input type="text" name="main_more_contract_qq" id="main_more_contract_qq" class="grey" readonly="readonly" value="'+json.qq+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">手机短号</td>'+
										'<td><input type="text" name="main_more_contract_phoneShort" id="main_more_contract_ShortNum" class="grey" readonly="readonly" value="'+json.shortnum+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">微博地址</td>'+
										'<td><input type="text" name="main_more_contract_weibo" id="main_more_contract_weibo" class="grey" readonly="readonly" value="'+json.weibo+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="main_more_contract_trBorder">'+
										'<td class="main_more_contract_td1">人人首页</td>'+
										'<td><input type="text" name="main_more_contract_renren" id="main_more_contract_renren" class="grey" readonly="readonly" value="'+json.renren+'" /></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr>'+
										'<td class="main_more_contract_td1">备注</td>'+
										'<td><input type="text" name="main_more_contract_other" id="main_more_contract_note" class="grey" readonly="readonly" value="'+json.note+'" /></td>'+
										'<td></td>'+
									'</tr>'+
								'</table>'+
							'</form>'+
						'</div>'+
					'</div>'+
					'<div id="main_more_okOrNo">'+
						'<div class="bigFont" id="main_more_no" style="margin-left:100px;">关闭</div>'+
					'</div>'
				).ready(function(e){
					code();
				});
				
				if(json.emailstatus){
					statusLit("系统已发送对方信息至你的邮箱！<br />","tick",3,"right",61.8,($(window).height()*0.382));
				}else{
					statusLit("系统发信失败。<br />","error",3,"right",61.8,($(window).height()*0.382));
				}
				
				takeone_detail();
			});
		}
	//draw函数
	//draw函数
		function drawCards(json){
			
			//以下的操作为取出sid，并对其排序，sort函数采用自定义的方式，相当于默认方法的倒序！
				var a=[];
				$.each(json,function(){
					a[a.length]=this.sid;
				});
				a.sort(function(a,b){
					return b-a;
				})
			//取得json数组的key，从key取val
				for(var i=0;i<a.length;i++){
					/////////////////
					if(json[a[i]].avatar){
						avatarCards='<img src="/uploads/userspic/'+json[a[i]].avatar+'" height="55" width="55" alt="'+json[a[i]].uid+'"/>';
					}else{
						avatarCards='';
					}
					
					if(json[a[i]].auth=="y"){
						authCards=' <a href="auth.html" target="_blank"><img src="images/others/sc2.gif" width="14" height="15" alt="sc2" /></a>';
					}else{
						authCards='';
					}
					
					if(json[a[i]].withdrawX){
						withdrawCards='撤回';
					}else{
						withdrawCards='';
					}
					
					if(json[a[i]].href){
						hrefCards=' href=" '+json[a[i]].href+' " target="_blank"';
						hrefLogoCards='';
					}else{
						hrefCards='';
						hrefLogoCards='';
					}
					
					if(json[a[i]].method==1){
						methodCards='寄存在 有爱商店 <a href="uishop.html" target="_blank"><img src="images/others/ui.gif" width="25" height="15" alt="uishop" /></a>';
					}else{
						methodCards='直接联系';
					}
					
					if(json[a[i]].pic){
						src='uploads/itemspic/'+json[a[i]].pic;
						picCards='<img class="card_img" onclick="cardpicFun('+json[a[i]].sid+')" alt="信息图片" />';
					}else{
						picCards='';
					}
					
					if(json[a[i]].price){
						priceCards='￥'+json[a[i]].price;
					}else{
						priceCards='';
					}
					
					descpCards=json[a[i]].descp;
					while(descpCards.indexOf("<br />")!=-1){
						descpCards=descpCards.replace("<br />","");
					}
					
					if(descpCards.substring(120,121)){
						descpContent[json[a[i]].sid]=json[a[i]].descp;
						descpCards=descpCards.substring(0,120)+' …… '+'</span>';
						click2open='<div class="click2open">'+'展开'+'</div>';
					}else{
						descpCards=descpCards+'</span>';
						click2open='';
					}
					
					switch(navtype){
						case 1:
							typeText1="物品名称";
							typeText2="物品信息";
							break;
						case 2:
							typeText1="信息名称";
							typeText2="校园信息";
							break;
						case 3:
							typeText1="物品名称";
							typeText2="物品信息";
							break;
						case 4:
							typeText1="物品名称";
							typeText2="图书漂流";
							break;
						default:
							break;
					}
					////////////////////
					$("#stream").append(
					'<!--card_start-->'+
					'<div class="card">'+
						'<div class="card_top"></div>'+
						'<div class="card_main">'+
							'<table class="card_main_tab">'+
								'<tr>'+
									'<td class="card_main_tab_user">'+avatarCards+'</td>'+
									'<td rowspan="2" class="card_main_tab_right"><ul>'+
											'<li class="card_own">'+
												'<div><span class="card_user_name">'+json[a[i]].nickname+authCards+'</span>：<span class="card_user_words card_user_words2">'+'<br />'+descpContent[json[a[i]].sid]+'</span>'+'<span class="card_user_words card_user_words1">'+descpCards+'</div>'+
												'<div class="card_withdraw">'+withdrawCards+'</div>'+
												click2open+
											'</li>'+
											'<li class="card_pic">'+
												'<div>'+picCards+'</div>'+
												'<div class="card_goods2"><ul>'+
														'<li class="card_goods"><span>'+typeText1+'</span>：<a class="card_goods_name" '+hrefCards+'>'+json[a[i]].name+hrefLogoCards+'</a></li>'+
														'<li class="card_goods"><span>发布时间</span>：<a class="card_goods_name" '+hrefCards+'>'+json[a[i]].time+'</a></li>'+
														'<li class="card_goods"><span>目录分类</span>：<a>'+typeText2+'-'+json[a[i]].cname+'</a></li>'+
														'<li class="card_goods sdf"><span>获得途径</span>：<a>'+methodCards+'</a></li>'+
												'</ul></div>'+
											'</li>'+
										'</ul></td>'+
								'</tr>'+
								'<tr>'+
									'<td class="card_main_tab_go" height="50px"><a>'+
										'<div><span class="card_goods_price">'+priceCards+'</span><span class="card_goods_sid">'+json[a[i]].sid+'</span></div>'+
										'</a></td>'+
								'</tr>'+
							'</table>'+
						'</div>'+
						'<div class="card_footer"></div>'+
					'</div>'+
					'<!--card_end-->'
					);
					//事后检查每个card的图片 匹配者运行预加载代码
					$.each($(".card"),function(){
						if($(this).find(".card_pic div:eq(0) img").length>0){
							if($(this).find(".card_goods_sid").text()==json[a[i]].sid){
								imagess(src,$(this).find(".card_pic div:eq(0) img"),checkimg); 
								return false;
							}
						}
					});
					
				};
		}
	
//主顺序//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initializtionALL();
	
	function initializtionALL(){
		var MAIN_FUNCTION=[
			function(){
				loadCategory();
			},function(){
				inputFormType(navtype);
				takeone();
			},function(){
				//目录列表初始化
				$("#classForm1 form ul").html(
					'<form>'+
						'<li>'+
							'<input id="classForm1_1" name="classForm1" type="radio" value="1" /><label for="classForm1_1" class="emptySquare">物品信息</label>'+
						'</li>'+
						'<li>'+
							'<input id="classForm1_2" name="classForm1" type="radio" value="2" /><label for="classForm1_2" class="emptySquare">校园信息</label>'+
						'</li>'+
						'<li>'+
							'<input id="classForm1_3" name="classForm1" type="radio" value="3" /><label for="classForm1_3" class="emptySquare">有爱商店</label>'+
						'</li>'+
						'<li>'+
							'<input id="classForm1_4" name="classForm1" type="radio" value="4" /><label for="classForm1_4" class="emptySquare">图书漂流</label>'+
						'</li>'+
					'</form>'
				);
				takeone();
			},function(){
				//目录列表初始化-#classForm1 .emptySquare初始化
				$("#classForm1 .emptySquare").click(function(){
					$("#inputForm_addclass1 a").text($(this).text());//改变字样
					$("#inputForm_addclass1").css({"background-position":"0px -92px"});
					$("#inputForm_addclass1").hover(function(){
						$(this).css({"background-position":"0px -70px"});
					},function(){
						$(this).css({"background-position":"0px -92px"});
					});
					$("#classForm1").slideUp(100);
					boolen_addclass1=0;

					$("#inputForm_addclass1").click(addclass1_click2);
				});
				takeone();
			},function(){
				//目录列表初始化-默认选中项
				switch(navtype){
					case 1:
						$("#classForm1 .emptySquare:eq(0)").trigger("click");
						$("#classForm1 .emptySquare:eq(0)").prev().attr("checked",'checked');
						break;
					case 2:
						$("#classForm1 .emptySquare:eq(1)").trigger("click");
						$("#classForm1 .emptySquare:eq(1)").prev().attr("checked",'checked');
						break;
					case 3:
						$("#classForm1 .emptySquare:eq(2)").trigger("click");
						$("#classForm1 .emptySquare:eq(2)").prev().attr("checked",'checked');
						break;
					case 4:
						$("#classForm1 .emptySquare:eq(3)").trigger("click");
						$("#classForm1 .emptySquare:eq(3)").prev().attr("checked",'checked');
						break;
				}
				$("#classForm1 .emptySquare").click(function(){
					initializtion3($(this));
				});
				takeone();
			},function(){
				//分类列表初始化-#classForm2 .emptySquare初始化
				$("#classForm2 .emptySquare").click(function(){
					$("#inputForm_addclass2 a").text($(this).text());//改变字样
					$("#inputForm_addclass2").css({"background-position":"0px -92px"});
					$("#inputForm_addclass2").hover(function(){
						$(this).css({"background-position":"0px -70px"});
					},function(){
						$(this).css({"background-position":"0px -92px"});
					});
					$("#classForm2").slideUp(100);
					boolen_addclass2=0;
					
					$("#inputForm_addclass2").click(addclass2_click2);
				});	
				$("#classForm2 .emptySquare:last").trigger("click");
				$("#classForm2 .emptySquare:last").prev().attr("checked",'checked');
				takeone();
			},function(){
				allcategoryli();
				takeone();
			},function(){
				cardPointer=0;
				loadStream_new();
			},function(){
				$("#stream").empty();
				loadStream();
			},function(){
				loadsms();
				takeone();
			},function(){
				takeone();
			}
		];	
		$(document).queue("MAIN_FUNCTION_QUEUE",MAIN_FUNCTION);
		takeone();
	}
//副顺序
	function initializtion2_1(){
		var MAIN_FUNCTION2_1=[
			function(){
				loadCategory();
			},function(){
				//分类列表初始化-#classForm2 .emptySquare初始化
				$("#classForm2 .emptySquare").click(function(){
					$("#inputForm_addclass2 a").text($(this).text());//改变字样
					$("#inputForm_addclass2").css({"background-position":"0px -92px"});
					$("#inputForm_addclass2").hover(function(){
						$(this).css({"background-position":"0px -70px"});
					},function(){
						$(this).css({"background-position":"0px -92px"});
					});
					$("#classForm2").slideUp(100);
					boolen_addclass2=0;
					
					$("#inputForm_addclass2").click(addclass2_click2);
				});	
				$("#classForm2 .emptySquare:last").trigger("click");
				takeone();
			},function(){
				allcategoryli();
				takeone();
			},function(){
				inputFormType(navtype);
				takeone();
			},function(){
				cardPointer=0;
				loadStream_new();
			},function(){
				$("#stream").empty();
				loadStream();
			}
		]
		$(document).queue("MAIN_FUNCTION_QUEUE",MAIN_FUNCTION2_1);
		takeone();
	}
//副顺序
	function initializtion2_2(){
		var MAIN_FUNCTION2_2=[
			function(){
				cardPointer=0;
				loadStream_new();
			},function(){
				$("#stream").empty();
				loadStream();
			}
		]
		$(document).queue("MAIN_FUNCTION_QUEUE",MAIN_FUNCTION2_2);
		takeone();
	}
//副顺序
	function initializtion2_3(){
		var MAIN_FUNCTION2_3=[
			function(){
				loadCategory();
			},function(){
				//分类列表初始化-#classForm2 .emptySquare初始化
				$("#classForm2 .emptySquare").click(function(){
					$("#inputForm_addclass2 a").text($(this).text());//改变字样
					$("#inputForm_addclass2").css({"background-position":"0px -92px"});
					$("#inputForm_addclass2").hover(function(){
						$(this).css({"background-position":"0px -70px"});
					},function(){
						$(this).css({"background-position":"0px -92px"});
					});
					$("#classForm2").slideUp(100);
					boolen_addclass2=0;
					
					$("#inputForm_addclass2").click(addclass2_click2);
				});	
				$("#classForm2 .emptySquare:last").trigger("click");
				takeone();
			},function(){
				allcategoryli();
			}
		]
		$(document).queue("MAIN_FUNCTION_QUEUE",MAIN_FUNCTION2_3);
		takeone();
	}
//副顺序
	function initializtion3($temp){
		var MAIN_FUNCTION3=[
			function(){
				loadCategory_onlyform($temp.prev().val());
				
			},function(){
				//alert($temp.prev().val());
				inputFormType(Number($temp.prev().val()));
				//分类列表初始化-#classForm2 .emptySquare初始化
				$("#classForm2 .emptySquare").click(function(){
					$("#inputForm_addclass2 a").text($(this).text());//改变字样
					$("#inputForm_addclass2").css({"background-position":"0px -92px"});
					$("#inputForm_addclass2").hover(function(){
						$(this).css({"background-position":"0px -70px"});
					},function(){
						$(this).css({"background-position":"0px -92px"});
					});
					$("#classForm2").slideUp(100);
					boolen_addclass2=0;
					
					$("#inputForm_addclass2").click(addclass2_click2);
				});	
				$("#classForm2 .emptySquare:last").trigger("click");
				
			}
		]
		$(document).queue("MAIN_FUNCTION_QUEUE3",MAIN_FUNCTION3);
		
		takeone3();
	}
	
});//////////////////////////////////////////////////////////////////////////////////end






//takeone的函数
	function takeone(){
		$(document).dequeue("MAIN_FUNCTION_QUEUE");
	}
//takeone2的函数

//takeone3的函数
	function takeone3(){
		$(document).dequeue("MAIN_FUNCTION_QUEUE3");
	}
//takeone_detail的函数
	function takeone_detail(){
		$(document).dequeue("MAIN_FUNCTION_QUEUE_DETAIL");
	}
//card中图片的缩放函数
	var picStatus=[];
	var thisImgH=[],thisImgW=[];
	function cardpicFun(sid){
		//大图片伸缩
		$card_img=$(".card .card_pic .card_img");//一路寻找img
		$.each($card_img,function(){
			img_sid=$(this).attr("onclick");
			img_sid=img_sid.substring(img_sid.lastIndexOf("(")+1,img_sid.lastIndexOf(")"));
			if(img_sid==sid){
				$thisImg=$(this);
				return false;
			}
		});
		if(thisImgH[img_sid]==undefined&&thisImgW[img_sid]==undefined){
			thisImgH[img_sid]=$thisImg.height();
			thisImgW[img_sid]=$thisImg.width();
		}
		if(picStatus[img_sid]==undefined) picStatus[img_sid]=0;
		if(picStatus[img_sid]==0){
			var $tempCard_main=$thisImg.parents(".card_main");	
			card_main_imgHeight=thisImgH[img_sid]*431/thisImgW[img_sid];
			card_mainHeight=$tempCard_main.css("height")+card_main_imgHeight-thisImgH[img_sid];
			$tempCard_main.css("height",card_mainHeight);
			$thisImg.attr({width:"429",height:card_main_imgHeight});//限定图片宽度		
		}else{
			var $tempCard_main=$thisImg.parents(".card_main");	
			card_main_imgHeight=thisImgH[img_sid]*431/thisImgW[img_sid];
			card_mainHeight2=$tempCard_main.css("height")-card_main_imgHeight+thisImgH[img_sid];
			$tempCard_main.css("height",card_mainHeight2);
			$thisImg.attr({width:thisImgW[img_sid],height:thisImgH[img_sid]});//限定图片宽度
		}
		picStatus[img_sid]=!picStatus[img_sid];
	}
//弹出提示框
	function statusLit(text,statusPic,marginTop,LOrR,rlPrercent,statusLitTop){
		$("#statusLit").remove();
		$("body").append('<div id="statusLit" class="popup" style="'+LOrR+':'+rlPrercent+'%;"><div><img src="images/others/'+statusPic+'.gif" width="46" height="44" alt="tick" /></div><div style="margin-top:'+marginTop+'px;">'+text+'<p>(3.82秒后此提示消失~)</p></div></div>')
		$("#statusLit").css({"top":statusLitTop});
		$("#statusLit").delay(3820).slideUp(200,function(){
			$("#statusLit").remove();
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
	function statusLit3(text,statusPic,marginTop,statusLitLeft,statusLitTop){
		$("#statusLit3").remove();
		$("#statusLit").remove();
		$("body").append('<div id="statusLit3" class="popup"><div><img src="images/others/'+statusPic+'.gif" width="88" height="44" alt="tick" /></div><div style="margin-top:'+marginTop+'px;">'+text+'<p>(3.82秒后此提示消失~)</p></div></div>');
		$("#statusLit3").css({"left":(statusLitLeft)});
		$("#statusLit3").css({"top":(statusLitTop-$(window).scrollTop())});
		$("#statusLit3").delay(3820).slideUp(200,function(){
			$("#statusLit3").remove();
		});
	}


//窗口调整函数
	function main_list_reY(){
		var y=0;
		winHeight=$(window).height();
		if((winHeight)<(500+35+25+15+15)){
			y=500;
			$("#main_more").css("top",35+5);
		}else{
			y=winHeight-(35+25+15+15);
			$("#main_more").css("top",35+20);
		}
		$("#main_more").css("height",y);
		$("#main_more_wapper").css("height",y-130);
	}
//第一次登录的指引
	function firstGuiding(){	
	//	$.get("service/login.php",{"func":"firstGuiding"},function(data){
	//		$("html").append(data).ready(function(e){
	//			alert(signintimes);
	//		});
	//	});
	}
	
//私信相关
	function addsMessages_name(username,uid,sc){
		var tempExistence=0;
		var $tempObject;
		var_sMessage_name=username;

		if(sc=='y'){
			var_sMessage_sc='y';
		}else{
			var_sMessage_sc='n';
		}
		$.each($(".sMessages_name"),function(){
			if($(this).text()==username){
				tempExistence=1;
				$tempObject=$(this);
				return false;
			}else{
				tempExistence=0;
			}
		});
		
		if(!tempExistence){
			$("#black_footer #sMessages").append('<div class="sMessages_name" onclick="sMessages('+uid+',\''+username+'\',\''+sc+'\')"><span></span>'+username+'</div>');		
			$(".sMessages_name span").unbind("click");
			$(".sMessages_name span").click(function(){
				$("#sMessages_window #sMessages_window_close").trigger("click");
				$(this).parent().remove();
			});
			
		}else{
			$tempObject.trigger("click");
		}
	}
//私信相关
	var array_sMessageToggle=[];
	function sMessages(uid,username,sc){
		var_sMessage_name=username;
		var_sMessage_sc=sc;
		
		$.getJSON("service/stream.php",{'func':'loadmessagebox','uid':uid},function(data){
			drawsMessageBox(data);
			
			$("#sMessages_window_content").scrollTop($("#sMessages_window_content")[0].scrollHeight);
			
			$("#sMessages_window #sMessages_window_close").click(function(){
				$("#sMessages_window").hide();
				$.each(array_sMessageToggle,function(a,b){
					array_sMessageToggle[a]=0;
				});
				$.each($sMessages_name,function(){
					$(this).css({"background-color":"","color":"#fff"});
				});
			});
			
			var count=140;
			$("#sMessages_window_input span").text(count);
			$("#sMessages_window_input textarea").keydown(function(){
				count=140-$("#sMessages_window_input textarea").val().length;
				if(count<=0){
					$("#sMessages_window_input span").css("color","red");
				}else{
					$("#sMessages_window_input span").css("color","black");
				}
				$("#sMessages_window_input span").text(count);
			});
			$("#sMessages_window_send").click(function(){
				var _content=$("#sMessages_window_input textarea").val();
				if (_content!=''){
					$.post("service/stream.php",{'func':'sendsmessages','uid':uid,'content':_content},function(data){
						$("#sMessages_window_input textarea").val('');
						count=140;
						$("#sMessages_window_input span").text(count);
						
						$.getJSON("service/stream.php",{'func':'reloadmessagebox','uid':uid},function(data){
								drawsMessageBox(data);
								$("#sMessages_window_content").scrollTop($("#sMessages_window_content")[0].scrollHeight);
						})
						
					});
				}
			});
		});
		
		var tempToogle=0;
		$sMessages_name=$(".sMessages_name");
		$.each($sMessages_name,function(){
			sMessages_name_uid=$(this).attr("onclick");
			sMessages_name_uid=sMessages_name_uid.substring(sMessages_name_uid.lastIndexOf("(")+1,sMessages_name_uid.indexOf(","));
			
			if(sMessages_name_uid==uid){
				$this_sMessages_name=$(this);
				return false;
			}
		});
		if(array_sMessageToggle[sMessages_name_uid]==undefined) array_sMessageToggle[sMessages_name_uid]=0;
	
		if(array_sMessageToggle[sMessages_name_uid]==0){
			$("#sMessages_window").show().css({"top":($(window).height()-$("#sMessages_window").height()-34),"left":($this_sMessages_name.offset().left-$("#sMessages_window").width()+$this_sMessages_name.width()-4)});
			$this_sMessages_name.css({"background-color":"#fff","color":"#ccc"});
		}else if(array_sMessageToggle[sMessages_name_uid]==1){
			$("#sMessages_window").hide();
			$this_sMessages_name.css({"background-color":"","color":"#fff"});
		}
		array_sMessageToggle[sMessages_name_uid]=!array_sMessageToggle[sMessages_name_uid];
		
		tempToogle=array_sMessageToggle[sMessages_name_uid];//
		
		//初始化
		$.each(array_sMessageToggle,function(a,b){
			array_sMessageToggle[a]=0;
		});
		$.each($sMessages_name,function(){
			$(this).css({"background-color":"","color":"#fff"});
		});
		
		array_sMessageToggle[sMessages_name_uid]=tempToogle;
		if(tempToogle){
			$this_sMessages_name.css({"background-color":"#fff","color":"#ccc"});
		}
	}
	//draw函数
	function drawsMessageBox(json){
		$("#sMessages_window").html('');
		if(var_sMessage_sc=="y"){
			authCards=' <a href="auth.html" target="_blank"><img src="images/others/sc2.gif" width="14" height="15" alt="sc2" /></a> ';
		}else{
			authCards='';
		}
		
		//以下的操作为取出sid，并对其排序，sort函数采用自定义的方式，相当于默认方法的倒序！
				var a=[];
				$.each(json,function(){
					a[a.length]=this.smsid;
				});
				a.sort(function(a,b){
					return a-b;
				})
				
		//取得json数组的key，从key取val
				appendsMessage='';
				for(var i=0;i<a.length;i++){
					if(json[a[i]].avatar){
						avatarCards='<img src="/uploads/userspic/'+json[a[i]].avatar+'" height="55" width="55" alt="'+json[a[i]].uid+'"/>';
					}else{
						avatarCards='';
					}
					
					if(json[a[i]].me==1){
						appendsMessage+=(
							'<!--messagesContent_messages_start-->'+
							'<div class="messagesContent_messages2">'+
								'<div class="messagesContent_messages_wapper">'+
									'<div class="messagesContent_messages_userInfo">'+
										'<div><span class="messagesContent_messages_userInfo_time">'+json[a[i]].time+'</span></div>'+
									'</div>'+
									'<div class="messagesContent_messages_content">'+json[a[i]].content+'</div>'+
								'</div>'+
								'<div class="messagesContent_messages_img">'+'<img src="/uploads/userspic/'+json[a[i]].avatar+'" height="37" width="37" alt="用户'+json[a[i]].nickname+'"/>'+'</div>'+
							'</div>'+
							'<!--messagesContent_messages_end-->'
						);
					}else{
						appendsMessage+=(
							'<!--messagesContent_messages_start-->'+
							'<div class="messagesContent_messages1">'+
								'<div class="messagesContent_messages_img">'+'<img src="/uploads/userspic/'+json[a[i]].avatar+'" height="37" width="37" alt="用户'+json[a[i]].nickname+'"/>'+'</div>'+
								'<div class="messagesContent_messages_wapper">'+
									'<div class="messagesContent_messages_userInfo">'+
										'<div><span class="messagesContent_messages_userInfo_time">'+json[a[i]].time+'</span></div>'+
									'</div>'+
									'<div class="messagesContent_messages_content">'+json[a[i]].content+'</div>'+
								'</div>'+
							'</div>'+
							'<!--messagesContent_messages_end-->'
						);
					}
					
				}
		
		$("#sMessages_window").append(
			'<div id="sMessages_window_header">'+
				'<div id="sMessages_window_userInfo"><span>与 <b>'+var_sMessage_name+'</b>'+authCards+'的私信</span></div>'+
				'<div id="sMessages_window_close"></div>'+
			'</div>'+
			'<div id="sMessages_window_content">'+
			appendsMessage+
			'</div>'+
			'<div id="sMessages_window_input">'+
				'<div><textarea id="sMessages_window_textarea"></textarea></div>'+
				'<div><label id="count">还可以输入 <b><span></span></b> 个字</label><label id="sMessages_window_send">回复</label></div>'+
			'</div>'
		);
	}
//延时运行函数
	function delayRun(code,time) {
		var t=setTimeout(code,time);
	}
	
	
