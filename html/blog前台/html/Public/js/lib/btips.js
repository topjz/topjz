define(['jquery'],function($){
    /*
     *                  top
     *             ———————
     *             |           |
     *        left |           |  right
     *             |           |
     *             ———————
     *                 bottom
     *
     */
    $.fn.btips=function(a,callback){
        var defaults={
            close:true,
            arrow:true,
            align:'left',
            left:0,
            top:0,
            event:'hover',
            easing:5,  //
            speed:120,
            wait:100,
            datatype:'html',
            quickClose:true,
            zindex:99
        };
        var that = $.extend({},defaults,a);
        return this.each(function() {
            $('.c-tips-box').remove();
            var t = $(this);
			if(t.length==0) return false;
            var oldalign=that.align;
            var timer;
            var arrow,domcss={top:0,left:0,a:0};
            var arroww=0,arrowh=0;
            var dom=$('<div class="c-tips-box tips-'+that.align+'"><div class="tips-dialog"><div class="tips-con"></div></div></div>');
            dom.hide();
            if(that.title){
                $(dom).find('.tips-dialog').prepend('<div class="c-tips-header"><span class="title">'+that.title+'</span></div>');
                if(that.close){
                    dom.find('.c-tips-header').append('<span class="icon-closed" c="close"></span>');
                }
            }else if(that.close){
                dom.find('.tips-dialog').append('<span class="icon-closed" c="close"></span>');
            }

            if(that.arrow){
                dom.find('.tips-dialog').append('<span class="j-arrow-a"></span><span class="j-arrow-b"></span>');
                arrow=dom.find('.j-arrow-a,.j-arrow-b');
            }
            var api = {
                init:init,
                close:close,
                unmouseleave:unmouseleave,
                setmouseleave:setmouseleave
            };
            function init(){
                if($.isFunction(that.start)){
                    that.start();
                }
                if(that.padding){
                    dom.find('.tips-con').css({padding:that.padding});
                }
                if(that.width){
                    dom.find('.tips-dialog').css({width:that.width});
                }
                if(window.top!=window.self){
                    dom.find('.tips-dialog').css({zIndex:2000});
                }
                $('body',window.top.document).append(dom);
                dom.show().css({visibility:'hidden'});
                setOffset();
                dom.css({visibility:'visible'}).find('.tips-con').html('<div class="j_loading"><span>正在加载，请稍候...</span></div>');
                if(that.url){
                    $.get(that.url,function(data){
                        if(that.datatype=='json'){
                            if(data.status==1){
                                setcontent(data.data);
                            }else{
                                close();
                                if($.isFunction(that.error)){
                                    that.error(data);
                                }
                            }
                        }else{
                            setcontent(data);
                        }
                    },that.datatype);
                }else if(that.content){
                    setcontent(that.content);
                }else{
                    setcontent($('.c-tips-'+$(t).data('rel')).html());
                }
                arroww=that.arrow?arrow.outerWidth():0;
                arrowh=that.arrow?arrow.outerHeight():0;
            }
            function setcontent(data){
                dom.find('.tips-con').html(data);
                reset();
                setOffset();

                dom.find('[c="close"]').off('click').on('click',function(event){
                    close();
                    event.preventDefault();
                });
                if ($.isFunction(callback)) callback.call(dom,api);
            }

            switch(that.event){
                case 'hover':
                    t.off('mouseenter').on('mouseenter',function() {
                        clearTimeout(timer);
                        if(that.opacity){
                            t.animate({opacity:that.opacity},100);
                        }
                        timer = setTimeout(function(){
                            init();
                            //reset();
                            setOffset();
                            dom_event();
                        }, that.wait);
                    });
                    tmouseleave();
                break;
                case 'click':
                    t.click(function(event){                        
                        init();
                        dom.stop(true).animate({opacity:1},500);
                        setOffset();
                        if($.isFunction(that.fn)){
                            that.fn(dom);
                        }
                        if(that.quickClose){
                            event.stopPropagation();
                            dom_event(1);
                            $('body').off('click').on('click',function(e){
                                close(e);
                            });
                        }
                    });
                    break;
                default:
                    if(that.opacity){
                        t.animate({opacity:that.opacity},100);
                    }                    
                    timer = setTimeout(function(){
                        init();
                        reset();
                        setOffset();
                        tmouseleave();
                        dom_event();
                    }, that.wait);                    
            }
            function tmouseleave(){
                t.off('mouseleave').on('mouseleave',function(e) {
                    clearTimeout(timer);
                    timer = setTimeout(function(){ close(e); }, 150);
                });
            }
            function unmouseleave(){
                dom.off('mouseleave');
            }
            function setmouseleave(){
                dom_event();
            }
            function dom_event(s){
                if(s==1 || typeof(s)=='undefined'){
                    dom.off('mouseenter').on('mouseenter',function(event) {
                        event.stopPropagation();
                        $(dom).click(function(event){
                            event.stopPropagation();
                        });
                        clearTimeout(timer);
                    });
                }
                if(s==2 || typeof(s)=='undefined'){
                    dom.off('mouseleave').on('mouseleave',function(e) {
                        clearTimeout(timer);
                        timer = setTimeout(function(){ close(e); }, 200);
                    });
                }
            }


            function close(e){
                //e.preventDefault();
                if(that.opacity){
                    t.animate({opacity:1},100);
                }
                dom.stop(true).animate({opacity:0},100,function(){
                    $('.c-tips-box').remove();
                    if($.isFunction(that.end)){
                        that.end();
                    }
                });
            }
            function setOffset(){
                var d = $(t).offset(),tw=$(t).outerWidth(),th=$(t).outerHeight();
                var dw=$(dom).find('.tips-dialog').outerWidth(),dh=$(dom).find('.tips-dialog').outerHeight();
                var s=0;
                var dlt=0,dll=0;
                if(window.top!=window.self){
                    var dl=$(window.top.document).find('.ui-popup');      
                    dlt=parseInt(dl.css('top'))+dl.find('[i="title"]').height();
                    dll=parseInt(dl.css('left'));
                }
                that.arrow && arrow.removeAttr('style');
                switch (that.align) {
                case 'top':
                    s=dlt+d.top + that.top - dh-that.easing;
                    domcss={top:s,left:dll+d.left + that.left + (tw/2) - (dw/2),a:s+that.easing};
                    setdom(0,domcss);
                    break;
                case 'bottom':
                    s=dlt+d.top + that.top + th - that.easing;
                    domcss={top:s,left:dll+d.left + that.left + (tw/2) - (dw/2),a:s+that.easing};
                    setdom(0,domcss);
                    break;
                case "left":
                    s=dll+d.left - that.left -dw-that.easing;
                    domcss={top:dlt+d.top + that.top + (th/2-dh/2),left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;
                case "right":
                    s=dll+d.left + that.left + tw-that.easing;
                    domcss={top:dlt+d.top + that.top + (th/2-dh/2),left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;
                case 'top-left':
                    s=dlt+d.top + that.top - dh-that.easing;
                    that.arrow && arrow.css({left:-that.left+tw/2-arroww/2});
                    domcss={top:s,left:dll+d.left + that.left,a:s+that.easing};
                    setdom(0,domcss);
                    break;
                case 'top-right':
                    s=dlt+d.top + that.top - dh-that.easing;
                    that.arrow && arrow.css({right:that.left+tw/2-arroww/2});
                    domcss={top:s,left:dll+d.left + that.left + tw -dw,a:s+that.easing};
                    setdom(0,domcss);
                    break;
                case 'bottom-left':
                    s=dlt+d.top + that.top + th+that.easing;
                    that.arrow && arrow.css({left:-that.left+tw/2-arroww/2});
                    domcss={top:s,left:dll+d.left + that.left,a:s-that.easing};
                    setdom(0,domcss);
                    break;
                case 'bottom-right':
                    s=dlt+d.top + that.top + th+that.easing;
                    that.arrow && arrow.css({right:that.left+tw/2-arroww/2});
                    domcss={top:s,left:dll+d.left + that.left + tw -dw,a:s-that.easing};
                    setdom(0,domcss);
                    break;
                case "left-top":
                    s=dll+d.left - that.left -dw-that.easing;
                    var dtop=dlt+d.top+ that.top;
                    var atop=-that.top+th/2-arrowh/2;
                    if(that.limit){
                        var limit=$(that.limit).offset();
                        if(limit.top+$(that.limit).outerHeight()<dtop+dh){
                            dtop=limit.top+ that.top;
                            atop=(dlt+d.top-limit.top)-that.top+th/2-arrowh/2;
                        }
                    }
                    that.arrow && arrow.css({top:atop});
                    domcss={top:dtop,left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;
                case "left-bottom":
                    s=dll+d.left - that.left -dw-that.easing;
                    var dtop=dlt+d.top+ that.top+th-dh;
                    var atop=-that.top+th/2-arrowh/2;
                    if(that.limit){
                        var limit=$(that.limit).offset();
                        if(limit.top+$(that.limit).outerHeight()<dtop+dh){
                            dtop=limit.top+ that.top;
                            atop=(dlt+d.top-limit.top)-that.top+th/2-arrowh/2;
                        }
                    }
                    that.arrow && arrow.css({bottom:atop});
                    domcss={top:dtop,left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;
                case "right-top":
                    s=dll+d.left + that.left + tw-that.easing;
                    var dtop=dlt+d.top+ that.top;
                    var atop=-that.top+th/2-arrowh/2;
                    if(that.limit){
                        var limit=$(that.limit).offset();
                        if(limit.top+$(that.limit).outerHeight()<dtop+dh){
                            dtop=limit.top+ that.top;
                            atop=(dlt+d.top-limit.top)-that.top+th/2-arrowh/2;
                        }
                    }
                    that.arrow && arrow.css({top:atop});
                    domcss={top:dtop,left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;
                case "right-bottom":
                    s=dll+d.left + that.left + tw-that.easing;
                    var dtop=dlt+d.top+ that.top+th-dh;
                    var atop=-that.top+th/2-arrowh/2;
                    if(that.limit){
                        var limit=$(that.limit).offset();
                        if(limit.top+$(that.limit).outerHeight()<dtop+dh){
                            dtop=limit.top+ that.top;
                            atop=(dlt+d.top-limit.top)-that.top+th/2-arrowh/2;
                        }
                    }
                    that.arrow && arrow.css({bottom:atop});
                    domcss={top:dtop,left:s,a:s+that.easing};
                    setdom(1,domcss);
                    break;                
                default:
                    break
                }

            };
            function setdom(s,p){
                dom.css({ top: p.top + "px", left: p.left + "px" });
                if(s==0){
                    dom.stop(true).animate({opacity:1,top:p.a},that.speed);
                }else{
                    dom.stop(true).animate({opacity:1,left:p.a},that.speed);
                }
            }
            function reset(){
                var dw=$(dom).find('.tips-dialog').outerWidth();
                var dh=$(dom).find('.tips-dialog').outerHeight();
                var d = $(t).offset();
                var tw = $(t).outerWidth();
                var th = $(t).outerHeight();
                var ww=$(window.top).width();
                var wh=$(window.top).height();
                var wt=$(window.top).scrollTop();
                var aarr=oldalign.split('-');
                var dlt=0,dll=0;
                if(window.top!=window.self){                    
                    var iframe=null;
                    $("iframe",window.parent.document).each(function(){
                        if(document.body.ownerDocument === this.contentWindow.document) {
                            iframe = this;
                        }
                    });                    
                    var dl=$(iframe).offset();      
                    var dlt=dl.top;
                    var dll=dl.left;                
                }
                var a={
                    top_left:function(){return dlt+d.top-wt>dh && dll+d.left + dw < ww},
                    top:function(){return dlt+d.top-wt>dh && dll+d.left - dw/2 > 0 && dll+d.left + dw/2 < ww;},                    
                    top_right:function(){return dlt+d.top-wt>dh && dll+d.left + tw-dw < ww},
                    right_top:function(){return dll+d.left + dw + tw < ww && dlt+d.top+dh<wh+wt},
                    right:function(){return dll+d.left + dw + tw < ww && dlt+d.top+dh/2<wh+wt && dlt+d.top-dh/2>0},                    
                    right_bottom:function(){return dll+d.left + dw + tw < ww && dlt+d.top-wt>dh},
                    bottom_right:function(){return dlt+d.top + dh + th < wt+wh && dll+d.left + tw-dw < ww},
                    bottom:function(){return dlt+d.top + dh + th < wt+wh  && dll+d.left - dw/2 > 0 && dll+d.left + dw/2 < ww; },
                    bottom_left:function(){return dlt+d.top + dh + th < wt+wh && dll+d.left + dw < ww},      
                    left_bottom:function(){return dll+d.left - dw > 0 && dlt+d.top-wt>dh},
                    left:function(){return dll+d.left - dw > 0 && dlt+d.top+dh/2<wh+wt && dlt+d.top-dh/2>0},
                    left_top:function(){return dll+d.left - dw > 0 && dlt+d.top+dh<wh+wt},
                    
                    get:function(p){
                        var s=aarr[0];
                        //限制显示区域===============================
                        if(that.limit){
                            var limit=$(that.limit).offset();
                            var nalign=oldalign;
                            if(s=='left'){
                                if(limit.left < dll+d.left - dw){
                                    aarr[0]='right';
                                    nalign=aarr.join('-');
                                }
                            }else if(s=='right'){
                                if(limit.left + $(that.limit).outerWidth() < dll+d.left + dw + tw){
                                    aarr[0]='left';
                                    nalign=aarr.join('-');
                                }
                            }
                            return nalign;
                        }
                        
                        if(aarr[1]){
                            s+='_'+aarr[1];
                        }
                        if(eval('this.'+s+'()')) return p;
                        
                        for(var i in a){
                            if(i!='get'){
                                if(eval('this.'+i+'()')) return i.replace('_','-');
                            }
                        }
                        return p;
                    }
                };
                that.align=a.get(oldalign);                
                
                dom.attr('class','c-tips-box tips-'+that.align);
            }
            setOffset();
        });
    };
});