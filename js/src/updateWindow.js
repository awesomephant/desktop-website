var updateWindow = function (window, html, init) {
    var c = window.querySelector('.window-content')
    c.innerHTML = html;
    init(window);
}