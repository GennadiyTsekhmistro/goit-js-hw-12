import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from "./js/render-functions";

const form = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");

let page = 1;
let currentQuery = "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentQuery = event.target.query.value.trim();
  if (!currentQuery) return;

  page = 1;
  clearGallery();

  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      loadMoreBtn.hidden = true;
      return;
    }

    createGallery(data.hits);
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

    createGallery(data.hits);

    if (data.hits.length === 0) {
      loadMoreBtn.hidden = true;
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});