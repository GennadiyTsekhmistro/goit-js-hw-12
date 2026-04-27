import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function createGallery(hits, galleryEl) {
  const markup = hits
    .map(
      hit => `
<li class="gallery-item">
  <a class="gallery-link" href="${hit.largeImageURL}">
    <img
      class="gallery-image"
      src="${hit.webformatURL}"
      alt="${hit.tags}"
      loading="lazy"
    />
  </a>
</li>
`
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery(galleryEl) {
  galleryEl.innerHTML = "";
}

export function showLoader(loaderEl) {
  loaderEl.classList.remove("hidden");
}

export function hideLoader(loaderEl) {
  loaderEl.classList.add("hidden");
}

export function hideLoadMore(btnEl) {
  btnEl.classList.add("hidden");
}

export function showLoadMore(btnEl) {
  btnEl.classList.remove("hidden");
}