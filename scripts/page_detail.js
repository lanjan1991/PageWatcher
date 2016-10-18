if($('#ymlInfo').length==0)
{
  $('body').prepend("<div id='ymlInfo'>111网页监听助手准备运行，正在读取配置数据</div> <div id='chinaTime'></div>");
}
else{
  $('#ymlInfo').html("网页监听助手准备运行，正在读取配置数据");
}