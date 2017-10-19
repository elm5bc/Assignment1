// Calling methods with javascript libraries
// 
// Mapbox GL JS 	mapboxgl.METHOD
// Leaflet 			L.METHOD
// jQuery			jQuery.METHOD  or $('selector').METHOD
// d3				d3.METHOD


// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtNWJjIiwiYSI6ImNqNzB1OXFjZTAwam8zMW81b2hueGxhaXQifQ.pM2PCsAfsqXqlvm9jrql3Q';  // replace with your own access token

// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
	minZoom: 4,
	maxZoom: 17,
	style: 'mapbox://styles/elm5bc/cj8xtuzepciuc2rmiusvpnooq' 
});

// PARKS - INFO WINDOW CHANGES ON HOVER
// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads
	
	// the categories we created from the cville-parks map layer
	var layers = [
		'TREME - LAFITTE', 
		'FRENCH QUARTER', 
	];
	
	// the colors we chose to style the parks on the map for each category
	var colors = [
		'#4e6270', 
		'#c9e392', 
	];


	// replace contents of info window when user hovers on a state
	map.on('mousemove', function(e) {	// event listener to do some code when the mouse moves

	  var neighborhoods = map.queryRenderedFeatures(e.point, {
	    layers: ['neighborhoods-i-10-9hxxs6']	// replace 'cville-parks' with the name of your layer, if using a different layer
	  });

	  if (neighborhoods.length > 0) {	// if statement to make sure the following code is only added to the info window if the mouse moves over a state
	    document.getElementById('info-window-body').innerHTML = '<h3><strong>' + neighborhoods[0].properties.GNOCDC_LAB + '</strong></h3><p>' + neighborhoods[0].properties.Des + '</strong></h3><p>' + neighborhoods[0].properties.Des2 + '</strong></h3><p>' + neighborhoods[0].properties.Des2 + '"</p>';
	    document.getElementById('info-window-image').innerHTML = '<div class="info-window-img" style="background: url(\'img/' + neighborhoods[0].properties.Filename + '\');"></div>';
	  } else {
	    document.getElementById('info-window-image').innerHTML = '<div class="info-window-img" style="background: url(\'img/1.jpg\');"></div>';
	  }
	
	});



// --------------------------------------------------------------------
	// Interstate Highway - POPUPS
	// code to add popups
    // event listener for clicks on map
    map.on('click', function(e) {
      var stops = map.queryRenderedFeatures(e.point, {
        layers: ['interstate-highway-point-a-57yh09'] // replace this with the name of the layer
      });

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!stops.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var stop = stops[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

      // Set the popup location based on each feature
      popup.setLngLat(stop.geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h2>Route: ' + stop.properties.Route  // 'stop_id' field of the dataset will become the title of the popup
                           + '</h2><h3>Length: ' + stop.properties.Length // 'stop_name' field of the dataset will become the body of the popup
                           + '</h><h3>Construction Began: ' + stop.properties.Begun // 'stop_name' field of the dataset will become the body of the popup
                           + '</h3><h3>Construction Completed: ' + stop.properties.Completed // 'stop_name' field of the dataset will become the body of the popup
                           + '</h3> <div class="popup-img" style="background: url(\'img/' + stop.properties.Filename + '\');"></div>');   // Erica, the "\'" in this line is called an escape character. For this code to work, it had to have single quotes, and just a regular single quote broke the string. So you use the "\" character before the "'" to output a regular single quotation without ending the string. 

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

});


// Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});


