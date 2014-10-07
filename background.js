var recipes = new Array; // Array of clones of recipes found on the page (there could be multiple), or recipe lines/parts
var titleCopy = ""; // Title, if needed

// Massive if-then to find the recipe base on each site's format
if (document.domain.indexOf("thepioneerwoman.com") > -1) {
	$(".post-padding").each(function(index) {
		recipes.push($(this).find(".recipe-box").clone());
	});
} else if (document.domain.indexOf("cookingforengineers.com")  > -1) {
	titleCopy = $("h1.title:first").text();
	var recipe = $("#articlebody").find("table");
	var recipeCopy = $(recipe).clone();
	recipes.push(recipeCopy);
} else if (document.domain.indexOf("simplyrecipes.com") > -1) {
	$(".recipe-callout").each(function(index){
		recipes.push($(this).clone().removeClass("recipe-callout"));	
	});
} else if (document.domain.indexOf("smittenkitchen.com") > -1) {
	 var found = false;
	 var ended = false;
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
} else if(document.domain.indexOf("orangette.blogspot.com") > -1) {
	var start = false;
	
	$(".post-body br").each(function(index){
		var afterBr = $(this).get(0).nextSibling.nodeValue;
		if(afterBr == null) var recipeNode = $("<br>");
		else var recipeNode = $("<p>"+afterBr+"</p>");
		
		if(start){
			recipes.push(recipeNode);
		}
		
		if($(this).next().is("b")){
			start = true;
			titleCopy = $(this).next().html();
		}
	});
} else if (document.domain.indexOf("eatliverun.com") > -1) {
    $("a").each(function () {
        if ($(this).text().indexOf("Print") > - 1) {
            var url = $(this).attr("href");
            $.ajax({
                url: url,
                data: "",
                async: false,
                success: function (data) {
                    var pageNode = $(data);
                    var sites = $(pageNode).find("#sites-canvas");
                    recipes.push(sites);
                }
            });
        }
    });
}


// END FINDING RECIPE

// If we've got the recipe, drop it into a floating div
if (recipes.length > 0) {
    console.log(recipes);
	var recipeCard = $("<div id='recipeFirst'></div>").css({"border":"1px solid #CC9933","padding":"1em","box-shadow":"0.5em 0.5em 0.25em #AAAACC","border-radius":"0.3em","background-color":"#FFFFDD"});
	
	// Close button
	var closeButton = $("<a id='recipeFirstClose'>X</button>").css({"float":"right","clear":"both","cursor":"pointer","color":"#CC9933"});
	
	$(closeButton).click(function(){
		$("#recipeFirst").hide();
	});
	
	$(closeButton).appendTo(recipeCard);

	if(titleCopy != ""){
		var newh1 = $("<h2>"+titleCopy+"</h2>");
		$(recipeCard).append(newh1);
	}

   for (var i = 0; i < recipes.length; i++) {
   		simplestyle(recipes[i]);
		$(recipeCard).append(recipes[i]);
   }
	
   $("body").prepend(recipeCard);
}
 
function simplestyle(html){
 	$(html).css({"font-face":"Helvetica","color":"#000000","font-weight":"medium","text-align":"left"});
 	$(html).find("table").css({"border":"1px solid #333"});
 	$(html).find("td").css({"border":"1px solid #999"});
 	$(html).find("h2").css({"font-weight":"bold","text-align":"left","font-size":"1.5em"});
}