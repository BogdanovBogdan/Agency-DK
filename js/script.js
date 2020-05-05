window.addEventListener("DOMContentLoaded", () => {
	"use strict";

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



	// modals
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
				document.querySelector("html").style.overflow = "hidden";
				document.querySelector("html").style.marginRight = `${scrollWidth}px`;
			});
		});

		close.addEventListener("click", () => {
			modal.style.display = "none";
			document.querySelector("html").style.overflow = "";
			document.querySelector("html").style.marginRight = `0px`;
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.style.display = "none";
				document.querySelector("html").style.overflow = "";
				document.querySelector("html").style.marginRight = `0px`;
			}
		});
	};
	bindModals("#callback-request", ".popup-callback", ".popup-callback .popup__close");



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



	// animation burger menu
	if (window.innerWidth < 768) {
		const triggerMenu = document.querySelector('.trigger'),
			navigation = document.querySelector('.nav-container'),
			navContainer = document.querySelector('.nav-menu-container');

		navContainer.style.zIndex = "-10"

		triggerMenu.addEventListener("click", () => {
			navigation.classList.toggle('animated');
			document.querySelector("html").style.overflow == "hidden" ? document.querySelector("html").style.overflow = "" : document.querySelector("html").style.overflow = "hidden";


			if (!navigation.classList.contains('animated')) {
				setTimeout(() => {
					navContainer.style.zIndex = "-10";
				}, 1000);
			} else {
				navContainer.style.zIndex = "2";
			}
		});
	}



	// post data form
	const forms = () => {
		const forms = document.querySelectorAll("form"),
			inputs = document.querySelectorAll("input");

		const message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Скоро мы с вами свяжемся',
			failure: 'Что-то пошло не так...'
		};

		const clearInputs = () => {
			inputs.forEach(item => {
				item.value = '';
				item.checked = false;
			})
		};

		const postData = async (url, data) => {
			document.querySelector('.status').textContent = message.loading;
			let res = await fetch(url, {
				method: "post",
				body: data
			});
			return await res.text();
		};

		forms.forEach(item => {
			item.addEventListener('submit', (e) => {
				e.preventDefault()

				// cancel sending the form if there is no consent to the processing of personal data
				const checkbox = item.querySelector("#privacy-policy");
				if (checkbox.checked) {

					let statusMessage = document.createElement('div');
					statusMessage.classList.add('status');
					item.appendChild(statusMessage);

					const formData = new FormData(item);

					postData('assets/server.php', formData)
						.then(res => {
							console.log('success: ', res);
							statusMessage.textContent = message.success;
						})
						.catch(() => statusMessage.textContent = message.failure)
						.finally(() => {
							clearInputs();
							setTimeout(() => {
								statusMessage.remove();
							}, 4000);

						});
						
				} else {
					alert("Пожалуйста, согласитесь с обработкой персональных данных!");
				}
			});

		});
	};
	forms();




	// label input animation
	const inputsWrappers = document.querySelectorAll(".input-wrapper");

	inputsWrappers.forEach(inputWrapper => {
		const input = inputWrapper.querySelector("input"),
			clean = inputWrapper.querySelector(".clean");

		input.addEventListener("focus", function () {
			inputWrapper.classList.add("focused");
		});

		input.addEventListener("blur", function () {
			if (!this.value) {
				inputWrapper.classList.remove("focused");
				clean.style.display = "none";
			} else {
				this.classList.add("filled");
			}
		})

		input.addEventListener("input", function () {
			if (this.value) {
				clean.style.display = "block";
			} else {
				clean.style.display = "none";
			}
		});

		clean.addEventListener("click", function () {
			this.style.display = "none";
			input.value = "";
			input.focus();
		});

	});

});