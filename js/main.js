'use strict';

//get random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let leftClick;
let midClick;
let rightClick;
const section1= document.getElementById('pole');
const btn = document.createElement('button');
btn.setAttribute('id','pi')
section1.appendChild(btn);
document.getElementById('pi').style.visibility='hidden';
btn.textContent='Show Result';

const products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass',
];

const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const midImage = document.getElementById('mid-image');
const imagesSection = document.getElementById('images-section');


function Product(name) {
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
Product.all = [];
// console.log(Product.all);

for (let i = 0; i < products.length; i++) {
  new Product(products[i]);
}

console.table(Product.all);

function render() {


  //left
  leftClick = randomNumber(0, Product.all.length - 1);
  if (leftClick!==midClick&&leftClick!==rightClick){
  leftImage.src = Product.all[leftClick].path;
  leftImage.alt = Product.all[leftClick].name;
  leftImage.title = Product.all[leftClick].name;
  }else{
    leftClick = randomNumber(0, Product.all.length - 1);
  }

  //mid
  midClick = randomNumber(0, Product.all.length - 1);
  if (midClick!==leftClick && midClick!==rightClick){
  midImage.src = Product.all[midClick].path;
  midImage.alt = Product.all[midClick].name;
  midImage.title = Product.all[midClick].name;
  }else {
    midClick = randomNumber(0, Product.all.length - 1);
  }
  //right
  rightClick = randomNumber(0, Product.all.length - 1);
  if (rightClick!==midClick&& rightClick!==leftClick){
  rightImage.src = Product.all[rightClick].path;
  rightImage.alt = Product.all[rightClick].name;
  rightImage.title = Product.all[rightClick].name;
  }else {
    rightClick = randomNumber(0, Product.all.length - 1);
  }
  // if (randomNumber(0,Product.all-1) >= leftClick || midClick || rightClick){

  //   randomNumber(0,Product.all-1) += 1;
  //  }
}

//  render();

imagesSection.addEventListener('click', result);

let counter = 26;
function result(event) {

  if (event.target.id !== 'images-section') {
    // counter = 0;
  }
  {
    if (event.target.id === rightImage.id) {
      Product.all[rightClick].votes++;
      Product.all[rightClick].views++;
      Product.all[leftClick].views++;
      Product.all[midClick].views++;
      counter = counter - 1;
    }

    else if (event.target.id === midImage.id) {
      Product.all[midClick].votes++;
      Product.all[midClick].views++;
      Product.all[leftClick].views++;
      Product.all[rightClick].views++;
      counter = counter - 1;
    }

    else if (event.target.id === leftImage.id) {
      Product.all[leftClick].votes++;
      Product.all[leftClick].views++;
      Product.all[midClick].views++;
      Product.all[rightClick].views++;
      counter = counter - 1;
    }


    console.log(counter);
    render();
  }
  
  
  
  if (counter == 1) {
    document.getElementById('pi').style.visibility='visible';
  }
}
btn.addEventListener('click', ulFunction);

function ulFunction() {
  const ulEl = document.createElement('ul');
  section1.appendChild(ulEl);
  for (let i = 0; i < products.length; i++){
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);

    liEl.textContent = `Name: ${products[i]},       Votes are: ${Product.all[i].votes},         Views are: ${Product.all[i].views}`
  }
}


render();

