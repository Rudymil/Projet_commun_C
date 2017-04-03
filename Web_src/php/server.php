<?php
include_once("./queryMaker.inc.php");
include_once("./error.inc.php");
header('Access-Control-Allow-Origin: *');

if (isset($_GET["DEBUG"]) || isset($_POST["DEBUG"])) {
  header('Content-type: text/html; charset=utf-8');
  /*print("<h2>\$_SERVER :</h2>");
  print_r($_SERVER);*/

  print("<h2>\$_REQUEST :</h2>");
  print_r($_REQUEST);

  print("<h2>REQUEST_METHOD :" . $_SERVER["REQUEST_METHOD"] . "</h2>");

  /*print("<h2>\$_GET :</h2>");
  print_r($_GET);
  print("<h2>\$_POST :</h2>");
  print_r($_POST);*/
}
else {
  header('Content-type: application/json');
}

//GET zones
if (isset($_GET["type"]) && ($_GET["type"] == "warning_zone" || $_GET["type"] == "anomaly_zone")) {
  $bBoxSQL = "";
  if (isset($_GET["bbox"])) {
    $bBox = explode(",", $_GET["bbox"]); //southWest lng/lat / northEast lng/lat
    $bBoxSQL = " AND ST_Contains(ST_SetSRID(ST_MakeBox2D(ST_Point($bBox[0], $bBox[1]), ST_Point($bBox[2], $bBox[3])),4326), z.geom)";
  }
  if ($_GET["type"] == "warning_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, description, risk_intensity AS intensity FROM warning_zone z, risk t WHERE z.risk_type = t.id $bBoxSQL;";
  }elseif ($_GET["type"] == "anomaly_zone") {
    $zones_list = "SELECT z.id, ST_AsGeoJSON(z.geom) AS geojson, t.name, description FROM anomaly_zone z, anomaly t WHERE z.anomaly_type = t.id $bBoxSQL;";
  }
  if (isset($_GET["DEBUG"])) {
    print("<p><strong>Query :</strong> " . $zones_list . "</p>");
  }
  print(selectGeoJSONQuery($zones_list));
}

//GET country
elseif (isset($_GET["type"]) && $_GET["type"] == "country") {
  $types_list = "SELECT id, name FROM country ORDER BY name;";
  if (isset($_GET["DEBUG"])) {
    print("<p><strong>Query :</strong> " . $types_list . "</p>");
  }
  print(selectJSONQuery($types_list));
}

//GET types
elseif (isset($_GET["type"]) && ($_GET["type"] == "risk_type" || $_GET["type"] == "anomaly_type")) {
  if ($_GET["type"] == "risk_type") {
    $types_list = "SELECT id, name FROM risk ORDER BY name;";
  }elseif ($_GET["type"] == "anomaly_type") {
    $types_list = "SELECT id, name FROM anomaly ORDER BY name;";
  }
  if (isset($_GET["DEBUG"])) {
    print("<p><strong>Query :</strong> " . $types_list . "</p>");
  }
  print(selectJSONQuery($types_list));
}

//POST zones
elseif (isset($_POST["warning_zone"])) {
  $json = json_decode($_POST["warning_zone"]);
  if ($json->zone_type != "warning_zone") {error(400, "Incorrect Data !");}
  foreach ($json->features as $key => $value) {
    if (!isset($value->properties->risk_type) || !isset($value->properties->description)) {error(400, "Incorrect Data !");}
  }
  insertGeoJSONQuery($json);
}
elseif (isset($_POST["anomaly_zone"])) {
  $json = json_decode($_POST["anomaly_zone"]);
  if ($json->zone_type != "anomaly_zone") {error(400, "Incorrect Data !");}
  foreach ($json->features as $key => $value) {
    if (!isset($value->properties->anomaly_type) || !isset($value->properties->description)) {error(400, "Incorrect Data !");}
  }
  insertGeoJSONQuery($json);
}

//Check waypoints
elseif (isset($_POST["waypoint"])) {
  $json = json_decode($_POST["waypoint"]);

  if ($json->waypoint != "start" && $json->waypoint != "end" && $json->waypoint != "step") {error(400, "Incorrect Data !");}
  $result = checkWaypoint($json);
  print $result;
}

else{
  error(400, "No data received !");
}
?>