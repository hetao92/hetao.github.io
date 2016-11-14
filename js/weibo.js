$('.message').on('input',function(){
    var len = $('.message').val().length
    $('.wordLimit').text(140 - len)
})
//数字变化
// $('.message').on('keyup',function() {
//     console.log($('.message').val())
//     var len = $('.message').val().length
//     $('.wordLimit').text(140 - len)
// })
//绑定按钮
$('.submitButton').on('click', function() {
    var content = $('.message').val()
    var month = new Date().getMonth() + 1
    var day = new Date().getDate()
    var hour = new Date().getHours()
    var seconds = new Date().getMinutes()
    var s = `
        <div class="content">
            <div class='reply'>
                <p class="replyContent">核桃:${content}</p>
                <p class='replyDate'>${month}月${day}日 ${hour}:${seconds}</p>
            </div>
            <img src="img/qiu.jpeg" class='replyIcon' alt="" />
        </div>
    `
    if (content.length <= 140) {
        $('.replyContainer').append(s)
        $('.message').val('')
        $('.wordLimit').text(140)
    }else {
        alert('您输入的字数已超限制，请重新输入！')
    }

})
