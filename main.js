$(function(){
  
	//定位移动
    var href = "";
    var pos = 0;
    $(".nav-tags a").click(function(e){
        $(".nav-tags li").each(function () {
            $(this).removeClass("active");
        });
        $(this).parent("li").addClass("active");
        e.preventDefault();
        href = $(this).attr("href");
        pos = $(href).position().top - 60;
        $("html,body").animate({ scrollTop: pos }, 500);
    });
  
	//导航动画
    $(".btn-mobile-sidenav").click(function () {
        if ($(this).find(".nav-bar").hasClass("nav-bar-animate")) {
            $(this).find(".nav-bar").removeClass("nav-bar-animate");
            $(".sidenav").removeClass("show-sidenav").addClass("hide-sidenav");
            $(".mobile-header-wrap .sidenav-mark").animate({
                opacity: 0,
            }, 500, function(){
                $(this).remove();
            });
            $('body').css({
                'overflow': 'auto'
            });
        } else {
            $(this).find(".nav-bar").addClass("nav-bar-animate");
            $(".sidenav").addClass("show-sidenav").removeClass("hide-sidenav");
            $(".mobile-header-wrap").append("<div class='sidenav-mark'></div>");
            $('body').css({
                'overflow': 'hidden'
            });
        }
    });

	//Tooltip动画
    var x = 10;
    var y = 20;
    $("a.link-tooltip").mousemove(function(e){
        var linkTooltip = $("#link-tooltip");
        if(!linkTooltip.length){
            this.tooltipTitle = this.title;
            this.title = "";
            linkTooltip = $("<div id='link-tooltip'><div class='tooltip-content'>"+this.tooltipTitle+"</div></div>");
            $("body").append(linkTooltip);
        }
        linkTooltip.css({
            "top": (e.pageY+y) + "px",
            "left": (e.pageX+x) + "px"
        }).show("fast");
    }).mouseout(function(){
        this.title = this.tooltipTitle;
        $("#link-tooltip").remove();
    });

});


//搜索动画
function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
    }
}

//点赞功能
$(function(){ 
    $(".love-btn").click(function(){ 
        var love = $(this); 
        var id = love.attr("rel"); //对应id 
        love.fadeOut(300); //渐隐效果 
        $.ajax({ 
            type:"POST", 
            url:"../inc/love.php", 
            data:"id="+id, 
            cache:false, //不缓存此页面 
            success:function(data){ 
                love.html(data); 
                love.fadeIn(300); //渐显效果 
            } 
        }); 
        return false; 
    }); 
});

//懒加载
jQuery(function() {
	jQuery(".card-icon img").lazyload({
		placeholder: "../img/loading",
		effect: "fadeIn"
	});
});

//去顶部
$('.suspend .top').click(function() {
	$('html,body').animate({
		scrollTop: '0'
	}, 500);
});