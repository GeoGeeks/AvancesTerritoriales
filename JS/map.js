var layer, legend, ballLayer,entro = false;

var map;
require([
   
  "esri/map",
  "esri/dijit/HomeButton",
  "esri/InfoTemplate",
  "dojo/number",
  "esri/layers/FeatureLayer",
  "esri/dijit/Legend",
  "esri/renderers/smartMapping",

  "dojo/_base/array",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/data/ItemFileReadStore",
  "dijit/form/FilteringSelect",
  "dojo/parser",

  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",

  "dojo/domReady!"
   
], function (
   Map,
   HomeButton,
   InfoTemplate,
   number,
   FeatureLayer,
   Legend,
   smartMapping,
    
   array,
   dom,
   domConstruct,
   ItemFileReadStore,
   FilteringSelect,
   parser
   
) {

   parser.parse();

   var mapOptions = {
      basemap: "gray",
      center: [-73.660568, 4.228752],
      zoom: 5,
      sliderStyle: "small",
      sliderPosition: "bottom-left",
      maxZoom: 8,
      minZoom: 4
   };

   map = new Map("map", mapOptions);

   var home = new HomeButton({
        map: map
      }, "HomeButton");
      home.startup();
/*
  SERVICIO INDICADOR BASE: Población Total
*/
   var poblacionTotalFields = {
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2015": "Población 2015",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2014": "Población 2014",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2013": "Población 2013",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2012": "Población 2012",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2011": "Población 2011",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONTOTAL_2010_2015.A2010": "Población 2010"
   };

   var outFields = Object.keys(poblacionTotalFields);
   var fieldName = outFields[0];
   var url = "http://54.187.22.10:6080/arcgis/rest/services/DANE_POBLACIONTOTAL2010_2015/MapServer/0";


    PoblacionTotalLayer = new FeatureLayer(url, {
      "mode": FeatureLayer.ONDEMAND,
      "outFields": outFields.concat("DSEPP_SIG.SIGDSEPP.DepartamentosconBog.NOMBRE"),
      "opacity": 0.8
   });
   layer = PoblacionTotalLayer;
   map.addLayer(layer);

   layer.on("load", function () {
       updateAttribute();
   });


/*
  SERVICIO INDICADOR BASE: Población Juvenil
*/

   var poblacionJuvenilFields = {
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2015": "Población Juvenil 2015",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2014": "Población Juvenil 2014",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2013": "Población Juvenil 2013",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2012": "Población Juvenil 2012",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2011": "Población Juvenil 2011",
    "DSEPP_SIG.SIGDSEPP.DANE_POBLACIONJUVENIL2010_2015.A2010": "Población Juvenil 2010"
   }
   poblacionJovenLayer = new FeatureLayer("http://54.187.22.10:6080/arcgis/rest/services/DANE_POBLACIONJUVENIL2010_2015/MapServer/0", {
      "mode": FeatureLayer.ONDEMAND,
      "outFields": Object.keys(poblacionJuvenilFields).concat("DSEPP_SIG.SIGDSEPP.DepartamentosconBog.NOMBRE"),
      "opacity": 0.8
   });

   map.addLayer(poblacionJovenLayer);
   poblacionJovenLayer.on("load", function () {
       updateAttribute();
   });
   poblacionJovenLayer.hide();


/*
  SERVICIO INDICADOR BASE: PIB
*/

   var PIBFields = {
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PARTI2009_2013.A2013pr": "PIB 2013",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PARTI2009_2013.A2012p": "PIB 2012",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PARTI2009_2013.A2011": "PIB 2011",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PARTI2009_2013.A2010": "PIB 2010",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PARTI2009_2013.A2009": "PIB 2009"
   }

   PIBLayer = new FeatureLayer("http://54.187.22.10:6080/arcgis/rest/services/SINERGIA/DANE_PIB_PARTI2009_2013/MapServer/0", {
      "mode": FeatureLayer.ONDEMAND,
      "outFields": Object.keys(PIBFields).concat("DSEPP_SIG.SIGDSEPP.DepartamentosconBog.NOMBRE"),
      "opacity": 0.8
   });

   map.addLayer(PIBLayer);
   poblacionJovenLayer.on("load", function () {
       updateAttribute();
   });
   PIBLayer.hide();

/*
  SERVICIO INDICADOR BASE: PIB per cápita
*/

   var PIBPerCapitaFields = {
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PERCAPITA_2009_2013.A2013pr": "PIB  per cápita 2013",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PERCAPITA_2009_2013.A2012p": "PIB  per cápita 2012",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PERCAPITA_2009_2013.A2011": "PIB  per cápita 2011",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PERCAPITA_2009_2013.A2010": "PIB  per cápita 2010",
    "DSEPP_SIG.SIGDSEPP.DANE_PIB_PERCAPITA_2009_2013.A2009": "PIB  per cápita 2009"
   }

   PIBPerCapitaLayer = new FeatureLayer("http://54.187.22.10:6080/arcgis/rest/services/DANE_PIB_PERCAPITA009_2013/MapServer/0", {
      "mode": FeatureLayer.ONDEMAND,
      "outFields": Object.keys(PIBPerCapitaFields).concat("DSEPP_SIG.SIGDSEPP.DepartamentosconBog.NOMBRE"),
      "opacity": 0.8
   });

   map.addLayer(PIBPerCapitaLayer);
   poblacionJovenLayer.on("load", function () {
       updateAttribute();
   });
   PIBPerCapitaLayer.hide();

/*---------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------*/
   function createRenderer(field) {
      smartMapping.createClassedColorRenderer({
         layer: layer,
         field: field,
         basemap: map.getBasemap(),
         numClasses: 4,
         showOthers: true, 
         classificationMethod: "quantile"
      }).then(function (response) {
         layer.setRenderer(response.renderer);
         createLegend(map, layer, field);
         layer.redraw();
      });
   }

   function updateAttribute(){//fields) {
        var baseSeleccionado = $("#SelectorIndicadorBase").val();
        var fields;
        switch(baseSeleccionado){
          case "0":
            fields = poblacionTotalFields;
            break;
          case "1":
            fields = poblacionJuvenilFields;
            break;
          case "2":
            fields = PIBFields;
            break;
          case "3":
            fields = PIBPerCapitaFields;
            break;
        }
        map.infoWindow.hide();
        var ch = $("#SelectorPeriodoIndicadorBase").val();
        var popupTemplateUpdated = new InfoTemplate(
          "Departamento: ${DSEPP_SIG.SIGDSEPP.DepartamentosconBog.NOMBRE}",
          "<tr>"+fields[ch]+": <td>${"+ch+":NumberFormat(places:2)}</tr></td>"
        );
      
      layer.setInfoTemplate(popupTemplateUpdated);
      createRenderer(ch);
   }

   function createLegend(map, layer, field) {
      if (legend) {
         legend.destroy();
         domConstruct.destroy(dom.byId("legendDiv"));
      }

      var legendDiv = domConstruct.create("div", {
         id: "legendDiv"
      }, dom.byId("legendWrapper"));

      legend = new Legend({
         map: map,
         layerInfos: [{
            layer: layer,
            title: "Indicador: " + $("#SelectorPeriodoIndicadorBase option:selected").text()
      }]
      }, legendDiv);
      legend.startup();
   }

   var fieldNames, fieldStore, fieldSelect;
   fieldNames = {
      "identifier": "value",
      "label": "name",
      "items": []
   };
   
   array.forEach(outFields, function (f) {
       fieldNames.items.push({
          "name": poblacionTotalFields[f],
          "value": f
       });

   });

   for(var i=0; i < fieldNames.items.length; i++){
      var datos = fieldNames.items[i];
      $("#SelectorPeriodoIndicadorBase").html($("#SelectorPeriodoIndicadorBase").html()+"<option value=\""+datos.value+"\">"+datos.name +"</option>");
    }
    $("#SelectorPeriodoIndicadorBase").change(updateAttribute);


   $("#SelectorIndicadorBase").change(cambiarIndicadorBase);

   function cambiarIndicadorBase(){

    var baseSeleccionado = $("#SelectorIndicadorBase").val();
    switch (baseSeleccionado){
      case '0' :
        layer = PoblacionTotalLayer;

        outFields = Object.keys(poblacionTotalFields);
        fieldName = outFields[0];
         fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
         };
         
         array.forEach(outFields, function (f) {
             fieldNames.items.push({
                "name": poblacionTotalFields[f],
                "value": f
             });

         });
         $("#SelectorPeriodoIndicadorBase").empty();
         for(var i=0; i < fieldNames.items.length; i++){
            var datos = fieldNames.items[i];
            $("#SelectorPeriodoIndicadorBase").html($("#SelectorPeriodoIndicadorBase").html()+"<option value=\""+datos.value+"\">"+datos.name +"</option>");
          }

        updateAttribute();
        poblacionJovenLayer.hide();
        PIBLayer.hide();
        PIBPerCapitaLayer.hide();
        layer.show();
        
        break;
      case '1' :
        layer = poblacionJovenLayer;
        outFields = Object.keys(poblacionJuvenilFields);
        fieldName = outFields[0];
         fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
         };
         
         array.forEach(outFields, function (f) {
             fieldNames.items.push({
                "name": poblacionJuvenilFields[f],
                "value": f
             });

         });
         $("#SelectorPeriodoIndicadorBase").empty();
         for(var i=0; i < fieldNames.items.length; i++){
            var datos = fieldNames.items[i];
            $("#SelectorPeriodoIndicadorBase").html($("#SelectorPeriodoIndicadorBase").html()+"<option value=\""+datos.value+"\">"+datos.name +"</option>");
          }

        updateAttribute();
        PoblacionTotalLayer.hide();
        PIBLayer.hide();
        PIBPerCapitaLayer.hide();
        layer.show();
        break;
      case '2':
        layer = PIBLayer;
        outFields = Object.keys(PIBFields);
        fieldName = outFields[0];
         fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
         };
         
         array.forEach(outFields, function (f) {
             fieldNames.items.push({
                "name": PIBFields[f],
                "value": f
             });

         });
         $("#SelectorPeriodoIndicadorBase").empty();
         for(var i=0; i < fieldNames.items.length; i++){
            var datos = fieldNames.items[i];
            $("#SelectorPeriodoIndicadorBase").html($("#SelectorPeriodoIndicadorBase").html()+"<option value=\""+datos.value+"\">"+datos.name +"</option>");
          }

        updateAttribute();
        PoblacionTotalLayer.hide();
        poblacionJovenLayer.hide();
        PIBPerCapitaLayer.hide();
        layer.show();
        break;
      case '3':
        layer = PIBPerCapitaLayer;
        outFields = Object.keys(PIBPerCapitaFields);
        fieldName = outFields[0];
         fieldNames = {
            "identifier": "value",
            "label": "name",
            "items": []
         };
         
         array.forEach(outFields, function (f) {
             fieldNames.items.push({
                "name": PIBPerCapitaFields[f],
                "value": f
             });

         });
         $("#SelectorPeriodoIndicadorBase").empty();
         for(var i=0; i < fieldNames.items.length; i++){
            var datos = fieldNames.items[i];
            $("#SelectorPeriodoIndicadorBase").html($("#SelectorPeriodoIndicadorBase").html()+"<option value=\""+datos.value+"\">"+datos.name +"</option>");
          }

        updateAttribute();
        PoblacionTotalLayer.hide();
        poblacionJovenLayer.hide();
        PIBLayer.hide();
        layer.show();
        break;
    }
  }
});

