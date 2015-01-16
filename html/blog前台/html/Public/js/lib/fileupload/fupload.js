/*
 * fupload 1.0
 * Copyright (c) 2013 黄奕雄
 * Date: 2014-04-4
 */
define(function(require) {

    var $ = require('jquery');
    require('./jquery.ui.widget');
    require('./jquery.iframe-transport');
    require('./jquery.fileupload');
    var csss = ['./css/jquery.fileupload.css'];
    
    for(var i=0;i<csss.length;i++){
        var css=csss[i];
        css = require[require.toUrl ? 'toUrl' : 'resolve'](css);
        css = '<link rel="stylesheet" href="' + css + '" />';
        $('base')[0] ? $('base').before(css) : $('head').append(css);
   }

    $.fn.fupload = function(o) {
        var defaults = {
            bw    : 178,
            bh    : 43,
            size  : '2048KB',
            img   : 'button_up.png',
            path  : 'YnVzaW5lc3M=', //business
            input : 'photo',
            uid   : 0,
            max   : 20,
            extension : '*.gif; *.jpg;*.jpeg;*.bmp',
            auto  : true,
            btxt  : '',
            multi :true,
            style :'pic', //pic:图片，file:文件
            icoh  : null
        };
        var opts = $.extend({}, defaults, o);
        var dos = '';
        if(opts.path == 'ZmVlZEJhY2s='){
            dos = 'upload';
        }else{
            dos = 'upload_dynamic_business';
        }

        return this.each(function() { 
            var t=$(this);
            var url = FILEHOST;
            t.fileupload({
                url: url,
                forceIframeTransport: true,
                iframe:true,
				formData:{'do':dos,'do_type':opts.path,'operator':'user','callback':'uploadImgDeal'},
                dataType: 'html',
				processData: true,
				contentType: true,
				cache: true,
                done: function (e, result) {
                    //return;
                },
				submit: function (e, data) {
					var area = $('.c-upload-m',window.top.document);
					
					if(data.files.length>9){
						area.find('.info').html('最多选择9张图片上传');
					}
					
					for(var m=1;m<=data.files.length;m++){
						var _item=$('<div class="item load"><div class="loadimg"></div></div>');
        				$('.c-upload-m .upload',window.top.document).before(_item);
						if($('.c-upload-m',window.top.document).find('.item').length>8){
							area.find('.upload').hide();
							break;
						}
					}
				},
                progressall: function (e, data) {  
					$('#progress').show();
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress*2 + 'px'
                    );
					$('#progress .progress_num').html(progress + '%');
					if(progress==100) $('#progress').hide();
                }
            }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');
    
        });
    };
});