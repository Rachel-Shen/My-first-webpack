import "./index.less"

//根据strData类型生成左侧菜单
function navBar(strData){
    let data;
    if(typeof(strData) === "string"){
        let data = JSON.parse(strData); //部分用户解析出来的是字符串，转换一下
    }else{
        data = strData;
    }
    let ulHtml = '';
    for(let i=0;i<data.length;i++){
        if(data[i].spread || data[i].spread === undefined){
            ulHtml += '<li class="navbar-item navbar-itemed">';
        }else{
            ulHtml += '<li class="navbar-item">';
        }
        if(data[i].children !== undefined && data[i].children.length > 0){
            ulHtml += '<a>';
            ulHtml += '<cite>'+data[i].title+'</cite>';
            ulHtml += '<span class="iconfont icon-xiala"></span>';
            ulHtml += '</a>';
            ulHtml += '<dl class="navbar-child">';
            for(let j=0;j<data[i].children.length;j++){
                if(data[i].children[j].target === "_blank"){
                    ulHtml += '<dd><a data-url="'+data[i].children[j].href+'" target="'+data[i].children[j].target+'">';
                }else{
                    ulHtml += '<dd><a data-url="'+data[i].children[j].href+'">';
                }
                ulHtml += '<cite>'+data[i].children[j].title+'</cite></a></dd>';
            }
            ulHtml += "</dl>";
        }else{
            if(data[i].target === "_blank"){
                ulHtml += '<a data-url="'+data[i].href+'" target="'+data[i].target+'">';
            }else{
                ulHtml += '<a data-url="'+data[i].href+'">';
            }
            ulHtml += '<cite>'+data[i].title+'</cite></a>';
        }
        ulHtml += '</li>';
    }
    return ulHtml;
}

//渲染左侧菜单
function render() {
    $(".navBar ul").html('<li class="navbar-item navbar-item-this"><a data-url="./browser.html"><cite>后台首页</cite></a></li>').append(navBar(dataStr)).height($(window).height()-80);
    $(window).resize(function(){
        $(".navBar").height($(window).height()-80);
    })
}

let dataStr;
let url = "../../json/menuList.json"
function getData(json){
    $.getJSON(url,function(data){
        if(json === "index"){
            dataStr = data.index;
            //重新渲染左侧菜单
            render();
        }else if(json === "borrowingManagement"){
            dataStr = data.borrowingManagement;
            render();
        }else if(json === "businessManagement"){
            dataStr = data.businessManagement;
            render();
        }else if(json === "moneyManagement"){
            dataStr = data.moneyManagement;
            render();
        }else if(json === "databaseManagement"){
            dataStr = data.databaseManagement;
            render();
        }else if(json === "departmentManagement"){
            dataStr = data.departmentManagement;
            render();
        }else if(json === "webSetting"){
            dataStr = data.webSetting;
            render();
        }else if(json === "marketingPromotion"){
            dataStr = data.marketingPromotion;
            render();
        }else if(json === "systemSettings"){
            dataStr = data.systemSettings;
            render();
        }
    })
}




$(document).ready(function(){
    getData("index");  //首次渲染首页菜单
    $(".right-side .content").height($(window).height()-90);
    //点击收缩左侧菜单栏
    $(".sidebar-toggle").click(function(){
        if($(".left-side").hasClass("collapse-left")){
            $(".left-side").removeClass("collapse-left")
            $(".right-side").removeClass("strech")
        }else {
            $(".left-side ").addClass("collapse-left")
            $(".right-side").addClass("strech")
        }
        if($(".row-offcanvas").hasClass("active relative")){
            $(".row-offcanvas").removeClass("active relative")
        }else {
            $(".row-offcanvas").addClass("active relative")
        }
    })

    //点击顶部分类导航栏重新渲染左侧菜单
    $(".pc li,.mobile dd").click(function(event){
        event.stopPropagation();
        $(".pc li").eq($(this).index()).addClass("navbar-item-this").siblings().removeClass("navbar-item-this");
        $(".mobile dd").eq($(this).index()).addClass("navbar-item-this").siblings().removeClass("navbar-item-this");
        $(".navbar-child").removeClass("navbar-show")
        getData($(this).data("menu"));
    })

    //点击左侧菜单栏，显示二级菜单
    $(".nav").delegate('li','click',function(event){
        if($(this).children("dl").length>0){
            if($(this).hasClass("navbar-itemed")){
                $(this).removeClass("navbar-itemed");
                $(this).children("a").children("span").removeClass("icon-xiala1").addClass("icon-xiala");
            }else{
                $("#navBar li").removeClass("navbar-itemed");
                $("#navBar li a span").removeClass("icon-xiala1").addClass("icon-xiala");
                $(this).addClass("navbar-itemed");
                $(this).children("a").children("span").removeClass("icon-xiala").addClass("icon-xiala1");
            }
            //二级菜单点击跳转页面
            $(".nav").delegate('dd','click',function(event){
                event.stopPropagation();
                $(".navBar .navbar-child dd,.navBar li").removeClass("navbar-item-this");
                $(this).addClass("navbar-item-this");
                let url = $(this).children("a").attr('data-url')
                $(".right-side .content").html('<iframe src="'+url+'"></iframe>')
            })
        } else {
            $(".navBar .navbar-child dd,.navBar li").removeClass("navbar-item-this");
            $(this).addClass("navbar-item-this");
            let url = $(this).children("a").attr('data-url')
            $(".right-side .content").html('<iframe src="'+url+'"></iframe>')
        }
    })

    //移动端点击显示分类列表
    $(".mobile .navbar-item").click(function(){
        if($(this).children(".navbar-child").hasClass("navbar-show")){
            $(this).children(".navbar-child").removeClass("navbar-show")
        }else{
            $(this).children(".navbar-child").addClass("navbar-show")
        }
        if(!$(".row-offcanvas").hasClass("active relative")){
            $(".row-offcanvas").addClass("active relative");
        }
    })
})
