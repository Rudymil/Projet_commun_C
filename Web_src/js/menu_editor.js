featureLayera = new L.FeatureGroup();
map.addLayer(featureLayera);

drawControla = new L.Control.Draw({
    edit: {
        featureGroup: featureLayera,
        edit: false,
        remove: false
    },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
    }
}).addTo(map);

featureLayerw = new L.FeatureGroup();
map.addLayer(featureLayerw);

drawControlw = new L.Control.Draw({
    edit: {
        featureGroup: featureLayerw,
        edit: false,
        remove: false
    },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
    }

}).addTo(map);


/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "anomaly zones".
 */
function notify_anomaly_zones_none() {
    if (DEBUG) {
        console.log("FUNCTION : notify_anomaly_zones_none");
    }
    $.notify({
        title: "<strong>Anomaly zones request</strong>",
        message: "none"
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}

/**
 * Build the html content for the layers extracted from the database.
 * @param {layer} couche - leaflet layer
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu_anomaly(couche) {
    if (DEBUG) {
        console.log("FUNCTION : getPopupContentmenu_anomaly");
    }
    var type = undefined;
    for (element in types_anomalies) {
        if (couche.properties.anomaly_type == types_anomalies[element]["id"]) {
            type = types_anomalies[element]["name"];
        }
    }
    var html = '<table>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Anomaly type : </td>\
            <td>' + type + '</td>\
        </tr>\
        <tr>\
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>Expiration date : </td>\
            <td>' + couche.properties.expiration_date + '</td>\
        </tr>\
    </table>'
    return html;
}

/**
 * Ajax request asking all the anomaly zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_anomaly_zones(url, bbox) {
    if (DEBUG) {
        console.log("FUNCTION : add_anomaly_zones");
        console.log("add_anomaly_zones url : ", url);
        console.log("add_anomaly_zones bbox : ", bbox);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_anomaly_zone + '&bbox=' + bbox,
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_anomaly_zones code_json : ", code_json);
                console.log("add_anomaly_zones statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("add_anomaly_zones resultat : ", resultat);
                console.log("add_anomaly_zones statut : ", statut);
                console.log("add_anomaly_zones erreur : ", erreur);
            }
            $.notify({
                title: "<strong>Anomaly zones request</strong>",
                message: resultat.responseText
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (resultat.status == '200') {
                if (DEBUG) {
                    console.log("add_anomaly_zones resultat.status :", resultat.status);
                }
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("add_anomaly_zones json :", json);
                    }
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_anomaly_zones element :", element);
                                console.log("add_anomaly_zones json['features'][element] :", json["features"][element]);
                                console.log("add_anomaly_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            shape.bindPopup(getPopupContentmenu_anomaly(json["features"][element]));
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: 'blue',
                                color: 'blue'
                            });
                            featureLayera.addLayer(shape);

                            anomaly_zones.push(shape); // remplir la anomaly zone
                        }
                        layer_group_anomaly_zones = L.layerGroup(anomaly_zones); // groupe des couches anomaly zones
                        layer_group_anomaly_zonestemp = L.layerGroup(anomaly_zones);
                        map.addLayer(layer_group_anomaly_zones);
                        if (DEBUG) {
                            console.log("add_anomaly_zones layer_group_anomaly_zones :", layer_group_anomaly_zones);
                        }
                        overlayMaps["Anomaly zones"] = layer_group_anomaly_zones; // menuif (Lcontrollayers != undefined) {
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map);
                    }
                }
            } else {
                if (DEBUG) {
                    console.log("add_anomaly_zones json :", json);
                }
                if (anomaly_zones.length > 0) {
                    remove_anomaly_zones();
                }
            }
        }
    });
}

/**
 * Notify using Bootstrap Notify that the area targeted or viewed not contains "warning zones".
 */
function notify_warning_zones_none() {
    if (DEBUG) {
        console.log("FUNCTION : notify_warning_zones_none");
    }
    $.notify({
        title: "<strong>Warning zones request</strong>",
        message: "none"
    }, {
        type: "info",
        placement: {
            from: "bottom",
            align: "center"
        }
    });
}

/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenu(couche) {
    if (DEBUG) {
        console.log("FUNCTION : getPopupContentmenu");
    }
    var type = undefined;
    for (element in types_warning_zones) {
        if (couche.properties.risk_type == types_warning_zones[element]["id"]) {
            type = types_warning_zones[element]["name"];
        }
    }
    var html = '<table>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Risk type : </td>\
            <td>' + type + '</td>\
        </tr>\
        <tr>\
            <td>Description : </td>\
            <td>' + couche.properties.description + '</td>\
        </tr>\
        <tr>\
            <td>Intensity : </td>\
            <td>' + couche.properties.intensity + '</td>\
        </tr>\
        <tr>\
            <td>Expiration Date : </td>\
            <td>' + couche.properties.expiration_date + '</td>\
        </tr>\
        <tr>\
            <td>Validation date : </td>\
            <td>' + couche.properties.validation_date + '</td>\
        </tr>\
    </table>'
    return html;
}

/**
 * Ajax request asking all the warning zones from the BD and contained into the bounding box of the map.
 * @param {string} url - Url to the Web API.
 * @param {string} bbox - Bounding box of the map.
 */
function add_warning_zones(url, bbox) {
    if (DEBUG) {
        console.log("FUNCTION : add_warning_zones");
        console.log("add_warning_zones url : ", url);
        console.log("add_warning_zones bbox : ", bbox);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_warning_zone + '&bbox=' + bbox + '&validated=true',
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_warning_zones code_json : ", code_json);
                console.log("add_warning_zones statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("add_warning_zones resultat : ", resultat);
                console.log("add_warning_zones statut : ", statut);
                console.log("add_warning_zones erreur : ", erreur);
            }
            $.notify({
                title: "<strong>Warning zones validated request</strong>",
                message: resultat.responseText
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (resultat.status == '200') {
                if (DEBUG) {
                    console.log("add_warning_zones resultat.status :", resultat.status);
                }
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_warning_zones element :", element);
                                console.log("add_warning_zones json['features'][element] :", json["features"][element]);
                                console.log("add_warning_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: colorZone,
                                color: colorZone
                            });
                            shape.bindPopup(getPopupContentmenu(json["features"][element]));
                            featureLayerw.addLayer(shape);
                            //shape.addTo(map); // ajout a la map
                            warning_zones.push(shape); // remplir la warning zone
                        }
                        if (DEBUG) {
                            console.log("add_warning_zones layer_group_warning_zones :", layer_group_warning_zones);
                        }
                        layer_group_warning_zones = L.layerGroup(warning_zones); // groupe des couches warning zones
                        layer_group_warning_zonestemp = L.layerGroup(warning_zones);
                        map.addLayer(layer_group_warning_zones);
                        overlayMaps["Warning zones"] = layer_group_warning_zones; // menu
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map);
                        if (legend != undefined || legend != null) {
                            legend.remove();
                        }
                        legend = L.control({
                            position: 'bottomleft'
                        }); // ajout de la legende
                        legend.onAdd = function(map) {
                            var div = L.DomUtil.create('div', 'info legend'),
                                grades = [20, 30, 40, 50, 60, 70, 80, 90, 100],
                                labels = [];
                            var divLegend = "";
                            // loop through our density intervals and generate a label with a colored square for each interval
                            for (var i = 0; i < grades.length; i++) {
                                divLegend += ('<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'));
                            }
                            $(div).html(divLegend);
                            return div;
                        };
                        legend.addTo(map);
                    }
                } else {
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (warning_zones.length > 0) {
                        remove_warning_zones();
                    }
                }
            }
        }
    });
    $.ajax({
        url: url,
        type: 'GET',
        data: 'type=' + string_warning_zone + '&bbox=' + bbox + '&validated=false',
        dataType: 'json',
        success: function(code_json, statut) {
            if (DEBUG) {
                console.log("add_warning_zones code_json : ", code_json);
                console.log("add_warning_zones statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("add_warning_zones resultat : ", resultat);
                console.log("add_warning_zones statut : ", statut);
                console.log("add_warning_zones erreur : ", erreur);
            }
            $.notify({
                title: "<strong>Warning zones not checked request</strong>",
                message: resultat.responseText
            }, {
                type: "danger",
                placement: {
                    from: "bottom",
                    align: "center"
                }
            });
        },
        complete: function(resultat, statut) {
            if (resultat.status == '200') {
                if (DEBUG) {
                    console.log("add_warning_zones resultat.status :", resultat.status);
                }
                var json = resultat.responseJSON;
                if (!$.isEmptyObject(json) && json != undefined) { // si le resultat json n est pas vide
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (json["features"].length > 0) {
                        for (element in json["features"]) { // pour chaque object du geojson
                            if (DEBUG) {
                                console.log("add_warning_zones element :", element);
                                console.log("add_warning_zones json['features'][element] :", json["features"][element]);
                                console.log("add_warning_zones json['features'][element]['properties'].intensity :", json["features"][element]["properties"].intensity);
                            }
                            var shape = L.geoJSON(json["features"][element]).getLayers()[0];
                            var colorZone = getColor(json["features"][element]["properties"].intensity);
                            shape.setStyle({ // transforme en layer et change le style
                                fillColor: colorZone,
                                color: 'red'
                            });
                            shape.bindPopup(getPopupContentmenu(json["features"][element]));
                            featureLayerw.addLayer(shape);
                            warning_nonchecked.push(shape); // remplir la warning zone
                        }
                        layer_group_warning_nonchecked = L.layerGroup(warning_nonchecked); // groupe des couches warning zones
                        layer_group_warning_noncheckedtemp = L.layerGroup(warning_nonchecked);
                        if (DEBUG) {
                            console.log("add_anomaly_zones layer_group_warning_nonchecked :", layer_group_warning_nonchecked);
                        }
                        map.addLayer(layer_group_warning_nonchecked);
                        overlayMaps["Warning zones to check"] = layer_group_warning_nonchecked; // menu
                        if (Lcontrollayers != undefined || Lcontrollayers != null) {
                            Lcontrollayers.remove();
                        }
                        Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
                            position: 'topleft'
                        }).addTo(map);
                    }
                } else {
                    if (DEBUG) {
                        console.log("add_warning_zones json :", json);
                    }
                    if (warning_zones.length > 0) {
                        remove_warning_zones();
                    }
                }
            }
        }
    });
}

