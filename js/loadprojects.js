

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
	$PROJECT_PREVIEW_LIMIT = 9
	var portfolio_html = ""
	$.each(Object.keys(projects), function(i, val){
		// if(i > $PROJECT_PREVIEW_LIMIT){
		// 	break
		// }

		var project = projects[val]
		var heading = project.heading
		var subheading = project.subheading
		var link = project.url
		var logo = project.logo
		var screenshot = project.screenshot
		var desc = project.short_desc
		var features = project.features
		var categories = project.categories

		portfolio_html += `
		<div class="col-sm-4">
			<a role="button" data-toggle="modal" data-target="#project-modal" href="">
			<div class="portfolio-container">
				<div>
					<img src="${logo}" style="width:100%" alt="Image">
				</div>
				<div class="project-overlay">
					<h3>${heading}</h3><br>
					<p class="text-muted">${desc}</p>
				</div>
			</div>
			</a>
		</div>`
	});
	// load the html into the portfolio section
	$('#portfolio-row').html(portfolio_html)

}


$('#portfolio-row .col-sm-4 a').on('click', function(){
	console.log("clicked to open modal")
});


function loadModal(project){
	var project = projects[val]
	var heading = project.heading
	var subheading = project.subheading
	var link = project.url
	var logo = project.logo
	var screenshot = project.screenshot
	var desc = project.short_desc
	var features = project.features
	var categories = project.categories
}


// This function implements the string format function
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}



