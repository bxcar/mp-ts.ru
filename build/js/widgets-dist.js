!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Slideout=t()}}(function(){var t,e,n;return function i(t,e,n){function o(r,a){if(!e[r]){if(!t[r]){var u=typeof require=="function"&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var f=e[r]={exports:{}};t[r][0].call(f.exports,function(e){var n=t[r][1][e];return o(n?n:e)},f,f.exports,i,t,e,n)}return e[r].exports}var s=typeof require=="function"&&require;for(var r=0;r<n.length;r++)o(n[r]);return o}({1:[function(t,e,n){"use strict";var i=t("decouple");var o=t("emitter");var s;var r=false;var a=window.document;var u=a.documentElement;var l=window.navigator.msPointerEnabled;var f={start:l?"MSPointerDown":"touchstart",move:l?"MSPointerMove":"touchmove",end:l?"MSPointerUp":"touchend"};var h=function v(){var t=/^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;var e=a.getElementsByTagName("script")[0].style;for(var n in e){if(t.test(n)){return"-"+n.match(t)[0].toLowerCase()+"-"}}if("WebkitOpacity"in e){return"-webkit-"}if("KhtmlOpacity"in e){return"-khtml-"}return""}();function c(t,e){for(var n in e){if(e[n]){t[n]=e[n]}}return t}function p(t,e){t.prototype=c(t.prototype||{},e.prototype)}function d(t){t=t||{};this._startOffsetX=0;this._currentOffsetX=0;this._opening=false;this._moved=false;this._opened=false;this._preventOpen=false;this._touch=t.touch===undefined?true:t.touch&&true;this.panel=t.panel;this.menu=t.menu;if(this.panel.className.search("slideout-panel")===-1){this.panel.className+=" slideout-panel"}if(this.menu.className.search("slideout-menu")===-1){this.menu.className+=" slideout-menu"}this._fx=t.fx||"ease";this._duration=parseInt(t.duration,10)||300;this._tolerance=parseInt(t.tolerance,10)||70;this._padding=this._translateTo=parseInt(t.padding,10)||256;this._orientation=t.side==="right"?-1:1;this._translateTo*=this._orientation;if(this._touch){this._initTouchEvents()}}p(d,o);d.prototype.open=function(){var t=this;this.emit("beforeopen");if(u.className.search("slideout-open")===-1){u.className+=" slideout-open"}this._setTransition();this._translateXTo(this._translateTo);this._opened=true;setTimeout(function(){t.panel.style.transition=t.panel.style["-webkit-transition"]="";t.emit("open")},this._duration+50);return this};d.prototype.close=function(){var t=this;if(!this.isOpen()&&!this._opening){return this}this.emit("beforeclose");this._setTransition();this._translateXTo(0);this._opened=false;setTimeout(function(){u.className=u.className.replace(/ slideout-open/,"");t.panel.style.transition=t.panel.style["-webkit-transition"]=t.panel.style[h+"transform"]=t.panel.style.transform="";t.emit("close")},this._duration+50);return this};d.prototype.toggle=function(){return this.isOpen()?this.close():this.open()};d.prototype.isOpen=function(){return this._opened};d.prototype._translateXTo=function(t){this._currentOffsetX=t;this.panel.style[h+"transform"]=this.panel.style.transform="translateX("+t+"px)";return this};d.prototype._setTransition=function(){this.panel.style[h+"transition"]=this.panel.style.transition=h+"transform "+this._duration+"ms "+this._fx;return this};d.prototype._initTouchEvents=function(){var t=this;this._onScrollFn=i(a,"scroll",function(){if(!t._moved){clearTimeout(s);r=true;s=setTimeout(function(){r=false},250)}});this._preventMove=function(e){if(t._moved){e.preventDefault()}};a.addEventListener(f.move,this._preventMove);this._resetTouchFn=function(e){if(typeof e.touches==="undefined"){return}t._moved=false;t._opening=false;t._startOffsetX=e.touches[0].pageX;t._preventOpen=!t._touch||!t.isOpen()&&t.menu.clientWidth!==0};this.panel.addEventListener(f.start,this._resetTouchFn);this._onTouchCancelFn=function(){t._moved=false;t._opening=false};this.panel.addEventListener("touchcancel",this._onTouchCancelFn);this._onTouchEndFn=function(){if(t._moved){t._opening&&Math.abs(t._currentOffsetX)>t._tolerance?t.open():t.close()}t._moved=false};this.panel.addEventListener(f.end,this._onTouchEndFn);this._onTouchMoveFn=function(e){if(r||t._preventOpen||typeof e.touches==="undefined"){return}var n=e.touches[0].clientX-t._startOffsetX;var i=t._currentOffsetX=n;if(Math.abs(i)>t._padding){return}if(Math.abs(n)>20){t._opening=true;var o=n*t._orientation;if(t._opened&&o>0||!t._opened&&o<0){return}if(o<=0){i=n+t._padding*t._orientation;t._opening=false}if(!t._moved&&u.className.search("slideout-open")===-1){u.className+=" slideout-open"}t.panel.style[h+"transform"]=t.panel.style.transform="translateX("+i+"px)";t.emit("translate",i);t._moved=true}};this.panel.addEventListener(f.move,this._onTouchMoveFn);return this};d.prototype.enableTouch=function(){this._touch=true;return this};d.prototype.disableTouch=function(){this._touch=false;return this};d.prototype.destroy=function(){this.close();a.removeEventListener(f.move,this._preventMove);this.panel.removeEventListener(f.start,this._resetTouchFn);this.panel.removeEventListener("touchcancel",this._onTouchCancelFn);this.panel.removeEventListener(f.end,this._onTouchEndFn);this.panel.removeEventListener(f.move,this._onTouchMoveFn);a.removeEventListener("scroll",this._onScrollFn);this.open=this.close=function(){};return this};e.exports=d},{decouple:2,emitter:3}],2:[function(t,e,n){"use strict";var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t,e,n){var o,s=false;function r(t){o=t;a()}function a(){if(!s){i(u);s=true}}function u(){n.call(t,o);s=false}t.addEventListener(e,r,false);return r}e.exports=o},{}],3:[function(t,e,n){"use strict";var i=function(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}};n.__esModule=true;var o=function(){function t(){i(this,t)}t.prototype.on=function e(t,n){this._eventCollection=this._eventCollection||{};this._eventCollection[t]=this._eventCollection[t]||[];this._eventCollection[t].push(n);return this};t.prototype.once=function n(t,e){var n=this;function i(){n.off(t,i);e.apply(this,arguments)}i.listener=e;this.on(t,i);return this};t.prototype.off=function o(t,e){var n=undefined;if(!this._eventCollection||!(n=this._eventCollection[t])){return this}n.forEach(function(t,i){if(t===e||t.listener===e){n.splice(i,1)}});if(n.length===0){delete this._eventCollection[t]}return this};t.prototype.emit=function s(t){var e=this;for(var n=arguments.length,i=Array(n>1?n-1:0),o=1;o<n;o++){i[o-1]=arguments[o]}var s=undefined;if(!this._eventCollection||!(s=this._eventCollection[t])){return this}s=s.slice(0);s.forEach(function(t){return t.apply(e,i)});return this};return t}();n["default"]=o;e.exports=n["default"]},{}]},{},[1])(1)});







