import { getImagesByQuery } from "./js/pixabay-api";

const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreBtn = document.querySelector("#load-more");

let page = 1;
let currentQuery = "";

function showLoader() {
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true;
}

function renderImages(images) {
  return images
    .map(
      (img) => `
      <li>
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </li>
    `
    )
    .join("");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentQuery = event.target.query.value.trim();
  if (!currentQuery) return;

  page = 1;
  gallery.innerHTML = "";

  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      gallery.innerHTML = "<p>No images found</p>";
      loadMoreBtn.hidden = true;
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    loadMoreBtn.hidden = false;
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, page);

    gallery.insertAdjacentHTML("beforeend", renderImages(data.hits));

    if (data.hits.length === 0) {
      loadMoreBtn.hidden = true;
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});