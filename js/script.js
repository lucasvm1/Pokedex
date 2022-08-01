const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
    renderPokemon(searchPokemon)
    alert(`O pokémon ${pokemon.toUpperCase()} não existe!`);
  }
};

const renderPokemon = async (pokemon) => {
  pokemonImage.src = ".//images/loading.gif"
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data.id <= 649) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id + " -";
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    searchPokemon = data.id;
  } else {
    renderPokemon(searchPokemon)
    alert(`O pokémon ${pokemon.toUpperCase()} não existe!`);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

renderPokemon(searchPokemon);

const nextPokemon = () => {
  if (searchPokemon >= 649) {
    renderPokemon(1);
  } else {
    renderPokemon(searchPokemon + 1);
  }
};

const prevPokemon = () => {
  if (searchPokemon <= 1) {
    renderPokemon(649)
  } else {
    renderPokemon(searchPokemon - 1);
  }
};
