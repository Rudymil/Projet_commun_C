var circle = new Array(); // danger
var box = new Array(); // danger
var polygon = new Array(); // danger
var circlel = new Array(); // lack
var boxl = new Array(); // lack
var polygonl = new Array(); // lack
var latlng= new Array(); // departure/arrival points

$("#map").ready(function(){ // charge toutes les zones a eviter lorsque la carte est chargee
	$.ajax({
		url : './php/heatGrid2json.php',
		type : 'POST',
		dataType : 'json',
		success : function(code_json, statut){
			//console.log("code_json : ",code_json);
			//console.log("statut : ",statut);
			$.notify(
				{
					title: "<strong>Warning zones request</strong>",
					message: statut
				},{
					type: "success",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		error : function(resultat, statut, erreur){
			//console.log("resultat : ",resultat);
			//console.log("statut : ",statut);
			//console.log("erreur : ",erreur);
			$.notify(
				{
					title: "<strong>Warning zones request</strong>",
					message: statut
				},{
					type: "danger",
					placement: {
						from: "bottom",
						align: "center"
					}
				}
			);
		},
		complete : function(resultat, statut){
			if (resultat.status == '200'){
				var json = resultat.responseJSON;
				//console.log(json);
				addGrid(json);
			}
		}
	});
});

$("#calculate").click(function(){ // envoie les points a l algo pour afficher l itineraire
	//console.log("latlng : ",latlng);
	affect(); // fonction définie dans set_the_route.js pour affecter les coordonnees des points de depart et d arrivee à latlng
	if (latlng.length == 2 && latlng[0].length == 2 && latlng[1].length == 2){ // si 2 couples de lat Lng
		if (latlng[0].includes("") || latlng[0].includes(NaN) || latlng[0].includes(undefined) || latlng[1].includes("") || latlng[1].includes(NaN) || latlng[1].includes(undefined)){ // si pas de point
			if (latlng[0].includes("") || latlng[0].includes(NaN) || latlng[0].includes(undefined)){
				$.notify(
					{
						title: "<strong>Departure</strong>",
						message: "Enter coordinates",
					},{
					type: "danger",
						placement: {
							from: "bottom",
							align: "center"
						}
					}
				);
			}
			if (latlng[1].includes("") || latlng[1].includes(NaN) || latlng[1].includes(undefined)){
				$.notify(
					{
						title: "<strong>Destination</strong>",
						message: "Enter coordinates",
					},{
						type: "danger",
						placement: {
							from: "bottom",
							align: "center"
						}
					}
				);
			}
		}
		else{
			var json = latlng;
			$.ajax({
				url : '',
				type : 'POST',
				data : 'json='+json,
				dataType : 'json',
				success : function(code_json, statut){
					//console.log("code_json : ",code_json);
					//console.log("statut : ",statut);
					$.notify(
						{
							title: "<strong>Routing request</strong>",
							message: statut,
						},{
							type: "success",
							placement: {
								from: "bottom",
								align: "center"
							}
						}
					);
				},
				error : function(resultat, statut, erreur){
					//console.log("resultat : ",resultat);
					//console.log("statut : ",statut);
					//console.log("erreur : ",erreur);
					$.notify(
						{
							title: "<strong>Routing request</strong>",
							message: statut,
						},{
							type: "danger",
							placement: {
								from: "bottom",
								align: "center"
							}
						}
					);
				},
				complete : function(resultat, statut){
					//console.log("resultat : ",resultat);
					//console.log("statut : ",statut);
					if (status == 200){
						json = resultat;
					}
				}
			});
		}
	}
	else{
		$.notify(
			{
				title: "<strong>Array size</strong>",
				message: "incorrect",
			},{
				type: "danger",
				placement: {
					from: "bottom",
					align: "center"
				}
			}
		);
	}
});

function notify_wrong_format(shape){
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "wrong format"
		},{
			type: "danger",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_none(shape){
	$.notify(
		{
			title: "<strong>"+shape+"</strong>",
			message: "none",
		},{
			type: "info",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_ajax_sending_areas_success(code, statut){
	$.notify(
		{
			title: "<strong>Sending areas</strong>",
			message: statut,
		},{
			type: "success",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

function notify_ajax_sending_areas_error(code, statut){
	$.notify(
		{
			title: "<strong>Sending areas</strong>",
			message: statut,
		},{
			type: "danger",
			placement: {
				from: "bottom",
				align: "center"
			}
		}
	);
}

$("#submit1").click(function(){ // envoie toutes les zones dangereuses
	console.log("Circles :");
	console.log(circle);
	console.log("Boxes :");
	console.log(box);
	console.log("Polygons :");
	console.log(polygon);
	var geojson = new Array();
	if (circle.length == 0){
		notify_none("Circles");
	}
	else{
		for(element in circle){
			if (circle[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(circle[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Circles");
				circle = [];
				return -1;
			}
		}
		circle = [];
	}
	if (box.length == 0){
		notify_none("Boxes");
	}
	else {
		for(element in box){
			if (box[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(box[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Boxes");
				box = [];
				return -1;
			}
		}
		box = [];
	}
	if (polygon.length == 0){
		notify_none("Polygons");
	}
	else {
		for(element in polygon){
			if (polygon[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(polygon[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Polygons");
				polygon = [];
				return -1;
			}
		}
		polygon = [];
	}
	console.log("geojson : ");
	console.log(geojson);
	if (!$.isEmptyObject(geojson)){
		$.ajax({
			url : './php/insert_to_valid.php',
			type : 'POST',
			data : 'geojson='+geojson,
			dataType : '',
			success : function(code, statut){
				//console.log("code_json : ",code);
				//console.log("statut : ",statut);
				notify_ajax_sending_areas_success(code, statut);
			},
			error : function(resultat, statut, erreur){
				//console.log("resultat : ",resultat);
				//console.log("statut : ",statut);
				//console.log("erreur : ",erreur);
				notify_ajax_sending_areas_error(code, statut);
			},
			complete : function(resultat, statut){
				//console.log("resultat : ",resultat);
				//console.log("statut : ",statut);
			}
		});
	}
});

$("#submit2").click(function(){ // envoie toutes les zones a verifier
	console.log("Circles :");
	console.log(circlel);
	console.log("Boxes :");
	console.log(boxl);
	console.log("Polygons :");
	console.log(polygonl);
	var geojson = new Array();
	if (circlel.length == 0){
		notify_none("Circles");
	}
	else{
		for(element in circlel){
			if (circlel[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(circlel[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Circles");
				circlel = [];
				return -1;
			}
		}
		circlel = [];
	}
	if (boxl.length == 0){
		notify_none("Boxes");
	}
	else {
		for(element in boxl){
			if (boxl[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(boxl[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Boxes");
				boxl = [];
				return -1;
			}
		}
		boxl = [];
	}
	if (polygonl.length == 0){
		notify_none("Polygons");
	}
	else {
		for(element in polygonl){
			if (polygonl[element].hasOwnProperty('toGeoJSON()')){ // si la methode est compatible
				geojson.push(polygonl[element].toGeoJSON()); // complete GeoJSON
			}
			else {
				notify_wrong_format("Polygons");
				polygonl = [];
				return -1;
			}
		}
		polygonl = [];
	}
	console.log("geojson : ");
	console.log(geojson);
	if (!$.isEmptyObject(geojson)){
		$.ajax({
			url : './php/insert_to_verify.php',
			type : 'POST',
			data : 'geojson='+geojson,
			dataType : '',
			success : function(code, statut){
				//console.log("code_json : ",code);
				//console.log("statut : ",statut);
				notify_ajax_sending_areas_success(code, statut);
			},
			error : function(resultat, statut, erreur){
				//console.log("resultat : ",resultat);
				//console.log("statut : ",statut);
				//console.log("erreur : ",erreur);
				notify_ajax_sending_areas_error(code, statut);
			},
			complete : function(resultat, statut){
				//console.log("resultat : ",resultat);
				//console.log("statut : ",statut);
			}
		});
	}
});