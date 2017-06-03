function padTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var setClock = function(){
	var clockEl = document.getElementById('clock')
	var now = new Date();
   var h = padTime(now.getHours());
   var m = padTime(now.getMinutes());
	clockEl.innerHTML = h + ':' + m;
}
setClock();
window.setInterval(setClock, 60000)