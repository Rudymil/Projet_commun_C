var drawControl = null;
var editableLayers = null;

var infosc = new Array();
var infosp = new Array();
var infosb = new Array();
/**
 * Get the current date in yyyy/mm/dd format
 * @return {date} today [yyyy/mm/dd]
 */

function datem() {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '/' + mm + '/' + dd;
    return today;

}
/**
 * [hmtlca description] builds dynamique html popup content for layers
 * we use a global variable types_warning_zones to define warning types
 * @return {html} html text
 */

function hmtlcw() {
    var nw = types_warning_zones.length;
    var debutw = "<div class='form-group'>\
			<label for='text'>Type :</label>\
			<select class='form-control' id='level'>\
				<option value=null disabled selected>Select the warning zone</option>";
    var finw = "</select>\
			</div>\
			<div class='form-group'>\
  				<label for='usr'>Description:</label>\
  				<input type='text' class='form-control' id='description' placeholder='Description' required >\
				</div>\
				<div class='form-group'>\
				<label for='usr'>Expiration date: </label> <br>\
				<input type='date' name='dateex' id='datee' placeholder='2008-08-29' >\
				</div>\
				<script>\
				$(function() {\
					if ( $('#ui-datepicker-div').length ) {\
						$('#ui-datepicker-div').remove();\
					}\
					$( '#datee' ).datepicker({inline: true,\
					showOtherMonths: true,\
					dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],\
					dateFormat: 'yy-mm-dd'});\
					});\
				</script>";

    for (var i = 0; i < nw; i++) {

        debutw = debutw + "<option value=" + types_warning_zones[i].id + " >" + types_warning_zones[i].name + "</option>";
    }

    var htmlw = debutw + finw;

    return htmlw;
}
editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);
/**
 * event listener on radio button, we have two case 
 * -Navigate is checked, we remove all toolbars
 * -Circle1 is checked, we add toolbar to draw circle and also a tool to edit and remove the circle
 * -Box1 is checked,  we add toolbar to draw box and also a tool to edit and remove the box
 * -Polygon1 is checked,  we add toolbar to draw polygon and also a tool to edit and remove the polygon
 */

$(".radio_button").change(function() { // choix de dessin
	
	
	clearZoneInfo("#anomaly_zone_info");
    clearZoneInfo("#warning_zone_info");
    $(".leaflet-routing-geocoders").show();

    //console.log("kqsdqsdqs");
    if ($("#warning").is(":checked") == false) {
        if (typeof drawControlw !== 'undefined') {
            map.removeControl(drawControlw);
        }
    }
    if ($("#anomaly").is(":checked") == false) {
        if (typeof drawControla !== 'undefined') {
            map.removeControl(drawControla);
        }
    }


    if ($("#Navigate").is(":checked")) {
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "visible");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markeraDestination != null && markeraDestination != null ){
        markerDeparture.dragging.enable();
        markeraDestination.dragging.enable();	
        }*/
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
    } else if ($("#Circle1").is(":checked") == true) {
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }	
        */
        if (drawControl != null) {

            map.removeControl(drawControl);
        }
        // Initialise the FeatureGroup to store editable layers



        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                circle: {
                    shapeOptions: {
                        color: '#e10000'
                    },
                },
                // disable toolbar item by setting it to false
                polyline: false,
                polygon: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
            },
            edit: {
                featureGroup: editableLayers,
                edit: true,
                remove: true
            }
        };

        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);

    } else if ($("#Box1").is(":checked") == true) {
        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*
        if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }	
        */
        //editableLayers = new L.FeatureGroup();
        //map.addLayer(editableLayers);

        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                rectangle: {
                    shapeOptions: {
                        color: '#e10000'
                    }
                },
                // disable toolbar item by setting it to false
                polyline: false,
                circle: false, // Turns off this drawing tool
                polygon: false,
                marker: false,
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                edit: true,
                remove: true
            }
        };
        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);
    } else if ($("#Polygon1").is(":checked") == true) {

        if (drawControl != null) {
            map.removeControl(drawControl);
        }
        $(".leaflet-routing-container.leaflet-bar.leaflet-control").css("visibility", "hidden");
        //$("#dep").prop('disabled', true);
        //$("#dest").prop('disabled', true);
        /*if( markerDeparture != null ) {	
        markerDeparture.dragging.disable();	
        }
        if( markeraDestination != null ) {
        markeraDestination.dragging.disable();
        }*/
        // Initialise the FeatureGroup to store editable layers

        //editableLayers = new L.FeatureGroup();
        //map.addLayer(editableLayers);

        var drawPluginOptions = {
            position: 'topleft',
            draw: {
                polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#e1e100', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#e10000'
                    }
                },
                // disable toolbar item by setting it to false
                polyline: false,
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                edit: true,
                remove: true
            }
        };
        drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);
    }

    // Initialise the draw control and pass it the FeatureGroup of editable layers

    //editableLayers = new L.FeatureGroup();
    //map.addLayer(editableLayers);






});
/**
 * event listener when we create a geometric form.
 * When event is fired, we fill a form to have informations about the warning,
 * afler we bind a popup with the informations of the form
 */

/**
 * event listener when we create a geometric form.
 * When event is fired, we fill a form to have informations about the warning,
 * afler we bind a popup with the informations of the form
 */