function mostrarFiltros(){
  $("#divFiltros").animate({
    height: 'toggle'
  });
}

function mostrarFeedback(){
  $("#feedback").animate({
    height: 'toggle'
  });
  //$("#mostrarFeedback").hide();
}

function cargarSector(){
    require([
      "esri/layers/FeatureLayer",
      "esri/tasks/query",
      "esri/tasks/QueryTask",
      "dojo/parser",
      "dojo/ready"
    ], function (FeatureLayer,Query,QueryTask,parser,ready) {

     // parser.parse();

      ready(function(){
        var myFeatureLayer;
        cargarDatos();

        function cargarDatos(){
          myFeatureLayer = new QueryTask("http://54.187.22.10:6080/arcgis/rest/services/Capitales/MapServer/0");
          var query = new Query();
          query.returnGeometry = false;
          query.outFields = ["IdSector","Sector"];
          query.where = "1=1";
          query.returnDistinctValues=true;
          departamentos = myFeatureLayer.execute(query);
          departamentos.then(showResults);
        }

        function showResults(results) {
          $("#selectSector").html('<option value="" disabled selected>Seleccione un Sector</option>');
          for(var i=0;i<results.features.length;i++){
            var datos = results.features[i].attributes;
            $("#selectSector").html($("#selectSector").html()+"<option value=\""+datos.IdSector+"\">"+datos.Sector+"</option>");
          }
        }          
      });
    });
}

