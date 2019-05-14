'use strict';

// Global variables
var mallpic = document.getElementById('mallpic');
var mallpicTwo = document.getElementById('mallpic-two');
var containerElement = document.getElementById('container');
var mallArray = [];
var votesRemaining = 25;
var randomIndexArray = [];

// Constructor
function MallPicture(name){
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.votes = 0;
  mallArray.push(this);
}

// Instances
new MallPicture('bag');
new MallPicture('banana');
new MallPicture('bathroom');
new MallPicture('boots');
new MallPicture('breakfast');
new MallPicture('bubblegum');
new MallPicture('chair');
new MallPicture('cthulhu');
new MallPicture('dog-duck');
new MallPicture('dragon');
new MallPicture('pen');
new MallPicture('pet-sweep');
new MallPicture('scissors');
new MallPicture('shark');
new MallPicture('sweep');
new MallPicture('tauntaun');
new MallPicture('unicorn');
new MallPicture('usb');
new MallPicture('water-can');
new MallPicture('wine-glass');







// Show a random goat
function showARandomMall(imageElement){
  // generate a random number
  var randomIndex = Math.floor(Math.random() * mallArray.length);

  // makes sure the random number has not been shown previously or currently
  while(randomIndexArray.includes(randomIndex)){
    randomIndex = Math.floor(Math.random() * mallArray.length);
  }
  randomIndexArray.unshift(randomIndex);

  // assign src
  imageElement.src = mallArray[randomIndex].filepath;
  // assign title
  imageElement.title = mallArray[randomIndex].name;
  // assign alt
  imageElement.alt = mallArray[randomIndex].name;
  // increment time shown
  mallArray[randomIndex].timesShown++;

  while(randomIndexArray.length > 4){
    randomIndexArray.pop();
  }
  
}

function renderResults(){
  var ulEl = document.createElement('ul');
  containerElement.appendChild(ulEl);

  for(var i = 0; i < mallArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = `${mallArray[i].name} got ${mallArray[i].votes} votes`;
    ulEl.appendChild(liEl);
  }
}

// Event handler
function handleGoatClick(event){
  votesRemaining--;

  if(votesRemaining === 0){
    renderResults();
    containerElement.removeEventListener('click', handleGoatClick);
  }

  var mallName = event.target.alt;
  console.log("my event target alt", event.target.alt);
  
  for(var i = 0; i < mallArray.length; i++){
    if(mallArray[i].name === mallName){
      mallArray[i].votes++;
    }
  }

  // when I reach 25 votes, I need to run a function that renders the goat's name and the number of votes
  showARandomMall(mallpic);
  showARandomMall(mallpicTwo);
}

// Stuff that runs on page load
containerElement.addEventListener('click', handleGoatClick);
// Show the first goat
showARandomMall(mallpic);
showARandomMall(mallpicTwo);