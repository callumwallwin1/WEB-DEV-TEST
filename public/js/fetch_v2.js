// Get container for populating list of pokemon
const poke_container = document.getElementById('poke_container');
// Define limit of how many pokemon to get from api
const pokemon_number = 898;

// Initial call to api for base URL, names and IDs
const pokemonFetch = async () => {
    // Set pokemon limit
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemon_number}`;
    // Fetch data and parse as JSON
    const res = await fetch(url);
    const data = await res.json();
    // Create objects for each pokemon
    const pokemon = data.results.map( (result, index) => ({
        name: result.name[0].toUpperCase() + result.name.slice(1),
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        apiURL: result.url
    }));
    // Pass array of object data to DOM modifying function
    displayPokemon(pokemon)
};

// List DOM modifying function
const displayPokemon = (pokemon) => {
    // Iterate through array of objects and create inner html with template literal string
    const pokemonInnerHTML = pokemon.map( pokeman => `
        <div class="pokemon flex items-center bg-white mb-2 px-2 rounded relative ${pokemon.name}">
            <div class="mr-2">
                <span>
                    <img class="h-12" loading="lazy"
                    src="${pokeman.image}">
                </span>
            </div>

            <p class="mr-2 text-gray-600">#${pokeman.id}</p>
            <h3 class="font-semibold text-gray-700">${pokeman.name}</h3>

            <a href="https://bulbapedia.bulbagarden.net/wiki/${pokeman.name}_(Pok%C3%A9mon)" class="absolute right-4">
                <span>
                    <svg width="16" height="16" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 1.88272C5.94316 1.88272 1.4375 6.45689 1.4375 12.0982C1.4375 17.7395 5.94316 22.3137 11.5 22.3137C17.0568 22.3137 21.5625 17.7395 21.5625 12.0982C21.5625 6.45689 17.0568 1.88272 11.5 1.88272ZM11.5 20.5807C6.88652 20.5807 3.14453 16.7818 3.14453 12.0982C3.14453 7.4146 6.88652 3.61571 11.5 3.61571C16.1135 3.61571 19.8555 7.4146 19.8555 12.0982C19.8555 16.7818 16.1135 20.5807 11.5 20.5807Z" fill="#929292"/>
                        <path d="M10.4219 8.085C10.4219 8.37528 10.5355 8.65368 10.7377 8.85894C10.9398 9.0642 11.2141 9.17951 11.5 9.17951C11.7859 9.17951 12.0602 9.0642 12.2623 8.85894C12.4645 8.65368 12.5781 8.37528 12.5781 8.085C12.5781 7.79471 12.4645 7.51632 12.2623 7.31106C12.0602 7.10579 11.7859 6.99048 11.5 6.99048C11.2141 6.99048 10.9398 7.10579 10.7377 7.31106C10.5355 7.51632 10.4219 7.79471 10.4219 8.085ZM12.0391 10.6389H10.9609C10.8621 10.6389 10.7812 10.721 10.7812 10.8213V17.0236C10.7812 17.1239 10.8621 17.206 10.9609 17.206H12.0391C12.1379 17.206 12.2188 17.1239 12.2188 17.0236V10.8213C12.2188 10.721 12.1379 10.6389 12.0391 10.6389Z" fill="#929292"/>
                    </svg>                                    
                </span>
            </a>

            <button class="pkmnBtn absolute right-2" onclick="selectPokemonData(${pokeman.id})" aria-label="Add ${pokeman.name} to your team">
                <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 1C4.15 1 1 4.15 1 8C1 11.85 4.15 15 8 15C11.85 15 15 11.85 15 8C15 4.15 11.85 1 8 1Z" fill="#83BD79"/>
                <path d="M12 7.5H8.5V4H7.5V7.5H4V8.5H7.5V12H8.5V8.5H12V7.5Z" fill="#83BD79"/>
                </svg>
                </span>
            </button>
        </div>
    `).join('')
    // Set inner html of poke_container div to complete object
    poke_container.innerHTML = pokemonInnerHTML;
};

// Get further info on pokemon through onClick event
const selectPokemonData = async (id) => {
    // Make call to api with advanced data url and parse as json
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokeman = await res.json();
    // Pass parsed data to card DOM modifying function
    addPokemonToTeam(pokeman);
};

// Take advanced data from selectPokemonData and use it to modify cards
const addPokemonToTeam = (pokeman) => {
    // Take type array and create comma spaced string
    // const type = pokeman.types;
    const type = pokeman.types.map( (type) => type.type.name).join(` `);
    // Set image as url from data
    const image = pokeman.sprites[`front_default`];
    // Set ID as ID from data
    const id = pokeman.id;
    // Set name as name from data and uppercase the string
    const name = pokeman.name[0].toUpperCase() + pokeman.name.slice(1);
    // console.log(type[0].type.name);
    // Send data to populate stats card
    setStats(pokeman)
    
    // Locate DOM elements of first unpopulated card
    const slot = $(".teamPicker .free").first();
    const figure = slot.find("img");
    const typeCard = slot.find(".typeCard");
    const idTag = slot.find(".pokeInfo p")
    const titleTag = slot.find(".pokeInfo h3")
    
    // Set values of card info sections and remove free class so it won't be populated
    idTag.text(`#${id}`);
    titleTag.text(name);
    figure.attr("src", image);
    // typeCard.addClass(`${type[0].type.name} ${type[0].type.name}-border`);
    typeCard.addClass(type);
    slot.removeClass("free");
    // const htmlString =  

}