map.on('draw:created', function(e) {
    var type = e.layerType;
    ////console.log(type);

    var layer = e.layer;
    //console.log(layer);

    var content = null;


    if (type == "circle" && $("#Circle1").is(":checked") == true) {

        //var description = prompt("Please enter the description of the danger", "Description");


        var des = null;
        var lev = null;

        bootbox.confirm(hmtlcw(), function(result) {
            if (result) {
                //console.log("inside");
                des = $('#description').val();
                lev = $('#level').val();
                da = $('#datee').val();

                if (lev == null) {
                    return false;
                }

                console.log(da);
                if (des == "") {
                    return false;
                }

                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;

                }

                //console.log(des);
                content = getPopupContentw(layer, lev, des, da);
                var temp = [des, lev, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                    //layer.setPopupContent(content);
                }

                infosc.push(temp);

                //circle.push(layergeo);

                //console.log(circle);




            } else {
                editableLayers.removeLayer(layer);
            }
        });


        editableLayers.addLayer(layer);



    } else if (type == "rectangle" && $("#Box1").is(":checked") == true) {

        var des = null;
        var lev = null;


        bootbox.confirm(hmtlcw(), function(result) {
            if (result) {
                des = $('#description').val();
                lev = $('#level').val();
                da = $('#datee').val();

                if (lev == null) {
                    return false;
                }

                console.log(da);
                if (des == "") {
                    return false;
                }

                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;

                }

                console.log(des);
                content = getPopupContentw(layer, lev, des, da);
                var temp = [des, lev, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                    //layer.setPopupContent(content);
                }

                infosb.push(temp);

            } else {
                editableLayers.removeLayer(layer);
            }

        });

        editableLayers.addLayer(layer);

    } else if (type == "polygon" && $("#Polygon1").is(":checked") == true) {



        var des = null;
        var lev = null;


        bootbox.confirm(hmtlcw(), function(result) {
            if (result) {
                des = $('#description').val();
                lev = $('#level').val();
                da = $('#datee').val();

                if (lev == null) {
                    return false;
                }

                console.log(da);
                if (des == "") {
                    return false;
                }

                var timestamp = Date.parse(da)
                console.log(timestamp);
                if (isNaN(timestamp)) {
                    //return false;
                    da = null;

                }

                console.log(des);
                content = getPopupContentw(layer, lev, des, da);
                var temp = [des, lev, layer._leaflet_id, da];
                //console.log(content);
                if (content !== null) {
                    layer.bindPopup(content);
                    //layer.setPopupContent(content);
                }

                infosp.push(temp);

            } else {
                editableLayers.removeLayer(layer);
            }

        });


        editableLayers.addLayer(layer);


    }

    //layer.bindPopup('A popup!');
    //var popup = L.popup().setContent("I am a standalone popup.");
    //layer.bindPopup(popup).openPopup();
    //console.log(layer);
    //editableLayers.addLayer(layer);
    //console.log(editableLayers);

});

/**
 * [getPopupContentw builds html popup content  for layers]
 * @param  {[type]} layer       [leaflet layer]
 * @param  {[type]} level       [textuel type of warning]
 * @param  {[type]} description [description by user]
 * @param  {[type]} d           [date of expiration]
 * @return {[html]}             [html text]
 */

var getPopupContentw = function(layer, level, description, d) {

    if (layer instanceof L.Circle) {

        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> Circle</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;

    } else if (layer instanceof L.Polygon) {

        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> Polygon </td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;
    } else if (layer instanceof L.Rectangle) {

        var html = '<table>\
 						 <tr>\
  							  <td>Type of geometry : </td>\
  							  <td> rectangle</td>\
  						 </tr>\
 						 <tr>\
   							 <td>Level : </td>\
    						 <td>' + level + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Description : </td>\
    						 <td>' + description + '</td>\
  						</tr>\
  						<tr>\
   							 <td>Expiration date : </td>\
    						 <td>' + d + '</td>\
  						</tr>\
						</table>'
        return html;

    }

    return null
};



/**
 * event listener when we edit a geometric form.
 * When event is fired, we let leflet fo default procedure
 */

map.on('draw:edited', function(e) {


    /*
		var type = e.layerType;
         var layers = e.layers;
         
         var nc=circle.length;
         var np=polygon.length;
         var nb=box.length;
         
         
         
         
         layers.eachLayer(function (layer) {
         	var ic=0;
         	var ip=0;
         	var ib=0;
         	
          	while ( ic<nc ) {
          		if( layer._leaflet_id == circle[ic].properties.id ) {
       
          				circle[ic].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				circle[ic].geometry=tempjson.geometry;

          		}
          		ic++;
          	} 
          	
          	while ( ib<nb ) {
          		if( layer._leaflet_id == box[ib].properties.id ) {

          				box[ib].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				box[ib].geometry=tempjson.geometry;

          		}
          		ib++;
          	} 
          	
          	while ( ip<np ) {
          		if( layer._leaflet_id == polygon[ip].properties.id ) {

          				polygon[ip].properties.radius=layer._mRadius;

          				var tempjson=layer.toGeoJSON();
          				polygon[ip].geometry=tempjson.geometry;

          		}
          		ip++;
          	} 
          	
          	
		
         });
         
         */
});


/**
 * event listener when we delete a geometric form.
 * When event is fired, we let leflet fo default procedure
 */

map.on('draw:deleted', function(e) {


    /* 
		var type = e.layerType;
         var layers = e.layers;

         var nc=circle.length;
         var np=polygon.length;
         var nb=box.length;

		layers.eachLayer(function (layer) {
			var ic=0;
         	var ip=0;
         	var ib=0;
         	

			while(ic<nc) {	

				if( layer._leaflet_id == circle[ic].properties.id ) {

				circle.splice(ic,1);
				nc=circle.length;
				}
				else { ic++; }
			}
			
			while(ib<nb) {	

				if( layer._leaflet_id == box[ib].properties.id ) {

				box.splice(ib,1);
				nb=box.length;
				}
				else { ib++; }
			}
			
			while(ip<np) {	

				if( layer._leaflet_id == polygon[ip].properties.id ) {

				polygon.splice(ip,1);
				np=polygon.length;
				}
				else { ip++; }
			}
			
		
		}); */

});