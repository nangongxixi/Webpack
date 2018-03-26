import 'app/css/app.css'
import './index.css'


import app from 'app/js/app.js'
import cookie from 'app/js/cookie.js'

let windowHeight = window.innerHeight -170;
if (windowHeight < 600) {
  $('.login-box').css('margin', '50px auto 0')
}
if (windowHeight < 500) {
  windowHeight = 600
  $('footer').css('position', 'relative')
}
$('main').css('height', `${windowHeight}px`)


function isPhone(number) {
  if(!(/^1[34578]\d{9}$/.test(number))){ 
    return false; 
  }
  return true
}

function userlogin(data) {
  $.ajax({
    url: app.url + 'api/webapi/users/userlogin',
    method: 'POST',
    data: data,
    success: function (res) {
      
      layer.msg(res.msg)
      if (res.code === 1) {
        cookie.setItem('userinfo', JSON.stringify(res.data), 60*60*24*7, '/')
        location.href = '/'
     }
    }
  })
}

layui.use(['jquery', 'layer'], function(){
  var layer = layui.layer;
  var $ = layui.$;

  $('.submit').on('click', function () {
    let phone = $('input[name="useraccount"]').val().trim()
    if (!isPhone(phone)) {
      layer.msg('请输入正确的手机号')
    } else {
      let code = {
        useraccount: $('input[name="useraccount"]').val().trim(),
        userpwd: $('input[name="userpwd"]').val().trim()
      }
      if (!code.useraccount) {
        return layer.msg('请输入手机号码')
      }
      if (!code.userpwd) {
        return layer.msg('请输入密码')
      }
      userlogin(code)
    }
  })
});