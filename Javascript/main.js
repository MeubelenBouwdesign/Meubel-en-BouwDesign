const loader = document.getElementById("pageLoader");

const showLoaderTimer = setTimeout(() => {
  loader.classList.add("visible");
}, 600);

window.addEventListener("load", () => {
  clearTimeout(showLoaderTimer);

  loader.classList.add("hidden");

  setTimeout(() => {
    loader.remove();
  }, 500);
});