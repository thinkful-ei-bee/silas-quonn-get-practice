'use strict';

function fetchFunction() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(jsonObj => {
      console.log(jsonObj);
      displayResult(jsonObj);})
    .catch(error => alert('You have an error'));
}

function displayResult(responseJson){
  
  $('.results-img').replaceWith(`<img src="${responseJson.message}" class="results-img"img>`);

  $('.results').removeClass('hidden');
}

function pressTheButton(){
  $('form').submit(event => {
    event.preventDefault();
    fetchFunction();
  });
}

$(pressTheButton());