/**
 * Send to the DB all the update for one type.
 * @param {string} type - Type of the GeoJSON to update.
 * @return {number} resultat.responseJSON - Number of lines modified into the DB.
 * @return {number} -1 - If resultat.responseJSON is empty or NaN.
 */
function send_ajax_update(type) {
    if (DEBUG) {
        console.log("FUNCTION : send_ajax_update");
        console.log("send_ajax_update type :", type);
    }
    geojson["type"] = "FeatureCollection";
    geojson["zone_type"] = type;
    if (type == string_warning_zone) {
        geojson["features"] = wzupdate;
    }
    if (type == string_anomaly_zone) {
        geojson["features"] = azupdate;
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: 'action=update&' + type + '=' + JSON.stringify(geojson), // object -> string
        dataType: 'text',
        success: function(code, statut) {
            if (DEBUG) {
                console.log("send_ajax_update code_json : ", code);
                console.log("send_ajax_update statut : ", statut);
            }
            //notify_ajax_sending_areas_success(statut);
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("send_ajax_update resultat : ", resultat);
                console.log("send_ajax_update statut : ", statut);
                console.log("send_ajax_update erreur : ", erreur);
            }
            notify_ajax_sending_areas_error(resultat);
        },
        complete: function(resultat, statut) {
            if (DEBUG) {
                console.log("send_ajax_update statut : ", statut);
                console.log("send_ajax_delete resultat.responseText : ", resultat.responseText);
            }
            if (resultat.status == '200') {
                if (resultat.responseText != undefined && resultat.responseText != NaN) { // si le resultat.responseText est defini
                    if (DEBUG) {
                        console.log("send_ajax_delete resultat.responseText : ", resultat.responseText);
                    }
                    return parseInt(resultat.responseText);
                } else {
                    return -1; // error
                }
            }
        }
    });
}

