const poke_container = document.getElementById('poke_container');
const pokemon_number = 800;

const pokemonFetch = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=800`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map( (result, index) => ({
        name: result.name[0].toUpperCase() + result.name.slice(1),
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        apiURL: result.url
    }));
    displayPokemon(pokemon)
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

            <button class="pkmnBtn absolute right-2" onclick="selectPokemonData(${pokeman.id})">
                <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1Z" fill="#83BD79"/>
                <path d="M12 7.5H8.5V4H7.5V7.5H4V8.5H7.5V12H8.5V8.5H12V7.5Z" fill="#83BD79"/>
                </svg>
                </span>
            </button>
        </div>
    `).join('')

    poke_container.innerHTML = pokemonInnerHTML;
};

const selectPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    
    addPokemonToTeam(pokeman);
};

const addPokemonToTeam = (pokeman) => {
    const type = pokeman.types.map( (type) => type.type.name).join(`, `);
    const image = pokeman.sprites[`front_default`];
    const id = pokeman.id;
    const name = pokeman.name[0].toUpperCase() + pokeman.name.slice(1);
    const hp = pokeman.stats[0].base_stat;
    const atk = pokeman.stats[1].base_stat;
    const def = pokeman.stats[2].base_stat;
    const spAtk = pokeman.stats[3].base_stat;
    const spDef = pokeman.stats[4].base_stat;
    const spd = pokeman.stats[5].base_stat;
    console.log(hp);
    
    const slot = $(".teamPicker .free").first();
    const figure = slot.find("img");
    const idTag = slot.find(".pokeInfo p")
    const titleTag = slot.find(".pokeInfo h3")
    const hpTag = slot.find(".pokeStats .hpStat");
    const atkTag = slot.find(".pokeStats .atkStat");
    const defTag = slot.find(".pokeStats .defStat");
    const spAtkTag = slot.find(".pokeStats .spAtkStat");
    const spDefTag = slot.find(".pokeStats .spDefStat");
    const spdTag = slot.find(".pokeStats .spdStat");

    
    idTag.text(`#${id}`)
    titleTag.text(name)
    figure.attr("src", image);
    hpTag.text(`HP: ${hp}`);
    atkTag.text(`ATK: ${atk}`);
    defTag.text(`ATK: ${def}`);
    spAtkTag.text(`ATK: ${spAtk}`);
    spDefTag.text(`ATK: ${spDef}`);
    spdTag.text(`ATK: ${spd}`);
    slot.removeClass("free");
    // const htmlString =  
}

pokemonFetch();