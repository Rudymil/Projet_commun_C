var searchData=
[
  ['o',['o',['../jquery_8min_8js.html#a400dc8109620963da8314d4bdfa14f83',1,'jquery.min.js']]],
  ['offset',['offset',['../jquery-1_810_82_8js.html#a4a9f594d20d927164551fc7fa4751a2f',1,'jquery-1.10.2.js']]],
  ['offsetfractions',['offsetFractions',['../jquery-ui_8js.html#aea9e2e5368b19ec9282f3c2c46649f2f',1,'jquery-ui.js']]],
  ['offsetleft',['offsetLeft',['../jquery-ui_8js.html#ab3511bef2cdef1db3f33b1cafbd75337',1,'jquery-ui.js']]],
  ['oldcallbacks',['oldCallbacks',['../jquery-1_810_82_8js.html#ae46a2ee65a3f347972462f869c9d4960',1,'jquery-1.10.2.js']]],
  ['on',['on',['../editor_8js.html#aa28e240f4d730d0a302b129827ca0993',1,'on(&apos;draw:editstart&apos;, function(e){console.log(e);featureLayerw.on(&apos;click&apos;, function(e){if($(&quot;#warning&quot;).is(&quot;:checked&quot;)){console.log(e);e.layer.closePopup();var layer=e.layer;var layerjson=layer.toGeoJSON();console.log(JSON.stringify(layerjson));bootbox.confirm(hmtlcwe(layerjson.properties.description, layerjson.properties.name, layerjson.properties.intensity, layerjson.properties.validation_date, layerjson.properties.expiration_date, layerjson.properties.risk_type), function(result){if(result){var des=$(&apos;#description&apos;).val();var risk=$(&apos;#risk&apos;).val();var dae=$(&apos;#datee&apos;).val();var dav=$(&apos;#datev&apos;).val();var name=$(&apos;#name&apos;).val();var inte=$(&apos;#intensity&apos;).val();if(des==&quot;&quot;){return false;}var timestamp=Date.parse(dav) if(isNaN(timestamp)){return false;}if(name==&quot;&quot;){return false;}if(isNaN(parseFloat(inte))||!isFinite(inte)||inte&lt; 0){return false;}console.log(dae+ &apos;!= &apos;+layerjson.properties.expiration_date);console.log(layerjson.properties.description+ &apos;!= &apos;+des);console.log(layerjson.properties.name+ &apos;!= &apos;+name);console.log(layerjson.properties.intensity+ &apos;!= &apos;+inte);console.log(layerjson.properties.risk_type+ &apos;!= &apos;+risk);console.log(layerjson.properties.validation_date+ &apos;!= &apos;+dav);if(layerjson.properties.description!=des||layerjson.properties.name!=name||layerjson.properties.intensity!=inte||layerjson.properties.risk_type!=risk||layerjson.properties.validation_date!=dav||layerjson.properties.expiration_date!=dae){layerjson.properties.description=des;layerjson.properties.name=name;layerjson.properties.intensity=inte;layerjson.properties.risk_type=risk;layerjson.properties.validation_date=dav;layerjson.properties.expiration_date=dae;wzupdate.push(layerjson);}});}}});}):&#160;editor.js'],['../panel_warning_zone_8js.html#a25a291d017f4bc05b4288a6256d8c3d2',1,'on(&apos;click&apos;, &apos;#warning_zone_info.panel-heading&apos;, function(e){var $this=$(this);if(!$this.hasClass(&apos;panel-collapsed&apos;)){$this.parents(&apos;.panel&apos;).find(&apos;.panel-body&apos;).slideUp();$this.addClass(&apos;panel-collapsed&apos;);}else{$this.parents(&apos;.panel&apos;).find(&apos;.panel-body&apos;).slideDown();$this.removeClass(&apos;panel-collapsed&apos;);}})$(document).ready(function():&#160;panelWarningZone.js'],['../report__a__warning__zone_8js.html#a25c731ed92d3d216656791a2be5a6a72',1,'on(&apos;draw:created&apos;, function(e){var type=e.layerType;var layer=e.layer;var content=null;if(type==&quot;circle&quot;&amp;&amp;$(&quot;#Circle1&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(hmtlcw(), function(result){if(result){des=$(&apos;#description&apos;).val();lev=$(&apos;#level&apos;).val();da=$(&apos;#datee&apos;).val();if(lev==null){return false;}console.log(da);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}content=getPopupContentw(layer, lev, des, da);var temp=[des, lev, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infosc.push(temp);}else{editableLayers.removeLayer(layer);}});editableLayers.addLayer(layer);}else if(type==&quot;rectangle&quot;&amp;&amp;$(&quot;#Box1&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(hmtlcw(), function(result){if(result){des=$(&apos;#description&apos;).val();lev=$(&apos;#level&apos;).val();da=$(&apos;#datee&apos;).val();if(lev==null){return false;}console.log(da);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}console.log(des);content=getPopupContentw(layer, lev, des, da);var temp=[des, lev, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infosb.push(temp);}else{editableLayers.removeLayer(layer);}});editableLayers.addLayer(layer);}else if(type==&quot;polygon&quot;&amp;&amp;$(&quot;#Polygon1&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(hmtlcw(), function(result){if(result){des=$(&apos;#description&apos;).val();lev=$(&apos;#level&apos;).val();da=$(&apos;#datee&apos;).val();if(lev==null){return false;}console.log(da);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}console.log(des);content=getPopupContentw(layer, lev, des, da);var temp=[des, lev, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infosp.push(temp);}else{editableLayers.removeLayer(layer);}});editableLayers.addLayer(layer);}}):&#160;report_a_warning_zone.js'],['../report__an__anomaly_8js.html#a17e9034e0ae9ebbe590b9c70b9d739d5',1,'on(&apos;draw:created&apos;, function(e){var type=e.layerType;layer=e.layer;if(type==&quot;circle&quot;&amp;&amp;$(&quot;#Circle2&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(htmlca(), function(result){if(result){des=$(&apos;#description&apos;).val();ano=$(&apos;#anomalyType&apos;).val();da=$(&apos;#datee&apos;).val();if(ano==null){return false;}console.log(da);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}console.log(des);content=getPopupContenta(layer, ano, des, da);var temp=[des, ano, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infoscl.push(temp);}else{leditableLayers.removeLayer(layer);}});leditableLayers.addLayer(layer)}else if(type==&quot;rectangle&quot;&amp;&amp;$(&quot;#Box2&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(htmlca(), function(result){if(result){des=$(&apos;#description&apos;).val();ano=$(&apos;#anomalyType&apos;).val();da=$(&apos;#datee&apos;).val();if(ano==null){return false;}console.log(ano);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}console.log(des);content=getPopupContenta(layer, ano, des, da);var temp=[des, ano, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infosbl.push(temp);}else{leditableLayers.removeLayer(layer);}});leditableLayers.addLayer(layer)}else if(type==&quot;polygon&quot;&amp;&amp;$(&quot;#Polygon2&quot;).is(&quot;:checked&quot;)==true){var des=null;var lev=null;bootbox.confirm(htmlca(), function(result){if(result){des=$(&apos;#description&apos;).val();ano=$(&apos;#anomalyType&apos;).val();da=$(&apos;#datee&apos;).val();if(ano==null){return false;}console.log(ano);if(des==&quot;&quot;){return false;}var timestamp=Date.parse(da) console.log(timestamp);if(isNaN(timestamp)){da=null;}console.log(des);content=getPopupContenta(layer, ano, des, da);var temp=[des, ano, layer._leaflet_id, da];if(content!==null){layer.bindPopup(content);}infospl.push(temp);}else{leditableLayers.removeLayer(layer);}});leditableLayers.addLayer(layer)}}):&#160;report_an_anomaly.js'],['../set__the__route_8js.html#a86b974460bae0fea0054c3ff48ea757a',1,'on(&apos;click&apos;, function(e){if($(&quot;#Navigate&quot;).is(&quot;:checked&quot;)==true){var container=L.DomUtil.create(&apos;div&apos;), startBtn=createButton(&apos;Start from this location&apos;, container), destBtn=createButton(&apos;Go to this location&apos;, container);L.DomEvent.on(startBtn, &apos;click&apos;, function(){latlngstart=[e.latlng.lat, e.latlng.lng,&quot;start&quot;];position=e.latlng;send_ajax_point(latlngstart);spanstart=$(&quot;.leaflet-routing-geocoder&quot;).eq(0).find(&quot;span&quot;);spanstart.addClass(&quot;start&quot;);spanend=$(&quot;.leaflet-routing-geocoder&quot;).last().find(&quot;span&quot;);spanend.addClass(&quot;end&quot;);map.closePopup();});L.DomEvent.on(destBtn, &apos;click&apos;, function(){latlngend=[e.latlng.lat, e.latlng.lng,&quot;end&quot;];position=e.latlng;send_ajax_point(latlngend);spanstart=$(&quot;.leaflet-routing-geocoder&quot;).eq(0).find(&quot;span&quot;);spanstart.addClass(&quot;start&quot;);spanend=$(&quot;.leaflet-routing-geocoder&quot;).last().find(&quot;span&quot;);spanend.addClass(&quot;end&quot;);map.closePopup();});L.popup().setContent(container).setLatLng(e.latlng).openOn(map);}}):&#160;set_the_route.js'],['../set__the__route_8js.html#abc9fb3d847dfd6424432f21dd38b7b4c',1,'on(&apos;click&apos;, &apos;.leaflet-routing-remove-waypoint.start&apos;, function(){countrystart=new Array(2);spanstart=$(&quot;.leaflet-routing-geocoder&quot;).eq(0).find(&quot;span&quot;);spanstart.addClass(&quot;start&quot;);spanend=$(&quot;.leaflet-routing-geocoder&quot;).last().find(&quot;span&quot;);spanend.addClass(&quot;end&quot;);}):&#160;panelWarningZone.js']]],
  ['osm',['osm',['../template_8js.html#aa6d3a895f1b5e97a65512a4a5d4878af',1,'template.js']]],
  ['osmgeocoder',['OSMGeocoder',['../_control_8_o_s_m_geocoder_8js.html#a3673469702b54426e62ed87244396991',1,'Control.OSMGeocoder.js']]],
  ['overlayinstances',['overlayInstances',['../jquery-ui_8js.html#ae79c40a6bca8ca9dc7f8ac6778cad10a',1,'jquery-ui.js']]]
];