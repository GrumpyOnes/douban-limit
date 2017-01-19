var insteadUrl="http://www.12371.cn/";
function formatTime(){
	var _date= new Date();
	var _formatedDate=_date.getFullYear()+''+(_date.getMonth()+1)+''+_date.getDate();
	return _formatedDate;
}
function watchingDate(tabArray){
	var _date=formatTime();
	if(localStorage['currentDate']!=_date){
		localStorage['currentDate']=_date;
		localStorage['used']='0';
	}else{
		localStorage['used']++;
		if(parseInt(localStorage['used'])>=parseInt(localStorage['rental'])){
			for(var i=0;i<tabArray.length;i++){
				chrome.tabs.update(tabArray[i].id, {url:insteadUrl}, function(){
				})
			}
		}
	}
	chrome.runtime.sendMessage('DataChanged');
	
}

function showNotification(notificationJSON){
	var _notificationId =Date.parse(new Date())+''+ Math.ceil(Math.random()*1000);
	chrome.notifications.create(_notificationId, notificationJSON, function(notificationId){
	setTimeout(function(){
		chrome.notifications.clear(notificationId);
	},3000)
	
	});
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(tab.url.indexOf('douban.com')>-1){
		if(parseInt(localStorage['used'])>=parseInt(localStorage['rental'])){
			
			chrome.tabs.update(tabId, {url:insteadUrl}, function(){
				showNotification({
					"type":"basic",
					"iconUrl":"../images/icon-128.png",
					"title":"NO DOOO...",
					"message":"Stop DOUBAN,The BIG is watching you...",
					"priority":0
				});
			})
		}
	}
});
setInterval(function(){
	chrome.tabs.query({url:'*://*.douban.com/*'},function(tabArray){
		if(tabArray.length>0){
			watchingDate(tabArray);
		}
	})
},60000);

