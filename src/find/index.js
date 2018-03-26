import 'app/css/app.css'
import './index.css'

import app from 'app/js/app.js'

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

function isPhone(number) {
  if(!(/^1[34578]\d{9}$/.test(number))){ 
    return false; 
  }
  return true
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

function forgetpwd(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/forgetpwd',
    method: 'POST',
    data: data,
    success: function (res) {
      layer.msg(res.msg, {
        time: 1000
      }, function(){
        if (res.code === 1) {
          location.href = '/login'
        }
      })
    }
  })
}

layui.use(['jquery', 'layer'], function(){
  var layer = layui.layer;
  var $ = layui.$;

  $('.getCode').on('click', function () {
    let phone = $('input[name="phone"]').val().trim()
    if (!isPhone(phone)) {
      layer.msg('请输入正确的手机号')
    } else {
      let data = {
        phonenumber: phone,
        type: 4
      }
      getCode(data)
    }
  })

  $('.submit').on('click', function () {
    let code = {
      phonenumber: $('input[name="phone"]').val().trim(),
      verifycode: $('input[name="verifycode"]').val().trim(),
      password: $('input[name="password"]').val().trim(),
      repeat: $('input[name="repeat"]').val().trim(),
      type: 4
    }
    if (!code.phonenumber) {
      return layer.msg('请输入手机号码')
    }
    if (!code.verifycode) {
      return layer.msg('请输入验证码')
    }
    if (!code.password) {
      return layer.msg('请输入新密码')
    }
    if (!code.repeat) {
      return layer.msg('请确认新密码')
    }
    if (code.repeat !== code.password) {
      return layer.msg('两次密码不一致')
    }
    forgetpwd(code)
  })
});