//
const section = document.querySelector("section");
const playerLivesCounter = document.querySelector("span");
let playerMoves = 8;

//Link moves
playerLivesCounter.textContent = playerMoves;

// Imatges
const getImages = () => [
  { imgSrc: "./images/apple.png", name: "apple" },
  { imgSrc: "./images/corn.png", name: "corn" },
  { imgSrc: "./images/donut.png", name: "donut" },
  { imgSrc: "./images/nigiri.png", name: "nigiri" },
  { imgSrc: "./images/pig.png", name: "pig" },
  { imgSrc: "./images/pineapple.png", name: "pineapple" },
  { imgSrc: "./images/sun.png", name: "sun" },
  { imgSrc: "./images/uramaki.png", name: "uramaki" },
  { imgSrc: "./images/apple.png", name: "apple" },
  { imgSrc: "./images/corn.png", name: "corn" },
  { imgSrc: "./images/donut.png", name: "donut" },
  { imgSrc: "./images/nigiri.png", name: "nigiri" },
  { imgSrc: "./images/pig.png", name: "pig" },
  { imgSrc: "./images/pineapple.png", name: "pineapple" },
  { imgSrc: "./images/sun.png", name: "sun" },
  { imgSrc: "./images/uramaki.png", name: "uramaki" },
];

//Random
const getRandom = () => {
  const imageData = getImages(); 
  imageData.sort(() => Math.random() - 0.5);
  return imageData;
};

//Card generaton function
const cardGenerator = () => {
  const imageData = getRandom();
 
  //HTML
  imageData.forEach(item => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute('name', item.name)

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check the match
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard')
  
  //Logic
  if (flippedCards.length === 2) {
      if (
          flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')
      ){ console.log("It's a match!")
      flippedCards.forEach((card) => {
          card.classList.remove('flipped');
          card.style.pointerEvents = 'none'
      })
      } else {
          console.log("You're wrong!")
          flippedCards.forEach((card) => {
            card.classList.remove('flipped');
            setTimeout(() => card.classList.remove('toggleCard'), 1000);
          })
          playerMoves--;
          playerLivesCounter.textContent = playerMoves;
          if (playerMoves === 0) {
              restart("Try again!")
          }
      }
  }
  //Check if we won the game
  if(toggleCard === 16){
      restart('You won!!')
  }
};

//Restart the game
const restart = () => {
    let imageData = getRandom();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = 'none'
    imageData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard")

        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all'
            faces[index].src = item.imgSrc
            cards[index].setAttribute('name', item)
            section.style.pointerEvents = 'all'  
        }, 1000);
       
    })
    playerMoves = 8;
    playerLivesCounter.textContent = playerMoves
    setTimeout(() => window.alert('Loser!!'), 1000);
}
cardGenerator();
