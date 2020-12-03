const poke_container = document.getElementById('poke_container');
const pokemon_number = 898;

const pokemonFetch = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemon_number}`;
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

    setStats(pokeman)
    
    const slot = $(".teamPicker .free").first();
    const figure = slot.find("img");
    const idTag = slot.find(".pokeInfo p")
    const titleTag = slot.find(".pokeInfo h3")

    
    idTag.text(`#${id}`)
    titleTag.text(name)
    figure.attr("src", image);
    slot.removeClass("free");
    // const htmlString =  

}

const setStats = (pokeman) => {
    const slot = $(".teamPicker .free").first();
    const hp = pokeman.stats[0].base_stat;
    const atk = pokeman.stats[1].base_stat;
    const def = pokeman.stats[2].base_stat;
    const spAtk = pokeman.stats[3].base_stat;
    const spDef = pokeman.stats[4].base_stat;
    const spd = pokeman.stats[5].base_stat;

    const hpTag = slot.find(".pokeStats .hpStat");
    const atkTag = slot.find(".pokeStats .atkStat");
    const defTag = slot.find(".pokeStats .defStat");
    const spAtkTag = slot.find(".pokeStats .spAtkStat");
    const spDefTag = slot.find(".pokeStats .spDefStat");
    const spdTag = slot.find(".pokeStats .spdStat");
    
    const hpBar = slot.find(".statCard .hpBar")
    const atkBar = slot.find(".statCard .atkBar")
    const defBar = slot.find(".statCard .defBar")
    const spAtkBar = slot.find(".statCard .spAtkBar")
    const spDefBar = slot.find(".statCard .spDefBar")
    const spdBar = slot.find(".statCard .spdBar")
    
    hpTag.text(`HP: ${hp}`);
    atkTag.text(`ATK: ${atk}`);
    defTag.text(`DEF: ${def}`);
    spAtkTag.text(`SP.ATK: ${spAtk}`);
    spDefTag.text(`SP.DEF: ${spDef}`);
    spdTag.text(`SPD: ${spd}`);

    hpBar.css("width", `${calcStat(hp)}%`);
    atkBar.css("width", `${calcStat(atk)}%`);
    defBar.css("width", `${calcStat(def)}%`);
    spAtkBar.css("width", `${calcStat(spAtk)}%`);
    spDefBar.css("width", `${calcStat(spDef)}%`);
    spdBar.css("width", `${calcStat(spd)}%`);
}

const calcStat = (val) => {
    return val * 0.3922;
}

const removePokemon = ($this) => {

    const figure = $this.find("img");
    const idTag = $this.find(".pokeInfo p")
    const titleTag = $this.find(".pokeInfo h3")

    const hpBar = $this.find(".statCard .hpBar")
    const atkBar = $this.find(".statCard .atkBar")
    const defBar = $this.find(".statCard .defBar")
    const spAtkBar = $this.find(".statCard .spAtkBar")
    const spDefBar = $this.find(".statCard .spDefBar")
    const spdBar = $this.find(".statCard .spdBar")
   
    const hpTag = $this.find(".pokeStats .hpStat");
    const atkTag = $this.find(".pokeStats .atkStat");
    const defTag = $this.find(".pokeStats .defStat");
    const spAtkTag = $this.find(".pokeStats .spAtkStat");
    const spDefTag = $this.find(".pokeStats .spDefStat");
    const spdTag = $this.find(".pokeStats .spdStat");

    $this.addClass("free");
    figure.attr("src", "img/unown.png");
    idTag.text(`#??`);
    titleTag.text(`??????`)
    
    hpTag.text(`HP:`);
    atkTag.text(`ATK:`);
    defTag.text(`DEF:`);
    spAtkTag.text(`SP.ATK:`);
    spDefTag.text(`SP.DEF:`);
    spdTag.text(`SPD:`);

    hpBar.css("width", "0");
    atkBar.css("width", "0");
    defBar.css("width", "0");
    spAtkBar.css("width", "0");
    spDefBar.css("width", "0");
    spdBar.css("width", "0");

    slot.removeClass("free");
    // var $div = $this.find(".info");
    // $figure.find(".art").attr("class", "art");
    // $figure.attr("title", "");
    // $figure.attr("class", "unknown");
    // $div.attr("class", "info unknown");
    // $div.find(".name").text("???");
    // $div.find(".type").attr("class", "type unknown");
    // // send empty slot to last place
    // $("ul.picked").append($this);

}

const resetStats = () => {

}

pokemonFetch();

function searchPokemon() {
    // Declare variables
      let input, filter, poke_container, pokemon_items, a, i, txtValue;
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

