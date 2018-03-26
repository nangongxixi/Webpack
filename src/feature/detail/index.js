import 'app/css/app.css'
import './index.css'

import template from 'art-template/lib/template-web.js'
import app from 'app/js/app.js'

app.activeNav(5)

function getData(id) {
  $.ajax({
    url: app.url + 'api/webapi/news/getnewsinfo',
    method: 'POST',
    data: {
      newsid: id
    },
    success: function (res) {
      $('.text').text(res.data.newstitle)
      $('.time').text(res.data.createtime)
      $('.content').html(res.data.newscontent)
    },
    error: function (e) {
      
    }
  })
}

let newsid = window.location.href.split('?')[1].split('=')[1]
getData(newsid)