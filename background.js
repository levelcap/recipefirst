var recipes = new Array; // Array of clones of recipes found on the page (there could be multiple), or recipe lines/parts

// Massive if-then to find the recipe base on each site's format
if (document.domain.indexOf("thepioneerwoman.com") > -1) {
	$(".post-padding").each(function(index) {
		recipes.push($(this).find(".recipe-box").clone());
	});
} else if (document.domain.indexOf("cookingforengineers.com")  > -1) {
	var recipe = $("#articlebody").find("table");
	var recipeCopy = $(recipe).clone();
	recipes.push(recipeCopy);
} else if (document.domain.indexOf("simplyrecipes.com") > -1) {
	$(".recipe-callout").each(function(index){
		recipes.push($(this).clone());	
	});
} else if (document.domain.indexOf("smittenkitchen.com") > -1) {
	 var found = false;
	 var ended = false;
	 var recipes = [];
	 $(".entry p").each(function(index) {
	   if ($(this).hasClass("postmetadata")) {
		ended = true;
	   }
	   var text = $(this).html();
	   if (found && !ended) {
		recipes.push($(this).clone());	
	   }
	   if (text.indexOf("year ago") > -1) {
		found = true;
	   }
	 });
}
// END FINDING RECIPE

// If we've got the recipe, drop it into a floating div
if (recipes.length > 0) {
	var recipeCard = $("<div id='recipeFirst'></div>").css({"border":"1px solid #CC9933","padding":"1em","box-shadow":"0.5em 0.5em 0.25em #AAAACC","border-radius":"0.3em","background-color":"#FFFFDD"});
	
	// Close button
	var closeButton = $("<a id='recipeFirstClose'>X</button>").css({"float":"right","clear":"both","cursor":"pointer","color":"#CC9933"});
	
	$(closeButton).click(function(){
		$("#recipeFirst").hide();
	});
	
	$(closeButton).appendTo(recipeCard);

   for (var i = 0; i < recipes.length; i++) {
	 $(recipeCard).append(recipes[i]);
   }
	
   $("body").prepend(recipeCard);
 }