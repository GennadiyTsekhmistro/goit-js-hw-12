import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm.js";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox("#gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");



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
  lightbox.refresh();
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