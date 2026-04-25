import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function createGallery(hits, galleryEl) {
  const markup = hits
    .map(
      hit => `
      <a class="gallery-item" href="${hit.largeImageURL}">
        <img
          class="gallery-image"
          src="${hit.webformatURL}"
          alt="${hit.tags}"
          loading="lazy"
        />
      </a>
    `
    )
    .join("");

  galleryEl.innerHTML = markup;

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
