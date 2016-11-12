var player = $('#music-player')[0]
var musiclist = $('song')
// var playerMode = 'loop'
//音乐事件
var musicEvents = function() {
    //实时更新
    $('#music-player').on('timeupdate',function(e) {
        var target = e.target
        var rate = target.currentTime / target.duration
        //更新 slider
        $('#time-slider').val(rate * 100)
        //更新 current time
        var time = target.currentTime
        $('#time-current').text(timeFormate(time))
    })
    //加载音乐后的事件
    $('#music-player').on('canplay',function(e){
        var target = e.target
        //更新 duration time
        var duration =  target.duration
        $('#time-slider').val(0)
        $('#time-current').text('0:00')
        $('#time-duration').text(timeFormate(duration))
    })
    //音乐播放结束的事件
    $('#music-player').on('ended',function(){
        var button = document.querySelector('#music-mode')
        var mode = button.dataset.action
        playMode(mode)
    })
}

//slider 滑动
var sliderEvents = function() {
    //time-slider 滑动
    $('#time-slider').on('input',function(e){
        var target = e.target
        var rate = target.value
        var time = rate * player.duration / 100
        player.currentTime = time
    })
    //volume-slider 滑动
    $('#volume-slider').on('input',function(e){
        var target = $(e.target)
        var num = target.val()
        player.volume = num / 100
    })
}

//按钮功能
var bindEvents = function() {
    $('.music-button').on('click','span',function(e){
        var button = e.target
        // if (button == $('span')) {
        //     button = button.parentElement
        // }
        //
        var type = button.dataset.action
        var actions = {
            list:allSong,
            single:singleSong,
            loop:allLoopSong,
            random:randomSong,
            prev: prevSong,
            next: nextSong,
            play: playSong,
            pause: pauseSong,
            volume:volumeAdjust
        }
        var action = actions[type]
        action(button)
    })
}
//放歌模式
var playMode = function(mode) {
    if (mode == 'loop') {
        autoSwitch(1)
        player.play()
    }else if (mode == 'single') {
        autoSwitch(0)
        player.play()
    }else if (mode == 'random') {
        var len = musiclist.length - 1
        var x = Math.ceil(Math.random() * len)
        console.log(x)
        autoSwitch(x)
        player.play()
    }
}
//打开曲单按钮
var allSong = function(button) {
    // $('.music-list-container').css('display','block')
    $('.music-list-container').fadeToggle(1500)
    setTimeout(function(){
        $('.music-list-container').fadeOut(1500)
    },8000)
}
//列表循环按钮
var allLoopSong = function(button) {
    button.dataset.action = 'single'
    button.className = 'glyphicon glyphicon-repeat'
    console.log(button.dataset.action)
}
//单曲循环按钮
var singleSong = function(button) {
    button.dataset.action = 'random'
    button.className = 'glyphicon glyphicon-random'
    console.log(button.dataset.action)
}
//随机播放按钮
var randomSong = function(button) {
    button.dataset.action = 'loop'
    button.className = 'glyphicon glyphicon-play-circle'
    console.log(button.dataset.action)
}
//播放按钮
var playSong = function(button) {
    player.play()
    button.dataset.action = 'pause'
    button.className='glyphicon glyphicon-pause'
    console.log(button)

}
//暂停按钮
var pauseSong = function(button) {
    player.pause()
    button.dataset.action = 'play'
    button.className='glyphicon glyphicon-play'
}
//上一曲
var prevSong = function(button) {
    autoSwitch(-1)
}
//下一曲
var nextSong = function(button) {
    autoSwitch(1)
}
//音量按钮
var volumeAdjust = function(button) {

    $('#volume-slider').fadeTo(2000,1)
    setTimeout(function(){
        $('#volume-slider').fadeTo(2000,0)
    },5000)
}
//歌曲自动切换
var index = 0
var autoSwitch = function(x){
    var len = musiclist.length
    var num = (index + len + x) % len
    var songName = musiclist[num].innerText
    player.autoplay = !player.paused
    player.src = `music/${songName}`
    $('#song-title').text(nameFormate(songName))
    index = num
}
//歌曲手动切换
var musicSwitch = function () {
    $('song').on('click',function(e){
        var target = $(e.target)
        var song = target.text()
        // 根据当前播放状态设置 autoplay
        player.autoplay = !player.paused
        //切换歌曲
        player.src = `music/${song}`
        $('#song-title').text(nameFormate(song))
        index = target.data('id')
    })
}
//歌名去除后缀
var nameFormate = function(name) {
    var index = name.indexOf('.mp3')
    return name.slice(0,index)
}
//时间转换
var timeFormate = function(time) {
    var time = parseInt(time)
    var minutes = Math.floor(time / 60)
    var seconds = time % 60
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    var s = `
        ${minutes}:${seconds}
    `
    return s
}

var __main = function() {
    musicEvents()
    sliderEvents()
    musicSwitch()
    bindEvents()

}
$('document').ready(function(){
    __main()
})
