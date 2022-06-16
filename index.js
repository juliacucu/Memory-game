// 1. Seleccionem la secció: Menu principal
const menuSection = document.querySelector("#memory-menu");

// 2. Seleccionem la secció: Memory Board
const memoryBoard = document.querySelector("#memory-board");

//3. Seleccionem la secció: Game Over
const gameOverSection = document.querySelector('#memory-game-over')

const selectGame = () => {
  // 1 Ocultar la secció del menú
  menuSection.style.display = "none";
  // 2 Generar el joc
  cardGenerator();
};

//2.

// Select section memory board game
const section = document.querySelector("#memory-board-game");
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
  imageData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

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
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      //Quan acertes
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      //Quan es falla
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerMoves--;
      playerLivesCounter.textContent = playerMoves;
      if (playerMoves === 0) {
        // Quan l'usuari perd, li mostrem la pàgina de GAME OVER
        memoryBoard.style.display='none';
      }
    }
  }
  //Check if we won the game
  if (toggleCard.length === 16) {
    // Quan l'usuari guanya, li mostrem la pàgina de YOU WON!
    setTimeout(() => {
      memoryBoard.style.display='none';
      gameOverSection.style.display='none'; 
    }, 2000);
  }
};

//Restart the game
const restart = () => {
  let imageData = getRandom();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  imageData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerMoves = 8;
  playerLivesCounter.textContent = playerMoves;
  setTimeout(() => window.alert("Loser!!"), 3000);
};

