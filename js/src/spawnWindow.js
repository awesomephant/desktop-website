var windowTemplate = Handlebars.compile('<header class="window-header"><h2 class="window-title">{{title}}</h2><nav class="window-controls"><a href="#1" id="close-button" class="window-control-close"><svg><path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/></svg></a></nav></header><div class="dragbar-right" id="resize-right"></div><div class="dragbar-left" id="resize-left"></div><div class="dragbar-bottom" id="resize-bottom"></div><div class="window-content">{{{content}}}</div>')

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

spawnButton.addEventListener('click', function(){spawnWindow(TEST)});