<?php
/**
  *   Read a JSON and a text file,
  *   Parse them and
  *   Return a new JSON with the structure needed
  **/

// Read the JSON and return its content
function fileReader($path){
  if(file_exists($path) && is_readable($path)){
    //print("The file exists.\n");
    $file = fopen($path, 'r');
    $filesize = filesize($path);
    //print("<p>Taille du fichier : " . $filesize . " octets</p>");

    $content = fread($file, $filesize);
    $result = fclose($file);
    //print("<p>Resultat : ");

    if ($result) {
      /*print("Succès !</p>");
      print("<p>Le contenu du fichier est :<br>");
      print($content . "</p>");*/
      return $content;
    }
  }
  else{
    //print("The file $path not exists !");
    return("The file $path not exists !");
  }
}

// Parse the 2 files in a new JSON
function heatGrid2json($gridPath, $jsonPath){
  $paramsFileData = json_decode(fileReader($jsonPath));
  $gridData       = fileReader($gridPath);
  $gridData       = str_replace(" ", ",", str_replace("\n", ",", $gridData));
  $gridData = substr($gridData, 0, strlen($gridData) - 1);

  //Verification de coherence entre le nombre de valeurs et le nombre de col/lignes
  if( count(explode(",", $gridData)) == $paramsFileData->{"rows"} * $paramsFileData->{"cols"} ){
    $outputJson = '{"params": ';
    $outputJson .= '{"latMin": ' . $paramsFileData->{"latMin"} . ", ";
    $outputJson .= '"latMax": ' . $paramsFileData->{"latMax"} . ", ";
    $outputJson .= '"lngMin": ' . $paramsFileData->{"lngMin"} . ", ";
    $outputJson .= '"lngMax": ' . $paramsFileData->{"lngMax"} . ", ";
    $outputJson .= '"rows": ' . $paramsFileData->{"rows"} . ", ";
    $outputJson .= '"cols": ' . $paramsFileData->{"cols"} . "}, ";
    $outputJson .= '"data": ';
    $outputJson .= '[' . $gridData . ']';
    $outputJson .= '}';
    return $outputJson;
  }
  else {
    print("<h2>ERROR !<br>Coherency problem !</h2>");
  }
}

print(heatGrid2json("../data/penalty.asc", "../data/penalty.json"));
?>
