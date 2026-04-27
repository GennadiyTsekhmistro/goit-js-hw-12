import { getImagesByQuery } from "./js/pixabay-api.js";

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector(".loader");

let page = 1;
let currentQuery = "";
let totalPages = 0;

// UI


// SEARCH
form.addEventListener("submit", async e => {
  e.preventDefault();

  currentQuery = e.target.query.value.trim();
  if (!currentQuery) return;

  page = 1;

  clearGallery(gallery);
  hideLoadMore(loadMoreBtn);
  showLoader(loader);

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message: "No images found",
        position: "topRight",
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);

    createGallery(data.hits, gallery);

    if (page < totalPages) {
      showLoadMore(loadMoreBtn);
    } else {
      hideLoadMore(loadMoreBtn);

      iziToast.info({
        message: "End of results",
        position: "topRight",
      });
    }

    e.target.reset();
  } catch (err) {
    iziToast.error({
      message: "Something went wrong",
      position: "topRight",
    });
  } finally {
    hideLoader(loader);
  }
});

// LOAD MORE
loadMoreBtn.addEventListener("click", async () => {
  hideLoadMore(loadMoreBtn);
  page += 1;

  showLoader(loader);

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits, gallery);

    const firstCard = document.querySelector(".gallery a");

    if (firstCard) {
      window.scrollBy({
        top: firstCard.getBoundingClientRect().height * 2,
        behavior: "smooth",
      });
    }

    if (page < totalPages) {
      showLoadMore(loadMoreBtn);
    } else {
      hideLoadMore(loadMoreBtn);

      iziToast.info({
        message: "End of results",
        position: "topRight",
      });
    }

  } catch (err) {
    iziToast.error({
      message: "Failed to load more images",
      position: "topRight",
    });
  } finally {
    hideLoader(loader);
  }
});