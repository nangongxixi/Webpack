import 'app/css/app.css'
import './index.css'

import template from 'art-template/lib/template-web.js'
import app from 'app/js/app.js'

app.activeNav(6)

let orderid = window.location.href.split('?')[1].split('=')[1]
let data = {
}

function getData(id) {
  $.ajax({
    url: app.url + 'api/webapi/workorder/orderinfo',
    method: 'POST',
    data: {
      orderid: id
    },
    success: function (res) {
      
      var html = template('box_tpl', res.data.orderinfo)
      $('#box').html(html)
    },
    error: function (e) {
      
    }
  })
}

function orderreply(data) {
  $.ajax({
    url: app.url + 'api/webapi/workorder/orderreply',
    method: 'POST',
    data: data,
    success: function (res) {
      layer.msg(res.msg, {
        time: 1000
      }, function(){
        if (res.code === 1) {
          location.href = '/user/myOrder'
        }
      })
    },
    error: function (e) {
      
    }
  })
}

getData(orderid)

layui.use(['jquery', 'layer'], function () {
  var layer = layui.layer;
  var $ = layui.$;

  $(document).on('click', '#submit', function () {
    let data = {
      replystatu: $("input[name='radioName']:checked").val(),
      replycontent: $('#comment').val(),
      orderid: orderid
    }
    if (!data.replycontent) {
      return layer.msg('请输入评价内容')
    }
    orderreply(data)
  })
})

template.defaults.imports._mailtypeid = function (val) {
  var arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
  val = parseInt(val) / 5 - 2
  return arr[val]
}

template.defaults.imports._mailstatus = function (val) {
  var arr = ['已完结', '待评价', '待处理']
  return arr[+val]
}