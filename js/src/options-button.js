var tabs = document.querySelectorAll('.desktop-nav-item');
for (var i = 0; i < tabs.length; i++){
    tabs[i].addEventListener('click', toggleMenu)
}

var toggleMenu = function(){
	this.classList.toggle('menu-isOpen')
}