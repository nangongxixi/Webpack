import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'
import cookie from 'app/js/cookie'

app.activeNav(2)


var userinfo = JSON.parse(cookie.getItem('userinfo'))

let params = {
  userid: Math.floor(Math.random()*100000),
  question: ''
}

let nowTime = new Date().getHours() + '点' + new Date().getMinutes() + '分' 

$('.msgData').text(nowTime)

function getanswer(data, cb) {
  $.ajax({
    url: app.url + 'api/commonapi/xiaoai/getanswer',
    method: 'POST',
    data: data,
    success: function (res) {
      cb(res)
    }
  })
}

$('#textarea').on('input', function () {
  let len = $(this).val().trim().length
  if (len > 0) {
    $('.send-msg').prop('disabled', false)
  } else {
    $('.send-msg').prop('disabled', true)
  }
})

$('.send-msg').on('click', function () {
  params.question = $('.chat-inp textarea').val().trim()
  let msg = `<li class="clearfix magBox rightMsg" id="" creattime="1516260132259">
    <img class="fr" src="${require('../../lib/app/img/tx_yhmr.png')}" alt="">
    <div class="msgDiv">
      <div class="msgText">${params.question}</div>
    </div>
  </li>`
  $('.chatPanelList').append(msg)
  $('.chat-inp textarea').val('')

  getanswer(params, function (res) {
    
    let item = `<li class="clearfix magBox leftMsg" creattime="1516260132273">
      <img class="fl" src="${require('../../lib/app/img/tx_jqr.png')}" alt="">
      <div class="msgDiv">
        <div class="msgText">${textareaTo(res.data)}</div>
      </div>
    </li>`
    $('.chatPanelList').append(item)
    $('#chatPanel')[0].scrollTop = $('#chatPanel')[0].scrollHeight; 
  })
})

function textareaTo(str) {
  var reg = new RegExp("\n", "g");
  var regSpace = new RegExp(" ", "g");

  str = str.replace(reg, "<br>");
  str = str.replace(regSpace, "&nbsp;");

  return str;
}