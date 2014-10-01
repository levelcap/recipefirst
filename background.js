if (document.domain.indexOf("thepioneerwoman.com") > -1) {
$(".post-padding").each(function(index) {
    var recipe = $(this).find(".recipe-box");
    $(this).prepend(recipe);    
});
} else if (document.domain.indexOf("smittenkitchen.com") > -1) {
 var found = false;
 var ended = false;
 var recipeCompiled = [];
 $(".entry p").each(function(index) {
   if ($(this).hasClass("postmetadata")) {
	ended = true;
   }
   var text = $(this).html();
   if (found && !ended) {
	recipeCompiled.push(this);	
   }
   if (text.indexOf("year ago") > -1) {
	found = true;
   }
 });
 
 if (recipeCompiled.length > 0) { 
   $(".entry").prepend("<div id='recipeFirst' style='border:1px solid black;padding:10px'></div>");
   for (var i = 0; i < recipeCompiled.length; i++) {
     $("#recipeFirst").append(recipeCompiled[i]);
   }
 }
} else if (document.domain.indexOf("cookingforengineers.com")  > -1) {
   var recipe = $("#articlebody").find("table");    
   console.log(recipe);
   $("#articlebody").prepend(recipe);
}
