function bindField(id,value){
	document.getElementById(id).innerText = value;
}
function saveNewTime(){
	var rental = document.getElementById("newTime").value;
	if(rental<0 || rental>180){
		document.getElementById("alertWrap").innerText = "只接受180以内整数，长得好看也不行 o(´^｀)o";
		document.getElementById("newTime").value = "";
		return;
	}
	document.getElementById("alertWrap").innerText="";
	document.getElementById("newTime").value = "";
	localStorage['rental']= rental;
	init();
}
function bindFields(){
	var _rental=localStorage['rental'],
	_used=localStorage['used'],
	_left=parseInt(_rental)-parseInt(_used)<=0?0:parseInt(_rental)-parseInt(_used);
	bindField('rentalTime',_rental);
	bindField('usedTime',_used);
	bindField('leftTime',_left);
}
function init(){
	var _date= new Date(),_day= _date.getDay(),_hour=_date.getHours();
	if(_day!==1 || _hour!==9 ){
		document.getElementById('changeRental').innerHTML='';
	}
	if(!localStorage['rental']){
		localStorage['rental'] = '60';
	}
	if(!localStorage['used']){
		localStorage['used'] ='0';
	}
	
	bindFields();

}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message == 'DataChanged'){
        bindFields();
    }
});
init();
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#submitNewTime').addEventListener('click', saveNewTime); 
  //window.addEventListener('load', restore_options);
});