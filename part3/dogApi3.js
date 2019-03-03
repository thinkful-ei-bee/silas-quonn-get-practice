"use strict";
const DATASTORE = {
  count: 1,
  dogImgs: [],
  dogBreeds: ["wrong breed"],
  userSelection: ""
};

const stem1 = "https://dog.ceo/api/breed/";
const endpoint = "/images/random";
const randomUrl = `${stem1}${DATASTORE.userSelection}${endpoint}`;
const allBreedsUrl = "https://dog.ceo/api/breeds/list/all";

function fetchFunction() {
  let breedsResponse;
  fetch(allBreedsUrl)
    .then(response => response.json())
    .then(jsonObj => {
      breedsResponse = jsonObj.message;
      $.each(breedsResponse, function(key, value) {
        if (value.length) {
          value.forEach(function(elem) {
            DATASTORE.dogBreeds.push(`${elem} ${key}`);
          });
        } else if (!value.length) {
          DATASTORE.dogBreeds.push(key);
        }
      });
      renderOptions();
    })
    .catch(error => alert("You have an error"));
}

function fetchImgs() {
  let first = [];
  let second = [];
  let arr = first;
  let userStem;
  DATASTORE.userSelection.split("").forEach(function(elem) {
    if (elem === " ") {
      arr = second;
    } else {
      arr.push(elem);
    }
  });
  if (second.length) {
    userStem = `${second.join("")}/${first.join("")}`;
  } else {
    userStem = first.join("");
  }
  let urlString = `${stem1}${userStem}${endpoint}`;
  fetch(urlString)
    .then(response => response.json())
    .then(jsonObj => {
      DATASTORE.dogImgs.push(jsonObj.message);
      renderImg();
    })
    .catch(error =>
      alert(
        "Either your breed name is incorrect or we dont have that breed in our database"
      )
    );
}

function renderImg() {
  $(".img-container").html(`<img src=${DATASTORE.dogImgs[0]}>`);
}

function pressTheButton() {
  $("form").submit(event => {
    clearDogImgs();
    clearResults();
    event.preventDefault();
    DATASTORE.userSelection = $("select.breed")
      .find(":selected")
      .text();
    fetchImgs();
  });
}

function renderDropdown() {
  fetchFunction();
  pressTheButton();
}

function renderOptions() {
  DATASTORE.dogBreeds.forEach(function(elem) {
    $("select").append(`<option>${elem}</option>`);
  });
}

function clearDogImgs() {
  DATASTORE.dogImgs = [];
}

function clearResults() {
  $(".img-container").html("");
}

function startDogApp() {
  renderDropdown();
}

$(startDogApp);
