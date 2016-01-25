define(function(require, exports, module) {  
	var $ = require("jquery");
	var Uploader = require("uploader");
	require("handlebars");
	require('popover');
	var upload_temp = require('./uploadTemp.handlebars');
	var upload_Img = require('./uploadImg.handlebars');
	var globalNum = 1;
	var index = 0;
	var renheUpload = function(options){
		this.options = $.extend({},{
			trigger:".add-pic",
			maxValue:3
		},options);
		this.$trigger = $(this.options.trigger);
		this.$maxValue = $(this.options.maxValue);
		this.init();		
	}
	renheUpload.prototype = {
		getVars:function(){
			return {
				url:this.$trigger.data("url"),
				picName:this.$trigger.data("name"),
				picHref:this.$trigger.data("href"),
				removeHref:$(".icon-remove"),
				id:"uploadImgPopover_"+(globalNum++),
				uploadId:"uploadImg_"+(globalNum++)
			}
		},
		init:function(){
			var self = this;
			this.vars = this.getVars();
			this.$trigger.popover({
				html:true,
				placement:"bottom",
				title:"上传图片",
				content:upload_temp({text:"共"+index+"张,还能上传"+(this.$maxValue[0]-index)+"张",vars:this.vars})
			}).on('shown.bs.popover', function () {
			  self.uploadImg();
			})
			$(".icon-remove").live("click",function(){
				var $this = $(this);
				var picHref = $this.attr("hrefurl");
				$.ajax({
					url:picHref,
					type:"POST",
					dataType:"json",
					success:function(d){
						if(d.success){
							$this.closest('li').remove();
						}
					}
				});
				index--;
				if(index < self.$maxValue[0]){
		  			$(".doupload").css("display","block");		  			
		  		}
		  		$(".filenum").html("共"+index+"张,还能上传"+(self.$maxValue[0]-index)+"张");
			});
		},
		uploadImg:function(){
			var self = this;
			index = 0;
			var up = new Uploader({
			    trigger: "#"+this.vars.uploadId,
			    action: this.vars.url,
			    accept: 'image/*',
			    name:this.vars.picName,
			    multiple: false,
			    success: function(response,files) {
			    	var picUrl = response.picUrl;
			    	var fileid="fileid_"+(this._files[0].lastModified);
			    	$('li.fileid-'+(this._files[0].lastModified)).html(upload_Img({fileid:fileid,href:self.vars.picHref,picUrl:picUrl}));
			  		$("#"+self.vars.uploadId).trigger('mouseover');
			  		index++;
			  		if(index == self.$maxValue[0]){
			  			$(".doupload").css("display","none");
			  		}
			  		$(".filenum").html("共"+index+"张,还能上传"+(self.$maxValue[0]-index)+"张");
			    },
				change:function(files) {
					var str = "";
				    for (var i=0; i<files.length; i++) {
				    	str +='<li class="file-item fileid-' + this._files[0].lastModified + '"><p class="text-center"><i class="icon-spinner icon-spin"></i></p><p class="text-overflow">'+files[i].name+'</p></li>';
                    }
				    $(".doupload").before(str);
				    this.submit();
				}
			})
		}
	};
	new renheUpload();
})