(function($){
  jQuery.fn.lightTabs = function(options){

    var createTabs = function(){
      tabs = this;
      i = 0;

      showPage = function(i){
        $(tabs).children("div").children("div").hide();
        $(tabs).children("div").children("div").eq(i).show();
        $(tabs).children("ul").children("li").removeClass("active");
        $(tabs).children("ul").children("li").eq(i).addClass("active");
      }

      showPage(0);

      $(tabs).children("ul").children("li").each(function(index, element){
        $(element).attr("data-page", i);
        i++;
      });

      $(tabs).children("ul").children("li").click(function(){
        showPage(parseInt($(this).attr("data-page")));
      });
    };
    return this.each(createTabs);
  };
})(jQuery);




/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * Licensed under The MIT License
 *
 * @version        2.4.5
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 *
 */

;(function(b){var a={init:function(c){return this.each(function(){var d=this,h=b(d).empty();d.opt=b.extend(true,{},b.fn.raty.defaults,c);h.data("settings",d.opt);d.opt.number=a.between(d.opt.number,0,20);if(d.opt.path.substring(d.opt.path.length-1,d.opt.path.length)!="/"){d.opt.path+="/";}if(typeof d.opt.score=="function"){d.opt.score=d.opt.score.call(d);}if(d.opt.score){d.opt.score=a.between(d.opt.score,0,d.opt.number);}for(var e=1;e<=d.opt.number;e++){b("<img />",{src:d.opt.path+((!d.opt.score||d.opt.score<e)?d.opt.starOff:d.opt.starOn),alt:e,title:(e<=d.opt.hints.length&&d.opt.hints[e-1]!==null)?d.opt.hints[e-1]:e}).appendTo(d);if(d.opt.space){h.append((e<d.opt.number)?"&#160;":"");}}d.stars=h.children('img:not(".raty-cancel")');d.score=b("<input />",{type:"hidden",name:d.opt.scoreName}).appendTo(d);if(d.opt.score&&d.opt.score>0){d.score.val(d.opt.score);a.roundStar.call(d,d.opt.score);}if(d.opt.iconRange){a.fill.call(d,d.opt.score);}a.setTarget.call(d,d.opt.score,d.opt.targetKeep);var g=d.opt.space?4:0,f=d.opt.width||(d.opt.number*d.opt.size+d.opt.number*g);if(d.opt.cancel){d.cancel=b("<img />",{src:d.opt.path+d.opt.cancelOff,alt:"x",title:d.opt.cancelHint,"class":"raty-cancel"});if(d.opt.cancelPlace=="left"){h.prepend("&#160;").prepend(d.cancel);}else{h.append("&#160;").append(d.cancel);}f+=(d.opt.size+g);}if(d.opt.readOnly){a.fixHint.call(d);if(d.cancel){d.cancel.hide();}}else{h.css("cursor","pointer");a.bindAction.call(d);}h.css("width",f);});},between:function(e,d,c){return Math.min(Math.max(parseFloat(e),d),c);},bindAction:function(){var c=this,e=b(c);e.mouseleave(function(){var f=c.score.val()||undefined;a.initialize.call(c,f);a.setTarget.call(c,f,c.opt.targetKeep);if(c.opt.mouseover){c.opt.mouseover.call(c,f);}});var d=c.opt.half?"mousemove":"mouseover";if(c.opt.cancel){c.cancel.mouseenter(function(){b(this).attr("src",c.opt.path+c.opt.cancelOn);c.stars.attr("src",c.opt.path+c.opt.starOff);a.setTarget.call(c,null,true);if(c.opt.mouseover){c.opt.mouseover.call(c,null);}}).mouseleave(function(){b(this).attr("src",c.opt.path+c.opt.cancelOff);if(c.opt.mouseover){c.opt.mouseover.call(c,c.score.val()||null);}}).click(function(f){c.score.removeAttr("value");if(c.opt.click){c.opt.click.call(c,null,f);}});}c.stars.bind(d,function(g){var h=parseInt(this.alt,10);if(c.opt.half){var f=parseFloat((g.pageX-b(this).offset().left)/c.opt.size),i=(f>0.5)?1:0.5;h=parseFloat(this.alt)-1+i;a.fill.call(c,h);if(c.opt.precision){h=h-i+f;}a.showHalf.call(c,h);}else{a.fill.call(c,h);}e.data("score",h);a.setTarget.call(c,h,true);if(c.opt.mouseover){c.opt.mouseover.call(c,h,g);}}).click(function(f){c.score.val((c.opt.half||c.opt.precision)?e.data("score"):this.alt);if(c.opt.click){c.opt.click.call(c,c.score.val(),f);}});},cancel:function(c){return b(this).each(function(){var d=this,e=b(d);if(e.data("readonly")===true){return this;}if(c){a.click.call(d,null);}else{a.score.call(d,null);}d.score.removeAttr("value");});},click:function(c){return b(this).each(function(){if(b(this).data("readonly")===true){return this;}a.initialize.call(this,c);if(this.opt.click){this.opt.click.call(this,c);}else{a.error.call(this,'you must add the "click: function(score, evt) { }" callback.');}a.setTarget.call(this,c,true);});},error:function(c){b(this).html(c);b.error(c);},fill:function(k){var c=this,h=c.stars.length,g=0,d,j,f;for(var e=1;e<=h;e++){d=c.stars.eq(e-1);if(c.opt.iconRange&&c.opt.iconRange.length>g){j=c.opt.iconRange[g];if(c.opt.single){f=(e==k)?(j.on||c.opt.starOn):(j.off||c.opt.starOff);}else{f=(e<=k)?(j.on||c.opt.starOn):(j.off||c.opt.starOff);}if(e<=j.range){d.attr("src",c.opt.path+f);}if(e==j.range){g++;}}else{if(c.opt.single){f=(e==k)?c.opt.starOn:c.opt.starOff;}else{f=(e<=k)?c.opt.starOn:c.opt.starOff;}d.attr("src",c.opt.path+f);}}},fixHint:function(){var c=b(this),e=parseInt(this.score.val(),10),d=this.opt.noRatedMsg;if(!isNaN(e)&&e>0){d=(e<=this.opt.hints.length&&this.opt.hints[e-1]!==null)?this.opt.hints[e-1]:e;}c.data("readonly",true).css("cursor","default").attr("title",d);this.score.attr("readonly","readonly");this.stars.attr("title",d);},getScore:function(){var d=[],c;b(this).each(function(){c=this.score.val();d.push(c?parseFloat(c):undefined);});return(d.length>1)?d:d[0];},readOnly:function(c){return this.each(function(){var d=b(this);if(d.data("readonly")===c){return this;}if(this.cancel){if(c){this.cancel.hide();}else{this.cancel.show();}}if(c){d.unbind();d.children("img").unbind();a.fixHint.call(this);}else{a.bindAction.call(this);a.unfixHint.call(this);}d.data("readonly",c);});},reload:function(){return a.set.call(this,{});},roundStar:function(e){var d=(e-Math.floor(e)).toFixed(2);if(d>this.opt.round.down){var c=this.opt.starOn;if(d<this.opt.round.up&&this.opt.halfShow){c=this.opt.starHalf;}else{if(d<this.opt.round.full){c=this.opt.starOff;}}this.stars.eq(Math.ceil(e)-1).attr("src",this.opt.path+c);}},score:function(){return arguments.length?a.setScore.apply(this,arguments):a.getScore.call(this);},set:function(c){this.each(function(){var d=b(this),f=d.data("settings"),e=d.clone().removeAttr("style").insertBefore(d);d.remove();e.raty(b.extend(f,c));});return b(this.selector);},setScore:function(c){return b(this).each(function(){if(b(this).data("readonly")===true){return this;}a.initialize.call(this,c);a.setTarget.call(this,c,true);});},setTarget:function(e,d){if(this.opt.target){var c=b(this.opt.target);if(c.length==0){a.error.call(this,"target selector invalid or missing!");}var f=e;if(!d||f===undefined){f=this.opt.targetText;}else{if(this.opt.targetType=="hint"){f=(f===null&&this.opt.cancel)?this.opt.cancelHint:this.opt.hints[Math.ceil(f-1)];}else{f=this.opt.precision?parseFloat(f).toFixed(1):parseInt(f,10);}}if(this.opt.targetFormat.indexOf("{score}")<0){a.error.call(this,'template "{score}" missing!');}if(e!==null){f=this.opt.targetFormat.toString().replace("{score}",f);}if(c.is(":input")){c.val(f);}else{c.html(f);}}},showHalf:function(d){var c=(d-Math.floor(d)).toFixed(1);if(c>0&&c<0.6){this.stars.eq(Math.ceil(d)-1).attr("src",this.opt.path+this.opt.starHalf);}},initialize:function(c){c=!c?0:a.between(c,0,this.opt.number);a.fill.call(this,c);if(c>0){if(this.opt.halfShow){a.roundStar.call(this,c);}this.score.val(c);}},unfixHint:function(){for(var c=0;c<this.opt.number;c++){this.stars.eq(c).attr("title",(c<this.opt.hints.length&&this.opt.hints[c]!==null)?this.opt.hints[c]:c);}b(this).data("readonly",false).css("cursor","pointer").removeAttr("title");this.score.attr("readonly","readonly");}};b.fn.raty=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments);}else{b.error("Method "+c+" does not exist!");}}};b.fn.raty.defaults={cancel:false,cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:undefined,half:false,halfShow:true,hints:["bad","poor","regular","good","gorgeous"],iconRange:undefined,mouseover:undefined,noRatedMsg:"not rated yet",number:5,path:"img/",precision:false,round:{down:0.25,full:0.6,up:0.76},readOnly:false,score:undefined,scoreName:"score",single:false,size:16,space:true,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",target:undefined,targetFormat:"{score}",targetKeep:false,targetText:"",targetType:"hint",width:undefined};})(jQuery);

