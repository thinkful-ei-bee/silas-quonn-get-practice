'use strict';

const STORE = {
  items: [],
  displayCount: 3,
};

function render(){
  
  //$('.results-list').empty();
  $('.results').removeClass('hidden');

  let temp = STORE.items.map(item => {
    console.log('item.message: ' + item.message);
    return `<img src="${item.message}">`;
  });

  $('.results-bin').html(temp);
  //console.log('render ran');
  //console.log(STORE.items);
  //console.log(STORE.displayCount);

}

function htmlTemplate(){
  //console.log('htmlTemplate ran');
  let templateHolder = '';
  for(let i=0; i<STORE.displayCount; i++){
    templateHolder += `<li><img src=${STORE.items[i]} class="results-img"></li>`;
  }
  //console.log(templateHolder);
  return templateHolder;
}

function fetchImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(result => {
      console.log(result.message);
      STORE.items.push(result);
      render();
    });
  
}

function updateItems(displayCount){
  
  for (let i=0; i<displayCount; i++){
    STORE.items.push(fetchImage());
  }

}

function handleSubmission(){
  $('form').submit(event => {
    event.preventDefault();
    
    STORE.displayCount = event.currentTarget.counter.value;

    for(let i = 0; i<STORE.displayCount; i++){
      fetchImage();
    }
    
    console.log(STORE.items);
  });
}

function main(){
  handleSubmission();
}

$(main);