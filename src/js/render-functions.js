import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm.js";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");

let lightbox = null;

export function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox("#gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
      <li>
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
      </li>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);

  initLightbox(); // 🔥 ОЦЕ ВАЖЛИВО
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.remove("is-hidden");
}

export function hideLoader() {
  loader.classList.add("is-hidden");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("is-hidden");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("is-hidden");
}