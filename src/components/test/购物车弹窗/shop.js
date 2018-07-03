; $(function () {
  var select_data = {};
  var select_arr = [];
  $(".sku-list-wrap .items").each(function () {
    $(this).attr("data-type");
    select_arr.push($(this).attr("data-type"));
  })
  // 添加尺码选择的类名
  $('.radio').on('touchstart', function () {
    var type = $(this).parent().attr("data-type")
    for (var i = 0; i < select_arr.length; i++) {
      if (type == select_arr[i]) {
        select_data[type] = $(this).html()
      }
    }
    $(this).parents('.items').children().removeClass('checked');
    $(this).addClass('checked');
  });

  // 数量的加减
  var number;
  $('.decrease').on('touchstart', function () {
    number = $('#number').val();
    if (number <= 1) {
      $(this).addClass('disabled');
    } else {
      $('#number').val(number - 1);
    }
  });

  $('.increase').on('touchstart', function () {
    number = $('#number').val();
    // 加最大的边界判断！需要请求数据；
    $('#number').val(parseInt(number) + 1);
    if (number >= 1) {
      $('.decrease').removeClass('disabled');
    }
  });

  // 数字输入框的propertychange时间
  $('#number').on('input propertychange', function () {
    number = $('#number').val();
    if (number <= 1) {
      $(this).val(1);
    }
  });

  // 打开弹窗的位置
  $('.touchme').on('touchstart', function () {
    $('.widgets-cover').removeClass('hidden visibility').addClass('show');
  })

  // 关闭弹窗三个地方
  // 1.X关闭
  $('.sku-close').on('touchstart', function () {
    $('.widgets-cover').removeClass('show').addClass('hidden visibility');
  });

  // 2.点击空白处关闭
  $('.cover-bg').on('touchstart', function () {
    $('.widgets-cover').removeClass('show').addClass('hidden visibility');
  });

  // 3.确认按钮，关闭并且打开新弹窗
  $('.ok').on('touchstart', function () {
    // console.table(select_data);
    if($.isEmptyObject(select_data)){
      $('.alert').removeAttr('style');
      $('.alert span').html('请选择需要的属性');
      setTimeout(timer,500); 
      return;   
    }else{
      $('.alert').attr('style','display:none');
      $('.widgets-cover').removeClass('show').addClass('hidden visibility');
    }
    function timer(){
      $('.alert').attr('style','display:none');
    }
  })







})