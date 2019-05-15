'use strict';

// Global variables
var mallpic = document.getElementById('mallpic');
var mallpicTwo = document.getElementById('mallpic-two');
var mallpicThree = document.getElementById('mallpic-three');
var containerElement = document.getElementById('container');
var mallArray = [];
var votesRemaining = 25;
var randomIndexArray = [];
var chartDrawn;
var namesArray = [];
var votesArray = [];
var productChart;

//if statement is if things are stored

if (localStorage.getItem('names')){

  // gimme them goods
  var retrievedNames = localStorage.getItem('names');
  console.log('retrieved these goodies ' + retrievedNames);

  var parsedNames = JSON.parse(retrievedNames);
  console.log('parsed this stuff ' , parsedNames);

  // this is for the end result of local storage stuff
  mallArray = parsedNames;

} else {

  allTheGoodies();
}

// Constructor
function MallPicture(name){
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.timesShown = 0;
  this.votes = 0;
  mallArray.push(this);
}

// Instances
function allTheGoodies(){
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
}


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

function assignedChartData(){
  for(var i = 0; i < mallArray.length; i++){
    namesArray[i] = mallArray[i].name;
    votesArray[i] = mallArray[i].votes;
  }
}
// Event handler
function handleMallClick(event){
  votesRemaining--;

  if(votesRemaining === 0){
    assignedChartData();
    drawChart();
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

  var stringifiedNames = JSON.stringify(mallArray);
  
  localStorage.setItem('names', stringifiedNames);
  console.log('the data stored is ' + stringifiedNames);

}

// Stuff that runs on page load
// Show the first product
showARandomMall(mallpic);
showARandomMall(mallpicTwo);
showARandomMall(mallpicThree);




// ++++++++++++++++++++++++++++++++++++++++++++
// CHART STUFF
// Charts rendered using Chart JS v.2.7.2
// http://www.chartjs.org/
// ++++++++++++++++++++++++++++++++++++++++++++


  






var data = {
  labels: namesArray, // titles array we declared earlier
  datasets: [{
    label:'Totalities',
    data: votesArray, // votes array we declared earlier
    backgroundColor: [
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy',
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy',
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy',
      'bisque',
      'darkgray',
      'burlywood',
      'lightblue',
      'navy'


    ],
    hoverBackgroundColor: [
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple',
      'purple'

    ],
  }],
};

function drawChart() {
  var ctx = document.getElementById('my-chart').getContext('2d');
  productChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false,
      animation: {
        duration: 2000,
        easing: 'easeOutBounce',
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0,
        },
      }],
    },
  });
  chartDrawn = true;
}

// ++++++++++++++++++++++++++++++++++++++++++++
// EVENT LISTENERS
// ++++++++++++++++++++++++++++++++++++++++++++
containerElement.addEventListener('click', handleMallClick);

