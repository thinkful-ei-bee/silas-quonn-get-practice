'use strict';

const STORE = {
  items: [],
  displayCount: 3,
};

function render(){
  
  //$('.results-list').empty();
  $('.results').removeClass('hidden');

  let temp = STORE.items.map(item => `<img src="${item.message}">`);

  console.log('temp: ' + temp);
  $('.results-bin').html(temp);
  //console.log('render ran');
  //console.log(STORE.items);
  //console.log(STORE.displayCount);

}

function fetchImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(result => {
      STORE.items.push(result);
      render();
    });
  
}

function handleSubmission(){
  $('form').submit(event => {
    event.preventDefault();
    STORE.displayCount = event.currentTarget.counter.value;
    STORE.items.length = 0;
    for(let i = 0; i<STORE.displayCount; i++){
      fetchImage();
    }
  });
}

function main(){
  handleSubmission();
}

$(main);