function cargarIndicador(){
  var depto = $("#selectSector").val();
  $("#selectIndicador").html("<option value=\"\" disabled selected>Seleccione un Indicador</option>");
  require([
      "esri/layers/FeatureLayer",
      "esri/tasks/query",
      "esri/tasks/QueryTask",
      "dojo/parser",
      "dojo/ready"
    ], function (FeatureLayer,Query,QueryTask,parser,ready) {

      //parser.parse();

      ready(function(){
        var myFeatureLayer;
        cargarDatos();

        function cargarDatos(){
          myFeatureLayer = new QueryTask("http://54.187.22.10:6080/arcgis/rest/services/Capitales/MapServer/0");
          var query = new Query();
          query.returnGeometry = false;
          query.outFields = ["Indicador","IdVariable"];
          query.where = "IdSector="+depto;
          query.returnDistinctValues=true;
          departamentos = myFeatureLayer.execute(query);
          departamentos.then(showResults);
        }

        function showResults(results) {
          for(var i=0;i<results.features.length;i++){
            var datos = results.features[i].attributes;
            $("#selectIndicador").html($("#selectIndicador").html()+"<option value=\""+datos.IdVariable+"\">"+datos.Indicador +"</option>");
          }
        }          
      });
    });
}

function cargarPeriodo(){
  var ind = $("#selectIndicador").val();
  $("#selectPeriodo").html("<option value=\"\" disabled selected>Seleccione un Periodo</option>");
  require([
      "esri/layers/FeatureLayer",
      "esri/tasks/query",
      "esri/tasks/QueryTask",
      "dojo/parser",
      "dojo/ready"
    ], function (FeatureLayer,Query,QueryTask,parser,ready) {

     // parser.parse();

      ready(function(){
        var myFeatureLayer;
        cargarDatos1();

        function cargarDatos1(){
          myFeatureLayer = new QueryTask("http://54.187.22.10:6080/arcgis/rest/services/Capitales/MapServer/0");
          var query = new Query();
          query.returnGeometry = false;
          query.outFields = ["Año"];
          query.where = "IdVariable="+ind;
          query.returnDistinctValues=true;
          departamentos = myFeatureLayer.execute(query);
          departamentos.then(showResults1);
        }

        function showResults1(results) {
          for(var i=0;i<results.features.length;i++){
            var datos1 = results.features[i].attributes;
            $("#selectPeriodo").html($("#selectPeriodo").html()+"<option value=\""+datos1.Año+"\">"+datos1.Año+"</option>");
          }
        }          
      });
    });
}

