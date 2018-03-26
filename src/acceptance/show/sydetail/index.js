import 'app/css/app.css'
import './index.css'

import template from 'art-template/lib/template-web.js'
import app from 'app/js/app.js'

app.activeNav(3)

function getData(id) {
  $.ajax({
    url: app.url + 'api/webapi/appeal/getappealdetail/' + id,
    method: 'GET',
    success: function (res) {
      console.log(res)
      var html = template('box_tpl', res)
      $('#box').html(html)
    },
    error: function (e) {
      
    }
  })
}

let orderid = window.location.href.split('?')[1].split('=')[1]
getData(orderid)

template.defaults.imports._satisfaction = function (val) {
  var arr = ['非常满意', '基本满意', '一般', '待评价', '不满意', '非常不满意']
  return arr[val]
}

template.defaults.imports._type = function (val) {
  var arr = ['咨询', '投诉', '求助']
  return arr[val]
}

template.defaults.imports._mailstatus = function (val) {
  var arr = ['已完结', '待评价', '待处理']
  return arr[+val]
}