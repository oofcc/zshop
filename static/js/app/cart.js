requirejs.config({
	"baseUrl": "/static/js/lib",
	"paths": {
		"publicTip": "/static/js/app/public-tip",
		"zepto": "zepto.min"
    },
    "shim": {
        "jquery.Spinner": ["jquery"]
    }
});

requirejs(["jquery", "publicTip", "jquery.Spinner"], function($, publicTip){
	$(function() {
		$("#cart-all").click(function () {
			if ( $(this).prop('checked') ) { 
				$("input[name=cartpro]").each(function () {
					$(this).prop("checked", true);
				});
			} else {
				$("input[name=cartpro]").each(function () {
					$(this).prop("checked", false);
				});
			}
		});
		
		$("input[type=checkbox]").click(function () {
			var cartCheckedSize = $("input[name='cartpro']:checked").size();
			var cartSize = $("input[name='cartpro']").size();
			
			if ( cartCheckedSize >= 1 ) {
				$("#settlement").css("background-color", "green");
			} else {
				$("#settlement").css("background-color", "gray");
			}
			
			if (cartCheckedSize == cartSize) {
				$("#cart-all").prop("checked", true);
			} else {
				$("#cart-all").prop("checked", false);
			}
		});
		
		var cartSize = $("input[name='cartpro']").size();
		if ( cartSize > 0 ) {
			$("#cart-all").click();
		}
		
		$(".Spinner").each(function(){
			var stock = $(this).attr("stock");
			var count = $(this).attr("count");
			var max = 5;
			if (stock < max) {
				max = stock;
			}
			if (count > max) {
				max = count;
			}
			$(this).Spinner({value:count, len:3, max:max});
		});

		$(".wy-dele").click(function () {
			var cid = $(this).attr("cid");
			publicTip.showLoadingToast(true, "操作中");
			$.ajax({
				type: 'post',
				dataType: 'json',
				url: '/zshop/userapi/delCartProd',
				data: {cid: cid}
			}).done(function (r) {
				console.log(JSON.stringify(r));
				window.location.reload();
			}).fail(function (jqXHR, textStatus) { // Not 200
				publicTip.showLoadingToast(false);
				publicTip.showTip(jqXHR.responseJSON);
			});
		});
	});
	
})