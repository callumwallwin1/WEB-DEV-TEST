$(document).ready(function(){
    
  $(".statBtn").click(function(){
    $(this).parent().siblings().find(".statCard").toggleClass("hidden flex");
    $(this).children().find("svg").toggleClass("statOn statOff");
    
    // Option to hide and show ALL stat cards
    // $(".statCard").toggleClass("hidden flex");
  });

  $(".closeBtn").click(function(e) {
    removePokemon($(this).parent());
    e.preventDefault();
  });

  $(".hideMenuBtn").click(function() {
    $(".menu").toggle();
    $(".hideMenuBtn").toggleClass("r-180");
  });

  // Removed as functionality wasn't acting as intended. Not succesfully resetting search items
  // $(".deleteInput").click(function() {
  //   $("#search_input").val("");
  // });

  });

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