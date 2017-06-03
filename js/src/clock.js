var setClock = function(){
	var clockEl = document.getElementById('clock')
	var now = new Date();
   var h = now.getHours();
   var m = now.getMinutes();
	clockEl.innerHTML = h + ':' + m;
}
setClock();
window.setInterval(setClock, 60000)