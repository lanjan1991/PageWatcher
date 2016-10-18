
window.onload=function(){

  chrome.storage.sync.get('songNoti',function(data){
      document.getElementById('songNoti').value=data.songNoti;
  });
  
  chrome.storage.sync.get('productId',function(data){
      document.getElementById('productId').value=data.productId;
  });
  
  chrome.storage.sync.get('killTime',function(data){
      document.getElementById('killTime').value=data.killTime;
  });

  chrome.storage.sync.get('timeInterval',function(data){
      if(data==undefined||data==null)
        data='';
      document.getElementById('timeInterval').value=data.timeInterval;
  });

 document.getElementById('btStart').onclick=function(){
	chrome.storage.sync.set({productId:document.getElementById('productId').value});    
	chrome.storage.sync.set({killTime:document.getElementById('killTime').value});  
    chrome.storage.sync.set({timeInterval:document.getElementById('timeInterval').value});    
    chrome.storage.sync.set({songNoti:document.getElementById('songNoti').value});
    chrome.extension.sendMessage({message:'btStart_click'});
    
  };
  
  document.getElementById('btStop').onclick=function(){
    chrome.extension.sendMessage({message:'btStop_click'});
  };

  /*function fcheckMail(myemail){
    var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    var check=reg.test(myemail);
    return check;
  }*/
};
