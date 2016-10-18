if($('#ymlInfo').length==0)
{
  $('body').prepend("<div id='ymlInfo'>网页监听助手准备运行，正在读取配置数据</div> <div id='chinaTime'></div>");
}
else{
  $('#ymlInfo').html("网页监听助手准备运行，正在读取配置数据");
}
  
var timer=null;

var productId=''; //准备抢购产品
var productName=''; //产品名
//var a_url='https://www.jintouwangdai.com/kisp/';
var a_url="https://www.jintouwangdai.com/kisp/auth/bondConfirm.html";
var killTime='';

var timeInterval=600;//刷新的时间间隔
var second=0; //当前经历的秒数
var content="网页监听助手准备运行";
var source='';  //初始网页的内容
var timerCount=0; //目前的抓取次数
var isRunning=false;
var startHour=1;
var stopHour=0;
var extInfo='';

chrome.storage.sync.get('productId',function(data){
  productId=data.productId;
  console.log("productId:" + productId);
  $(".title a").each(function(){
	//console.log($(this).text());
	if($(this).text().indexOf(productId) >= 0 ){
		a_url += $(this).attr("href").substring(15);
		console.log("a_url:" + a_url);
		productName = $(this).text();
		$(this).css("color", "blue");		
	}
  });
});

chrome.storage.sync.get('killTime',function(data){
  killTime=data.killTime;
  console.log("killTime:" + killTime);
});

chrome.storage.sync.get('timeInterval',function(data){
  timeInterval=data.timeInterval;
  startTimer();
});

function timeTick(){
  var time;
  if(second<60){
    time=second+"秒";
  }
  else if(second>=60 && second<3600){
    time=(parseInt)(second/60)+"分"+second%60+"秒";
  }else if(second>=3600){
    time=(parseInt)(second/3600)+"时"+(parseInt)((second%3600)/60)+"分"+(second%3600)%60+"秒";
  }
  var myDate = (new Date()).toString();
  content="网页监听助手已运行"+time+",共刷新"+timerCount+"次,每"+timeInterval+"秒刷新一次。"+extInfo;

  
  if(second%timeInterval==0)
  {
    var hour=(new Date()).getHours();
    if(true)
    {
      $.get(location.href,function(data){
        data=data.replace(/<!--[\s\S]+?-->/g,'');

        if(source==''){
          source=data;
        }else if(source.localeCompare(data)!=0){
          chrome.extension.sendMessage({message:'PageChangedEvent',url:location.href});
          stopTimer();
          location.reload();
        }
        timerCount++;
      });
      extInfo='';
    }
  }
  
  second++;
  $('#ymlInfo').html(content);
  $('#chinaTime').html(myDate);
  //console.log("killTime:" + killTime);
  //console.log(myDate);
  if(myDate.indexOf(killTime) >= 0){
	console.log("抢购时间[" + myDate + "]，抢购商品[" + productName + "][" + a_url + "]开始--------");
	window.open(a_url); 
	chrome.extension.sendMessage({message:'PageChangedEvent',url:location.href});
	stopTimer();
  }	
}
function startTimer(){
  isRunning=true;
  window.onbeforeunload = function(event){   
      return '当前正在监听网页，确认立即退出？'; 
  };
  timer=setInterval(timeTick,1000); //读取时间配置数据
  window.scrollTo(0,0);
}
function stopTimer(){
  clearInterval(timer);
  isRunning=false;
  window.onbeforeunload='';
}