/**
 * Send to the DB one id for one type.
 * @param {string} id - Id of the GeoJSON to delete.
 * @param {string} type - Type of GeoJSON to delete.
 * @return {number} resultat.responseJSON - Number of lines modified into the DB.
 * @return {number} -1 - If resultat.responseJSON is empty or NaN.
 */
function send_ajax_delete(id, type) {
    if (DEBUG) {
        console.log("FUNCTION : send_ajax_delete");
        console.log("send_ajax_delete id :", id);
        console.log("send_ajax_delete type :", type);
    }
    $.ajax({
        url: url,
        type: 'GET',
        data: 'action=delete&type=' + type + '&id=' + id,
        dataType: 'text',
        success: function(code, statut) {
            if (DEBUG) {
                console.log("send_ajax_delete code_json : ", code);
                console.log("send_ajax_delete statut : ", statut);
            }
        },
        error: function(resultat, statut, erreur) {
            if (DEBUG) {
                console.log("send_ajax_delete resultat : ", resultat);
                console.log("send_ajax_delete statut : ", statut);
                console.log("send_ajax_delete erreur : ", erreur);
            }
            notify_ajax_sending_areas_error(resultat);
        },
        complete: function(resultat, statut) {
            if (DEBUG) {
                console.log("send_ajax_delete statut : ", statut);
                console.log("send_ajax_delete resultat.responseText : ", resultat.responseText);
            }
            if (resultat.status == '200') {
                if (resultat.responseText != undefined && resultat.responseText != NaN) { // si le resultat.responseText est defini
                    if (DEBUG) {
                        console.log("send_ajax_delete resultat.responseText : ", resultat.responseText);
                    }
                    return parseInt(resultat.responseText);
                } else {
                    return -1; // error
                }
            }
        }
    });
}

