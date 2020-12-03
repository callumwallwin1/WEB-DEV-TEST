const poke_container = document.getElementById('poke_container');
const pokemon_number = 800;

const pokemonFetch = () => {
    
    // Initialize array of promises
    const promises = [];
    
    // Loop through pokemon where loop limit is maximum number of pokemon and i is the pokemon's ID
    for (let i = 1; i <= pokemon_number; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        // Call url and push each iteration's data to promises array
        promises.push(fetch(url).then( res => res.json()));
    }

    Promise.all(promises).then( results => {
        const pokemon = results.map( data => ({
            name: data.name[0].toUpperCase() + data.name.slice(1),
            id: data.id,
            image: data.sprites[`front_default`],
            types: data.types.map( type => type.type.name).join(`, `)
        }))
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    
    const pokemonInnerHTML = pokemon.map( pokeman => `
        <div class="pokemon flex items-center bg-white mb-2 px-2 rounded relative ${pokemon.name}">
            <div class="mr-2">
                <span>
                    <img class="h-12" loading="lazy"
                    src="${pokeman.image}">
                </span>
            </div>

            <p class="mr-2">#${pokeman.id}</p>
            <h3 class>${pokeman.name}</h3>

            <button class="pkmnBtn absolute right-2">
                <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1Z" fill="#83BD79"/>
                <path d="M12 7.5H8.5V4H7.5V7.5H4V8.5H7.5V12H8.5V8.5H12V7.5Z" fill="#83BD79"/>
                </svg>
                </span>
            </button>
        </div>
    `).join('')

    poke_container.innerHTML = pokemonInnerHTML;
}

pokemonFetch();