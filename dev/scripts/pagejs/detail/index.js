define(function(require, exports, module) {  
	var $ = require("jquery");
	require("pagination");
	require("handlebars");
	var commentTemplate = require("./comment-list.handlebars");
	var ewmdialog = null;
	$(".js-show-ewm").on("click",function(e){
		var $this = $(e.target);
		if(ewmdialog){
			return ewmdialog.dialog("open");
		}
		var ewmimg = $this.data("ewm");
		ewmdialog = $($('#ewmTemplate').html().replace("{{ewm}}",ewmimg)).dialog({
	    	width:424,
	    	dialogClass:"ewm-dialog"
	    });
	})
	var initPagination = function() {
		// 创建分页
		$("#Pagination").pagination($("#Pagination").data("total"), {
			link_to:"#",
			//noEvt:true,
			num_edge_entries: 1, //边缘页数
			num_display_entries: 4, //主体页数
			callback: pageselectCallback,
			items_per_page:1 //每页显示1项,
		});
	 }();
	 
	function pageselectCallback(page_index, jq){
		$.ajax({
			url:$(jq).data("url"),
			data: "pageNo="+(page_index+1),
			dataType:"json",
			type:"get",
			success:function(res){
				$("#commentList").html(commentTemplate(res));
			}
		})
		return false;
	}
})