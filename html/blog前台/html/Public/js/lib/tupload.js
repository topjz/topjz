define(function(require){
    var $ = require('jquery');
	var btips = require('btips');
    require('fileupload/fupload');
        
    $.fn.tupload=function(a){
        var defaults={
            max:9,
			path:'YnVzaW5lc3M=' //business
        };
        var that = $.extend({},defaults,a);
        return this.each(function() {
            var t = $(this);
            var tnum=0;
            var innerHTML='<div class="c-upload-m"></div>';
            $(t).btips({ title:'本地图片上传',width:298,align:'bottom-left',left:-44,content:innerHTML,event:'click'},function(){
                var _dom=this;
				var tips_html = '<div class="info">共<span class="tnum">0</span>张，还能上传<span class="cnum">'+that.max+'</span>张<span class="gray9">（按住ctrl可选择多张）</span></div><div class="c-upload-area cf"></div>';
                _dom.find('.c-upload-m').html(tips_html);
                _dom.find('.tnum').html(tnum);
                _dom.find('.cnum').html(that.max-tnum);
                var area=_dom.find('.c-upload-area');
                var str = '<div class="upload"><i></i><input id="fileupload" class="fileupload" type="file" name="files[]" multiple /></div>';
                area.html(str);
                area.find('#fileupload').fupload({max:that.max,path:that.path});
				
                if($('.f-detail:visible .pic').val()){
                    var pic=$('.f-detail:visible .pic').val().split(',');
                    var img_path = $('.f-detail:visible .img_path').val();

                    for(var i=0;i<pic.length;i++){
                        var _item=$('<div class="item"><img img_name="'+pic[i]+'" src="'+img_path+'mid_'+pic[i]+'"/><span></span><i title="删除该图片"></i></div>');
                        _dom.find('.c-upload-m .upload').before(_item);

                        _item.hover(function(e){
                            $(this).find('i').fadeIn(200);
                            $(this).find('span').show().stop(true).animate({'opacity':.5},200);
                        },function(){
                            $(this).find('i').fadeOut(200);
                            $(this).find('span').stop(true).animate({'opacity':0},200,function(){$(this).hide();});
                        });
                    }
                }

                inum();

                _dom.off('mouseenter').on('mouseenter','.item',function(e){
                    $(this).find('i').fadeIn(200);
                    $(this).find('span').show().stop(true).animate({'opacity':.5},200);

                });
                _dom.off('mouseleave').on('mouseleave','.item',function(e){
                    $(this).find('i').fadeOut(200);
                    $(this).find('span').stop(true).animate({'opacity':0},200,function(){$(this).hide();});
                });

                _dom.off('click').on('click','.item i',function(){
                    var img = $(this).siblings('img').attr('img_name');
                    var t = $(this);
                    $.getJSON(FILEHOST+"?do=delete&do_type="+that.path+"&operator=user&filepaths="+img+"&callback=?",function(data){
						SetCookie('weibo_pic','');
						_dom.find('.info').html('共<span class="tnum">0</span>张，还能上传<span class="cnum">'+that.max+'</span>张<span class="gray9">（按住ctrl可选择多张）</span>');
                        t.closest('.item').fadeOut(function(){
                            $(this).remove();
                            getImg();
                            inum();
                        });
                    });
                    return false;
                });

                function inum(){
                    tnum = getImgNum(area);
                    if(getImgNum(area)<9){
                        area.find('.upload').show();
                    }else{
                        area.find('.upload').hide();
                    }
                    _dom.find('.tnum').html(tnum);
                    _dom.find('.cnum').html(that.max-tnum);
                }

                function getImgNum(){
                    var tnumlist=area.find('img');
                    
                    return tnumlist.length;
                }

                function getImg(){
                    var imglist = _dom.find('.item img');
                    var str = '';
                    for(var i=0;i<imglist.length;i++){
                        if(!imglist.eq(i).parent('.item').is(":hidden")){
                            str += empty(str)?imglist.eq(i).attr('img_name'):','+imglist.eq(i).attr('img_name');
                        }
                    }
                    $('.f-detail:visible .pic').val(str);
                }

            });
        });
    };    
});