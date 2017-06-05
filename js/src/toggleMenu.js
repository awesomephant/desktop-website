var toggleMenu = function () {
    this.classList.toggle('menu-isOpen')
}

var tabs = document.querySelectorAll('.desktop-nav-item');
for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].querySelector('.desktop-subnav')) {
        tabs[i].addEventListener('click', toggleMenu)
    }
}