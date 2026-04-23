import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");

let page = 1;
let currentQuery = "";
let totalPages = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentQuery = event.target.query.value.trim();

  if (!currentQuery) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});

document
  .querySelector("#load-more")
  .addEventListener("click", async () => {
    page += 1;

    try {
      showLoader();

      const data = await getImagesByQuery(currentQuery, page);

      createGallery(data.hits);

      // scroll
      const card = document.querySelector("#gallery li");
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });

      if (page >= totalPages) {
        hideLoadMoreButton();

        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: "topRight",
        });
      }

    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  });