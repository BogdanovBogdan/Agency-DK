window.addEventListener("DOMContentLoaded", () => {
	"use strict";

	const bindModals = (triggerSelectors, modalSelector, closeSelector) => {
		const triggers = document.querySelectorAll(triggerSelectors),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector);

		triggers.forEach(item => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
			});
		});

		close.addEventListener("click", () => {
			modal.style.display = "none";
			document.body.style.overflow = "";
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.style.display = "none";
				document.body.style.overflow = "";
			}
		});
	};

	bindModals("#callback-request", ".popup-callback", ".popup-callback .popup__close");




	const forms = () => {
		const forms = document.querySelectorAll("form"), 
			inputs = document.querySelectorAll("input");

		const message = {
			loading: "Загрузка",
			success: "Отправлено",
			failure: "Что-то пошло не так"
		};

		const clearInputs = () => {
			inputs.forEach(item => {
				item.valut = "";
			});
		};
		
		const postData = async (url, data) => {
			ducument.querySelector(".status-message").textContent = message.loading;
			let res = await fetch(url, {
				method: post, 
				body: data
			});
			return await res.text();
		};

		forms.forEach(item => {
			item.addEventListener("submit", (e) => {
				e.preventDefault();

				let statusMessage = document.createElement('div');
				statusMessage.classList.add(".status-message");
				item.appendChild(statusMessage);

				const formData = new FormData(item);

				postData("../server.php", formData)
					.then(res => {
						consolo.log("data = ", res);
						statusMessage.textContent = message.success;
					})
					.catch(() => statusMessage.textContent = message.failure)
					.finally(() => {
						clearInputs();
						setTimeout(() => {
                     statusMessage.remove();
                  }, 5000);
					});

			});
		});
	};
});