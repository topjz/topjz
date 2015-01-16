require.config({
    baseUrl: baseUrl
});

define(function(require) {
    var $ = require('jquery');
    require('webui');
    require('emotion');
    require('tupload');
    
    var dialog = require('artDialog/dialog-plus');
    window.dialog=dialog;
    
    $(function() {
        $('.tnav .signin').mouseenter(function(){
            $(this).hide();
            $('.tnavbg').animate({top:"-3px"},100).animate({top:"-5px"},50).animate({top:"0px"},50,function(){
                $('.tnav .login').fadeIn(100,function(){
                    $('.tnav .lform').animate({width:'318px'});
                    $('.tnav .lform input:first').focus();
                    
                    $('.tnavbar').off('mouseleave').on('mouseleave',function(){
                        
                        $('.tnav .lform').animate({width:'0px'},function(){
                            $('.tnav .login').fadeOut(function(){
                                $('.tnavbg').animate({top:"-48px"},100,function(){
                                    $('.tnav .signin').css({top:-28+'px'}).show().animate({top:'0'});
                                });
                            });
                            
                        });
                    });
                });
            });
            
        });
        
        $('.nav .dropdown').menu('>a','ul',function(t){
            $(t).find('>a').addClass('active');
        },function(t){
            $(t).find('>a').removeClass('active');
        });       
        
        $('.article-list .op i,.article-detail .hd i').hover(function(){
           $(this).tipbox(); 
        },function(){
            $.closeTip();
        });
        
        $('.tab').tab('.tab_t strong','.tab_c');
        
        $('.comm-write .icon-emot').emotion($('.comm-write [name="content"]'));
        //上传图片
        $('.comm-write .icon-pic').tupload();
        
        //表情替换
        $('.comm-list .detail').showemot();
        
        $('.comm-write .send,.comm-list .send').live('click',function(){
            var cbox=$(this).closest('.commbox');
            var con=cbox.find('[name="content"]');
            if($.trim(con.val())==''){
                $(this).tipbox('请输入内容！'); 
                return false;
            }
            var d=dialog({url:'ajax/login.html',title:'登录',padding:0,ok:function(){
                    
            },cancel:function(){},okValue:'确定',cancelValue:'取消'}).showModal();
        });
        
        
        var box=$('<div class="commbox">'
                +'<textarea name="content"></textarea>'
                +'<div class="poster">'
                +'    <div class="poster-attach">'
                +'        <i class="icon-emot"></i>'
                +'        <i class="icon-pic"></i>'
                +'    </div>'
                +'    <div class="btn"><a href="javascript:;" class="send">发布</a></div>'
                +'</div>'
            +'</div>');
        $('.comm-list .icon-reply').click(function(){
           
            $(this).closest('.op').after(box);
            $('.comm-list .icon-emot').emotion($('.comm-list [name="content"]'));
            //上传图片
            $('.comm-list .icon-pic').tupload();
        });
    });
});