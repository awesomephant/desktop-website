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
var topZIndex = 10;
var activeWindow = document.querySelector('.window');
var handleClose = function (e) {
	let w = e.srcElement.closest('.window');
	w.classList.toggle('closed')
	window.setTimeout(function () {
		w.parentNode.removeChild(w);
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
		let w = e.srcElement.closest('.window');
		activeWindow = w;
		topZIndex += 1;
		w.style.zIndex = topZIndex;
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
    content: '<p>Camberwell College of Arts<br />FdA Graphic Design & Illustration Degree Show 2017<br /><br />June 19 — 23, 2017<br/>1 Wilson Road<br/>London<br/>SE5 8LU</p>',
    x: 130,
    y: 150,
    width: 450,
    height: 220
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
    topZIndex += 1;
    el.style.zIndex = topZIndex;
    if (data.init){
    data.init(el);
    }
    document.body.appendChild(el);
}
spawnWindow(TEST)
spawnButton.addEventListener('click', function(){spawnWindow(TEST)});;var updateWindow = function (window, html, init) {
    var c = window.querySelector('.window-content')
    c.innerHTML = html;
    init(window);
};var spawnNotepadWindow = function () {
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
var listTemplate = Handlebars.compile('<ul class="people-list"><li class="people-list--item people-list--header"><span class="people-list--index">#</span><span id="js-sortByName" class="people-list--name">Name</span><span id="js-sortByCourse"class="people-list--course">Course</span></li>{{#each people}}<li class="people-list--item people-list--person" data-index="{{@index}}"><span class="people-list--index">{{@index}}</span><span class="people-list--name">{{this.Name}}</span><span class="people-list--course">{{this.Course}}</span></a></li>{{/each}}</ul>')

var sortAlphabetically = function (el, property) {
    var order = el.getAttribute('data-order')
    if (order === null) { order = 'desc' }
    else if (order === 'asc') { order = 'desc'; }
    else if (order === 'desc') { order = 'asc'; }
    console.log(order);
    peopleData.people.sort(function (a, b) {
        var nameA = a[property].toLowerCase(), nameB = b[property].toLowerCase();
        if (order === 'asc') {
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
        }
        else if (order === 'desc') {
            if (nameA < nameB) { return 1; }
            if (nameA > nameB) { return -1; }
        }
        return 0; //default return value (no sorting)
    })
    el.setAttribute('data-order', order)
    var html = listTemplate(peopleData)
    updateWindow(el, html, initPeopleList)
}

var initPeopleList = function (el) {
    var people = el.querySelectorAll('.people-list--person')
    var sortByNameButton = el.querySelector("#js-sortByName");
    var sortByCourseButton = el.querySelector("#js-sortByCourse");
    sortByNameButton.addEventListener("click", function () { sortAlphabetically(el, 'Name') })
    sortByCourseButton.addEventListener("click", function () { sortAlphabetically(el, 'Course') })
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
});;var closeMenus = function () {
    var menus = document.querySelectorAll('.desktop-nav-item');
    for (var i = 0; i < menus.length; i++) {
        menus[i].classList.remove('menu-isOpen')
    }
}

var toggleMenu = function (e) {
    e.stopPropagation();
    this.classList.toggle('menu-isOpen')
}

var tabs = document.querySelectorAll('.desktop-nav-item');
for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].querySelector('.desktop-subnav')) {
        tabs[i].addEventListener('click', toggleMenu)
    }
}
document.addEventListener('click', closeMenus);var enterFullscreenButton = document.getElementById('enterFullscreen')

