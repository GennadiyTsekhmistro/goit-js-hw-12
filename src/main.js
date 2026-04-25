import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");
const gallery = document.querySelector("#gallery");

let page = 1;
let currentQuery = "";
let totalPages = 0;

// кнопка
function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}

// loader (якщо є в HTML)
function showLoader() {
  document.querySelector(".loader")?.classList.remove("hidden");
}

function hideLoader() {
  document.querySelector(".loader")?.classList.add("hidden");
}

// 🔍 SEARCH
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  currentQuery = event.target.query.value.trim();
  if (!currentQuery) return;

  page = 1;

  clearGallery(gallery);
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      iziToast.error({
        message: "No images found",
        position: "topRight",
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);

    createGallery(data.hits, gallery);

    if (page < totalPages) {
      showLoadMoreButton();
    }

    event.target.reset();
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: "Something went wrong",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});

// 🔽 LOAD MORE
loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits, gallery);

    const card = document.querySelector(".gallery a");

    if (card) {
      window.scrollBy({
        top: card.getBoundingClientRect().height * 2,
        behavior: "smooth",
      });
    }

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: "End of results",
        position: "topRight",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});