function cargarValores(){
  var sector = $("#selectSector").val();
  var indicador = $("#selectIndicador").val();
  var fecha = $("#selectPeriodo").val();
  var indicadorSeleccionado = $("#selectIndicador option:selected").text();
  require([
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "dojo/parser",
    "esri/InfoTemplate",
    "dojo/number",
    "dojo/ready"
  ], function(FeatureLayer, Query, QueryTask, parser, InfoTemplate, number, ready){
      ready(function(){
      if(entro)
        map.removeLayer(ballLayer);
      entro = true;

      var templateBalls = new InfoTemplate("${Nombre}", indicadorSeleccionado + " "+ fecha + ": ${Valor:NumberFormat(places:2)}");

            ballLayer = new FeatureLayer("http://54.187.22.10:6080/arcgis/rest/services/Capitales/MapServer/0",{
              mode: FeatureLayer.ONDEMAND,
              outFields: ["*"],
              infoTemplate: templateBalls
            });
            ballLayer.setDefinitionExpression("IdSector="+sector+" AND IdVariable="+indicador+" AND Año ="+fecha);
          myFeatureLayer = new QueryTask("http://54.187.22.10:6080/arcgis/rest/services/Capitales/MapServer/0");
          var query = new Query();
          query.returnGeometry = false;
          query.outFields = ["Valor"];
          query.orderByFields = ["Valor DESC"];
          query.where = "IdSector="+sector+" AND IdVariable="+indicador+" AND Año ="+fecha
          var MaxQuery  = myFeatureLayer.execute(query);
          MaxQuery.then(showResults1);

        function showResults1(results) {
          console.log(sector, indicador, fecha);
          var max = results.features[0].attributes;
          var sizeInfo = {
            field:"Valor",
            valueUnit: "meters",
            minSize: 5,
            maxSize: 20,
            minDataValue: 0,
            maxDataValue: max.Valor
          };
          ballLayer.renderer.setSizeInfo(sizeInfo);
          map.addLayer(ballLayer);
        }
    });
  });
}