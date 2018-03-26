import 'app/css/app.css' // 公共样式
import './index.css' // 当前页面样式

import app from 'app/js/app.js'
import cookie from 'app/js/cookie'

app.activeNav(3)

let formdata = new FormData()
var userinfo = JSON.parse(cookie.getItem('userinfo'))

layui.use(['jquery', 'form', 'layer', 'upload'], function(){
  var form = layui.form
  var upload = layui.upload
  var $ = layui.$

  var listView = $('.layui-upload-list'),
  uploadListIns = upload.render({
    elem: '#test8',
    multiple: true,
    accept: 'file',
    choose: function (obj) {
      var files = obj.pushFile();
      obj.preview(function(index, file, result){
        var item = $(`<div class="item clearfix">
          <span class="fl fof name">${file.name}</span>
          <img class="fr delete" src="${require('../../../lib/app/img/xx.png')}" alt="">
        </div>`)
        formdata.append(file.name, file)
        item.find('.delete').on('click', function(){
          formdata.delete(file.name)
          item.remove();
          uploadListIns.config.elem.next()[0].value = ''
        });
        listView.append(item)
      });
    },
    auto: false
  })

  //监听提交
  form.on('submit(demo1)', function (data) {
    $('.layui-btn').prop('disabled', true)
    formdata.append('title', data.field.title)
    formdata.append('orderform', '1')
    formdata.append('ordertype', data.field.ordertype)
    formdata.append('content', data.field.content)
    formdata.append('userid', userinfo.userid)
    formdata.append('idcard', data.field.idcard)
    formdata.append('address', data.field.address)
    $.ajax({
      url: app.url + 'api/webapi/workorder/addworkorder',
      method: 'POST',
      dataType: 'json',
      contentType: false,
      processData: false,
      data: formdata,
      success: function (res) {
        if (res.code === 1) {
          layer.msg(res.msg, {
            time: 2000
          }, function(){
            window.location.href = '/acceptance/magistrate'
          });
        } else {
          $('.layui-btn').prop('disabled', false)
        }
      },
      error: function (err) {
        formdata = new FormData()
        $('.layui-btn').prop('disabled', false)
      }
    })
    return false;
  })
})