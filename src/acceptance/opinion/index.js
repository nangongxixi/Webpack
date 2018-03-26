import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'

app.activeNav(3)

let params = {
  title: '',
  content: ''
}

function addopinion(params) {
  $.ajax({
    url: app.url + 'api/webapi/opinion/addopinion',
    method: 'POST',
    data: params,
    success: function (res) {
      if (res.code === 1) {
        layer.msg(res.msg, {
          time: 2000
        }, function(){
          location.reload()
        });
      } else {
        $('.layui-btn').prop('disabled', false)
      }
    },
    error: function () {
      $('.layui-btn').prop('disabled', false)
    }
  })
}

layui.use(['jquery', 'form'], function () {
  var form = layui.form
  var $ = layui.$
  form.on('submit(demo1)', function (data) {
    $('.layui-btn').prop('disabled', true)
    addopinion(data.field)
  })
})