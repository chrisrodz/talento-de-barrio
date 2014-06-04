var map, municipalitieSearch = []

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

/* Overlay Layers */
var municipalities = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    municipalitieSearch.push({
      name: layer.feature.properties.NAME,
      source: "municipalities",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("data/municipalities.geojson", function (data) {
  municipalities.addData(data);
});

var murders = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_murder.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Asesinato",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Asesinato"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL');+ "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Asesinato");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var rapes = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_rape.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Violación",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Violación"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL');+ "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Violación");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var thefts = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_theft.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Robo",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Robo"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Robo");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var aggressions = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_aggression.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Agresión Agravada",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Agresión Agravada"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Agresión Agravada");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var breakins = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_break_in.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Escalamiento",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Escalamiento"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Escalamiento");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var misappropriations = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_misappropriation.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Apropiación Ilegal",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Apropiación Ilegal"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Apropiación Ilegal");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var carjackings = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_carjacking.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Vehículo Hurtado",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Vehículo Hurtado"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Vehículo Hurtado");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
        layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
});

var fires = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/marker_fire.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: "Fuego",
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Delito</th><td>" + "Fuego"+ "</td></tr>" + "<tr><th>Fecha</th><td>" + moment(feature.properties.time, "YYYY-MM-DD,HH:mm:ss.sssZ").format('LLL'); + "</td></tr>" + "</table>";
      if (document.body.clientWidth <= 767) {
        layer.on({
          click: function (e) {
            $("#feature-title").html("Fuego");
            $("#feature-info").html(content);
            $("#featureModal").modal("show");
          }
        });

      } else {
          layer.bindPopup(content, {
          maxWidth: "auto",
          closeButton: false
        });
      }
    }
  }
}); 

var request = "http://data.pr.gov/resource/uaij-e68c?$select=genero, count(genero)&$group=genero";
$.getJSON(request, function (data) {
  var male_total = parseInt(data[1]["count_genero"],10);
  var female_total = parseInt(data[2]["count_genero"],10);
  $("#male_total").html("<b>"+male_total+"</b>");
  $("#female_total").html("<b>"+female_total+"</b>");

  //$("#total_genres").html("<b>"+(fire_total)+"</b>");
  //Create chart

  var data = [
    {
      name: 'Masculino',
      y: male_total,
      color: '#F2142B'
    },
    {
      name: 'Femenino',
      y: female_total,
      color: '#F10088'
    }
  ];
  drawChart(data);

});

map = L.map("map", {
  center: [18.258720, -66.473524],
  layers: [mapquestOSM]
});

/* Larger screens get expanded layer control */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Street Map": mapquestOSM,
  "Aerial Imagery": mapquestOAM,
  "Imagery with Streets": mapquestHYB
};

var overlays = {
  //"Pueblos": municipalities,
  "<img src='assets/img/marker_murder.png' width='24' height='28'>&nbsp;Asesinatos": L.geoJson(),
  "<img src='assets/img/marker_rape.png' width='24' height='28'>&nbsp;Violaciones": L.geoJson(),
  "<img src='assets/img/marker_theft.png' width='24' height='28'>&nbsp;Robos": L.geoJson(),
  "<img src='assets/img/marker_aggression.png' width='24' height='28'>&nbsp;Agresión Agravada": L.geoJson(),
  "<img src='assets/img/marker_break_in.png' width='24' height='28'>&nbsp;Escalamientos": L.geoJson(),
  "<img src='assets/img/marker_misappropriation.png' width='24' height='28'>&nbsp;Apropiación Ilegal": L.geoJson(),
  "<img src='assets/img/marker_carjacking.png' width='24' height='28'>&nbsp;Vehículos Hurtados": L.geoJson(),
   "<img src='assets/img/marker_fire.png' width='24' height='28'>&nbsp;Fuego": L.geoJson()
};

var layerControl = L.control.layers(baseLayers, overlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Add overlay layers to map after defining layer control to preserver order */
map.addLayer(municipalities);

var sidebar = L.control.sidebar("sidebar", {
  closeButton: true,
  position: "left"
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  map.fitBounds(municipalities.getBounds());
  $("#loading").hide();

  var municipalitiesBH = new Bloodhound({
    name: "municipalities",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: municipalitieSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&country=PR&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  municipalitiesBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "municipalities",
    displayKey: "name",
    source: municipalitiesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Pueblos</h4>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "municipalities") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

/* Placeholder hack for IE */
if (navigator.appName == "Microsoft Internet Explorer") {
  $("input").each(function () {
    if ($(this).val() === "" && $(this).attr("placeholder") !== "") {
      $(this).val($(this).attr("placeholder"));
      $(this).focus(function () {
        if ($(this).val() === $(this).attr("placeholder")) $(this).val("");
      });
      $(this).blur(function () {
        if ($(this).val() === "") $(this).val($(this).attr("placeholder"));
      });
    }
  });
}

//**************************************************************************

function drawChart(data){
  $('#container').highcharts({
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
      },
      title: {
          text: 'Generos'
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '{point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
      },
      series: [{
          type: 'pie',
          name: 'Crimen',
          data: data
      }]
  });
}
