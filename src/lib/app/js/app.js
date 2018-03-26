// 项目公共逻辑和方法
import '../../vendor/layui/layui'

import cookie from './cookie.js'

layui.config({
  dir: '/static/layui/'
})

export default {
  url: 'http://112.25.171.120:8044/',
  // url: 'http://192.168.0.187:8044/',
  activeNav: (index) => {
    $('.nav-bar li').eq(index).addClass('active')
  },
  isLogined: (url) => {
    var userinfo = JSON.parse(cookie.getItem('userinfo'))
    $('html').hide()
    if (!userinfo) {
      location.href = '/login'
    } else {
      location.href = url
      $('html').show()
    }
  }
}

let da = new Date()
let year = da.getFullYear()+'年'
let month = da.getMonth()+1+'月'
let date = da.getDate()+'日'

function setDate() {
  let w
  let da = new Date()
  let year = da.getFullYear()+'年'
  let month = da.getMonth()+1+'月'
  let date = da.getDate()+'日'
  let week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']

  $('.header .today').text(year + month + date + ' ' + week[da.getDay()])
}

setDate()

$('#search_news').on('click', function () {
  let words = $('#search_words').val()
  cookie.setItem('search_words', words)
  window.location.href = `/search/index.html#${words}`
  if (window.location.pathname === '/search/index.html') {
    window.location.reload()
  }
})

$('#search_words').on('keyup', function (e) {
  if (e.keyCode === 13) {
    let words = $('#search_words').val()
    cookie.setItem('search_words', words)
    window.location.href = `/search/index.html#${words}`
    if (window.location.pathname === '/search/index.html') {
      window.location.reload()
    }
  }
})

var userinfo = JSON.parse(cookie.getItem('userinfo'))

if (userinfo) {
  $('.login-bar').css('display', 'none')
  $('.userinfo').css('display', 'block')
  $('.userinfo .name').text(userinfo.userphone)
}

$('.loginout').on('click', function () {
  cookie.removeItem('userinfo', '/')
  window.location.href = '/'
})