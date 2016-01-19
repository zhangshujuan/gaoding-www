define(function(require, exports, module) {
	var $ = require("jquery");
	require("jqueryui");
	require("bootstrap");
	$(document).delegate('[data-link]:not(a)',"click",function(evt){
		if($(evt.target).closest("a").length>0) return;
		if(evt.target.tagName=="A") return;
		var t = new Date().getTime();
		var id = 'linkTo'+t;
		var link = $('<a>').attr("id",id).attr("href",$(this).data("link")).attr("target",$(this).data("link-target")||"_self").css({visibility:"hidden"});
		link.appendTo("body");
		link[0].click();
		//window.location.href= $(this).data("link");
	});
	$(document).delegate('[data-casetoggle="true"]',"click",function(evt){
		var cont = $(this).closest('.js-case-content');
		$(this).hide().siblings('[data-casetoggle="true"]').show();
		cont.find(".short:visible").fadeToggle("fast",function(){
		   cont.find(".details:hidden").fadeToggle("fast");
		});
		cont.find(".details:visible").fadeToggle("fast",function(){
		   cont.find(".short:hidden").fadeToggle("fast");
		});
	})
	$('.js-show-wxgzewm').popover({
		trigger:"hover",
		html:true,
		placement:"bottom",
		container:"body",
		content:function(){
			return '<p class="pop-wxinfo"><img src="http://ws1.zanfuwu.com/images/zanfuwu_weixin_1217.jpg"><span>微信扫一扫<br>订阅赞服务</span></p>';
		}
	}).on('shown.bs.popover', function (e,h) {
	  $(".pop-wxinfo").closest(".popover").css({"margin-top":"23px"});
	});
	var getDomJson = function(target,name){
		var data = target.data(name);
		if ( data.indexOf( '{' ) <0 ){
			data = "{" + data + "}";
		}
		data = eval("(" + data + ")");
		return data;
	}
	mySeller = {};
	mySeller.getDomJson = getDomJson;
	mySeller.selectChange = function(_this){
		var _target = $(_this)
		var config = getDomJson(_target,"config")
		var data = {};
		data[config.field] = $(_this).val();
		$.ajax({
			url:config.url,
			type:"get",
			dataType:"json",
			data:data,
			success:function(res){
		        var list = res[config.key];
		        var target = $(config.target);
		        var strArr = [];
				$.each(list,function(index,item){
					strArr.push('<option value="'+item.id+'">'+item.name+'</option>')
				});
				target.html(strArr.join(""));
			}
		});
	}
	mySeller.getFormData = function(form){
		var data = {};
		$(form).find('[name]').each(function(index,item){
			var _this = $(item);
			if(_this.is('[type="radio"]') || _this.is('[type="checkbox"]')){
				if(!_this.prop("checked")) return;
			}
			data[_this.attr("name")] = _this.val();
		})
		return data;
	}
	mySeller.alert = function(text,callback){
		$('<p>'+text+'</p>').dialog({
	      title: "提示",
	      width: 250,
	      modal: true,
	      buttons: [
	        {
	          text: "确定",
	          click: function() {
	        	  callback && typeof(callback) && callback(this)
	            $( this ).dialog( "close" );
	          }
	        }
	      ],
	      show:{ effect: "fadeIn", duration: 400 },
	      dialogClass: "seller-dialog"
	    });
	}
	mySeller.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
	window.mySeller = mySeller;

	module.exports = {
		mySeller:mySeller
	}
})