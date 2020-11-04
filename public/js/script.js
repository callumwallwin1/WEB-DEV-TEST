const poke_container = 
document.getElementById('poke_container');
const pokemon_number = 893;

const fetchPokemon = async () => {
    for(let i=1; i<=pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url =
    `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json()
    createPokemonCard(pokemon)
    
}

fetchPokemon()

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon', 'flex', 'items-center', 'bg-white', 'mb-2', 'px-2', 'rounded', 'relative', `${pokemon.name}`);

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokemonInnnerHTML = `
        <div class="mr-2">
            <span>
                <img class="h-12"
                src="${pokemon.sprites.front_default}">
            </span>
        </div>

        <p class="mr-2">#${pokemon.id}</p>
        <h3 class>${name}</h3>

        <button class="absolute right-2">
            <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1Z" fill="#83BD79"/>
            <path d="M12 7.5H8.5V4H7.5V7.5H4V8.5H7.5V12H8.5V8.5H12V7.5Z" fill="#83BD79"/>
            </svg>
            </span>
        </button>    
    `;

    pokemonEl.innerHTML = pokemonInnnerHTML

    poke_container.appendChild(pokemonEl)
}

function searchPokemon() {
    // Declare variables
  var input, filter, poke_container, pokemon_items, a, i, txtValue;
  input = document.getElementById('search_input');
  filter = input.value.toUpperCase();
  poke_container = document.getElementById("poke_container");
  pokemon_items = poke_container.querySelectorAll('.pokemon');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < pokemon_items.length; i++) {
    a = pokemon_items[i].getElementsByTagName("h3")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        pokemon_items[i].style.display = "";
    } else {
        pokemon_items[i].style.display = "none";
    }
  }
}
