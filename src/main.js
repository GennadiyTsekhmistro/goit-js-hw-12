import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector("#load-more");

let page = 1;
let currentQuery = "";
let totalPages = 0;

// 🔍 SUBMIT (пошук)
form.addEventListener("submit", async (event) => {
  console.log("submit працює");
  event.preventDefault();

  currentQuery = event.target.query.value.trim();

  if (!currentQuery) return;

  // reset стану
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    console.log("API RESPONSE:", data);

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

    // ✅ очищення input (ВАЖЛИВО)
    event.target.reset();
  } catch (error) {
    console.log(error);
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

    createGallery(data.hits);

    // 📌 SCROLL (після рендеру)
    const card = document.querySelector("#gallery li");
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    // 📌 кінець колекції
    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});