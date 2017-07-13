var map;
var ubicaciones = new Array();
var aux_lugares = new Array();
var lugares ;
var longitud;
var latitud;
var total_unidades;
var posChain = new Array();
var latitud_real;
var longitud_real;
var mi_ubi;
var id;
var dist = new Array();
aux_ordenado = new Array();


    document.addEventListener("deviceready", function() {

     document.addEventListener("backbutton", retornar, false);
     var altoVentana =  window.innerHeight - 0; //para poner header
     $("div#map_canvas").css("height" , altoVentana);
      var div = document.getElementById("map_canvas");
      // Initialize the map view
    if(localStorage.ultima_ubicacion_lat != undefined && localStorage.ultima_ubicacion_lng != undefined){
        map = plugin.google.maps.Map.getMap(div,
         {
              'backgroundColor': 'white',
              'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': false,
                'zoom': true
              },
              'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
              },
              'camera': {
                'latLng': new plugin.google.maps.LatLng(localStorage.ultima_ubicacion_lat,localStorage.ultima_ubicacion_lng),
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
              }
            }
      );

     }else{
                map = plugin.google.maps.Map.getMap(div,
         {
              'backgroundColor': 'white',
              'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': false,
                'zoom': true
              },
              'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
              },
              'camera': {
                'latLng': new plugin.google.maps.LatLng(-33.0441224, -71.60702),
                'tilt': 30,
                'zoom': 16,
                'bearing': 50
              }
            }
      );

     }
      map.setDebuggable( false );
      map.setClickable(true);
//      map.setCenter(map.getMyLocation());

      // Wait until the map is ready status.
      map.addEventListener(plugin.google.maps.event.MAP_READY, drawOnMap);
      map.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
      getLocation();
    }, false);



function drawOnMap()
{
/*  //  $('#preloader').fadeOut();
    if(!localStorage.ubicaciones_0)*/
        cargar_unidades();
/*    else if(localStorage.ubicaciones_0)
        recuperar_unidades();*/
}

function fadeOut()
{
$('#preloader').fadeOut();
}

var iconSize = {
  width: 92,
  height: 148
};

// Colores para marcadores:
/*
Mil científicos mil aulas : #DF0101
Día de la ciencia en mi colegio: #DF7401
Charlas: #088A85
Exposiciones interactivas: #A5DF00
Fiesta de la ciencia : #01DFD7
Espacios abiertos: #013ADF
Ferias comunales: #8000FF
Cine científico: #848484

*/

function addMarkers_todos()
{
    $('#preloader').fadeIn();
    setTimeout(fadeOut, 2000);
    if(localStorage.mi_ubi)
    {
    mi_ubi = JSON.parse(eval('localStorage.mi_ubi'));
    latitud = mi_ubi.lat;
    longitud = mi_ubi.lng;
    var current = {lat: latitud, lng: longitud};
    }
    else{
    var current={lat: -33.0441224 , lng: -71.60702};
    }

                    map.clear();


            for(var i = 0; i<aux_lugares.length;i++){
                var snippet =  'Dirección: ' + aux_lugares[i].Direccion + ' ~ Categoria:  ' + aux_lugares[i].Categoria;
                var telefonos = aux_lugares[i].Telefono;
                var long = aux_lugares[i].Longitud;
                var lat= aux_lugares[i].Latitud;
                id = aux_lugares[i].Id;
                lat = lat.replace(/,/g, '.');
                long = long.replace(/,/g, '.');
                coords = {latitude: lat, longitude: long };
                       // telefonos = 'tel:' + telefonos ;
                    //Para iOS telefonos = 'tel://' + telefonos ;
                        //Carabineros
                        if(aux_lugares[i].Tipo == 1){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                          var marker =   map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color': aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                                });
                        } else if(aux_lugares[i].Tipo == 2){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                            map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color': aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                            });
                        } else if(aux_lugares[i].Tipo == 3){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                            map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                            });
                        } else if(aux_lugares[i].Tipo == 5){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                            map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                            });
                        } else if(aux_lugares[i].Tipo == 4){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                            map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                            });
                        }else if(aux_lugares[i].Tipo == 6){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                          var marker =   map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                                });
                        }else if(aux_lugares[i].Tipo == 7){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                          var marker =   map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '80%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                                });
                        }else if(aux_lugares[i].Tipo == 8){
                            var locObj = new plugin.google.maps.LatLng(aux_lugares[i].Latitud,aux_lugares[i].Longitud);
                          var marker =   map.addMarker({
                                   'position': locObj,
                                   'icon': aux_lugares[i].Color,
                                   'title': aux_lugares[i].Nombre,
                                   'snippet': snippet,
                                   'myMsg':aux_lugares[i].Id,
                                   'animation': plugin.google.maps.Animation.DROP,
                                   'styles': {
                                        'text-align':'left',
                                        'font-weight': 'bold',
                                        'color':aux_lugares[i].Color,
                                        'maxWidth': '90%'
                                   }
                            }, function(marker) {
                                marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function(marker) {
                                                            unidad = marker.get("snippet");
                                                            titulo = marker.get("title");
                                                            coords = marker.get("position");
                                                            getEventoById(marker.get("myMsg"));
                                  });
                                });
                        }


                    }


}


//GET LOCATION
function getLocation(){

var geolocationSuccess = function (position){
      latitud_real = position.coords.latitude ;
      longitud_real = position.coords.longitude;
      map.setCenter(new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude));
    };
var onError = function(msg) {
};

