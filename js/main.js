//translating from outside the screen into view on scroll

var scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll');

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  function loop() {
    elementsToShow.forEach(function (element) {
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
    } 
  });
    
    scroll(loop);

  }

  loop();


  //clicking footer-arrow takes to top of the page

  document.getElementsByClassName('arrow-box')[0].addEventListener('click' , ()=> {
    
    document.getElementById('banner')
    .scrollIntoView({
        behavior: "smooth",
    });
  })

  document.getElementsByClassName('scrolldown-arrow')[0].addEventListener('click' , ()=> {
    document.getElementById('features')
    .scrollIntoView({
        behavior: "smooth",
        block : "nearest",
    });
  })


  //function to get json data on click of more news button
  
  function loadMore() {

    var request = new XMLHttpRequest();
    request.open("GET", "http://www.json-generator.com/api/json/get/cgwSgMEBKa?indent=2", true);
   
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
      
        var response = JSON.parse(request.responseText);
       
        let secondRow = document.querySelectorAll('.row-2');
      
         for(let i = 0 , newsLen = response.news.length; i < newsLen ; i++) {
           
              console.log(`"${response.news[i].url}"`)
             
                secondRow[i].innerHTML = `<img src = "${response.news[i].url}">
                                      <h5>${response.news[i].title}</h5>
                                      <p>${response.news[i].desc} </p>`
              
         }
       
         secondRow[0].parentElement.classList.add("added-more"); 
         
        }
    };

    // request.open("GET", "./assets/json/news-feed.json", true);
    // request.setRequestHeader("Access-Control-Allow-Origin': '*'")
    
    request.send();
  }

// auto slideshow
var next;   // variable for counter
const radios = document.querySelectorAll('[name = r]');
const slideArrow = document.getElementsByClassName('slide-arrow');
var slideInterval = setInterval(changeSlide, 3000);

function changeSlide(adjacentSlide) {

  if(adjacentSlide === 0) next = 0;

  else {
    next = adjacentSlide || (Number((document.querySelector('.show-slide').id.substr(-1)) ));
  }
  
  if(next === radios.length) next = 0;

  radios[next].checked = true;
  document.querySelectorAll('.slide').forEach((elem) => elem.classList.remove('show-slide'));
  document.getElementById(`s${next+1}`).classList.add('show-slide');
} 

//manual slideshow 
for (let i = 0 , len = slideArrow.length; i < len ; i++) {
  slideArrow[i].addEventListener("click", (e) => {
    
    console.log(e.target.id)
    let adjacentSlide;
    e.target.id === "slide-arrow-right" ? next++ : next--;
    if(next<0) next = 2;
    changeSlide(next);

    clearInterval(slideInterval);
    slideInterval = setInterval(changeSlide, 3000);
  

  });
}

var bannerPos = document.getElementsByClassName('banner')[0];   

// var off = dw_getScrollOffsets();
window.addEventListener('scroll' , function() {

  if(scrollY > vhTOpx(100) - 105)  {

    document.getElementById('top').classList.add('add-bg');
    document.getElementsByClassName('nav-bar')[0].classList.add('remove-border'); 
  } 
  else
  {
    document.getElementById('top').classList.remove('add-bg');
    document.getElementsByClassName('nav-bar')[0].classList.remove('remove-border'); 
  
  }

})

//hamburger 
 
  function toggleFullScreen() {
    document.getElementById('mobile-nav').classList.toggle('fullscreen');
    
  }

  document.getElementById('nav-toggler').addEventListener('click' , ()=> {
   
    toggleFullScreen();
    document.getElementById('mobile-nav').classList.contains('fullscreen') ? document.querySelector('#top > .container').style.padding = '0': 0;
   
  })
  


//scroll to functionality

document.querySelectorAll('#menu a , .btn-sign').forEach((elem) => elem.addEventListener('click' , ()=> {
  toggleFullScreen();
  document.getElementById(elem.textContent).scrollIntoView ({
    behavior : "smooth", 
    block : "start",
  });
})
)

document.getElementsByClassName('btn-signup')[0].addEventListener('click' , ()=> {
  document.getElementById('sign-up').scrollIntoView({
    behavior : "smooth",
    block : 'center',
  })
})


//function to change vh to px 
function vhTOpx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  var result = (y*value)/100;

  return result;
}























// function uploadFile(file) {
//   var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//   var xhr = new XMLHttpRequest();
//   var fd = new FormData();
//   xhr.open('POST', url, true);
//   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//   xhr.onreadystatechange = function(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // File uploaded successfully
//       var responseForPost = JSON.parse(xhr.responseText);
//       }
//     }
//   }

//   uploadFile('./css/symbol/svg/sprite.symbol.svg');




  // var express = require("express");
  // const app = express();
  // var fileUpload = require('express-fileupload');
  // app.use(fileupload({
  //   useTempFiles : true
  // }));

  // var cloudinary = require('cloudinary').v2;

  // cloudinary.config({
  //   cloud_name : 'ilaki',
  //   api_key : '239262822959176',
  //   api_secret : 'JRMzaaDtJ58POfJj_pVeYU336zY',
  // })

  // app.get("./css/symbol/svg/sprite.symbol.svg" , function (req , res , next) {
  //   res.status(200).send("hello world");
  // });

  // app.post("/upload", function (req , res , next) {
  //   // const file = req.files.
  // })


