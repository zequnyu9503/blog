var dataPath = 'https://zequnyu9503.github.io/blog/project/MusicPlayer/songs/';
var timer = setInterval('recordSpinning()',50);
var loading = 'loading';
var songs = 'undefined';
var song = 'undefined';
var sp = 175;
var ep = 5;
var spiner = 0;
var curr = 0;

function slider(){
	var progress = -Math.floor((parseInt(song.currentTime, 10) / parseInt(song.duration)) * (sp - ep)) + sp;
	$('.pcircle').css('transform', 'rotate(' + progress + 'deg)');
}

function songplay(){
	$('.play i').removeClass('iconfont icon-play').addClass('iconfont icon-pause');
	song.play();
}

function songpause(){
	$('.play i').removeClass('iconfont icon-pause').addClass('iconfont icon-play');
	song.pause();
}

function recordSpinning(){
	if(song && song!='undefined' && !song.paused){
		$('.record').css('transform', 'rotate(' + spiner + 'deg)');
		spiner = (spiner + 1)%360;	
	}
}

function songover(){
	if(songs[curr+1]){
		curr = (curr + 1)%songs.length;
	}else{
		curr = 0;
	}
	//console.log(curr);
	songInit(songs, curr);
}

function songInit(list, index){
	$('.pcircle').css('transform', 'rotate(175deg)');
	$("#p1").text(list[index]['song']);
	$('#p2').text(list[index]['singer']);
	song = new Audio(dataPath + list[index]['id'] + '.mp3');
	song.volume = 0.8;/*音量不可改变默认为0.5*/
	song.addEventListener('timeupdate', slider, 10);
	song.addEventListener('play', songplay);
	song.addEventListener('ended', songover);
	songplay();
}

/*
 * 页面加载完毕
 */
$(document).ready(function(){
	$.ajax({
		type: 'get',
		async: true,
		url: dataPath + 'info.json',
		datatype: 'json',
		success: function(data) {
			songs = data;
			loading = 'ready';
		},
		error: function(xhr, status, error) {}
	});
});

/*
 * 播放/暂停 点击事件
 */
$('.play').click(function(){
	if(loading === 'loading')
		alert('Songs are loading...');
	else{
		if(song === 'undefined')
			songInit(songs,curr);
		else{
			if(song.paused){
				songplay();
			}else{
				songpause();
			}
		}
	}
});

/*
 * 上一首 点击事件
 */
$('.back').click(function(){
	songpause();
	song = null;
	songInit(songs,((--curr)+songs.length)%songs.length);
});

/*
 * 下一首 点击事件
 */
$('.forward').click(function(){
	songpause();
	song = null;
	songInit(songs,Math.abs(++curr)%songs.length);
});