/**
 * Show the number of zones modified.
 * @param {number} nb_MAJ - Number of zones modified.
 * @param {number} nb_sent - Number of zones sent.
 */
function notify_nb_MAJ(nb_MAJ, nb_sent) {
    if (DEBUG) {
        console.log("FUNCTION : notify_nb_MAJ");
    }
    if (nb_MAJ != NaN && nb_MAJ == nb_sent) { // si egalite
        $.notify({
            title: "<strong>Number of zones modified</strong>",
            message: nb_MAJ
        }, {
            type: "success",
            placement: {
                from: "bottom",
                align: "center"
            }
        });
    } else if (nb_MAJ == NaN) { // si Not a Number
        $.notify({
            title: "<strong>Number of zones modified</strong>",
            message: nb_MAJ
        }, {
            type: "danger",
            placement: {
                from: "bottom",
                align: "center"
            }
        });
    } else if (nb_MAJ != nb_sent) { // si pas egal
        $.notify({
            title: "<strong>Number of zones modified</strong>",
            message: nb_MAJ
        }, {
            type: "warning",
            placement: {
                from: "bottom",
                align: "center"
            }
        });
    }
}

/**
 * Executed for sending all the updates and deletes.
 */
$("#submit3").click(function() {
    var nb_sent = wzupdate.length + azupdate.length + wzdelete.length + azdelete.length;
    if (DEBUG) {
        console.log("EVENT : $('#submit3').click");
        console.log("EVENT : $('#submit3').click nb_sent :", nb_sent);
        console.log("EVENT : $('#submit3').click wzupdate :", wzupdate);
        console.log("EVENT : $('#submit3').click wzupdate.length :", wzupdate.length);
        console.log("EVENT : $('#submit3').click azupdate :", azupdate);
        console.log("EVENT : $('#submit3').click azupdate.length :", azupdate.length);
        console.log("EVENT : $('#submit3').click wzdelete :", wzdelete);
        console.log("EVENT : $('#submit3').click wzdelete.length :", wzdelete.length);
        console.log("EVENT : $('#submit3').click azdelete :", azdelete);
        console.log("EVENT : $('#submit3').click azdelete.length :", azdelete.length);
    }
    notify_nb_sent(nb_sent);
    var nb_MAJ = 0;
    if (DEBUG) {
        console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
    }
    if (wzupdate == null || wzupdate.length <= 0) { // si pas de warning zones a MAJ
        //notify_none("Warning zones updated");
    } else {
        nb_MAJ = nb_MAJ + parseInt(send_ajax_update(string_warning_zone));
        if (DEBUG) {
            console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
        }
        wzupdate = new Array();
    }
    if (azupdate == null || azupdate.length <= 0) { // si pas d anomaly zones a MAJ
        //notify_none("Anomaly zones updated");
    } else {
        nb_MAJ = nb_MAJ + parseInt(send_ajax_update(string_anomaly_zone));
        if (DEBUG) {
            console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
        }
        azupdate = new Array();
    }
    if (wzdelete == null || wzdelete.length <= 0) { // si pas de warning zones a supprimer
        //notify_none("Warning zones deleted");
    } else {
        for (element in wzdelete) {
            nb_MAJ = nb_MAJ + parseInt(send_ajax_delete(wzdelete[element], string_warning_zone));
            if (DEBUG) {
                console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
            }
        }
        wzdelete = new Array();
    }
    if (azdelete == null || azdelete.length <= 0) { // si pas d anomaly zones a supprimer
        //notify_none("Warning zones deleted");
    } else {
        for (element in azdelete) {
            nb_MAJ = nb_MAJ + parseInt(send_ajax_delete(azdelete[element], string_anomaly_zone));
            if (DEBUG) {
                console.log("EVENT : $('#submit3').click nb_MAJ :", nb_MAJ);
            }
        }
        azdelete = new Array();
    }
    notify_nb_MAJ(nb_MAJ, nb_sent);
});

