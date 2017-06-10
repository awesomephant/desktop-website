var windowTemplate = Handlebars.compile('<header class="window-header"><h2 class="window-title">{{title}}</h2><nav class="window-controls"><a href="#1" id="fullscreen-button" class="window-control-fullscreen"><svg class="icon-enter-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/></svg><svg class="icon-exit-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" /></svg></a><a href="#1" id="close-button" class="window-control-close"><svg><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></a></nav></header><div class="dragbar-right" id="resize-right"></div><div class="dragbar-left" id="resize-left"></div><div class="dragbar-bottom" id="resize-bottom"></div><div class="window-content">{{{content}}}</div>')

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
    if (data.init){
    data.init(el);
    }
    document.body.appendChild(el);
}
spawnWindow(TEST)
spawnButton.addEventListener('click', function(){spawnWindow(TEST)});