enterFullscreenButton.addEventListener("click", function() {
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen 
    ;
    rfs.call(el);
});;var SVGEYE = '<svg class="eye" viewBox="0 0 83.52 83.52"><defs><linearGradient id="a" x1="77.5" y1="21.13" x2="6.02" y2="62.39" gradientUnits="userSpaceOnUse"><stop offset="0.71" stop-color="#fff"/><stop offset="0.82" stop-color="#dcdcdc"/><stop offset="1" stop-color="#999"/></linearGradient></defs><circle id="eye-white" cx="41.76" cy="41.76" r="41.26" style="stroke:#1d1d1b;stroke-miterlimit:10;fill:url(#a)"/><g id="iris"><circle id="eye-blue" cx="41.76" cy="41.76" r="22.31" style="fill:#268aff;stroke:#1d1d1b;stroke-miterlimit:10"/><circle cx="41.76" cy="41.76" r="10.91" style="fill:#1e1e1e"/><g style="opacity:0.5700000000000001"><polygon points="53.68 58.64 54.37 58.08 48.58 51.36 48.33 51.57 53.68 58.64" style="fill:#0c2a4d"/><polygon points="51.22 60.15 51.98 59.69 47.19 52.24 46.91 52.41 51.22 60.15" style="fill:#0c2a4d"/><polygon points="48.58 61.31 49.4 60.96 45.68 52.91 45.38 53.04 48.58 61.31" style="fill:#0c2a4d"/><polygon points="45.8 62.09 46.66 61.86 44.1 53.37 43.78 53.45 45.8 62.09" style="fill:#0c2a4d"/><polygon points="42.94 62.47 43.82 62.36 42.47 53.6 42.14 53.64 42.94 62.47" style="fill:#0c2a4d"/><polygon points="40.05 62.45 40.94 62.47 40.82 53.6 40.49 53.59 40.05 62.45" style="fill:#0c2a4d"/><polygon points="37.19 62.03 38.07 62.17 39.19 53.37 38.87 53.32 37.19 62.03" style="fill:#0c2a4d"/><polygon points="34.42 61.22 35.27 61.48 37.6 52.92 37.29 52.83 34.42 61.22" style="fill:#0c2a4d"/><polygon points="31.79 60.02 32.6 60.4 36.1 52.25 35.8 52.12 31.79 60.02" style="fill:#0c2a4d"/><polygon points="29.35 58.48 30.1 58.96 34.7 51.38 34.42 51.2 29.35 58.48" style="fill:#0c2a4d"/><polygon points="27.15 56.61 27.82 57.19 33.43 50.33 33.19 50.11 27.15 56.61" style="fill:#0c2a4d"/><polygon points="25.24 54.45 25.82 55.12 32.33 49.1 32.12 48.86 25.24 54.45" style="fill:#0c2a4d"/><polygon points="23.64 52.05 24.12 52.79 31.41 47.74 31.23 47.46 23.64 52.05" style="fill:#0c2a4d"/><polygon points="22.39 49.44 22.76 50.25 30.68 46.26 30.54 45.96 22.39 49.44" style="fill:#0c2a4d"/><polygon points="21.52 46.69 21.77 47.54 30.17 44.69 30.07 44.38 21.52 46.69" style="fill:#0c2a4d"/><polygon points="21.03 43.84 21.17 44.72 29.88 43.07 29.83 42.75 21.03 43.84" style="fill:#0c2a4d"/><polygon points="20.95 40.96 20.96 41.85 29.82 41.42 29.82 41.09 20.95 40.96" style="fill:#0c2a4d"/><polygon points="21.27 38.09 21.16 38.97 29.99 39.78 30.03 39.46 21.27 38.09" style="fill:#0c2a4d"/><polygon points="21.99 35.29 21.76 36.15 30.39 38.18 30.47 37.87 21.99 35.29" style="fill:#0c2a4d"/><polygon points="23.09 32.62 22.74 33.44 31 36.65 31.13 36.35 23.09 32.62" style="fill:#0c2a4d"/><polygon points="24.55 30.13 24.09 30.89 31.82 35.23 31.99 34.95 24.55 30.13" style="fill:#0c2a4d"/><polygon points="26.34 27.87 25.78 28.56 32.84 33.92 33.04 33.67 26.34 27.87" style="fill:#0c2a4d"/><polygon points="28.43 25.88 27.78 26.48 34.02 32.78 34.26 32.56 28.43 25.88" style="fill:#0c2a4d"/><polygon points="30.77 24.2 30.05 24.7 35.35 31.81 35.62 31.62 30.77 24.2" style="fill:#0c2a4d"/><polygon points="33.33 22.86 32.54 23.26 36.8 31.03 37.1 30.88 33.33 22.86" style="fill:#0c2a4d"/><polygon points="36.05 21.89 35.21 22.18 38.35 30.47 38.66 30.36 36.05 21.89" style="fill:#0c2a4d"/><polygon points="38.88 21.3 38.01 21.47 39.97 30.12 40.28 30.06 38.88 21.3" style="fill:#0c2a4d"/><polygon points="41.76 21.12 40.87 21.17 41.61 30 41.94 29.99 41.76 21.12" style="fill:#0c2a4d"/><polygon points="44.64 21.34 43.76 21.26 43.25 30.12 43.58 30.14 44.64 21.34" style="fill:#0c2a4d"/><polygon points="47.46 21.96 46.59 21.76 44.87 30.46 45.18 30.53 47.46 21.96" style="fill:#0c2a4d"/><polygon points="50.17 22.97 49.34 22.65 46.41 31.02 46.72 31.14 50.17 22.97" style="fill:#0c2a4d"/><polygon points="52.71 24.34 51.93 23.91 47.87 31.79 48.16 31.95 52.71 24.34" style="fill:#0c2a4d"/><polygon points="55.03 26.05 54.32 25.51 49.21 32.76 49.47 32.95 55.03 26.05" style="fill:#0c2a4d"/><polygon points="57.09 28.07 56.47 27.44 50.39 33.9 50.62 34.13 57.09 28.07" style="fill:#0c2a4d"/><polygon points="58.86 30.36 58.32 29.64 51.41 35.2 51.6 35.46 58.86 30.36" style="fill:#0c2a4d"/><polygon points="60.28 32.87 59.85 32.09 52.24 36.62 52.39 36.91 60.28 32.87" style="fill:#0c2a4d"/><polygon points="61.35 35.55 61.03 34.72 52.85 38.15 52.97 38.45 61.35 35.55" style="fill:#0c2a4d"/><polygon points="62.03 38.35 61.83 37.49 53.26 39.75 53.33 40.06 62.03 38.35" style="fill:#0c2a4d"/><polygon points="62.31 41.23 62.24 40.34 53.43 41.39 53.46 41.71 62.31 41.23" style="fill:#0c2a4d"/><polygon points="62.19 44.11 62.24 43.23 53.38 43.03 53.36 43.36 62.19 44.11" style="fill:#0c2a4d"/><polygon points="61.67 46.95 61.84 46.08 53.09 44.66 53.03 44.98 61.67 46.95" style="fill:#0c2a4d"/><polygon points="60.76 49.69 61.05 48.85 52.59 46.23 52.48 46.53 60.76 49.69" style="fill:#0c2a4d"/><polygon points="59.48 52.28 59.88 51.49 51.87 47.71 51.72 48 59.48 52.28" style="fill:#0c2a4d"/><polygon points="57.85 54.66 58.36 53.94 50.95 49.08 50.76 49.34 57.85 54.66" style="fill:#0c2a4d"/><polygon points="55.9 56.8 56.51 56.15 49.84 50.3 49.62 50.54 55.9 56.8" style="fill:#0c2a4d"/><polygon points="53.68 58.64 54.37 58.08 48.58 51.36 48.33 51.57 53.68 58.64" style="fill:#0c2a4d"/><polygon points="51.22 60.15 51.98 59.69 47.19 52.24 46.91 52.41 51.22 60.15" style="fill:#0c2a4d"/><polygon points="48.58 61.31 49.4 60.96 45.68 52.91 45.38 53.04 48.58 61.31" style="fill:#0c2a4d"/><polygon points="45.8 62.09 46.66 61.86 44.1 53.37 43.78 53.45 45.8 62.09" style="fill:#0c2a4d"/><polygon points="42.94 62.47 43.82 62.36 42.47 53.6 42.14 53.64 42.94 62.47" style="fill:#0c2a4d"/><polygon points="40.05 62.45 40.94 62.47 40.82 53.6 40.49 53.59 40.05 62.45" style="fill:#0c2a4d"/></g></g></svg>';

