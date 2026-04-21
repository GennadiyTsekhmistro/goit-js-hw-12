import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// DOM елементи для рендерингу
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");

// Lightbox ініціалізація (після DOM елементів)
const lightbox = new SimpleLightbox("#gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

// Функції
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

  gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

// loader
export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}

// (кнопка Load more)
export function showLoadMoreButton() {
  loadMoreBtn.hidden = false;
}

export function hideLoadMoreButton() {
  loadMoreBtn.hidden = true;
}