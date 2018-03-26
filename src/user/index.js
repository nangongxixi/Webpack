import app from 'app/js/app.js'
import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import cookie from 'app/js/cookie'

app.activeNav(6)

var userinfo = JSON.parse(cookie.getItem('userinfo'))
if (!userinfo) {
  location.href = '/login'
} else {
  $('body').show()
}

$('.username').text(userinfo.username)
$('.phone').text(userinfo.userphone)

$('#accordion').on('click', '.am-panel .item .button', function () {
  let index = $(this).attr('index')
  if ($(`#item${index}`).hasClass('am-in')) {
    $(`#item${index}`).removeClass('am-in')
    $(this).text('更改')
  } else {
    $('.am-panel-collapse').removeClass('am-in')
    $(`#item${index}`).addClass('am-in')
    $('.item .button').text('更改')
    $(this).text('收起')
  }
})

$('.button.cancel').on('click', function () {
  let index = $(this).attr('index')
  $(`#item${index}`).removeClass('am-in')
  $(`.am-panel:eq(${index-1}) .row .button`).text('更改')
})

var wait=60
function time(o) {
  if (wait == 0) {
    o.removeAttribute("disabled")
    o.innerText="获取验证码"
    wait = 60
  } else {
    o.setAttribute("disabled", true)
    o.innerText="重新发送(" + wait + ")"
    wait--
    setTimeout(function() {
        time(o)
    },
    1000)
  }
}

function updateusername(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/updateusername',
    method: 'POST',
    data: data,
    success: function (res) {
      
      userinfo.username = data.newname
      userinfo.usersex = +data.usersex
      debugger
      cookie.setItem('userinfo', JSON.stringify(userinfo), '/')
      location.reload()
    }
  })
}

function login(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/userlogin',
    method: 'POST',
    data: data,
    success: function (res) {
      
      if (res.code === 1) {
        $('.step-1').removeClass('active')
        $('.step-2').addClass('active')
      }
    }
  })
}

function updatephone (data) {
  $.ajax({
    url: app.url + 'api/webapi/users/updatephone',
    method: 'POST',
    data: data,
    success: function (res) {
      
      layer.msg(res.msg, {
        time: 1000
      }, function(){
        if (res.code === 1) {
          userinfo.userphone = data.phonenumber
          cookie.setItem('userinfo', JSON.stringify(userinfo), '/')
          location.reload()
        }
      })
    }
  })
}

function getCode(data) {
  $.ajax({
    url: app.url + 'api/webapi/code/getcode',
    method: 'POST',
    data: data,
    success: function (res) {
      
      if (res.code === 1) {
        time(document.getElementById('getCode'))
      }
    }
  })
}

function isPhone(number) {
  if(!(/^1[34578]\d{9}$/.test(number))){ 
    return false; 
  }
  return true
}

function userpwdupdate(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/userpwdupdate',
    method: 'POST',
    data: data,
    success: function (res) {
      layer.msg(res.msg)
      location.reload()
    }
  })
}

layui.use(['jquery', 'layer'], function () {
  var layer = layui.layer;
  var $ = layui.$;

  // 修改用户名
  $('.updateusername').on('click', function () {
    if (!$('input[name="newname"]').val().trim()) {
      return layer.msg('用户名不能为空')
    }
    if ($('input[name="newname"]').val().trim().length > 20) {
      return layer.msg('用户名长度不得大于20字')
    }
    updateusername({
      userid: userinfo.userid,
      usersex: +$("input[name='radioName']:checked").val(),
      newname: $('input[name="newname"]').val().trim()
    })
  })
  
  // 验证密码
  $('.login').on('click', function () {
    if (!$('input[name="password"]').val().trim()) {
      return layer.msg('密码不能为空')
    }
    login({
      useraccount: userinfo.userphone,
      userpwd: $('input[name="password"]').val().trim()
    })
  })
  
  // 修改手机号
  $('.updatephone').on('click', function () {
    
    if (!$('input[name="phone"]').val().trim()) {
      return layer.msg('手机号不能为空')
    }
    if (!$('input[name="verifycode"]').val().trim()) {
      return layer.msg('验证码不能为空')
    }
    updatephone({
      userid: userinfo.userid,
      phonenumber: $('input[name="phone"]').val().trim(),
      verifycode: $('input[name="verifycode"]').val().trim()
    })
  })
  
  // 获取验证码
  $('.getCode').on('click', function () {
    let phone = $('input[name="phone"]').val().trim()
    if (!isPhone(phone)) {
      layer.msg('请输入正确的手机号')
    } else {
      let data = {
        phonenumber: phone,
        type: 2
      }
      getCode(data)
    }
  })

  // 修改密码
  $('.userpwdupdate').on('click', function () {
    var data = {
      userid: userinfo.userid,
      oldpwd: $('input[name="oldpwd"]').val().trim(),
      newpwd: $('input[name="newpwd"]').val().trim(),
      repeat: $('input[name="repeat"]').val().trim()
    }
    if (!data.oldpwd) {
      return layer.msg('请输入原密码')
    }
    if (!data.newpwd) {
      return layer.msg('请输入新密码')
    }
    if (!data.repeat) {
      return layer.msg('请确认新密码')
    }
    if (data.newpwd !== data.repeat) {
      return layer.msg('两次密码不一致')
    }
    userpwdupdate(data)
  })
})
