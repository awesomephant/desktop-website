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
	window.setTimeout(function () {
		activeWindow.parentNode.removeChild(activeWindow);
	}, 1000)
}
var handleFullscreen = function (e) {
	activeWindow.classList.toggle('isFullscreen')
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
		document.addEventListener("mousemove", handleMouseXLeft, false);
	} else {
		document.addEventListener("mousemove", handleMouseY, false);
	}
};

document.addEventListener("mouseup", function (e) {
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
	var fullscreenButton = w.querySelector("#fullscreen-button");
	if (fullscreenButton) {
		fullscreenButton.addEventListener("click", handleFullscreen, false);
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
;var windowTemplate = Handlebars.compile('<header class="window-header"><h2 class="window-title">{{title}}</h2><nav class="window-controls"><a href="#1" id="fullscreen-button" class="window-control-fullscreen"><svg class="icon-enter-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/></svg><svg class="icon-exit-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" /></svg></a><a href="#1" id="close-button" class="window-control-close"><svg><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></a></nav></header><div class="dragbar-right" id="resize-right"></div><div class="dragbar-left" id="resize-left"></div><div class="dragbar-bottom" id="resize-bottom"></div><div class="window-content">{{{content}}}</div>')

var TEST = {
    title: 'About',
    content: '<p>Camberwell College of Arts FdA Graphic Design & Illustration Degree Show 2017</p>',
    x: 130,
    y: 150,
    width: 400,
    height: 100
}

var spawnButton = document.getElementById('spawn-button')
var spawnWindow = function(data){
    var html = windowTemplate(data);
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
    if (data.init){
    data.init(el);
    }
    document.body.appendChild(el);
}

spawnButton.addEventListener('click', function(){spawnWindow(TEST)});;var spawnNotepadWindow = function () {
    var data = {}
    data.text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.<br/><br/>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    var template = Handlebars.compile('<p contenteditable>{{{text}}}</p>')
    var html = template(data);
    spawnWindow({
        title: "Notepad - Angela's Letter",
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500
    })
}
;var setTimer = function(){
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
window.setInterval(setClock, 60000);var peopleData;

var initPeopleList = function (el) {
    var people = el.querySelectorAll('.people-list--person')
    for (var i = 0; i < people.length; i++) {
        var link = people[i];
        link.addEventListener('click', function () {
            var index = this.getAttribute('data-index');
            var person = peopleData.people[index];
            var personTemplate = Handlebars.compile('{{#if Website}}<a class="window-button" href="{{Website}}">Website</a>{{/if}}{{#if Instagram}}<a class="window-button" href="http://www.instagram.com/{{Instagram}}">Instagram</a>{{/if}}{{#if Twitter}}<a class="window-button" href="http://www.twitter.com/{{Twitter}}">Twitter</a>{{/if}}')
            var html = personTemplate(person);
            spawnWindow({
                title: person.Name,
                content: html,
                x: 500,
                y: 300,
                width: 350,
                height: 300
            })
        })
    }
}
var spawnPeopleWindow = function () {
    var listTemplate = Handlebars.compile('<ul class="people-list"><li class="people-list--item people-list--header"><span class="people-list--index">#</span><span class="people-list--name">Name</span><span class="people-list--course">Course</span></li>{{#each people}}<li class="people-list--item people-list--person" data-index="{{@index}}"><span class="people-list--index">{{@index}}</span><span class="people-list--name">{{this.Name}}</span><span class="people-list--course">{{this.Course}}</span></a></li>{{/each}}</ul>')
    var html = listTemplate(peopleData);
    spawnWindow({
        title: 'People',
        content: html,
        x: 100,
        y: 100,
        width: 350,
        height: 500,
        init: initPeopleList
    })
}

fetch('../data/people.json').then(function (response) {
    return response.json();
}).then(function (data) {
    peopleData = data;
    spawnPeopleWindow();
});;var toggleMenu = function () {
    this.classList.toggle('menu-isOpen')
}

var tabs = document.querySelectorAll('.desktop-nav-item');
for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].querySelector('.desktop-subnav')) {
        tabs[i].addEventListener('click', toggleMenu)
    }
}