// Function for setting stats of selected stat card
const setStats = (pokeman) => {
    // Set stat values from data
    const hp = pokeman.stats[0].base_stat;
    const atk = pokeman.stats[1].base_stat;
    const def = pokeman.stats[2].base_stat;
    const spAtk = pokeman.stats[3].base_stat;
    const spDef = pokeman.stats[4].base_stat;
    const spd = pokeman.stats[5].base_stat;

    // Locate parent element for THIS card
    const slot = $(".teamPicker .free").first();

    // Locate stat text elements
    const hpTag = slot.find(".pokeStats .hpStat");
    const atkTag = slot.find(".pokeStats .atkStat");
    const defTag = slot.find(".pokeStats .defStat");
    const spAtkTag = slot.find(".pokeStats .spAtkStat");
    const spDefTag = slot.find(".pokeStats .spDefStat");
    const spdTag = slot.find(".pokeStats .spdStat");
    
    // Locate stat bar elements
    const hpBar = slot.find(".statCard .hpBar")
    const atkBar = slot.find(".statCard .atkBar")
    const defBar = slot.find(".statCard .defBar")
    const spAtkBar = slot.find(".statCard .spAtkBar")
    const spDefBar = slot.find(".statCard .spDefBar")
    const spdBar = slot.find(".statCard .spdBar")
    
    // Set stat text values
    hpTag.text(`HP: ${hp}`);
    atkTag.text(`ATK: ${atk}`);
    defTag.text(`DEF: ${def}`);
    spAtkTag.text(`SP.ATK: ${spAtk}`);
    spDefTag.text(`SP.DEF: ${spDef}`);
    spdTag.text(`SPD: ${spd}`);

    // Set percentage length of stat bars calculated from function
    hpBar.css("width", `${calcStat(hp)}%`);
    atkBar.css("width", `${calcStat(atk)}%`);
    defBar.css("width", `${calcStat(def)}%`);
    spAtkBar.css("width", `${calcStat(spAtk)}%`);
    spDefBar.css("width", `${calcStat(spDef)}%`);
    spdBar.css("width", `${calcStat(spd)}%`);
}

// Function for calculating percentages of stats
const calcStat = (val) => {
    return val * 0.3922;
}

// Reset THIS card values and info to default and add free class allowing it to be populated again
const removePokemon = ($this) => {
    // Locate elements
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

    // Reset data and values of all card elements
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

    //Add free class to indicate it is ready to populate again
    $this.addClass("free");

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

pokemonFetch();

// Function for searching and filtering pokemon by name
function searchPokemon() {
    // Declare variables
      let input, filter, poke_container, pokemon_items, a, i, txtValue;
      input = document.getElementById('search_input');
      filter = input.value.toUpperCase();
      poke_container = document.getElementById("poke_container");
      pokemon_items = poke_container.querySelectorAll('.pokemon');
    
    // Loop through all pokemon and hide those who don't match the search query
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

