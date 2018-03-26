import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'
import template from 'art-template/lib/template-web.js'

let params = {
  newstypename: '专题专栏',
  pageindex: 1,
  pagesize: 9,
  modeltype: 1
}

app.activeNav(5)

function getnewslist(data, cb) {
  $.ajax({
    url: app.url + 'api/webapi/news/getnewslist',
    method: 'POST',
    data: data,
    success: function (res) {
      var html = template('box1_tpl', res)
      $('#box1').html(html)
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
    });
  })
});