```js
map.locate({setView: true, watch: true}).on('locationfound', function(e){...}).on('locationerror', function(e){});
```
Dessine un marqueur de d�part sur la carte qui pr�cise la localisation de l'utilisateur lorsqu'on clic sur le bouton de localisation et affiche un msg d'erreur s'il n'y a pas de GPS int�gr�.
```js
map.on('dblclick', function addmarker(e) {....});
```
Affiche un menu sur la carte pour pr�ciser s'il s'agit d'un point de d�part ou de destination lorsqu'on double clic sur la carte.
```js
map.on("click", function() {...});
```
cache le menu lorsqu'on clic sur la carte.
```js
function hideContextMenu1(){...};
```
Cache le menu.
```js
function showContextMenu1( marker, pos,ep){...};
```
Afficher le menu sur la carte.
```js
$("#cm_debut").click(ep,function(){...};
```
Dessine un marqueur de d�part en vert sur la carte et affiche ses coordonn�es dans le 1er input text dans **Set the route** lorsqu'on choisit l'option **Definir comme d�part** dans le menu.
```js
$("#cm_fin").click(ep,function(){...};
```
Dessine un marqueur de destination en rouge sur la carte et affiche ses coordonn�es dans le 2�me input text dans **Set the route** lorsqu'on choisit l'option **Definir comme destination** dans le menu.
```js
$("#godep").click(function(){...});
```
Dessine sur la carte un marqueur de d�part avec les coordonn�es saisies � la main lorsqu'on clic sur le bouton **go en vert** dans **Set the route**.
```js
$("#godest").click(function(){...});
```
Dessine sur la carte un marqueur de destination avec les coordonn�es saisies � la main lorsqu'on clic sur le bouton **go en rouge** dans **Set the route**.
```js
$("#inverse").click(function(){...});
```
Inverse les deux marqueurs de d�part et de destination lorsqu'on clic sur le bouton avec les deux fl�ches dans **Set the route**.
```js
$("#remove").click(function(){...});
```
Supprime les marqueurs de la carte lorsqu'on clic sur le boutton **remove** dans **Set the route**.
```js
function affect(){...}
```
Affecter les coordonn�es de d�part et d'arriv�e � la variable latlng.