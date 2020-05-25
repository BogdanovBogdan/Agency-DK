window.addEventListener("DOMContentLoaded",(function(){"use strict";((e,t,o)=>{const n=document.querySelectorAll(".callback-btn"),l=document.querySelector(".popup-callback"),c=document.querySelector(".popup-callback .popup__close"),i=(()=>{let e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflowY="scroll",e.style.visibility="hidden",document.body.appendChild(e);let t=e.offsetWidth-e.clientWidth;return e.remove(),t})(),r=l.querySelector(".popup__modal"),s=()=>{l.style.display="none",document.querySelector(".nav-container.animated")||(document.querySelector("html").style.overflow="",document.querySelector("html").style.marginRight="0px")};n.forEach(e=>{e.addEventListener("click",e=>{e.target&&e.preventDefault(),l.style.display="block",r.classList.remove("fadeOutDown"),r.classList.add("fadeInUp"),document.querySelector(".nav-container.animated")||(document.querySelector("html").style.overflow="hidden",document.querySelector("html").style.marginRight=i+"px")})}),c.addEventListener("click",()=>{r.classList.remove("fadeInUp"),r.classList.add("fadeOutDown");const e=window.getComputedStyle(r).animationDuration.split("s")[0];setTimeout(()=>{s()},1e3*e)}),l.addEventListener("click",e=>{if(e.target===l){r.classList.remove("fadeInUp"),r.classList.add("fadeOutDown");const e=window.getComputedStyle(r).animationDuration.split("s")[0];setTimeout(()=>{s()},1e3*e)}})})();const e=document.querySelector(".popup-notification");e.addEventListener("click",t=>{(t.target==e||t.target.classList.contains("popup__close")||t.target.classList.contains("popup__btn"))&&(e.style.display="none")});const t=document.querySelectorAll('a[href*="#"]'),o=document.querySelector(".nav-container");for(let e of t)e.addEventListener("click",(function(t){t.preventDefault();const n=e.getAttribute("href").replace("#","");o.classList.contains("animated")?(o.querySelector(".trigger").click(),setTimeout(()=>{document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})},500)):document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})}));let n=!1;["resize","load"].forEach(e=>{window.addEventListener(e,()=>{const e=document.querySelector(".nav-container"),t=document.querySelector(".nav-menu-container");if(window.innerWidth<768){const o=document.querySelector(".trigger");t.style.pointerEvents="none";let l=!1;const c=window.getComputedStyle(o.nextElementSibling).transitionDuration.split("s")[0];n||(o.addEventListener("click",()=>{if(l)return!1;e.classList.toggle("animated"),t.style.pointerEvents="none"===t.style.pointerEvents?"":"none",document.querySelector("html").style.overflow=""===document.querySelector("html").style.overflow?"hidden":"",l=!0,setTimeout(()=>{l=!1},1e3*c)}),n=!0)}else e.classList.remove("animated"),t.style.pointerEvents=""})}),(()=>{const e=document.querySelectorAll("form"),t=document.querySelectorAll("input");e.forEach(e=>{e.addEventListener("submit",o=>{if(o.preventDefault(),e.querySelector("[name='privacy-policy']").checked){let o=document.querySelector(".popup-notification"),n=o.querySelector(".popup__title"),l=o.querySelector(".popup__hint"),c=e.querySelector(".form-callback__btn");(async(e,t,o)=>{const n=window.getComputedStyle(o).height;o.style.minHeight=n,o.classList.add("loader");let l=await fetch("../contact.php",{method:"post",body:t});return await l.text()})(0,new FormData(e),c).then(e=>{console.log("\nSuccess POST\n",e),o.style.display="block",n.innerHTML="Ваша заявка успешно отправлена",l.innerHTML="Мы перезвоним Вам в течени 15 минут.<br>Спасибо, что выбираете качественный продукт",t.forEach(e=>{try{e.closest(".focused").querySelector(".clean").style.display="none",e.closest(".focused").classList.remove("focused")}catch(e){}e.value="",e.checked=!1})}).catch(()=>{console.log("\nFailure POST\n"),o.style.display="block",n.innerHTML="Что-то пошло не так...",l.innerHTML="Попробуйте повторить позже."}).finally(()=>{c.style.minHeight="",c.classList.remove("loader"),setTimeout(()=>{o.style.display="none"},5e3)})}else alert("Пожалуйста, согласитесь с обработкой персональных данных!")})})})(),document.querySelectorAll(".input-wrapper").forEach(e=>{const t=e.querySelector("input"),o=e.querySelector(".clean");t.addEventListener("focus",(function(){e.classList.add("focused")})),t.addEventListener("blur",(function(){this.value||(e.classList.remove("focused"),o.style.display="none")})),t.addEventListener("input",(function(){this.value?o.style.display="block":o.style.display="none"})),o.addEventListener("click",(function(){this.style.display="none",t.value="",t.focus()}))});const l=gsap.timeline().from(".header__line--left",{left:"-202%",ease:"back.out(0.5)"}).from(".header__line--right",{right:"-202%",ease:"back.out(0.5)"},"-= 1"),c=document.querySelector(".header__social").offsetWidth,i=102+(document.documentElement.clientWidth-c)/(c/100)/2,r=gsap.timeline().fromTo(".header__line--left",{left:"-102%"},{left:`-${i}%`}).fromTo(".header__line--right",{right:"-102%"},{right:`-${i}%`},"-= 1"),s=new ScrollMagic.Controller;new ScrollMagic.Scene({duration:0,triggerElement:".header__social",triggerHook:.8}).setTween(l).addTo(s),new ScrollMagic.Scene({duration:document.documentElement.clientHeight/100*70,triggerElement:".header__social",triggerHook:.7}).setTween(r).addTo(s)}));