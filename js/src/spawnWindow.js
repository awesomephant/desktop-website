var windowTemplate = Handlebars.compile('<header class="window-header"><h2 class="window-title">{{title}}</h2><nav class="window-controls"><a href="#1" id="fullscreen-button" class="window-control-fullscreen"><svg class="icon-enter-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/></svg><svg class="icon-exit-fullscreen" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" /></svg></a><a href="#1" id="close-button" class="window-control-close"><svg><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></a></nav></header><div class="dragbar-right" id="resize-right"></div><div class="dragbar-left" id="resize-left"></div><div class="dragbar-bottom" id="resize-bottom"></div><div class="window-content">{{{content}}}</div>')

var spawnWindow = function (data) {
    var html = windowTemplate(data);
    var el = document.createElement('div');
    el.innerHTML = html;
    initWindow(el);
    el.classList.add('window')
    el.classList.add('draggable')
    //el.classList.add('window-' + data.title.toLowerCase().replace('.', '-'))
    el.style.width = data.width + 'px';
    el.style.height = data.height + 'px';
    el.style.left = data.x + 'px';
    el.style.top = data.y + 'px';
    el.style.position = 'absolute';
    topZIndex += 1;
    el.style.zIndex = topZIndex;
    if (data.init) {
        data.init(el);
    }
    document.body.appendChild(el);
}
var aboutData = {
    title: 'About',
    content: '<p>Camberwell College of Arts<br />FdA Graphic Design & Illustration Degree Show 2017<br /><br />June 19 — 23, 2017<br/>1 Wilson Road<br/>London<br/>SE5 8LU<br/></p><a class="window-button" href="https://goo.gl/maps/vyrmubqViCM2">View Map</a>',
    x: 130,
    y: 150,
    width: 450,
    height: 220
}
var creditData = {
    title: 'Credits',
    content: '<p>Design and Development by <a href="http://www.maxkoehler.com">Max Kohler</a> and <a href="http://brwnng.com/">Ben Browning</a>. Typeset in <a href="https://typekit.com/fonts/acumin">Acumin Pro</a> by Adobe. Source code avaiable on <a href="https://github.com/awesomephant/desktop-website">Github</a>.</p><p>© All rights reserved 2017. Reproductions of student’s work belong to their respective owners.</p>',
    x: 75,
    y: 400,
    width: 280,
    height: 200
}

spawnWindow(aboutData)

var spawnButton = document.getElementById('spawn-button')
spawnButton.addEventListener('click', function () { spawnWindow(aboutData) });

var creditButton = document.getElementById('spawn-credits')
creditButton.addEventListener('click', function () { spawnWindow(creditData) });