document.querySelector('.search-icon i').addEventListener('click', function(e) {
    var searcher = document.querySelector('#searcher');
    if (searcher.style.display.length === 0 || searcher.style.display === 'none'){
        $('#searcher').stop().animate({width:'160px'},600);
    }
    else{
       $('#searcher').stop().animate({width:'0'},600,function(){
            searcher.style.display = 'none';
       });
    }
});

document.querySelector('.menu-icon i').addEventListener('click', function(e) {
    var flymenuWrapper = document.querySelector('.flymenu-wrapper');
    if (flymenuWrapper.style.display.length === 0 || flymenuWrapper.style.display === 'none') {
        flymenuWrapper.style.display = 'flex';
        $('.flymenu-wrapper .flymenu-container').stop().animate({width:'400px'},600);
    }
});

document.querySelector('.flymenu-wrapper .mask').addEventListener('click', function(e) {
    $('.flymenu-wrapper .flymenu-container').stop().animate({width:'0'},600, function(){
        var flymenuWrapper = document.querySelector('.flymenu-wrapper');
        flymenuWrapper.style.display = 'none';
    });
    
});

document.querySelector('.assistance .settings').addEventListener('click', function(e) {
    $('.assistance .assistance-icon:not(.settings)').slideToggle();
});

function slideWdithUp(ele, display, eleWidth, duration) {
    let start = null;
    ele.style.display = display;
    ele.style.width = '0';
    requestAnimationFrame(animate);

    function animate(timestamp) {
        if (!start) start = timestamp;
        let process = timestamp - start;
        ele.style.width = evalStep(process, duration, eleWidth, eleWidth) + 'px';
        if (process / duration < 1)
            requestAnimationFrame(animate);
        else {
            ele.style.width = evalStep(process, duration, eleWidth, eleWidth) + 'px';
            cancelAnimationFrame(animate);
        }

    }

    function evalStep(process, duration, eleWidth, limit) {
        let x = Math.pow(2, 1 / eleWidth),
            y = process / duration;
        if (y < 1)
            return Math.log(y + 1) / Math.log(x);
        else
            return limit;
    }
}

function slideWdithDown(ele, duration) {
    let start = null,
        eleWidth = ele.clientWidth;
    requestAnimationFrame(animate);

    function animate(timestamp) {
        if (!start) start = timestamp;
        let process = timestamp - start;
        ele.style.width = evalStep(process, duration, eleWidth, 0) + 'px';
        if (process / duration < 1)
            requestAnimationFrame(animate);
        else {
            ele.style.width = evalStep(process, duration, eleWidth, eleWidth) + 'px';
            cancelAnimationFrame(animate);
            ele.style.display = 'none';
        }

    }

    function evalStep(process, duration, eleWidth, limit) {
        let x = Math.pow(2, 1 / eleWidth),
            y = process / duration;
        if (y < 1)
            return eleWidth - Math.log(1 + y) / Math.log(x);
        else
            return limit;
    }
}

/*URL参数解析(URL参数为加密参数)*/
function defaultUrlParse(key){
    return unescape((window.location.href.match(new RegExp("(\\?|\\&)" + key + "=([^\\&]+)")))[2]);
}