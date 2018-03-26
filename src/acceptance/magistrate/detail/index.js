import 'app/css/app.css'
import './index.css'

import template from 'art-template/lib/template-web.js'
import app from 'app/js/app.js'

app.activeNav(3)

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

let orderid = window.location.href.split('?')[1].split('=')[1]
getData(orderid)

template.defaults.imports._mailtypeid = function (val) {
  var arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
  val = parseInt(val) / 5 - 2
  return arr[val]
}

template.defaults.imports._mailevaluate = function (val) {
  if (val == 1) {
    return '满意'
  }
  if (val == 0) {
    return '不满意'
  }
  if (val !== 1 && val !== 0) {
    return '未评价'
  }
}

template.defaults.imports._mailstatus = function (val) {
  var arr = ['已完结', '待评价', '待处理']
  return arr[+val]
}