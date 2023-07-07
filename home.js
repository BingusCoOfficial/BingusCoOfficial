function disableRightClick(e) {
  if (!e) var e = window.event;
  if (e.preventDefault) e.preventDefault();
  else e.returnValue = false;
}
if (document.addEventListener) {
  document.addEventListener('contextmenu', disableRightClick, false);
}
else {
  document.attachEvent('oncontextmenu', disableRightClick);
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    return
  } else {
    navigator.serviceWorker.register('/service-worker.js');
  }
}

function disableTextSelection() {
  if (typeof document.onselectstart != 'undefined') {
    document.onselectstart = new Function('return false');
  } else {
    document.onmousedown = function () { return false };
    document.onmouseup = function () { return true };
  }
}

function titleChange() {
  var brElement = document.getElementById("bingus_news");

  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  var rect = brElement.getBoundingClientRect();

  var isVisible = rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewportHeight && rect.right <= viewportWidth;

  var updateElement = document.getElementById("welcome");

  if (isVisible) {
    updateElement.textContent = "BingusCO News";
  } else {
    updateElement.textContent = "Welcome to BingusCO";
  }
}

window.onload = function() {
  registerServiceWorker();
  disableTextSelection();
  titleChange();
  setInterval(titleChange, 1);
}

$(function(){
  $("#nav-placeholder").load("nav.html");
});


