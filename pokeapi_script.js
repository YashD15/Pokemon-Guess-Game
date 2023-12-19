var name;
var image;
var types;
var region;
var moves;
var score = 0;
//Number of rounds per game
//BUG OR FLAW = if we set rounds=3 in console then rounds will start as 3
//Also score will count from all 3 rounds
var rounds=1;

function start(){
  if(rounds!=0){
    startgame();
  }
  else{
    document.getElementById("game").style.display = "none";
    document.getElementById("pokemon-details").style.display = "none";
    setTimeout(alert("Your Final Score is " + score), 1000);
    document.getElementById("navigate").style.display = "block";
    score = 0;
    
    //Number of rounds per game
    rounds = 1;
  }
}

function startgame() {
  //Random number from 1 to 809 by which pokemon will be fetch as ID
  var randomId = Math.floor(Math.random() * 809) + 1;
  var pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  //Info fetch using PokeAPI of above ID 
  fetch(pokemonUrl)
    .then((response) => response.json())
    .then((data) => {
      //store details in following variables
      name = data.name;
      image = data.sprites.front_default;
      types = data.types.map((type) => type.type.name);
      moves = data.moves.map((move) => move.move.name);

      var speciesUrl = data.species.url;
      fetch(speciesUrl)
        .then((response) => response.json())
        .then((speciesData) => {
          region = speciesData.generation.name;
          displayPokemonDetails(name, image, types, region);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

  //Remove Navigate
  document.getElementById("navigate").style.display="none";
  //Display guessing form
  document.getElementById("name").style.backgroundColor="white";
  document.getElementById("name").value="";
  document.getElementById("type1").style.backgroundColor = "white";
  document.getElementById("type1").selectedIndex=0;
  document.getElementById("type2").style.backgroundColor = "white";
  document.getElementById("type2").selectedIndex=0;
  document.getElementById("region").style.backgroundColor = "white";
  document.getElementById("region").selectedIndex=0;
  document.getElementById("move1").style.backgroundColor = "white";
  document.getElementById("move1").value = "";
  document.getElementById("move2").style.backgroundColor = "white";
  document.getElementById("move2").value = "";
  document.getElementById("score").style.display = "none";
  document.getElementById("score").innerHTML="";
  document.getElementById("pokemon-image").style.display = "none";

  document.getElementById("game").style.display = "block";

  //Rounds info display
  if(rounds==1){
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML="Last Round";
  }else{
    document.getElementById("score").style.display = "block";
    document.getElementById("score").innerHTML=`Rounds Left: ${rounds - 1}`;
  }
}

function display() {
  //Get data from form and store in variable
  var pokename = document.getElementById("name").value.toLowerCase();
  var poketype1 = document.getElementById("type1").value;
  var poketype2 = document.getElementById("type2").value;
  var pokeregion = document.getElementById("region").value;

  //Moves accepting + Replacing blank spaces to hypen(required to match)
  var move1 = document.getElementById("move1").value.toLowerCase().replace(/ /g, "-");
  var move2 = document.getElementById("move2").value.toLowerCase().replace(/ /g, "-");

  //Check if pokemon is single type or not
  if (types[1] == null) {
    types[1] = "none";
  }

  //Validate pokemon name
  if (pokename == name) {
    document.getElementById("name").style.backgroundColor="green";
    score += 2;
  } else {
    document.getElementById("name").style.backgroundColor="red";
  }

  //Validate pokemon types
  if ((poketype1 == types[0] && poketype2 == types[1]) || (poketype1 == types[1] && poketype2 == types[0])) {
    document.getElementById("type1").style.backgroundColor = "green";
    document.getElementById("type2").style.backgroundColor = "green";
    score += 2;
  } else if (poketype1 == types[0] || poketype1 == types[1]){
    document.getElementById("type1").style.backgroundColor = "green";
    document.getElementById("type2").style.backgroundColor = "red";
    score += 1;
  } else if (poketype2 == types[0] || poketype2 == types[1]){
    document.getElementById("type2").style.backgroundColor = "green";
    document.getElementById("type1").style.backgroundColor = "red";
    score += 1;
  } else {
    document.getElementById("type1").style.backgroundColor = "red";
    document.getElementById("type2").style.backgroundColor = "red";
  }

  //Validate region
  if (pokeregion == region) {
    document.getElementById("region").style.backgroundColor = "green";
    score += 1;
  } else {
    document.getElementById("region").style.backgroundColor = "red";
  }

  //Validate moves
  if(moves.includes(move1)){
    document.getElementById("move1").style.backgroundColor = "green";
    score += 1;
  }else{
    document.getElementById("move1").style.backgroundColor = "red";
  }
  if(moves.includes(move2)){
    document.getElementById("move2").style.backgroundColor = "green";
    score += 1;
  }else{
    document.getElementById("move2").style.backgroundColor = "red";
  }

  //Start new round
  rounds -= 1;
  setTimeout(start,2000);
}

//TESTING PURPOSE ONLY
//Set details of pokemon
function displayPokemonDetails(name, image, types, region) {
  document.getElementById("pokemon-name").textContent = name;
  // Must line to display image of Pokemon in each Game
  document.getElementById("pokemon-image").style.display = "block";
  document.getElementById("pokemon-image").src = image;
  document.getElementById("pokemon-type1").textContent = `Type 1: ${types[0]}`;
  document.getElementById("pokemon-type2").textContent = `Type 2: ${ types[1] || "None"}`;
  document.getElementById("pokemon-region").textContent = `Region: ${region}`;
  document.getElementById("all-moves").textContent = `Moves: ${moves}`;
  // Make this block to see details
  document.getElementById("pokemon-details").style.display = "none";
}
