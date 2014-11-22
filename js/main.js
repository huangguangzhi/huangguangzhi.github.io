var Tips = (function(){

	var $tipBox = $(".tips-box");

	var bind = function(){

	}

	bind();
	return {
		show: function(){
			$tipBox.removeClass("hide");
		},
		hide: function(){
			$tipBox.addClass("hide");
		},
		init: function(){
			
		}
	}
})();

var Main = (function(){

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = parseInt(Math.random()*5+1);
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}

	var fancyInit = function(){
		var isFancy = $(".isFancy");
		if(isFancy.length != 0){
			var imgArr = $(".article-inner img");
			for(var i=0,len=imgArr.length;i<len;i++){
				var src = imgArr.eq(i).attr("src");
				var title = imgArr.eq(i).attr("alt");
				imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' title='"+title+"'></a>");
			}
			$(".article-inner .fancy-ctn").fancybox();
		}
	}

	return {
		init: function(){
			resetTags();
			bind();
			fancyInit();
			Tips.init();
		}
	}
})();

$(Main.init());

var BeautifullMath = function() {
    var obj = [], xm = 0, ym = 0, axe = 0, aye = 0, parts = 50, scr, aArr, txe, tye, nw, nh;
    var colorArr = ['black', 'blue', 'red', 'green', 'yellow'];
    var addEvent = function(o, e, f) {
        window.addEventListener ? o.addEventListener(e, f, false) : o
                .attachEvent('on' + e, function() {
                            f.call(o)
                        })
    }
    var resize = function() {
        nw = scr.offsetWidth * .4;
        nh = scr.offsetHeight * .5;
    }
    var init = function(id, f) {
        scr = document.getElementById(id);
        aArr = document.getElementsByClassName('tagcloud');
        addEvent(document, 'mousemove', function(e) {
                    e = e || window.event;
                    xm = e.clientX;
                    ym = e.clientY;
                });
        resize();
        addEvent(window, 'resize', resize);
        __init(f);
        setInterval(run, 16);
    }
    var __init = function(f) {
        for (var i = 0; i < aArr.length; i++) {
            var o = {};
            o.p = aArr[i];
            o.p.style.color = colorArr[Math.round(Math.random() * 4)];
            var r = i / parts, j, a, b;
            j = i % parts;
            a = Math.floor(j) / 200 + (Math.floor(j / 2) % 10) / 5 * Math.PI
                    * 2;
            b = Math.acos(-0.9 + (j % 4) * 0.6);
            r = !!f ? f(r) : r - r * r + .5;
            var sbr = Math.sin(b) * r;
            o.x = Math.sin(a) * sbr;
            o.y = Math.cos(a) * sbr;
            o.z = Math.cos(b) * r;
            obj.push(o);
            o.transform = function() {
                var ax = .02 * txe, ay = .02 * tye, cx = Math.cos(ax), sx = Math
                        .sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
                // rotation
                var z = this.y * sx + this.z * cx;
                this.y = this.y * cx + this.z * -sx;
                this.z = this.x * -sy + z * cy;
                this.x = this.x * cy + z * sy;
                // 3d
                var scale = 1 / (1 + this.z), x = this.x * scale * nh + nw
                        - scale * 2, y = this.y * scale * nh + nh - scale * 2;
                // set style
                var p = this.p.style;
                if (x >= 0 && y >= 0 && x < nw * 2 && y < nh * 2) {
                    var c = Math.round(256 + (-this.z * 256));
                    p.left = Math.round(x) + 'px';
                    p.top = Math.round(y) + 'px';
                    p.fontSize = Math.round(12 * scale) + 'px';
                    p.zIndex = 200 + Math.floor(-this.z * 100);
                    p.opacity = .6 - this.z;
                    p.filter = 'alpha(opacity=' + 100 * (.6 - this.z) + ')';
                } else
                    p.width = "0px";
            }
        }
    }
    // run function
    var run = function() {
        var se = 1 / nh;
        txe = (ym - axe) * se;
        tye = (xm - aye) * se;
        axe += txe;
        aye += tye;
        /* ---- anim particles ---- */
        for (var i = 0, o; o = obj[i]; i++)
            o.transform();
    }
    return {
        init : init
    }
}();
onload = function() {
    BeautifullMath.init('screen', function(r) {
                return .5;
            });
}