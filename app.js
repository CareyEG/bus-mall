'use strict';

// Global variables
var mallpic = document.getElementById('mallpic');
var mallpicTwo = document.getElementById('mallpic-two');
var mallpicThree = document.getElementById('mallpic-three');
var containerElement = document.getElementById('container');
var mallArray = [];
var votesRemaining = 25;
var randomIndexArray = [];
var chartDrawn = false;

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



// Show a random product
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

  while(randomIndexArray.length > 6){
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
function handleMallClick(event){
  votesRemaining--;

  if(votesRemaining === 0){
    renderResults();
    containerElement.removeEventListener('click', handleMallClick);
  }

  var mallName = event.target.alt;
  console.log("my event target alt", event.target.alt);
  
  for(var i = 0; i < mallArray.length; i++){
    if(mallArray[i].name === mallName){
      mallArray[i].votes++;
    }
  }

  // when I reach 25 votes, I need to run a function that renders the product's name and the number of votes
  showARandomMall(mallpic);
  showARandomMall(mallpicTwo);
  showARandomMall(mallpicThree);

}

// Stuff that runs on page load
containerElement.addEventListener('click', handleMallClick);
// Show the first product
showARandomMall(mallpic);
showARandomMall(mallpicTwo);
showARandomMall(mallpicThree);




// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.8.0
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++

// Arrays to hold data for the chart
