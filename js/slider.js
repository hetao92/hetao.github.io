//绑定按钮
var play = function(num) {
    var activeIndex = $('.imgContainer').data('active')
    var numberOfImgs = $('.imgContainer').data('imgs')
    var i = (activeIndex + numberOfImgs + num) % numberOfImgs
    $('.imgContainer').data('active',i)
    $('.img-slide-active').fadeOut()
    $('.img-slide-active').removeClass('img-slide-active')
    var active = $($('.img-slide')[i])
    active.addClass('img-slide-active')
    active.fadeIn()
//指示器
    $('.indicator-slide-active').removeClass('indicator-slide-active')
    var activeIndicator = $($('.indicator-slide')[i])
    activeIndicator.addClass('indicator-slide-active')
}

$('.img-button').on('click', function(event) {
    var button = $(event.target)
    if (button.hasClass('img-button-left')) {
        play(-1)
    } else {
        play(1)
    }
})
//自动播放
var autoplay = setInterval(function(){
    play(1)
},4000)

//鼠标点击播放图片
$('.indicator-slide').on('click', function(event) {
    console.log('1')
    var button = $(event.target)
    var i = $(event.target).data('index')

    $('.imgContainer').data('active',i)
    $('.img-slide-active').fadeOut()
    $('.img-slide-active').removeClass('img-slide-active')

    var active = $($('.img-slide')[i])
    active.addClass('img-slide-active')
    active.fadeIn()

    $('.indicator-slide-active').removeClass('indicator-slide-active')
    button.addClass('indicator-slide-active')
})


//设置按钮显现
$('.slideContainer').on('mouseover', function() {
    $('.img-button').css('opacity',0.7)
})
$('.slideContainer').on('mouseout', function() {
    $('.img-button').css('opacity',0)
})
