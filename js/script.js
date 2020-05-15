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
			scrollWidth = calcScroll(),
			modalWindow = modal.querySelector(".popup__modal");

		triggers.forEach(item => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}
				modal.style.display = "block";
				modalWindow.classList.remove("fadeOutDown");
				modalWindow.classList.add("fadeInUp");
				document.querySelector("html").style.overflow = "hidden";
				document.querySelector("html").style.marginRight = `${scrollWidth}px`;
			});
		});

		close.addEventListener("click", () => {
			modalWindow.classList.remove("fadeInUp");
			modalWindow.classList.add("fadeOutDown");

			const timeout = window.getComputedStyle(modalWindow).animationDuration.split("s")[0];
			setTimeout(() => {
				modal.style.display = "none";
				document.querySelector("html").style.overflow = "";
				document.querySelector("html").style.marginRight = `0px`;
			}, timeout * 1000);
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modalWindow.classList.remove("fadeInUp");
				modalWindow.classList.add("fadeOutDown");

				const timeout = window.getComputedStyle(modalWindow).animationDuration.split("s")[0];
				setTimeout(() => {
					modal.style.display = "none";
					document.querySelector("html").style.overflow = "";
					document.querySelector("html").style.marginRight = `0px`;
				}, timeout * 1000);
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
	["resize", "load"].forEach(eventName => {
		window.addEventListener(eventName, () => {
			if (window.innerWidth < 768) {
				const triggerMenu = document.querySelector('.trigger'),
					navigation = document.querySelector('.nav-container'),
					navContainer = document.querySelector('.nav-menu-container');

				const checkZIndex = timeout => {
					setTimeout((() => {
						if (!navigation.classList.contains('animated')) {
							setTimeout(() => {
								console.log("-10");
								navContainer.style.zIndex = "-10";
							}, timeout);
						} else {
							navContainer.style.zIndex = "2";
						}
					}), 1)
				};
				checkZIndex(1);

				triggerMenu.addEventListener("click", () => {
					navigation.classList.toggle('animated');
					document.querySelector("html").style.overflow == "hidden" ? document.querySelector("html").style.overflow = "" : document.querySelector("html").style.overflow = "hidden";
					checkZIndex(1000);
				});
			};
		});
	});



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
				try {
					item.closest(".focused").querySelector(".clean").style.display = "none";
					item.closest(".focused").classList.remove("focused");
				} catch (error) { }
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

					postData('../contact.php', formData)
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



	// animation for left and right lines of .header__social block
	const animation1 = gsap.timeline()
		.from(".header__line--left", {
			left: "-202%",
			ease: "back.out(0.5)"
		})
		.from(".header__line--right", {
			right: "-202%",
			ease: "back.out(0.5)"
		}, "-= 1");

	const widthBlock = document.querySelector(".header__social").offsetWidth,
		widthWindow = document.documentElement.clientWidth,
		diffHalf = 102 + ((widthWindow - widthBlock) / (widthBlock / 100)) / 2;
	// (widthWindow - widthBlock) / (widthBlock / 100) / 2 - оставшееся растояние от widthBlock и widthWindow переведенное в проценты
	// и разделенное на 2, т.к. разница расстояния от widthBlock и widthWindow равномерно распределяется по краям
	// затем прибавили исходное состояние линий - 102% 

	const animation2 = gsap.timeline()
		.fromTo(".header__line--left", {
			left: '-102%'
		}, {
			left: `-${diffHalf}%`
		})
		.fromTo(".header__line--right", {
			right: '-102%'
		}, {
			right: `-${diffHalf}%`
		}, "-= 1")

	const controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({
		duration: 0,
		triggerElement: '.header__social',
		triggerHook: 0.8,
	})
		.setTween(animation1)
		.addTo(controller);

	new ScrollMagic.Scene({
		duration: document.documentElement.clientHeight / 100 * 70,
		triggerElement: '.header__social',
		triggerHook: 0.7,
	})
		.setTween(animation2)
		.addTo(controller);


});