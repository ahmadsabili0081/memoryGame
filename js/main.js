let apps = document.querySelector('.apps');
let container = document.querySelector('.container')
let livesCount = document.querySelector('span');
let playerLives = 6;
let alert = document.querySelector('.alert');


// link text
livesCount.innerText = playerLives;

// mendapatkan images;
let getImages = () => [
  {imgSrc : '../images/angular.png', name: 'angular' },
  {imgSrc : '../images/css.png', name:'css' },
  {imgSrc : '../images/html.png', name:'html' },
  {imgSrc : '../images/jquery.png', name: 'jquery' },
  {imgSrc : '../images/js.png', name:'javascript' },
  {imgSrc : '../images/node.png', name: 'node'},
  {imgSrc : '../images/react.png', name: 'react'},
  {imgSrc : '../images/vue.png', name: 'vue'},
  {imgSrc : '../images/angular.png', name: 'angular' },
  {imgSrc : '../images/css.png', name:'css' },
  {imgSrc : '../images/html.png', name:'html' },
  {imgSrc : '../images/jquery.png', name: 'jquery' },
  {imgSrc : '../images/js.png', name:'javascript' },
  {imgSrc : '../images/node.png', name: 'node'},
  {imgSrc : '../images/react.png', name: 'react'},
  {imgSrc : '../images/vue.png', name: 'vue'}
];
// randomImage
let randomImage = () => {
  let cardData = getImages();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
} 
// get the card import to html
let generatorCard = () => {
  let cardData = randomImage();
  cardData.forEach((item) => {
    // generate to html
    let card = document.createElement('div');
    let face = document.createElement('img')
    let back = document.createElement('div');
    card.className = "card";
    face.className = "face";
    back.className = "back";
    face.src = item.imgSrc;
    card.setAttribute('name', item.name)
    apps.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCard(e);
    })
  });
} 

// check card
function checkCard(e){
  let check = e.target;
  check.classList.add('balikKartu');
  let flipedCards = document.querySelectorAll('.balikKartu')
  let toggleCard = document.querySelectorAll('.toggleCard');
  if(flipedCards.length === 2){
    if(flipedCards[0].getAttribute("name") === flipedCards[1].getAttribute("name")){
      console.log('hello Worlds');
      flipedCards.forEach((item) => {
        item.classList.remove('balikKartu');
        item.style.pointerEvents ="none";
      });
    }else{
      console.log('Ini salah')
      flipedCards.forEach((item) => {
        item.classList.remove('balikKartu');
        setTimeout(() => item.classList.remove('toggleCard'), 500 )
      });
      playerLives--;
      livesCount.innerText = playerLives;
      if(playerLives === 0){
        alert.classList.add('Alert');
        alert.innerText = "Kamu Kalah :(";
        setTimeout(() => {
          alert.classList.remove('Alert')
          alert.innerText = "";
        }, 1500);
        restart()
      }
    }
  }
  if(toggleCard.length === 16){
    alert.classList.add('AlertWin');
    alert.innerText = "Kamu Menang Sayang :)";
    setTimeout(() => {
      alert.classList.remove('AlertWin')
      alert.innerText = "";
    }, 1500);
      restart();
    }
}
function restart(){
  cardData = randomImage();
  let face = document.querySelectorAll('.face');
  let card = document.querySelectorAll('.card');
  apps.style.pointerEvents = "all";
  cardData.forEach((item, index) => {
    card[index].classList.remove('toggleCard');
    // reset ulang card
    setTimeout(() =>{
      card[index].style.pointerEvents = 'all';
      face[index].src = item.imgSrc;
      card[index].setAttribute('name', item.name);
    },1000)
  });
  playerLives = 6;
  livesCount.innerText = playerLives;
}
generatorCard()

let media = matchMedia('(max-width : 360px)');
media.addListener(handleMedia)
function handleMedia(e){
  if(e.matches){
    container.classList.toggle('blockContainer');
  }else{
    container.classList.remove('blockContainer')
  }
}