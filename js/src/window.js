// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll(".draggable");
// array of Draggabillies
var draggies = [];
// init Draggabillies
for (var i = 0, len = draggableElems.length; i < len; i++) {
	var draggableElem = draggableElems[i];
	var draggie = new Draggabilly(draggableElem, {
		handle: ".window-header"
	});
	draggies.push(draggie);
}
var activeWindow = document.querySelector('.window');
var windows = document.querySelectorAll(".window");

var handleClose = function(e){
	activeWindow.classList.toggle('closed')
}

var handleMouseX = function(e) {
//	console.log(e);
	var pos = activeWindow.getBoundingClientRect();
	activeWindow.style.width = e.pageX - pos.left + "px";
};
var handleMouseXLeft = function(e) {
	var pos = activeWindow.getBoundingClientRect();
	console.log('l')
	activeWindow.style.left = e.pageX + "px";
	activeWindow.style.width = pos.right - e.pageX + "px";
};

var handleMouseY = function(e) {
	var pos = activeWindow.getBoundingClientRect();
	activeWindow.style.height = e.pageY - pos.top + "px";
};


var handleDrag = function(e) {
	e.preventDefault();
	if(e.srcElement.id === 'resize-right'){
		document.addEventListener("mousemove", handleMouseX, false);
	} else if (e.srcElement.id === 'resize-left'){
		console.log('yp')
		document.addEventListener("mousemove", handleMouseXLeft, false);
	} else {
			document.addEventListener("mousemove", handleMouseY, false);
	}
};

document.addEventListener("mouseup", function(e) {
	console.log("up");
	document.removeEventListener("mousemove", handleMouseX, false);
	document.removeEventListener("mousemove", handleMouseY, false);
	document.removeEventListener("mousemove", handleMouseXLeft, false);
});

var init = function(){
	for (var i = 0; i < windows.length; i++){
		var w = windows[i];
		console.log(w);
		var resizeRight = w.querySelector('#resize-right')
		resizeRight.addEventListener("mousedown", handleDrag, false);
		var resizeLeft = w.querySelector('#resize-left')
		resizeLeft.addEventListener("mousedown", handleDrag, false);
		var resizeBottom = w.querySelector("#resize-bottom");
		resizeBottom.addEventListener("mousedown", handleDrag, false);
		var closeButton = w.querySelector("#close-button");
		if(closeButton){
		closeButton.addEventListener("click", handleClose, false);
		}
		w.addEventListener("mousedown", function(e){
			activeWindow.style.zIndex = 0;
			activeWindow = e.srcElement.closest('.window');
			activeWindow.style.zIndex = 10;
		})
		console.log(activeWindow)
	}
}

init();
