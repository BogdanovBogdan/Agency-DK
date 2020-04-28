window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	// smooth scrolling to anchors
	const anchors = document.querySelectorAll('a[href*="#"]'),
		nav = document.querySelector(".nav-container");

	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const blockID = anchor.getAttribute('href').replace('#', '');

			if (nav.classList.contains("animated")) {
				const trigger = nav.querySelector(".trigger");
				trigger.click()
				setTimeout(() => {
					document.getElementById(blockID).scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				}, 500);
			} else {
				document.getElementById(blockID).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
		});
	};


	const calcScroll = () => {
		let calcBox = document.createElement("div");
		calcBox.style.width = "50px";
		calcBox.style.height = "50px";
		calcBox.style.overflowY = "scroll";
		calcBox.style.visibility = "hidden";
		document.body.appendChild(calcBox);
		let scrollWidth = calcBox.offsetWidth - calcBox.clientWidth;
		calcBox.remove();

		return scrollWidth;
	};


	const bindModals = (triggerSelectors, modalSelector, closeSelector) => {
		const triggers = document.querySelectorAll(triggerSelectors),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			scrollWidth = calcScroll();

		triggers.forEach(item => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${scrollWidth}px`;
			});
		});

		close.addEventListener("click", () => {
			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = `0px`;
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			}
		});
	};
	bindModals("#callback-request", ".popup-callback", ".popup-callback .popup__close");



	// animation burger menu
	const triggerMenu = document.querySelector('.trigger'),
		navigation = document.querySelector('.nav-container');

	triggerMenu.addEventListener("click", () => {
		navigation.classList.toggle('animated');
		document.querySelector("html").style.overflow == "hidden" ? document.querySelector("html").style.overflow = "" : document.querySelector("html").style.overflow = "hidden";
	});


});