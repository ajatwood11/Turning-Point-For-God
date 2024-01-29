"use strict";
let playlistData = [];
const popular = document.querySelector("#sort-popularity");
const tier = document.querySelector("#sort-tier");
const title = document.querySelector("#sort-title");

const showPopular = function () {
  popular.classList.remove("hidden");
  title.classList.add("hidden");
  tier.classList.add("hidden");
};
const showTitle = function () {
  title.classList.remove("hidden");
  popular.classList.add("hidden");
  tier.classList.add("hidden");
};
const ShowTier = function () {
  tier.classList.remove("hidden");
  title.classList.add("hidden");
  popular.classList.add("hidden");
};
const request = function () {
  fetch(
    "https://d2urhn0mmik6is.cloudfront.net/site/_images/tp-interview/data.json"
  )
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      playlistData = data;
      displayPlaylist();
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
};
const displayPlaylist = function () {
  let playlistContainer = document.getElementById("playlist-container");
  playlistContainer.innerHTML = "";

  playlistData.forEach(function (item) {
    let playlistDiv = document.createElement("div");
    playlistDiv.className = "playlist-item";

    playlistDiv.innerHTML = `<img src="${item.image}">
             `;

    playlistContainer.appendChild(playlistDiv);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const heading = document.getElementById("playlist-heading");
  const words = heading.innerText.split(" ");
  words[2] = '<span class="bold-word">' + words[2] + "</span>";
  heading.innerHTML = words.join(" ");
  request();
  showPopular();
});

document
  .querySelector("#sort-popularity")
  .addEventListener("click", function () {
    showTitle();
    playlistData.sort((a, b) => a.popularity - b.popularity);
    console.log("Sorted data by popularity:", playlistData);
    displayPlaylist();
  });

document.querySelector("#sort-title").addEventListener("click", function () {
  ShowTier();
  playlistData.sort((a, b) => a.title.localeCompare(b.title));
  console.log("Sorted data by title:", playlistData);
  displayPlaylist();
});

document.querySelector("#sort-tier").addEventListener("click", function () {
  showPopular();
  playlistData.sort((a, b) => a.tier - b.tier);
  console.log("Sorted data by tier:", playlistData);
  displayPlaylist();
});
