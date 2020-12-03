$(document).ready(function(){
    
    $(".statBtn").click(function(){
        $(".statCard").toggleClass("hidden");
        $(".statCard").toggleClass("flex");
      });

    $(".closeBtn").click(function(e) {
        removePokemon($(this).parent());
        e.preventDefault();
    });

  });