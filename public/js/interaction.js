$(document).ready(function(){
    
    $(".statBtn").click(function(){
        $(".statCard").toggleClass("hidden");
        $(".statCard").toggleClass("flex");
      });

    $(".closeBtn").click(function(e) {
        removePokemon($(this).parent());
        e.preventDefault();
    });

    $(".hideMenuBtn").click(function() {
        $(".menu").toggle();
        $(".hideMenuBtn").css({'transform' : 'rotate(180deg)'});
    });

    $(".deleteInput").click(function() {
      $("#search_input").val("");
  });

  });