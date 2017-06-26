

// Load the Projects from the JSON file
$(function () {
    $.ajax({
        beforeSend : function (xhr_jquery) {
            if (xhr_jquery.overrideMimeType) {
                xhr_jquery.overrideMimeType("application/json"); //to prevent errors
            }
        }
    });
    
    //function that collects data from json and loads the result to $PROJECTS
	$.getJSON( "json/projects.json")
		.done(function(data){
			$PROJECTS = data;
			loadProjects($PROJECTS)
			loadCategories()
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
		var project_id = project.id

		portfolio_html += `
		<div  class="col-sm-4">
			<a role="button" data-toggle="modal" data-target="#project-modal" href="" onclick="loadModal('${project_id}')">
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

function loadCategories(){
	$CATEGORIES = {
		'All' : [],
		'Web Dev': [],
		'Software' : [],
		'Android' : []
	}
	// for each key of a project, put it in every category it belongs in $CATEGORIES
	$.each(Object.keys($PROJECTS), function(i, val){
		var categories = $PROJECTS[val].categories
		console.log(categories)
		$CATEGORIES['All'].push(val)
		if($.inArray('webdev', categories) >= 0){
			$CATEGORIES['Web Dev'].push(val)
		}
		if($.inArray('software', categories) >= 0){
			$CATEGORIES['Software'].push(val)
		}
		if($.inArray('android', categories) >= 0){
			$CATEGORIES['Android'].push(val)
		}
	})
}

// on click handler for a category button
$('#categories button').on('click', function(){
	var category = $(this).text()
	var projList = $CATEGORIES[category]
	var projects = {}
	// load each project that is in the category into a temp projects dict
	$.each(projList, function(i, val){
		projects[val] = $PROJECTS[val]
	})

	// load them into the view
	loadProjects(projects)
	startLoadAnimation() // from scrpt.js
})


function loadModal(id){
	/* When a project is loaded, the project's details will be loaded on the modal*/
	var project = $PROJECTS[id]
	var heading = project.heading
	var subheading = project.subheading
	var link = project.url
	var screenshot = project.screenshot_url
	var features = project.features
	var categories = project.categories
	var description = project.description
	var git = project.git

	$("#project-heading").text(heading)
	$("#project-subheading").text(subheading)
	$("#project-screenshot").attr('src', screenshot)
	$("#project-desc").text(description)

	// Load features
	var feature_html = ""
	for(i = 0; i < features.length; i++){
		feature_html += `<li>${features[i]}</li>`
	}
	$("#modal-features").html(feature_html)

	// Load categories
	var categories_html = ""
	for(i = 0; i < categories.length; i++){
		categories_html += `<span class="badge">${categories[i]}</span>`
	}
	$("#project-categories").html(categories_html)

	// Check if git is available and then prepend the git button on the modal footer
	var footer_html = `
		<a class="project-link" href="" target="_blank">
			<button class="text-center btn btn-default">View Project</button>
		</a>
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		`
	if(git != null){
		footer_html =`
		<a class="git-link" href="${git}" target="_blank">
			<button class="text-center btn btn-default">Git</button>
		</a>` + footer_html
	}
	$('.modal-footer').html(footer_html)
	$(".project-link").attr('href', link)
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



