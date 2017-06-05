var closeMenus = function () {
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
document.addEventListener('click', closeMenus)