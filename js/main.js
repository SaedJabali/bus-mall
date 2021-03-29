'use strict';

//get random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let leftClick;
let midClick;
let rightClick;

const section1 = document.getElementById('pole');
const btn = document.createElement('button');
btn.setAttribute('id', 'pi')
section1.appendChild(btn);
document.getElementById('pi').style.visibility = 'hidden';
btn.textContent = 'Show Result';

// const products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

const products = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const midImage = document.getElementById('mid-image');
const imagesSection = document.getElementById('images-section');


function Product(name) {
  this.name = name;
  this.path = `./assets/${name}`;
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
Product.all = [];

for (let i = 0; i < products.length; i++) {
  new Product(products[i]);
}


function render() {


  //left
  leftClick = randomNumber(0, Product.all.length - 1);
  leftImage.src = Product.all[leftClick].path;
  leftImage.alt = Product.all[leftClick].name;
  leftImage.title = Product.all[leftClick].name;

  //mid
  midClick = randomNumber(0, Product.all.length - 1);
  while (leftClick === midClick) {
    midClick = randomNumber(0, Product.all.length - 1);
  }
  midImage.src = Product.all[midClick].path;
  midImage.alt = Product.all[midClick].name;
  midImage.title = Product.all[midClick].name;

  //right
  rightClick = randomNumber(0, Product.all.length - 1);
  while (leftClick === rightClick || midClick === rightClick) {
    rightClick = randomNumber(0, Product.all.length - 1);
  }
  rightImage.src = Product.all[rightClick].path;
  rightImage.alt = Product.all[rightClick].name;
  rightImage.title = Product.all[rightClick].name;

  
}




imagesSection.addEventListener('click', result);

let counter = 25;
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
    imagesSection.removeEventListener('click', result);
    document.getElementById('pi').style.visibility = 'visible';
  } else {
    document.getElementById('pi').style.visibility = 'hidden';
  }
}
btn.addEventListener('click', ulFunction);

function ulFunction() {
  const ulEl = document.createElement('ul');
  section1.appendChild(ulEl);
  for (let i = 0; i < products.length; i++) {

    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);

    liEl.textContent = `Name: ${products[i]},       Votes are: ${Product.all[i].votes},         Views are: ${Product.all[i].views}`
  }

}


render();
