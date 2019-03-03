"use strict";

const DATASTORE = {
  count: 3,
  dogImgs: []
};

const userInput = $("#userInput").val();

function fetchFunction() {
  fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(response => response.json())
    .then(jsonObj => {
      DATASTORE.dogImgs.push(jsonObj);
      render();
    })
    .catch(error => alert("You have an error"));
}

function render() {
  const temp = DATASTORE.dogImgs.map(function(elem) {
    return `<img src=${elem.message}>`;
  });
  $(".img-container").html(temp);
}

function pressTheButton() {
  $("form").submit(event => {
    clearDogImgs();
    clearResults();
    if (userInput < 3) {
      DATASTORE.count = 3;
    } else if (userInput > 50) {
      userInput = 50;
    }
    DATASTORE.count = $("#userInput").val();
    $("#userInput").val("");
    event.preventDefault();
    for (let i = 0; i < DATASTORE.count; i++) {
      fetchFunction();
    }
  });
}

function clearDogImgs() {
  DATASTORE.dogImgs = [];
}

function clearResults() {
  $(".img-container").html("");
}

$(pressTheButton());
