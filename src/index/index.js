import '../lib/vendor/slick-1.8.0/slick.css'
import '../lib/vendor/slick-1.8.0/slick-theme.css'
import 'app/css/app.css'
import './index.css'

import '../lib/vendor/slick-1.8.0/slick'
import template from 'art-template/lib/template-web.js'

import app from 'app/js/app.js'

app.activeNav(0)

function getnewslist(data, cb) {
  $.ajax({
    url: app.url + 'api/webapi/news/getnewslist',
    method: 'POST',
    data: data,
    success: function (res) {
      cb(res)
    },
    error: function (e) {
      
    }
  })
}

function getorderlist(data, cb) {
  $.ajax({
    url: app.url + 'api/webapi/workorder/getorderlist',
    method: 'POST',
    data: data,
    success: function (res) {
      cb(res)
    },
    error: function (e) {
      
    }
  })
}

// banner
getnewslist({
  isbanner: 1,
  pageindex: 1,
  pagesize: 5
}, function (res) {
  var html = template('box1_tpl', res)
  $('#box1').html(html)
  $('.box-1').slick({
    dots: true,
    autoplay: true,
    infinite: true,
    accessibility: false
  })
})

  // 新闻中心
getnewslist({
  newstypename: '新闻中心',
  pageindex: 1,
  pagesize: 10
}, function (res) {
  var html = template('box2_tpl', res)
  $('#box2').html(html)
})

// 通知公告
getnewslist({
  newstypename: '通知公告',
  pageindex: 1,
  pagesize: 6
}, function (res) {
  var html = template('box3_tpl', res)
  $('#box3').html(html)
  })

  // 工作动态
getnewslist({
  newstypename: '工作动态',
  pageindex: 1,
  pagesize: 6
}, function (res) {
  var html = template('box4_tpl', res)
  $('#box4').html(html)
})

// 诉求展示
getorderlist({
  ordertype: 2,
  pageindex: 1,
  pagesize: 10
}, function (res) {
  
  var html = template('box5_tpl', res)
    $('#box5').html(html)
})

template.defaults.imports._mailtypeid = function (val) {
  var arr = ['咨询', '建议', '求助', '表扬', '举报', '其他']
  val = parseInt(val) / 5 - 2
  return arr[val]
};


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
    return '未评价'
  }
}