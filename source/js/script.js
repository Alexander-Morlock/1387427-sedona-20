const setListener = (element, eventType, handler) => {
  if (!element) {
    return;
  }
  element.addEventListener(eventType, handler);
}

var mainNav = document.querySelector(".site-list");
mainNav.classList.toggle("main-nav-mobile-hide");

var navButton = document.querySelector(".main-nav-toggle");
navButton.classList.toggle("main-nav-mobile-hide");

setListener(navButton, "click", function () {
  mainNav.classList.toggle("main-nav-mobile-hide");
  mainNav.classList.toggle("main-nav--show");
  navButton.classList.toggle("main-nav-toggle--cross");
});

var formInputName = document.getElementById("input-name");
var formInputLastName = document.getElementById("input-last-name");
var formInputTelephone = document.getElementById("input-tel");
var formInputEmail = document.getElementById("input-email");

var failurePopup = document.querySelector(".feedback-form__failure-pop-up");
var successPopup = document.querySelector(".feedback-form__success-pop-up");
var feedbackForm = document.querySelector(".feedback-form");
var failurePopupButtonOK = document.querySelector(".button__failure-pop-up-ok");
var successPopupButtonOK = document.querySelector(".button__success-pop-up-ok");

setListener(failurePopupButtonOK, "click", function () {
  failurePopup.classList.add("feedback-form__pop-up-hidden");
});

setListener(successPopupButtonOK, "click", function () {
  successPopup.classList.add("feedback-form__pop-up-hidden");
});

setListener(feedbackForm, "submit", function (evt) {
  evt.preventDefault();

  if (!formInputName.value || !formInputLastName.value || !formInputTelephone.value || !formInputEmail.value) {
    failurePopup.classList.remove("feedback-form__pop-up-hidden");
  } else {
    successPopup.classList.remove("feedback-form__pop-up-hidden");
  }
});