var eyes = [];
var initEyes = function () {
    eyes = document.querySelectorAll(".eye");
}

var spawnEyeWindow = function(){
    spawnWindow({
        x: 1000,
        y: 60,
        width: 154,
        height: 176,
        title: 'Oh look',
        content: SVGEYE
    })
    initEyes();
}

var trackEye = function (e, el) {
    var eyeWhite = el.getElementById("eye-white");
    var iris = el.getElementById("iris");
    var outerBox = eyeWhite.getBBox();
    var irisBox = iris.getBBox();
    var eyeRad = outerBox.width;
    var irisRad = irisBox.width;
    var svgBox = el.getBoundingClientRect();
    var w = svgBox.right - svgBox.left;
    var h = svgBox.bottom - svgBox.top;
    eyeX = svgBox.left + w / 2;
    eyeY = svgBox.top + h / 2;
    var x = e.pageX;
    var y = e.pageY;
    var xp, yp;
    if (x < eyeX) {
        xp = (1 - x / eyeX) * -1;
    } else {
        xp = (x - eyeX) / (window.innerWidth - eyeX);
    }
    if (y < eyeY) {
        yp = (1 - y / eyeY) * -1;
    } else {
        yp = (y - eyeY) / (window.innerHeight - eyeY);
    }

    //Multiply by .7 to prevent iris from going outside the eye at diagonal positions
    var irisX = xp * (eyeRad - irisRad) / 2 * 0.75;
    var irisY = yp * ((eyeRad - irisRad) / 2) * 0.7;
    iris.style.transform = "translate(" + irisX + "px," + irisY + "px)";
};

document.addEventListener("mousemove", function (e) {
    for (var i = 0; i < eyes.length; i++) {
        trackEye(e, eyes[i]);
    }
});
;var toggleMonochromeMode = function(){
    var html = document.getElementsByTagName('html')[0]
    html.classList.toggle('monochrome')
}