/**
 * Build the html content for the layers extracted from the database.
 * @return {string} - Of informations about the layer in hmtl form.
 */
function getPopupContentmenuPOI(couche) {
    if (DEBUG) {
        console.log("FUNCTION : getPopupContentmenuPOI");
    }
    var html = '<table>\
        <tr>\
            <td>ID : </td>\
            <td>' + couche.properties.id + '</td>\
        </tr>\
        <tr>\
            <td>Name : </td>\
            <td>' + couche.properties.name + '</td>\
        </tr>\
        <tr>\
            <td>Type : </td>\
            <td>' + couche.properties.type + '</td>\
        </tr>\
    </table>'
    return html;
}

/**
 * Removed from the map all "anomaly zones" displayed.
 */
function remove_anomaly_zones() {
    if (DEBUG) {
        console.log("FUNCTION : remove_anomaly_zones");
    }
    map.removeLayer(layer_group_anomaly_zones);
    anomaly_zones = new Array(); // on vide les anomalies zones
    delete overlayMaps["Anomaly zones"];
    if (Lcontrollayers != undefined || Lcontrollayers != null) {
        Lcontrollayers.remove();
    }
    Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
        position: 'topleft'
    }).addTo(map);
}

/**
 * Removed from the map all "warning zones" displayed.
 */