var onSuccess = function(position) {
  var msg = ["Usted está aquí"].join("\n");
  map.setCenter(new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude));
  map.addMarker({
    'position': new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    'title': msg
  }, function(marker) {
    mi_ubi = marker.get("position");
    localStorage.setItem('mi_ubi' ,JSON.stringify(mi_ubi));
  });
};

navigator.geolocation.getCurrentPosition(onSuccess, onError);




}


//Carga de unidades de base de datos
	function cargar_unidades()
			{
					var term = {button:"Lugares", Tipo: "Todas"};
					$.ajax({
					url:'http://appexplora.informaticapucv.cl/conexion.php',
					type:'POST',
					data:term,
					dataType:'json',
					error:function(jqXHR,text_status,strError){
						  console.log(strError +  ' ' +text_status + ' ' + jqXHR);
                        },
							timeout:15000,
									success:function(data){
									 lugares = data;
                                     total_unidades = lugares.length;
                                     guardar_unidades(lugares);
                                      //addMarkers_todos(lugares);
                                    }
					       });
            }

function guardar_unidades(lugares)
{

      localStorage.setItem('total_unidades', total_unidades);
      aux_lugares = lugares;
      for (i = 0; i < localStorage.total_unidades;i++){
          ubicaciones[i] =  lugares[i] ;
          localStorage.setItem('ubicaciones_' + i ,JSON.stringify(ubicaciones[i]));
      }
    addMarkers_todos();
}

function recuperar_unidades()
{
      for (var i = 0; i < localStorage.total_unidades;i++){
            aux_lugares[i] = JSON.parse(eval('localStorage.ubicaciones_' + i));
      }
        addMarkers_todos();
}


//BUSQUEDAS ANTIGUAS

function findByNameLug (searchKey, callback) {
    if(searchKey != '' && searchKey != undefined){
        var _lugares = aux_lugares.filter(function(element) {
            var fullName = element.Direccion +  element.Nombre +  element.Tipo;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLaterLug(callback, _lugares);
    }
}

function callLaterLug (callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
}

//Mostrar Unidades encontradas

function Mostrar_Comisarias () {



    //findByNamePer($('#buscar').val(), function(Personas) {
        var elem = '';
        findByNameLug($('#buscar').val(), function(aux_lugares) {
            for (i = 0; i < aux_lugares.length;i++){
                lat = aux_lugares[i]["Latitud"];
                lng = aux_lugares[i]["Longitud"];
                id = aux_lugares[i]["Id"];
				elem = elem  + '<div class="nav-item">';
                elem = elem + '   <a onclick="centrarPorLugar_cercano('+lat+','+lng+','+id+')" >';
				elem = elem +  '<span class="titulo_lista">'+aux_lugares[i]["Nombre"] + '</span>';
				elem = elem  + '<span style="display:inline-flex" class="fa fa-angle-right"></span>';
				elem = elem + '    </a>';
				elem = elem + '     </div>';

         }
//style="display:inline-block;text-overflow: ellipsis; overflow:hidden; width:75%;white-space: nowrap;" estilo del texto de busqueda de respaldo
        $('#lugares-list').html(elem);
    });

    }




function centrarPorLugar(lat,lng)
{
    var pos = new plugin.google.maps.LatLng(lat,lng);
    map.setCenter(pos);
}


function EncontrarLugar () {

    findByNameLug($('#buscar').val(), function(aux_lugares) {
        var elem = '';
        var pos = '';
        for (i = 0; i < aux_lugares.length;i++){
            if( aux_lugares[i].Tipo<6 && aux_lugares[i].Latitud!=0 && aux_lugares[i].Longitud!=0){

                lat = aux_lugares[i]["Latitud"];
                lng = aux_lugares[i]["Longitud"];
                id = aux_lugares[i]["Id"];
                elem = elem  + '<div class="titulo_lista"> ';
                elem = elem + '   <a onclick="centrarPorLugar_cercano('+lat+','+lng+','+ id +')" >';
                elem = elem +  '<span class="titulo_lista">' + aux_lugares[i]["Nombre"] + '</span>' ;
                elem = elem  + '&nbsp;<i style="float:right !important" class="fa fa-angle-right"></i>&nbsp;';
                elem = elem + '    </a>';
                elem = elem + '     </div><hr class="hr">';
            }
         }

        $('#lugares-list').html(elem);
        $('#lugares-list').each(function() { $(this).children('div').slice(6).hide(); });

    });


 }

// Funciones para el calculo de la ruta en servicio externo


function onConfirm(buttonIndex, unidad, coords){
    var valores = unidad.split('~');
    var direccion = valores[0];
    var telefono = valores[1];
    telefono = telefono.replace(/\D/g,'');

    if(buttonIndex == 1){
        var onSuccess = function(telefono){
        }
        var onError = function(telefono){
            alert('error:  '+ telefono);
        }
        window.plugins.CallNumber.callNumber(onSuccess, onError, telefono, true);
    } else if(buttonIndex == 2){
        var ubicacion = mi_ubi.lat + ',' + mi_ubi.lng;
        plugin.google.maps.external.launchNavigation({
          "from": ubicacion,
          "to": coords
        });
    } else if(buttonIndex == 3){
        return;
    }
}

function showConfirm(unidad, titulo, coords){
    navigator.notification.confirm(
        'Opciones de unidad',
        function(buttonIndex)
        {

            onConfirm(buttonIndex, unidad, coords)
        },
        titulo,
        ['Llamar','Ruta hasta aquí', 'Salir']
    );
}

//para ir a la noticia y pasar su id
function getEventoById(id) {
      map.setClickable( false );
        map.clear();
        map.remove();
            location.href = "event.html?id="+id;

}
