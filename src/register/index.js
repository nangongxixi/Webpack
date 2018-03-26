import 'app/css/app.css'
import './index.css'

import app from 'app/js/app.js'

let params = {
  phonenumber: '',

}

function register(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/userregist',
    method: 'POST',
    data: data,
    success: function (res) {
     
     
      if (res.code === 1) {
        layer.msg('注册成功', {
          time: 2000
        }, function(){
          location.href = '/login'
        });
      }
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
        type: 0
      }
      getCode(data)
    }
  })

  $('.register-btn').on('click', function () {
    let data = {
      phonenumber: $('input[name="phone"]').val().trim(),
      verifycode: $('input[name="verifycode"]').val().trim(),
      password: $('input[name="password"]').val().trim()
    }
    if (!data.phonenumber) {
      return layer.msg('请输入手机号码')
    }
    if (!data.verifycode) {
      return layer.msg('请输入验证码')
    }
    if (!data.password) {
      return layer.msg('请输入密码')
    }
    if (!$('#useraccp').prop('checked')) {
      return layer.msg('请勾选用户协议')
    }
    register(data)
  })
});