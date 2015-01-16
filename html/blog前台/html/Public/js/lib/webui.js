define(['jquery'], function($) {
    $.extend({
        closeTip: function(a) {
            if (a) {
                $(".tips-stic", a).remove();
            } else {
                $(".tips-stic").remove();
            }
        }
    });

    $.fn.extend({        
        tipbox:function(a,timeout){
            return this.each(function(){
                var _this=$(this);
                
                if(typeof(a) =='string'){
                    a={title:a};
                }
                
                var defaults={
                    align:'top',
                    hover:1    //鼠标可经过提示框
                };
                var s = $.extend({},defaults,a);
                $.closeTip(s.iframe);
                
                if(!s.title) s.title=_this.data('title');
                
                var f,timer=null;
                var bom='<span class="tips-stic"><span class="arrow"></span><span class="arrow2"></span>'+s.title+'</span>';
                if(s.iframe){
                    $("body",s.iframe).append(bom);
                    f = $(".tips-stic",s.iframe);
                }else{
                    $("body").append(bom);
                    f = $(".tips-stic");
                }
                if(s.icon){
                    var icon='';
                    switch(s.icon){
                        case 'error':
                            icon='er';
                            break;
                        case 'success':
                            icon='cr';
                            break;
                    }
                    f.find('span').after('<i class="icon-'+icon+'"></i>');
                }
                
                if(s.zindex){
                    f.css({'z-index': s.zindex});
                }
                f.show();        
                if(s.hover==1){
                    clearTimeout(timer);                    
                    _this.unbind('mouseleave').bind('mouseleave',function() {
                        clearTimeout(timer);
                        timer = setTimeout(function() { $.closeTip(s.iframe); },timeout);
                    });
                    f.unbind('mouseenter').bind('mouseenter',function() {
                        clearTimeout(timer);
                    });
                    f.unbind('mouseleave').bind('mouseleave',function() {
                        clearTimeout(timer);
                        timer = setTimeout(function() { $.closeTip(s.iframe); },timeout);
                    });
                }else{
                    if(timeout){
                        timer=setTimeout(function(){ $.closeTip(s.iframe); },timeout);
                    }
                }
				
				var ol=_this.offset().left;
                var ot=_this.offset().top;
                var ow=_this.outerWidth();
                var oh=_this.outerHeight();
                var fw=f.outerWidth();
                var fh=f.outerHeight();
				
                switch(s.align){
                    case 'top':
                        var j=fw>ow?-(fw-ow)/2:(ow-fw)/2;
                        if(fw>ow && $(window).width()<ol+Math.abs(j)+ow){
                            var l=ol+Math.abs(j)+ow-$(window).width()+2;
                            f.find('.arrow,.arrow2').css({left:fw/2-6+l});
                            f.show().css({display:'inline',left:ol+j-l,top:ot - fh - 12,opacity:"0"});
                            f.animate({left:ol+j-l,top:ot - fh - 7,opacity: "1"},200);
                        }else{
                            f.find('.arrow,.arrow2').css({left:fw/2-6});
                            f.show().css({display:'inline',left:ol+j,top:ot - fh - 12,opacity:"0"});
                            f.animate({left:ol+j,top:ot - fh - 7,opacity: "1"},200);
                        }
                        break;
                    case 'right':
                        
                        break;
                    case 'bottom':

                        break;
                    case 'left':
                        
                        break;
                }
            });
        },
        tab:function(t,m,fn){
            var tabt=$(this).find(t);
            var tabc=$(this).find(m);

            tabt.mouseenter(function(){
                $(this).addClass('active').siblings().removeClass('active');
                tabc.eq($(this).index()).show().siblings().hide();
				if($.isFunction(fn)) fn();
            });
            tabt.eq(0).mouseenter();
        },
        menu: function(s, c, a, b) {
            return this.each(function() {
                var t = $(this);
                var timer,
                        l = t.find(s),
                        p = t.find(c),
                        pt = parseInt(p.css('top'));
                l.off('mouseenter').on('mouseenter', function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        var sh = p.height();
                        if ($(window).height() + $(window).scrollTop() < sh + l.offset().top + l.height()) {
                            p.css({top: 'auto', bottom: pt + 'px'});
                        } else {
                            p.css({top: pt + 'auto', bottom: 'auto'});
                        }
                        p.css({height: '0px', visibility: 'visible'}).animate({height: sh + 'px', opacity: 1}, 120);
                        if ($.isFunction(a)) {
                            a(t);
                        }
                    },
                            200);
                });
                l.off('mouseleave').on('mouseleave', function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        p.css({height: 'auto', visibility: 'hidden', opacity: 0});
                        if ($.isFunction(b)) {
                            b(t);
                        }
                    },
                            200);
                });
                p.off('mouseenter').on('mouseenter', function() {
                    clearTimeout(timer);
                });
                p.off('mouseleave').on('mouseleave', function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        p.css({height: 'auto', visibility: 'hidden', opacity: 0});
                        if ($.isFunction(b)) {
                            b(t);
                        }
                    },
                            200);
                });
            });
        }
    });
});