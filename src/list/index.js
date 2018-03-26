import 'app/css/app.css'
import './index.css'

import app from 'app/js/app.js'
import template from 'art-template/lib/template-web.js'

app.activeNav(0)

let index = location.hash.substr(1)
let text = ['新闻中心', '通知公告', '工作动态']
let params = {
  newstypename: text[+index],
  pageindex: 1,
  pagesize: 15
}

$('.breadcrumb-text').text(text[+index])


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


