(function(factory){
    if(typeof define === 'function' && define.amd){
        define(['jquery'],factory);
    }else{
        factory(window.jQuery);
    }
}(function($){  
    var emotdb=[{"name":"[微笑]","icon":"e100.gif"},{"name":"[害羞]","icon":"e101.gif"},{"name":"[吐舌头]","icon":"e102.gif"},{"name":"[偷笑]","icon":"e103.gif"},{"name":"[爱慕]","icon":"e104.gif"},{"name":"[大笑]","icon":"e105.gif"},{"name":"[跳舞]","icon":"e106.gif"},{"name":"[飞吻]","icon":"e107.gif"},{"name":"[安慰]","icon":"e108.gif"},{"name":"[抱抱]","icon":"e109.gif"},{"name":"[加油]","icon":"e110.gif"},{"name":"[胜利]","icon":"e111.gif"},{"name":"[强]","icon":"e112.gif"},{"name":"[亲亲]","icon":"e113.gif"},{"name":"[花痴]","icon":"e114.gif"},{"name":"[露齿笑]","icon":"e115.gif"},{"name":"[查找]","icon":"e116.gif"},{"name":"[呼叫]","icon":"e117.gif"},{"name":"[算账]","icon":"e118.gif"},{"name":"[财迷]","icon":"e119.gif"},{"name":"[好主意]","icon":"e120.gif"},{"name":"[鬼脸]","icon":"e121.gif"},{"name":"[天使]","icon":"e122.gif"},{"name":"[再见]","icon":"e123.gif"},{"name":"[流口水]","icon":"e124.gif"},{"name":"[享受]","icon":"e125.gif"},{"name":"[色情狂]","icon":"e126.gif"},{"name":"[呆若木鸡]","icon":"e127.gif"},{"name":"[思考]","icon":"e128.gif"},{"name":"[迷惑]","icon":"e129.gif"},{"name":"[疑问]","icon":"e130.gif"},{"name":"[没钱了]","icon":"e131.gif"},{"name":"[无聊]","icon":"e132.gif"},{"name":"[怀疑]","icon":"e133.gif"},{"name":"[嘘]","icon":"e134.gif"},{"name":"[小样]","icon":"e135.gif"},{"name":"[摇头]","icon":"e136.gif"},{"name":"[感冒]","icon":"e137.gif"},{"name":"[尴尬]","icon":"e138.gif"},{"name":"[傻笑]","icon":"e139.gif"},{"name":"[不会吧]","icon":"e140.gif"},{"name":"[无奈]","icon":"e141.gif"},{"name":"[流汗]","icon":"e142.gif"},{"name":"[凄凉]","icon":"e143.gif"},{"name":"[困了]","icon":"e144.gif"},{"name":"[晕]","icon":"e145.gif"},{"name":"[忧伤]","icon":"e146.gif"},{"name":"[委屈]","icon":"e147.gif"},{"name":"[悲泣]","icon":"e148.gif"},{"name":"[大哭]","icon":"e149.gif"},{"name":"[痛哭]","icon":"e150.gif"},{"name":"[I服了U]","icon":"e151.gif"},{"name":"[对不起]","icon":"e152.gif"},{"name":"[再见]","icon":"e153.gif"},{"name":"[皱眉]","icon":"e154.gif"},{"name":"[好累]","icon":"e155.gif"},{"name":"[生病]","icon":"e156.gif"},{"name":"[吐]","icon":"e157.gif"},{"name":"[背]","icon":"e158.gif"},{"name":"[惊讶]","icon":"e159.gif"},{"name":"[惊愕]","icon":"e160.gif"},{"name":"[闭嘴]","icon":"e161.gif"},{"name":"[欠扁]","icon":"e162.gif"},{"name":"[鄙视你]","icon":"e163.gif"},{"name":"[大怒]","icon":"e164.gif"},{"name":"[生气]","icon":"e165.gif"},{"name":"[财神]","icon":"e166.gif"},{"name":"[学习雷锋]","icon":"e167.gif"},{"name":"[恭喜发财]","icon":"e168.gif"},{"name":"[小二]","icon":"e169.gif"},{"name":"[老大]","icon":"e170.gif"},{"name":"[邪恶]","icon":"e171.gif"},{"name":"[单挑]","icon":"e172.gif"},{"name":"[CS]","icon":"e173.gif"},{"name":"[隐形人]","icon":"e174.gif"},{"name":"[炸弹]","icon":"e175.gif"},{"name":"[惊声尖叫]","icon":"e176.gif"},{"name":"[漂亮MM]","icon":"e177.gif"},{"name":"[帅哥]","icon":"e178.gif"},{"name":"[招财猫]","icon":"e179.gif"},{"name":"[成交]","icon":"e180.gif"},{"name":"[鼓掌]","icon":"e181.gif"},{"name":"[握手]","icon":"e182.gif"},{"name":"[红唇]","icon":"e183.gif"},{"name":"[玫瑰]","icon":"e184.gif"},{"name":"[残花]","icon":"e185.gif"},{"name":"[爱心]","icon":"e186.gif"},{"name":"[心碎]","icon":"e187.gif"},{"name":"[钱]","icon":"e188.gif"},{"name":"[购物]","icon":"e189.gif"},{"name":"[礼物]","icon":"e190.gif"},{"name":"[收邮件]","icon":"e191.gif"},{"name":"[电话]","icon":"e192.gif"},{"name":"[举杯庆祝]","icon":"e193.gif"},{"name":"[时钟]","icon":"e194.gif"},{"name":"[等待]","icon":"e195.gif"},{"name":"[很晚了]","icon":"e196.gif"},{"name":"[飞机]","icon":"e197.gif"}];
    //自定义hashtable
    function Hashtable() {
        this._hash = new Object();
        this.put = function(key, value) {
            if (typeof (key) != "undefined") {
                if (this.containsKey(key) == false) {
                    this._hash[key] = typeof (value) == "undefined" ? null : value;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        };
        this.remove = function(key) { delete this._hash[key]; };
        this.size = function() { var i = 0; for (var k in this._hash) { i++; } return i; };
        this.get = function(key) { return this._hash[key]; };
        this.containsKey = function(key) { return typeof (this._hash[key]) != "undefined"; };
        this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } };
    }
    var EmotionsHt = new Hashtable();
    var emotions = new Array();
    //替换
    function AnalyticEmotion(s) {
        if(typeof (s) != "undefined") {
            var sArr = s.match(/<.*?>|\[.*?\]/g);
            if(sArr){
                for(var i = 0; i < sArr.length; i++){
                    if(EmotionsHt.containsKey(sArr[i])) {
                        var reStr = "<img src=\"Public\/emoticon\/" + EmotionsHt.get(sArr[i]) + "\" />";
                        s = s.replace(sArr[i], reStr);
                    }
                }
            }
        }
        return s;
    }
    function loademotion(){
        for ( var i in emotdb) {
            var ename =emotdb[i].name;
            var eimg  =emotdb[i].icon;
            emotions.push({name:ename,icon:eimg});
            EmotionsHt.put(ename, eimg);
        }                
        $('.dynlist').showemot();  
    }    
    $.fn.showemot = function(){
        this.each(function() {
            var inputText = $(this).html();
            $(this).html(AnalyticEmotion(inputText));
        });
    };
    loademotion();
    $.fn.emotion = function(target){
        var s={zindex:99};
        var timer=null;
        var t=$(this);
        var epanel;
        if(window.top!=window.self){
            s.zindex=2000;
        }
        t.click(function(event){
			event.stopPropagation();            
            var eTop=0,eLeft=0;
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
                
                eTop = dlt+$(this).offset().top + $(this).height() + 5;
                eLeft = dll+$(this).offset().left;
            }else{
                eTop = $(this).offset().top + $(this).height() + 5;
                eLeft = $(this).offset().left;
            }			
            
			$('body',window.top.document).append('<div id="emotion_panel"></div>');
            epanel=$('#emotion_panel',window.top.document);
			epanel.css({top: eTop, left: eLeft,'z-index':s.zindex+1});
			epanel.html('<div>正在加载，请稍候...</div>');
			epanel.click(function(event){
				event.stopPropagation();
			});

			epanel.html('<div class="container"></div><div class="facePreview" style="display:none;"><div><p class="faceImg"><img src="" alt=""></p><p class="faceName"></p></div></div>');
			showEmotions();                       
		});

		//$('body').click(function(){
		//	$('#emotion_panel').remove();
		//});
        $.fn.insertText = function(text){
			this.each(function() {
				//if(this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {return;}
				if (document.selection) {                    
					this.focus();
					var cr = document.selection.createRange();
					cr.text = text;
					cr.collapse();
					cr.select();
				}else if (this.selectionStart || this.selectionStart == '0') {
					var start = this.selectionStart, end = this.selectionEnd;
					this.value = this.value.substring(0, start)+ text+ this.value.substring(end, this.value.length);
					this.selectionStart = this.selectionEnd = start+text.length;
				}else {
                    if(this.tagName == 'INPUT' && this.tagName == 'TEXTAREA'){
                        this.value += text;
                    }else{
                        $(this).append(text);
                    }
				}
			});
			return this;
		};
        function showEmotions(){
            var dom = epanel.find('.container');
            var preview = epanel.find('.facePreview');
            
			for(var i = 0; i < emotions.length; ++i){
				dom.append($('<a href="javascript:void(0);" data-icon="'+emotions[i].icon+'" title="' + emotions[i].name + '"></a>'));
			}
			dom.find('a').click(function(){
				target.focus().insertText($(this).attr("title"));
                target.change();
				epanel.remove();
			}).hover(function(){
                var a = $(this).index();
                if(a%11 >7){
                    preview.css({'left':12});
                }else{
                    preview.css({'left':'auto'});
                }
                var faceName=$(this).attr('title');
                faceName=faceName.replace(/(\[|\])/g,'');
                $('.faceName',preview).html(faceName);
                $('img',preview).attr('src','Public/emoticon/'+$(this).data('icon'));
                $(preview).show();
            },function(){
                $(preview).hide();
            });
            $(t).unbind('mouseleave').bind('mouseleave',function(){
                timer=setTimeout(function(){epanel.remove();},200);
            }); 
            epanel.hover(function(){
                clearTimeout(timer);
            },function(){
                epanel.remove();
            });
		}
    };
}));