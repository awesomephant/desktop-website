var setTimer = function(){
	var timeString = document.getElementById('time-string')
	var now = Date.now();
	var openingDate = Date.parse('2017-06-19 18:00:00');
	var timespan = countdown(now, openingDate);
	timeString.innerHTML = timespan.days + 'd ' + timespan.hours + 'h ' + timespan.minutes + 'm ' + timespan.seconds + 's';
}
setTimer();
window.setInterval(setTimer, 1000)
