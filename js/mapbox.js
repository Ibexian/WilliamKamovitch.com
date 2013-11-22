var makemap = function (zoom) {
var map = L.mapbox.map('map', 'wjkamovitch.map-hcqzgwpo', {detectRetina: true}).setView([43, 14.9], zoom);
        //disable map movement
        map.touchZoom.disable();
        map.dragging.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        // disable tap handler, if present.
        if (map.tap) map.tap.disable();
        //manually remove the zoom buttons
        $(".leaflet-bar").remove();

      // Return the map 
      return map;
}

// Given a screen size, return a zoom level for mapbox.
var adaptivezoom = function(size) {
  if(size <= 589) return 1;
  else if(size <= 1190) return 2;
  return 3;
};

function checkWidth() {
  var windowSize = $(window).width();

  //Change the zoom level of the initial map load based on screen size
  var zoom = adaptivezoom(windowSize);
  map = makemap(zoom);

  //Set up our custom linked GEOJSON
  var geoJson = {
    type: 'FeatureCollection',
    features: [{
      geometry:{
        coordinates:[112.938814,28.228209],
        type:'Point'},
      properties:{
        url:'#NewOriental',
        'id':'3togyyo6',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'commercial',
        title:'New Oriental '},
      type:'Feature'
    },
    {
      geometry:{
        coordinates:[-71.253956,42.376727],
        type:'Point'},
      properties:{
        url:'#cambridge',
        'id':'lnxos0eb',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'commercial',
        title:'The Cambridge Institute'},
      type:'Feature'
    },
    {
      geometry:{
        coordinates:[-77.029716,38.8953],
        type:'Point'},
      properties:{
        url:'#NKIDP',
        'id':'xzsjc9cn',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'commercial',
        title:'North Korean International Documentation Project'},
      type:'Feature'
    },
    {
      geometry:{
        coordinates:[116.305611,39.987755],
        type:'Point'},
      properties:{
        url:'#PKU',
        'id':'xu37qi6o',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'college',
        title:'Peking University'},
      type:'Feature'
    },
    {
      geometry:{
        coordinates:[-77.046272,38.899798],
        type:'Point'},
      properties:{
        url:'#GWU',
        'id':'0l5qibch',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'college',
        title:'George Washington University'},
      type:'Feature'
    },
    {
      geometry:{
        coordinates:[-0.12889623641967773,51.52204224896724],
        type:'Point'},
      properties:{
        url:'#SOAS',
        'id':'xdtpyk00',
        'marker-color':'#505050',
        'marker-size':'medium',
        'marker-symbol':'college',
        title:'SOAS'},
      type:'Feature'
    }]
    };
  // Make the GeoJSON linkable in the same window
  map.markerLayer.setGeoJSON(geoJson);
  map.markerLayer.on('click', function(e) {
    e.layer.unbindPopup();
    window.open(e.layer.feature.properties.url,'_self');
  });
  return map;
}
//Update zoom and recenter as window is resized
var newsize = function(map) {
    return function() {
        var windowSize = $(window).width();
        var zoomLevel = adaptivezoom(windowSize);
        map.setView([43, 14.9], zoomLevel);
    }    
}                  

$(document).ready(function() {
    var map = checkWidth();
    $(window).resize(newsize(map));
});