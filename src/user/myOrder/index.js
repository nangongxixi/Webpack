import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'
import template from 'art-template/lib/template-web.js'

app.activeNav(6)

let params = {
  ordertype: 2,
  pageindex: 1,
  pagesize: 10
}


function getorderlist(data, cb) {
  $.ajax({
    url: app.url + 'api/webapi/workorder/getorderlist',
    method: 'POST',
    data: data,
    success: function (res) {
      var html = template('box5_tpl', res)
      $('#box5').html(html)
      if (cb) {
        cb(res)
      }
    },
    error: function (e) {
      
    }
  })
}

layui.use('laypage', function(){
  let laypage = layui.laypage

  getorderlist(params, function (res) {

    laypage.render({
      elem: 'page',
      count: res.count,
      limit: params.pagesize,
      curr: params.pageindex,
      theme: '#3e6bb9',
      prev: '<',
      next: '>',
      jump: function (obj, first) {
        params.pageindex = obj.curr
        getorderlist(params)
      }
    });
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

template.defaults.imports._mailevaluate = function (val) {
  if (val == 1) {
    return '满意'
  }
  if (val == 0) {
    return '不满意'
  }
  if (val !== 1 && val !== 0) {
    return '点击评价'
  }
}