function remove_warning_zones() {
    if (DEBUG) {
        console.log("FUNCTION : remove_warning_zones");
    }
    map.removeLayer(layer_group_warning_zones);
    map.removeLayer(layer_group_warning_nonchecked);
    warning_zones = new Array(); // on vide les warning zones
    warning_nonchecked = new Array(); // on vide les warning zones
    delete overlayMaps["Warning zones"];
    delete overlayMaps["Warning zones to check"];
    if (Lcontrollayers != undefined || Lcontrollayers != null) {
        Lcontrollayers.remove();
    }
    if (legend != undefined || legend != null) {
        legend.remove();
    }
    Lcontrollayers = new L.control.layers(baseMaps, overlayMaps, {
        position: 'topleft'
    }).addTo(map);
}

/*
 * Execute when POI is changed
 */
$('#POI').change(function() {
    if (DEBUG) {
        console.log("EVENT : $('#POI').change")
    }
    if ($('#POI').is(':checked')) {
        checkbox_POI = true;
        if (DEBUG) {
            console.log("$('#POI').change checkbox_POI :", checkbox_POI);
        }
        bbox = map.getBounds().toBBoxString();
        ajax_POI(url, bbox);
    } else {
        checkbox_POI = false;
        if (DEBUG) {
            console.log("$('#POI').change checkbox_POI :", checkbox_POI);
        }
        remove_POI();
    }
});

/*
 * Execute when Anomaly zones is changed
 */
$('#Anomaly_zones').change(function() {
    if (DEBUG) {
        console.log("EVENT : $(':checkbox').change")
    }
    if ($('#Anomaly_zones').is(':checked')) {
        checkbox_Anomaly_zones = true;
        if (DEBUG) {
            console.log("$('#Anomaly_zones').change checkbox_Anomaly_zones :", checkbox_Anomaly_zones);
        }
        bbox = map.getBounds().toBBoxString();
        add_anomaly_zones(url, bbox);
    } else {
        checkbox_Anomaly_zones = false;
        if (DEBUG) {
            console.log("$('#Anomaly_zones').change checkbox_Anomaly_zones :", checkbox_Anomaly_zones);
        }
        remove_anomaly_zones();
    }
});

/*
 * Execute when Warning zones is changed
 */
$('#Warning_zones').change(function() {
    if (DEBUG) {
        console.log("EVENT : $('#Warning_zones').change")
    }
    if ($('#Warning_zones').is(':checked')) {
        checkbox_Warning_zones = true;
        if (DEBUG) {
            console.log("$('#Warning_zones').change checkbox_Warning_zones :", checkbox_Warning_zones);
        }
        bbox = map.getBounds().toBBoxString();
        add_warning_zones(url, bbox);
    } else {
        checkbox_Warning_zones = false;
        if (DEBUG) {
            console.log("$('#Warning_zones').change checkbox_Warning_zones :", checkbox_Warning_zones);
        }
        remove_warning_zones();
    }
});

/*
 * Refresh layers on the map
 */
function refresh() {
    if (DEBUG) {
        console.log("refresh");
        console.log("refresh checkbox_Anomaly_zones :", checkbox_Anomaly_zones);
    }
    remove_anomaly_zones();
    if (checkbox_Anomaly_zones) {
        bbox = map.getBounds().toBBoxString();
        add_anomaly_zones(url, bbox);
    }
    if (DEBUG) {
        console.log("refresh checkbox_Warning_zones :", checkbox_Warning_zones);
    }
    remove_warning_zones();
    if (checkbox_Warning_zones) {
        bbox = map.getBounds().toBBoxString();
        add_warning_zones(url, bbox);
    }
    if (DEBUG) {
        console.log("refresh checkbox_POI :", checkbox_POI);
    }
    remove_POI();
    if (checkbox_POI) {
        bbox = map.getBounds().toBBoxString();
        ajax_POI(url, bbox);
    }
}