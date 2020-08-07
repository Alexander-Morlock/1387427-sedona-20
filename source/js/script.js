var mainNav = document.querySelector(".site-list");
mainNav.classList.toggle("main-nav-mobile-hide");

var navButton = document.querySelector(".main-nav-toggle");
navButton.classList.toggle("main-nav-mobile-hide");

navButton.addEventListener("click", function() {
  mainNav.classList.toggle("main-nav-mobile-hide");
  mainNav.classList.toggle("main-nav--show");
  navButton.classList.toggle("main-nav-toggle--cross");
})
