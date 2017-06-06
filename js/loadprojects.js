

// Load the Projects into the portfolio section and create a modal for each one

// If a tile is clicked on, load the appropriate values

$(function () {
    $.ajax({
        beforeSend : function (xhr_jquery) {
            if (xhr_jquery.overrideMimeType) {
                xhr_jquery.overrideMimeType("application/json"); //to prevent errors
            }
        }
    });
    
    //function that collects data from json
	$.getJSON( "json/projects.json")
		.done(function(data){
			$PROJECTS = data;
			console.log($PROJECTS)
			loadProjects($PROJECTS)
		})
		.fail(function(data){
			console.log("Can't load JSON")
	});
});

function loadProjects(projects){
	var portfolio_html = ""
	$.each(Object.keys(projects), function(i, val){
		console.log(projects[val])
	});
	// $('#portfolio-row').html()
}



