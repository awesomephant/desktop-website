// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll(".draggable");
// array of Draggabillies
var draggies = [];
// init Draggabillies
for (var i = 0, len = draggableElems.length; i < len; i++) {
	// var draggableElem = draggableElems[i];
	// var draggie = new Draggabilly(draggableElem, {
	// 	handle: ".window-header"
	// });
	// draggies.push(draggie);
}

var windows;
var activeWindow = document.querySelector('.window');
var handleClose = function (e) {
	activeWindow.classList.toggle('closed')
	window.setTimeout(function(){
		activeWindow.parentNode.removeChild(activeWindow);
	}, 1000)
}

var handleMouseX = function (e) {
	//	console.log(e);
	var pos = activeWindow.getBoundingClientRect();
	activeWindow.style.width = e.pageX - pos.left + "px";
};
var handleMouseXLeft = function (e) {
	var pos = activeWindow.getBoundingClientRect();
	console.log('l')
	activeWindow.style.left = e.pageX + "px";
	activeWindow.style.width = pos.right - e.pageX + "px";
};

var handleMouseY = function (e) {
	var pos = activeWindow.getBoundingClientRect();
	activeWindow.style.height = e.pageY - pos.top + "px";
};


var handleDrag = function (e) {
	e.preventDefault();
	if (e.srcElement.id === 'resize-right') {
		document.addEventListener("mousemove", handleMouseX, false);
	} else if (e.srcElement.id === 'resize-left') {
		console.log('yp')
		document.addEventListener("mousemove", handleMouseXLeft, false);
	} else {
		document.addEventListener("mousemove", handleMouseY, false);
	}
};

document.addEventListener("mouseup", function (e) {
	console.log("up");
	document.removeEventListener("mousemove", handleMouseX, false);
	document.removeEventListener("mousemove", handleMouseY, false);
	document.removeEventListener("mousemove", handleMouseXLeft, false);
});

var initWindow = function (w) {
	var resizeRight = w.querySelector('#resize-right')
	resizeRight.addEventListener("mousedown", handleDrag, false);
	var resizeLeft = w.querySelector('#resize-left')
	resizeLeft.addEventListener("mousedown", handleDrag, false);
	var resizeBottom = w.querySelector("#resize-bottom");
	resizeBottom.addEventListener("mousedown", handleDrag, false);
	var closeButton = w.querySelector("#close-button");
	if (closeButton) {
		closeButton.addEventListener("click", handleClose, false);
	}
	w.addEventListener("mousedown", function (e) {
		activeWindow.style.zIndex = 0;
		activeWindow = e.srcElement.closest('.window');
		activeWindow.style.zIndex = 10;
	})

	var draggie = new Draggabilly(w, {
		handle: ".window-header"
	});
	draggies.push(draggie);
}

var initWindows = function () {
	windows = document.querySelectorAll(".window");
	console.log(windows.length)
	for (var i = 0; i < windows.length; i++) {
		var w = windows[i];
		initWindow(w);
	}
}

initWindows();
;var windowTemplate = Handlebars.compile('<header class="window-header"><h2 class="window-title">{{title}}</h2><nav class="window-controls"><a href="#1" id="close-button" class="window-control-close"><svg><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></a></nav></header><div class="dragbar-right" id="resize-right"></div><div class="dragbar-left" id="resize-left"></div><div class="dragbar-bottom" id="resize-bottom"></div><div class="window-content">{{{content}}}</div>')

var TEST = {
    title: 'hello world',
    content: '<p>This is a <em>test</em></p>',
    x: 100,
    y: 100,
    width: 200,
    height: 150
}

var spawnButton = document.getElementById('spawn-button')
var spawnWindow = function(data){
    var html = windowTemplate(data);
    console.log(html)
    var el = document.createElement('div');
    el.innerHTML =  html;
    initWindow(el);
    el.classList.add('window')
    el.classList.add('draggable')
    el.style.width = data.width + 'px';
    el.style.height = data.height + 'px';
    el.style.left = data.x + 'px';
    el.style.top = data.y + 'px';
    el.style.position = 'absolute';
    document.body.appendChild(el);
}

spawnButton.addEventListener('click', function(){spawnWindow(TEST)});;var setTimer = function(){
	var timeString = document.getElementById('time-string')
	var now = Date.now();
	var openingDate = Date.parse('2017-06-19 18:00:00');
	var timespan = countdown(now, openingDate);
	timeString.innerHTML = timespan.days + 'd ' + timespan.hours + 'h ' + timespan.minutes + 'm ' + timespan.seconds + 's';
}
setTimer();
window.setInterval(setTimer, 1000)
;function padTime(i) {
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
window.setInterval(setClock, 60000);var listTemplate = Handlebars.compile('<ul class="people-list">{{#each people}}<li>{{this.Name}}</li>{{/each}}</ul>')


fetch('../data/people.json').then(function(response) {
  return response.json();
}).then(function(data) {
    console.log(data)
    var html = listTemplate(data);
    console.log(html);
    spawnWindow({
        title: 'People',
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500
    })

});