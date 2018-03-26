import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'
import template from 'art-template/lib/template-web.js'

app.activeNav(2)

let params = {
  newstypename: '热点问题',
  pageindex: 1,
  pagesize: 10
}

function getnewslist(data, cb) {
  $.ajax({
    url: app.url + 'api/webapi/news/getnewslist',
    method: 'POST',
    data: data,
    success: function (res) {
      var html = template('list_tpl', res)
      $('#list').html(html)
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

  getnewslist(params, function (res) {
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
        getnewslist(params)
      }
    })
  })
})