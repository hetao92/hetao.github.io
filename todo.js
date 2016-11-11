// Add & Clear 功能
var bind = function() {
    $('.todo-add').on('click',function(){
        var content = $('.todo-input').val()
        var time = currentTime()
        var todo = {
            time:time,
            task:content,
        }
        if (content == '') {
            todoAlert()
        }else {
            insertTodo(todo)
            $('.todo-input').val('')
            todoDiv.push(templateTodo(todo))
            saveDivs()
        }
    })

    $('.todo-clear').on('click',function(){
        $('.todo').empty()
        todoDiv = []
        saveDivs()
    })
}
// done/edit/Delete 功能
var buttonEvents = function() {
    var container = document.querySelector('.todoList')
    container.addEventListener('click',function(event){
        var target = event.target
        var parent = target.parentElement
        if (target.classList.contains('todo-delete')) {
            var index = indexOfElement(parent)
            todoDiv.splice(index, 1)
            saveDivs()
            parent.remove()
        }else if (target.classList.contains('todo-edit')) {
            var span = parent.children[1]
            span.contentEditable = true
            span.focus()
        }else if (target.classList.contains('todo-done')) {
            $(parent.children).addClass('done')
            $(target).siblings('.todo-edit').remove()
            $(target).remove()
            reSave(parent)
        }
    })
}
// keydown & blur 事件
var bindEvents = function() {
    var container = document.querySelector('.todoList')
    container.addEventListener('keydown',function(event) {
        var target = event.target
        var parent = target.parentElement
        if (event.key === 'Enter') {
            // 失去焦点
            target.blur()
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            reSave(parent)
        }
    })
    container.addEventListener('blur',function(event){
        var target = event.target
        var parent = target.parentElement
        if (target.classList.contains('todo-content')) {
            target.contentEditable = false
        }
        reSave(parent)
    },true)
}


//弹窗功能
var todoAlert = function() {
    var t=`
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="alert alert-warning alert-dismissible" role="alert">
              <button type="button" class="close" data-dismiss="alert">
                  <span aria-hidden="true">&times;</span>
              </button>
              <strong>Please Input Your Plan!</strong>
            </div>
        </div>
    `
    $('body').append(t)
    //设置弹窗css
    var css = `
        <style class='modal-remove'>
            .modal-container {
                position:fixed;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
            }
            .modal-mask {
                position:fixed;
                top:0px;
                left:0px;
                width:100%;
                height:100%;
                background:black;
                opacity: 0.5;
            }
            .alert {
                margin:0 auto;
                width:300px;
                opacity:1;
                z-index:1;
                top:50%;
                position:relative;
                transform:translateY(-50%);
            }
        </style>
    `
    $('head').append(css)
    $('.close').on('click',function() {
        $('.modal-remove').remove()
    })
}

var indexOfElement = function(element) {
    var parent = $(element).parent()[0]
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

var currentTime = function() {
    var d = new Date()
    var mon = d.getMonth()+1
    var day = d.getDate()
    var hour = d.getHours()
    var min = d.getMinutes()
    return `${mon}/${day} ${hour}:${min}`
}

var insertTodo = function(todo) {
    var t = templateTodo(todo)
    $('.todo').append(t)
}

var templateTodo = function(todo) {
    var t = `
        <div class="todo-cell">
            <span class="todo-time">${todo.time}</span>
            <span class='todo-content'>${todo.task}</span>
            <img src="img/icon/check.png" class='todo-done todo-button2'/>
            <img src="img/icon/delete.png" class='todo-delete todo-button2'/>
            <img src="img/icon/edit.png" class='todo-edit todo-button2'/>
        </div>
    `
    return t
}

//本地存储
var todoDiv = []
//存储
var saveDivs = function() {
    var d = JSON.stringify(todoDiv)
    localStorage.todoDiv = d
}
var reSave = function(element) {
    var index = indexOfElement(element)
    var content = `
        <div class="todo-cell">
            ${$('.todo-cell')[index].innerHTML}
        </div>
    `
    todoDiv[index] = content
    saveDivs()
}
//读取
var loadDiv = function() {
    var d = localStorage.todoDiv
    return JSON.parse(d)
}
//初始化
var initDiv = function() {
    todoDiv = loadDiv()
    for (var i = 0; i < todoDiv.length; i++) {
        var todo = todoDiv[i]
        $('.todo').append(todo)
    }
}

var __main = function() {
    bind()
    buttonEvents()
    bindEvents()
    initDiv()
}

__main()
