/*************************Accordian Controls*******************************/
    
$(document).ready(function(){
  $(".accordion-panel").hide(); 
  $(".accordion").click(function(){ 
    $(this).parent().find(".fa-arrow-circle-down").toggleClass("up");
    $(this).parent().find(".fa-arrow-circle-right").toggleClass("up");  
    $(this).parent().find(".accordion-panel").slideToggle("slow");
    $(this).parent().find(".accordion h4").toggleClass("pressed");
    //$(this).parent().find(".accordion").toggleClass("pressed");   
    //panelCheck();
  });
}); 

/********************Toggle Sidebar Controls***********************/

$(document).ready(function(){
    $("#toggle").click(function(){
        $("#sidebar").toggleClass('active');
    })
})

$(document).ready(function(){
    $("#toggleTwo").click(function(){
        $("#sidebarTwo").toggleClass('active');
    })
})

/********************Load Chart.js***********************/

const options = {
  dojoConfig: {
    async: true,
    packages: [
      {
        location:
          "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",
        name: "Chart", 
      },
    ],
  },
};

////////////////Start Arcgis JS////////////////

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/PopupTemplate",
  "esri/widgets/Feature",
  "esri/widgets/Home",
  "esri/widgets/Expand",
  "esri/widgets/Search",
  "esri/tasks/Locator",    
  "esri/layers/WebTileLayer",
  "esri/tasks/support/Query",
  "esri/core/watchUtils",    
  "esri/Graphic",    
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
   
  "dojo/domReady!",
], function (Map, MapView, FeatureLayer, PopupTemplate, Feature, Home, Expand, Search, Locator, WebTileLayer, Query, watchUtils, Graphic, Chart) {
  
    var map = new Map(
    //basemap: "dark-gray",
    );   

  var view = new MapView({
    container: "viewDiv",
    map: map,
    constraints: {  
        minScale: 18489298,  
        maxScale: 4514,
    },
    zoom: 5,
    center: [-98.582834, 38.218713],  
    popup: {
      dockEnabled: false,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
      },
    },
  });
      
  view.ui.move("zoom", 'bottom-left'); 
    
  const aboutElement = document.getElementById("aboutDiv");    
    
  var homeWidget = new Home({
     view: view 
  }); 
    
  var expandWidget = new Expand({
      view: view,
      content: aboutElement,
      expandIconClass: "esri-icon-question",
  });    
    
    var citySearch = new Search({
      view: view,
      includeDefaultSources: false,
      container: "citySearch",
      popupEnabled: false,
      locationEnabled: false,    
      sources: [
        {
          locator: new Locator({
            url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" 
          }),
          countryCode: "US",
          name: "LocatorSearchSource",
          zoomScale: 288895,
          placeholder: "Search for Address or City",
                resultSymbol: {
                    type: "simple-marker", 
                    style: "circle",
                    color: "#00FFFFFF",
                    size: 15,  
                    outline: {  
                    color: "#009e96",
                    width: 5 
                }                   
           }    
        }
      ]
    });

  view.ui.add(homeWidget, "bottom-left");   
    
  view.ui.add(expandWidget, "bottom-right");    

//////////////////Add Carto Basemaps///////////////    
    
    var cartoBasemap = new WebTileLayer({
          urlTemplate: 'http://{subDomain}.basemaps.cartocdn.com/light_nolabels/{level}/{col}/{row}.png',
          subDomains: ["a","b","c"],
          copyright: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          visible: true
        });
    
    var cartoBasemapTwo = new WebTileLayer({
          urlTemplate: 'http://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}.png',
          subDomains: ["a","b","c"],
          copyright: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          visible: false
        });

    view.when().then(function() {     
        view.watch("scale", function(newValue) {
        cartoBasemap.visible = newValue <= 144448 ? false : true;
        cartoBasemapTwo.visible = newValue >= 144448 ? false: true;    
      });
    });  

//////////////////Add HTC Ind. Project Layer//////////////
        
const htcA = {
  type: "simple-marker", 
  style: "circle",
  color: "#ff1417",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1 
  }
};  

const htcB = {
  type: "simple-marker", 
  style: "circle",
  color: "#ff6611",
  size: 7,
  outline: {  
    color: [0,0,0, 1],
    width: 1 
  }
};  

const htcC = {
  type: "simple-marker",  
  style: "circle",
  color: "#ff8844",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1  
  }
};

const htcD = {
  type: "simple-marker", 
  style: "circle",
  color: "#ffee55",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1  
  }
};

const htcE = {
  type: "simple-marker", 
  style: "circle",
  color: "#fefe38",
  size: 7, 
  outline: { 
    color: [64, 64, 64, .9],
    width: 1  
  }
};

const htcF = {
  type: "simple-marker",  
  style: "circle",
  color: "#ffff99",
  size: 7,  
  outline: { 
    color: [64, 64, 64, .9],
    width: 1 
  }
};

const htcG = {
  type: "simple-marker", 
  style: "circle",
  color: "#aacc22",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1 
  }
};
    
const htcH = {
  type: "simple-marker", 
  style: "circle",
  color: "#bbdd77",
  size: 7,  
  outline: { 
    color: [64, 64, 64, .9],
    width: 1
  }
};
    
const htcI = {
  type: "simple-marker", 
  style: "circle",
  color: "#c8cf82",
  size: 7,  
  outline: { 
    color: [64, 64, 64, .9],
    width: 1 
  }
};
    
const htcJ = {
  type: "simple-marker",  
  style: "circle",
  color: "#92a77e",
  size: 7,
  outline: { 
    color: [64, 64, 64, .9],
    width: 1 
  }
};
    
const htcK = {
  type: "simple-marker", 
  style: "circle",
  color: "#5599ee",
  size: 7, 
  outline: { 
    color: [64, 64, 64, .9],
    width: 1 
  }
};
    
const htcL = {
  type: "simple-marker", 
  style: "circle",
  color: "#0088cc",
  size: 7,  
  outline: { 
    color: [64, 64, 64, .9],
    width: 1  
  }
};
    
const htcM = {
  type: "simple-marker",  
  style: "circle",
  color: "#226688",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1  
  }
};
    
const htcN = {
  type: "simple-marker",  
  style: "circle",
  color: "#175279",
  size: 7,  
  outline: { 
    color: [64, 64, 64, .9],
    width: 1  
  }
};    
    
const htcO = {
  type: "simple-marker",  
  style: "circle",
  color: "#557777",
  size: 7, 
  outline: {  
    color: [64, 64, 64, .9],
    width: 1  
  }
};
    
const htcP = {
  type: "simple-marker",  
  style: "circle",
  color: "#ddbb33",
  size: 7,  
  outline: {  
    color: [64, 64, 64, .9],
    width: 1 
  }
};
    
const htcQ = {
  type: "simple-marker",  
  style: "circle",
  color: "#d3a76d",
  size: 7, 
  outline: { 
    color: [64, 64, 64, .9],
    width: 1  
  }
};    
    
const htcProjRenderer = {
  type: "unique-value",
  field: "projuse3",   
  legendOptions: {
    title: "HTC Project Type"
  }, 
  uniqueValueInfos: [{
    value: "Bank",
    symbol: htcA,
    label: "Bank"
  }, {
    value: "Barn",
    symbol: htcB,
    label: "Barn"
  }, {
    value: "Church",
    symbol: htcC,
    label: "Church"
  }, {
    value: "Club",
    symbol: htcD,
    label: "Club"
  }, {
    value: "Commercial",
    symbol: htcE,
    label: "Commercial"
  }, {
    value: "Hospital",
    symbol: htcF,
    label: "Hospital"
  }, {
    value: "Hotel",
    symbol: htcG,
    label: "Hotel"
  }, {
    value: "Housing",
    symbol: htcH,
    label: "Barn"
  }, {
    value: "Housing (2)",
    symbol: htcI,
    label: "Church"
  }, {
    value: "Housing (3)",
    symbol: htcJ,
    label: "Club"
  }, {
    value: "Industrial",
    symbol: htcK,
    label: "Commercial"
  }, {
    value: "Multi-Use",
    symbol: htcL,
    label: "Hospital"
  }, {
    value: "Not Reported",
    symbol: htcM,
    label: "Hospital"
  }, {
    value: "Office",
    symbol: htcN,
    label: "Hotel"
  }, {
    value: "Other",
    symbol: htcO,
    label: "Barn"
  }, {
    value: "School",
    symbol: htcP,
    label: "Church"
  }, {
    value: "Theatre",
    symbol: htcQ,
    label: "Club"
  }],
};  
    
const htcProjLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/HTC_Projects_All_2002_2019/FeatureServer",
    outFields: ["*"],
    minScale: 144448.0,
    //visible: true,
    title: "htcProjects",
    renderer: htcProjRenderer,
    labelingInfo: [],
    popupEnabled: false,
    popupTemplate: {
        outFields: ["*"],
        title: "{address}",
        content: function (feature) {
            return setContentInfoOne(feature.graphic.attributes);
        },
      }
});    
    
function setContentInfoOne(results) {
    
    document.getElementById("sidebarTwo").classList.add('active');
    document.getElementById("sidebar").classList.remove('active');
    
    document.getElementById("toggleTwo").checked = true;
    document.getElementById("toggle").checked = false;

    var projName = (
        results.proj_name == ' ' ? 'Project Name Unavailable' : results.proj_name
    );
    
    var totQreAmt = results.qre_tot.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totDevAmt = results.totdevamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totFedAmt = results.fedhtcamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    
    // Create a new canvas element, this is where the graph will be placed.
    var popupElement = document.getElementById("info-div-two");
    popupElement.innerHTML = "<div><h2>" + results.address + "</h2></div><hr><table style='margin-top: 8px;'><tbody><tr><td width='40%'><h5>Project Name: </h5></td><td width='60%'><h4>" + projName + "</h4></td></tr><tr><td width='40%'><h5>City/State: </h5></td><td width='60%'><h4>" + results.city + ", " + results.statename + "</h4></td></tr><tr><td width='40%'><h5>Part 3 Completion: </h5></td><td width='60%'><h4>" + results.cy + "</h4></td></tr><tr><td width='40%'><h5>Project Type: </h5></td><td width='60%'><h4>" + results.projuse3 + "</h4></td></tr><tr><td width='40%'><h5>Total Development Amount: </h5></td><td width='60%'><h4>" + "$" + totDevAmt + "</h4></td></tr><tr><td width='40%'><h5>Qualifying Rehab Expenses: </h5></td><td width='60%'><h4>" + "$" + totQreAmt + "</h4></td></tr><tr><td width='40%'><h5>Fed HTC Amount: </h5></td><td width='60%'><h4>" + "$" + totFedAmt + "</h4></td></tr></tbody></table>";
    
    return popupElement;
    
  } 
    
view.when().then(function() {
      const graphic = {
        popupTemplate: {
          content: ""
        }
      };

        const feature = new Feature({
            container: "feature-node",
            graphic: graphic,
            map: view.map,
            spatialReference: view.spatialReference
        });    
    
        view.whenLayerView(htcProjLayer).then(function(layerView1) {
            let highlight;
            // listen for the pointer-move event on the View
            view.on("click", function(event) {
              // Perform a hitTest on the View
              view.hitTest(event).then(function(event) {

                let results = event.results.filter(function(result) {
                  return result.graphic.layer.popupTemplate;
                });
                let result = results[0]; 
                highlight && highlight.remove();

                if (result) {
                  feature.graphic = result.graphic;
                  highlight = layerView1.highlight(result.graphic);
                } else {
                  feature.graphic = graphic;   
                  $("#sidebarTwo").removeClass('active');  
                }
                $(document).ready(function(){
                    $("#toggleTwo").click(function(){
                        highlight.remove(result.graphic);
                    })
                })  
              });
            });  
        });
    });

//////////////////Add HTC Grouped Layer///////////////////
        

const HTCSymbol = {
  type: "simple-marker",
  color: [229, 88, 37, 0.8],
  outline: {
    color: [128,128,128,0.8],
    width: 1.5
  }
};

const htcGroupSmall = {
  type: "simple", 
  symbol: {
      type: "simple-marker", 
      color: [229, 88, 37, 0.8],
      outline: {
        color: [128,128,128,0.8],
        width: .75
      }
    },
  visualVariables: [
    {
      type: "size",
      field: "Join_Count",
      legendOptions: {
        title: "% population in poverty by county"
      },
      stops: [
        {
          value: 1,
          size: 2,
          label: "1"
        },
        {
          value: 5,
          size: 4,
          label: "2-5"
        },
        {
          value: 10,
          size: 8,
          label: "6-10"
        },
        {
          value: 1022,
          size: 10,
          label: "11+"
        }
      ]
    }
  ]
};
    
const htcGroupMed = {
  type: "simple", 
  symbol: {
      type: "simple-marker", 
      color: [229, 88, 37, 0.8],
      outline: {
        color: [128,128,128,0.8],
        width: .75
      }
    },
  visualVariables: [
    {
      type: "size",
      field: "Join_Count",
      stops: [
        {
          value: 1,
          size: 3,
          label: "1"
        },
        {
          value: 5,
          size: 8,
          label: "2-5"
        },
        {
          value: 10,
          size: 10,
          label: "6-10"
        },
        {
          value: 1022,
          size: 15,
          label: "11+"
        }
      ]
    }
  ]
};

const htcGroupLarge = {
  type: "simple",
  symbol: {
      type: "simple-marker", 
      color: [229, 88, 37, 0.8],
      outline: {
        color: [128,128,128,0.8],
        width: 1.5
      }
    },
  visualVariables: [
    {
      type: "size",
      field: "Join_Count",
      legendOptions: {
        title: "% population in poverty by county"
      },
      stops: [
        {
          value: 1,
          size: 5,
          label: "1"
        },
        {
          value: 5,
          size: 11,
          label: "2-5"
        },
        {
          value: 10,
          size: 16,
          label: "6-10"
        },
        {
          value: 1022,
          size: 22,
          label: "11+"
        }
      ]
    }
  ]
};
     
/////////////////// Number Labels ////////////////////

const htcNumbSSS = {    //Labeling for points that have a join count of 1 - SMALL SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 8,
      weight: "normal"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count = 1, '', '')"
  }
};  

const htcNumbSLS = {    //Labeling for points that have a join count of 1 - LARGE SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 9,
      weight: "normal"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count = 1, '', '')"
  }
};  

const htcNumbMSS = {    //Labeling for points that have a join count between 2 and 6 - SMALL SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 6,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count >= 2 && $feature.Join_Count <= 6, $feature.Join_Count, '')"
  }
};   

const htcNumbMLS = {    //Labeling for points that have a join count between 2 and 6 - LARGE SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 8,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count >= 2 && $feature.Join_Count <= 6, $feature.Join_Count, '')"
  }
};  

const htcNumbLSS = {    //Labeling for points that have a join count greater than 6 - SMALL SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 5,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.Join_Count, '')"
  }
};

const htcNumbLLS = {    //Labeling for points that have a join count greater than 6 - LARGE SCALE//
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 7,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.Join_Count, '')"
  }
}; 

const htcNumbXLSS = {    //Labeling for points that have a join count greater than 6 - SMALL SCALE - //
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 10,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.Join_Count, '')"
  }
};

const htcNumbXLLS = {    //Labeling for points that have a join count greater than 6 - LARGE SCALE//
  symbol: {
    type: "text", 
    color: "#fff",
    haloColor: "white",
    haloSize: 0,  
    font: { 
      family: "Arial",
      size: 10,
      weight: "bold"
    }
  },   
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.Join_Count, '')"
  }
};   

///////////////// City Name Labels //////////////////// 

const htcTxtS = {    // City labeling for points that have a join count less than 2 //
  symbol: {
    type: "text", 
    color: "#000",
    haloColor: "white",
    haloSize: 2,  
    font: { 
      family: "Arial",
      size: 8,
      weight: "normal"
    }
  },   
  labelPlacement: "below-left",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count < 2, $feature.city, '')"
  }
};   

const htcTxtM = {    
  symbol: {
    type: "text", 
    color: "#000",
    haloColor: "white",
    haloSize: 2,  
    font: { 
      family: "Arial",
      size: 9,
      weight: "normal"
    }
  },   
  labelPlacement: "below-left",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count >= 2 && $feature.Join_Count < 6, $feature.city, '')"
  }
};

const htcTxtL = {    
  symbol: {
    type: "text", 
    color: "#000",
    haloColor: "white",
    haloSize: 2,  
    font: { 
      family: "Arial",
      size: 11,
      weight: "bold"
    }
  },   
  labelPlacement: "above-left",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.city, '')"
  }
};  


const htcTxtXL = {    
  symbol: {
    type: "text", 
    color: "#000",
    haloColor: "white",
    haloSize: 2,  
    font: { 
      family: "Arial",
      size: 8,
      weight: "bold"
    }
  },   
  labelPlacement: "above-left",
  labelExpressionInfo: {
    expression: "IIF ($feature.Join_Count > 6, $feature.city, '')"
  }
};       
      
const htc = new FeatureLayer({
    url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/City_HTCs_Grouped_EconData/FeatureServer",
    outFields: ["*"],
    renderer: htcGroupSmall,
    labelingInfo: [],
    maxScale: 144448.1,
    popupEnabled: false,
    popupTemplate: {
        outFields: ["*"],
        title: "{city_sta_1}",
        content: function (feature) {
            return setContentInfoTwo(feature.graphic.attributes);
        },
      }
});
    
///////////////////Create Scale Dependent HTC Group Renderers///////////////////          
        
view.when().then(function() {     
    view.watch("scale", function(newValue) {
      if (newValue >=72224 && newValue <= 4622324) {
        return htc.renderer = htcGroupLarge;  
      } else if (newValue > 4622324 && newValue <=9244649) { 
        return htc.renderer = htcGroupMed;
	} else if (newValue > 9244649) { 
        return htc.renderer = htcGroupSmall
      } else {
        return htc.renderer = htcGroupSmall;
      } 
  });
});

view.when().then(function() {     
    view.watch("scale", function(newValue) {
      if (newValue >= 72224 && newValue <= 4622324) {
        return htc.labelingInfo = [htcNumbXLLS, htcNumbMLS, htcTxtL, htcTxtM, htcTxtS];   
      } else if (newValue > 4622324 && newValue <= 9244649) {
        return htc.labelingInfo = [/*htcNumbMLS,*/ htcNumbLLS, htcTxtXL];
      } else if (newValue > 9244649) { 
        return htc.labelingInfo = [];
      } else {
        return htc.labelingInfo = [];
      } 
  });
});   
    
function setContentInfoTwo(results) {
    
    document.getElementById("sidebar").classList.add('active');
    document.getElementById("sidebarTwo").classList.remove('active');
    
    document.getElementById("toggle").checked = true;
    document.getElementById("toggleTwo").checked = false;
    
    document.getElementById("htc-info-div").style.display = "none";
    
    var htc2000 = results.qre2000 * .20;
    var htc2001 = results.qre2001 * .20;
    var htc2002 = results.qre2002 * .20;
    var htc2003 = results.qre2003 * .20;
    var htc2004 = results.qre2004 * .20;
    var htc2005 = results.qre2005 * .20;
    var htc2006 = results.qre2006 * .20;
    var htc2007 = results.qre2007 * .20;
    var htc2008 = results.qre2008 * .20;
    var htc2009 = results.qre2009 * .20;
    var htc2010 = results.qre2010 * .20;
    var htc2011 = results.qre2011 * .20;
    var htc2012 = results.qre2012 * .20;
    var htc2013 = results.qre2013 * .20;
    var htc2014 = results.qre2014 * .20;
    var htc2015 = results.qre2015 * .20;
    var htc2016 = results.qre2016 * .20;
    var htc2017 = results.qre2017 * .20;
    var htc2018 = results.qre2018 * .20;
    var htc2019 = results.qre2019 * .20;

    var totdev2000 = results.qre2000 * 1.15;
    var totdev2001 = results.qre2001 * 1.15;
    var totdev2002 = results.qre2002 * 1.15;
    var totdev2003 = results.qre2003 * 1.15;
    var totdev2004 = results.qre2004 * 1.15;
    var totdev2005 = results.qre2005 * 1.15;
    var totdev2006 = results.qre2006 * 1.15;
    var totdev2007 = results.qre2007 * 1.15;
    var totdev2008 = results.qre2008 * 1.15;
    var totdev2009 = results.qre2009 * 1.15;
    var totdev2010 = results.qre2010 * 1.15;
    var totdev2011 = results.qre2011 * 1.15;
    var totdev2012 = results.qre2012 * 1.15;
    var totdev2013 = results.qre2013 * 1.15;
    var totdev2014 = results.qre2014 * 1.15;
    var totdev2015 = results.qre2015 * 1.15;
    var totdev2016 = results.qre2016 * 1.15;
    var totdev2017 = results.qre2017 * 1.15;
    var totdev2018 = results.qre2018 * 1.15;
    var totdev2019 = results.qre2019 * 1.15;
    
    var joinCountEdit = results.join_count.toLocaleString();
    
    var totQreAmt = results.qre_tot.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totDevAmt = results.totdevamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totFedAmt = results.fedhtcamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    
    var popupElement = document.getElementById("info-div");
    popupElement.innerHTML = "<table style='margin-bottom: 8px;'><tbody><tr><td width='90%'><h3>Number of Projects Completed: </h></td><td width='10%'><h3 class='count'>" + joinCountEdit + "</h3></td></tr></tbody></table><table><tbody><tr><td width='80%'><h5>Total Development Amount: </h5></td><td width='20%'><h4>" + "$" + totDevAmt + "</h4></td></tr><tr><td width='80%'><h5>Total Federal HTC Amount: </h5></td><td width='20%'><h4>" + "$" + totFedAmt + "</h4></td></tr><tr><td width='80%'><h5>Total Qualifying Rehab Expenses: </h5></td><td width='20%'><h4>" + "$" + totQreAmt + "</h4></td></tr></tbody></table><div>";
    
    var popupElementTwo = document.getElementById("info-div-chart");
    popupElementTwo.innerHTML = "<div><h2>" + results.city_sta_1 + "</h2></div><hr>";
    
//////////////////////Begin City Charts////////////////////    
    
    const projCanvas = document.getElementById("proj-chart");
    
        var data = {
          labels: [
            'Bank',
            'Barn',
            'Church',
            'Club',
            'Commercial',
            'Hospital',
            'Hotel',
            'Housing',
            'Multi-Family Housing (2)',
            'Multi-Family Housing (3)',
            'Industrial',
            'Mixed-Use',
            'Not Reported',
            'Office',
            'Other',
            'School',
            'Theatre'  
          ],        
          datasets:[
            {
                label: "# of Projects",
                data: [results.bank, results.barn, results.church, results.club, results.commercial, results.hospital, results.hotel, results.housing, results.housing_2, results.housing_3, results.industrial, results.multi_use, results.not_report, results.office, results.other, results.school, results.theatre],
                //stack: "Stack 0",    
                backgroundColor: ["#ff1417", "#ff6611", "#ff8844", "#ffee55", "#fefe38", "#ffff99","#aacc22", "#bbdd77", "#c8cf82", "#92a77e", "#5599ee", "#0088cc", "#226688", "#175279", "#557777", "#ddbb33", "#d3a76d"],
                borderColor: "rgba(0,0,0,1)",
                borderWidth: .5,
                hoverBorderWidth: 1
            }
          ],
   
          };
          
          var options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        //stacked: false
                        ticks: {
                          beginAtZero: true,
                          stepSize: 5,
                          maxTicksLimit: 12, 
                            
                          fontSize: 12,    
                        }
                    }],
                    yAxes: [{
                        //stacked: false,
                        
                    }]
                },
                title: {
                    display: false,
                    text: 'HTC Projects by Type',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontColor: '#404040'
                    
                },
                animation: {
                    duration: 1000,
                    easing: 'linear',
                    //animateScale: true
                },
                tooltips: {
                    backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                }
        };
   
        Chart.defaults.global.defaultFontFamily="'Roboto'";

        if(window.mybarChart != undefined)
        window.mybarChart.destroy();
        window.mybarChart = new Chart(projCanvas.getContext("2d"), {
          type: "horizontalBar",
          data: data,
          options: options,
        });
    
        const numbCanvas = document.getElementById("numb-chart");

            var dataTwo = {
                  labels: [
                    '2000',  
                    '2001',
                    '2002',
                    '2003',
                    '2004',
                    '2005',
                    '2006',
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019'  
                  ],        
                  datasets:[
                    {
                        label: "# of Projects",
                        data: [results.prj2000, results.prj2001, results.prj2002, results.prj2003, results.prj2004, results.prj2005, results.prj2006, results.prj2007, results.prj2008, results.prj2009, results.prj2010, results.prj2011, results.prj2012, results.prj2013, results.prj2014, results.prj2015, results.prj2016, results.prj2017, results.prj2018, results.prj2019 ],
                        backgroundColor: "#7ed3f6",
                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: .5,
                        hoverBorderWidth: 1
                    }
                  ],

                  };

                  var optionsTwo = {
                        responsive: true,
                        maintainAspectRatio: false,
                          legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                //stacked: false
                                
                            }],
                            yAxes: [{
                                //stacked: false,
                                ticks: {
                                  beginAtZero: true,
                                  //precision: 0,
                                  fontSize: 11,
                                  callback: function(value) {
                                    if(!(value%1))
                                  {
                                    return Number(value).toFixed(0);
                                  }
                                }    
                              }
                            }]
                        },
                        title: {
                            display: false,
                            text: 'Number of HTC Projects by Year',
                            fontFamily: 'Roboto',
                            fontSize: 14,
                            fontColor: '#404040'
                        },
                        animation: {
                            duration: 1000,
                            easing: 'linear',
                        },
                        tooltips: {
                            backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                        }
                };

            Chart.defaults.global.defaultFontFamily="'Roboto'";

            if(window.mybarChartTwo != undefined)
            window.mybarChartTwo.destroy();
            window.mybarChartTwo = new Chart(numbCanvas.getContext("2d"), {
              type: "bar",
              data: dataTwo,
              options: optionsTwo,
            });
    
            var dataThree = {
              labels: [
                '2000',  
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019'  
              ],        
              datasets:[
                {
                    label: "Federal HTC Amount",
                    data: [htc2000, htc2001, htc2002, htc2003, htc2004, htc2005, htc2006, htc2007, htc2008, htc2009, htc2010, htc2011, htc2012, htc2013, htc2014, htc2015, htc2016, htc2017, htc2018, htc2019],
                    borderColor: "rgba(0,159,150,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "QRE Total",
                    data: [results.qre2000, results.qre2001, results.qre2002, results.qre2003, results.qre2004, results.qre2005, results.qre2006, results.qre2007, results.qre2008, results.qre2009, results.qre2010, results.qre2011, results.qre2012, results.qre2013, results.qre2014, results.qre2015, results.qre2016, results.qre2017, results.qre2018, results.qre2019 ],
                    borderColor: "rgba(230,89,37,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "Total Development Costs",
                    data: [totdev2000, totdev2001, totdev2002, totdev2003, totdev2004, totdev2005, totdev2006, totdev2007, totdev2008, totdev2009, totdev2010, totdev2011, totdev2012, totdev2013, totdev2014, totdev2015, totdev2016, totdev2017, totdev2018, totdev2019],
                    borderColor: "rgba(255,204,64,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },  
              ],

              };

              var marketing = ['2007', '2018'];
                var amount = [50, 70];
                var annotations = marketing.map(function(date, index) {
                   return {
                      type: 'line',
                      id: 'vline' + index,
                      mode: 'vertical',
                      scaleID: 'x-axis-0',
                      value: date,
                      borderColor: 'green',
                      borderWidth: 1,
                      label: {
                         enabled: true,
                         position: "center",
                         content: amount[index]
                      }
                   }
                });    
    
              var optionsThree = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontSize: 11,
                            boxWidth: 25,
                        }
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        backgroundColor: 'rgba(64, 64, 64, 0.9)',
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                              beginAtZero: true,
                              fontSize: 11,
                              callback: function(value, index, values) {
                                return '$' + value.toLocaleString();
                              }    
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'HTC Economic Impact',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontColor: '#404040'
                    },
                    animation: {
                        duration: 1000,
                        easing: 'linear',
                        //animateScale: true
                    },
                    annotation: {
                         drawTime: 'afterDatasetsDraw',
                         annotations: annotations
                      },
            };
    
            Chart.defaults.global.defaultFontFamily="'Roboto'";

            const costCanvas = document.getElementById("cost-chart");

            if(window.mybarChartThree != undefined)
            window.mybarChartThree.destroy();
            window.mybarChartThree = new Chart(costCanvas.getContext("2d"), {
              type: "line",
              data: dataThree,
              options: optionsThree,
            });
    
    return popupElement;
    return popupElementTwo;

  } 
    
  ////////////////////////////////////////////////////////////////// 

    view.when().then(function() {
      const graphic = {
        popupTemplate: {
          content: ""
        }
      };

        const feature = new Feature({
            container: "feature-node",
            graphic: graphic,
            map: view.map,
            spatialReference: view.spatialReference
        });  
              
    
        view.whenLayerView(htc).then(function(layerView2) {
            let highlight;
            // listen for the pointer-move event on the View
            view.on("click", function(event) {
              // Perform a hitTest on the View
              view.hitTest(event).then(function(event) {
                let results = event.results.filter(function(result) {
                  return result.graphic.layer.popupTemplate;
                  ;    
                });
                let result = results[0];
 
                highlight && highlight.remove();

                if (result) {
                  feature.graphic = result.graphic;
                  highlight = layerView2.highlight(result.graphic);  
                } else {
                  feature.graphic = graphic;   
                  $("#sidebar").removeClass('active');   
                }
                $(document).ready(function(){
                    $("#toggle").click(function(){
                        highlight.remove(result.graphic);
                        
                    })
                }) 
              });
            });  
        });
    });
    
    ///////////////////////////////Start CD Layer////////////////////////
    
    const groupD = {
      type: "simple-fill", 
      color: [0, 152, 240, 0.1],
      style: "diagonal-cross",  
      outline: {
        color: "#0098f0",
        width: "0.5px",  
      }
    };

    const groupR = {
      type: "simple-fill", 
      color: [255, 59, 59, 0.1],
      style: "diagonal-cross",  
      outline: {
        color: "#ff3b3b",
        width: "0.5px",  
      }
    };

    const groupV = {
      type: "simple-fill", 
      color: [89, 89, 89, 0.1],
      style: "diagonal-cross",  
      outline: {
        color: "#595959",
        width: "0.5px",  
      }
    };

    const partyRenderer = {
      type: "unique-value",
      field: "party",
      legendOptions: {
        title: "Political Party"
      },
      uniqueValueInfos: [{
        value: "Democrat",
        symbol: groupD,
        label: "Democratic Party"
      }, {
        value: "Republican",
        symbol: groupR,
        label: "Republican Party"
      }, {
        value: "Vacant",
        symbol: groupV,
        label: "Vacant"
      }],
    };    

const congDistLabel = { 
  symbol: {
    type: "text",  
    color: "#404040",
    haloColor: "white",
    haloSize: 1,
    yoffset: 1,   
    font: { 
      family: "Roboto",
      size: 9,
      weight: "normal"    

    } 
  },
  minScale: 4622324,    
  labelPlacement: "center-center",
  labelExpressionInfo: {  
    expression: document.getElementById("cdLabelExp")
                        .text
  }
};    
        
const congDist = new FeatureLayer({
    url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/CongDist_w_HTC_Counts_EconData/FeatureServer",
    outFields: ["*"],
    renderer: partyRenderer,
    labelingInfo: [congDistLabel],
    visible: false,
    popupEnabled: false,
    //maxScale: 144448.1,
    popupTemplate: {
        outFields: ["*"],
        content: function (feature) {
            return setContentInfoThree(feature.graphic.attributes);
        },
      }
}); 
    
 const cdStateLabel = {
  symbol: {
    type: "text",  
    color: "#404040",
    haloColor: "white",
    minScale: 4622324,  
    haloSize: 1,
    yoffset: 1,   
    font: { 
      family: "Roboto",
      size: 9,
      weight: "normal"    
    } 
  },
  maxScale: 4622324,     
  labelPlacement: "center-center",
  labelExpressionInfo: {
    expression: "$feature.STUSPS"
  }
};

function setContentInfoThree(results) {
    
    document.getElementById("sidebar").classList.add('active');
    document.getElementById("sidebarTwo").classList.remove('active');
    
    document.getElementById("toggle").checked = true;
    document.getElementById("toggleTwo").checked = false;
    
    document.getElementById("htc-info-div").style.display = "none";
    
    var htc2000 = results.qre2000 * .20;
    var htc2001 = results.qre2001 * .20;
    var htc2002 = results.qre2002 * .20;
    var htc2003 = results.qre2003 * .20;
    var htc2004 = results.qre2004 * .20;
    var htc2005 = results.qre2005 * .20;
    var htc2006 = results.qre2006 * .20;
    var htc2007 = results.qre2007 * .20;
    var htc2008 = results.qre2008 * .20;
    var htc2009 = results.qre2009 * .20;
    var htc2010 = results.qre2010 * .20;
    var htc2011 = results.qre2011 * .20;
    var htc2012 = results.qre2012 * .20;
    var htc2013 = results.qre2013 * .20;
    var htc2014 = results.qre2014 * .20;
    var htc2015 = results.qre2015 * .20;
    var htc2016 = results.qre2016 * .20;
    var htc2017 = results.qre2017 * .20;
    var htc2018 = results.qre2018 * .20;
    var htc2019 = results.qre2019 * .20;

    var totdev2000 = results.qre2000 * 1.15;
    var totdev2001 = results.qre2001 * 1.15;
    var totdev2002 = results.qre2002 * 1.15;
    var totdev2003 = results.qre2003 * 1.15;
    var totdev2004 = results.qre2004 * 1.15;
    var totdev2005 = results.qre2005 * 1.15;
    var totdev2006 = results.qre2006 * 1.15;
    var totdev2007 = results.qre2007 * 1.15;
    var totdev2008 = results.qre2008 * 1.15;
    var totdev2009 = results.qre2009 * 1.15;
    var totdev2010 = results.qre2010 * 1.15;
    var totdev2011 = results.qre2011 * 1.15;
    var totdev2012 = results.qre2012 * 1.15;
    var totdev2013 = results.qre2013 * 1.15;
    var totdev2014 = results.qre2014 * 1.15;
    var totdev2015 = results.qre2015 * 1.15;
    var totdev2016 = results.qre2016 * 1.15;
    var totdev2017 = results.qre2017 * 1.15;
    var totdev2018 = results.qre2018 * 1.15;
    var totdev2019 = results.qre2019 * 1.15;
    
    var joinCountEdit = results.join_count.toLocaleString();
    
    var totQreAmt = results.qre_tot.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totDevAmt = results.totdevamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totFedAmt = results.fedhtcamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    
    var str = results.NAMELSAD;
    var distTrunc = str.substring(str.indexOf(" ") + 1)
    
    var stateHtc = (
        results.StateHTC == 0 ? 'No' : 'Yes'     
    );
    
    var popupElementOne = document.getElementById("info-div");
    popupElementOne.innerHTML = "<table style='margin-bottom: 8px;'><tbody><tr><td width='90%'><h3>" + "Rep. " + results.firstname + " " + results.lastname + " " + results.suffix + " (" + results.party + ")" +"</h3></td></tr><tr><td width='90%'><h3>Number of Projects Completed: </h3></td><td width='10%'><h3 class='count'>" + joinCountEdit + "</h3></td></tr></tbody></table><table><tbody><tr><td width='70%'><h5>Total Development Amount: </h5></td><td width='30%'><h4>" + "$" + totDevAmt + "</h4></td></tr><tr><td width='70%'><h5>Total Federal HTC Amount: </h5></td><td width='30%'><h4>" + "$" + totFedAmt + "</h4></td></tr><tr><td width='70%'><h5>Total Qualifying Rehab Expenses: </h5></td><td width='30%'><h4>" + "$" + totQreAmt + "</h4></td></tr><tr><td width='50%'><h5>State HTC Program: </h5></td><td width='50%'><h4>" + stateHtc + "</h4></td></tr></tbody></table>";

    var popupElementTwo = document.getElementById("info-div-chart");
    popupElementTwo.innerHTML = "<div><h2>" + results.state_n + " " + results.NAMELSAD + "</h3></div><hr>";
    
//////////////////////////////////Begin Cong Dist Charts/////////////////////////////// 
    
    const projCanvas = document.getElementById("proj-chart");
    
        var data = {
          labels: [
            'Bank',
            'Barn',
            'Church',
            'Club',
            'Commercial',
            'Hospital',
            'Hotel',
            'Housing',
            'Multi-Family Housing (2)',
            'Multi-Family Housing (3)',
            'Industrial',
            'Mixed-Use',
            'Not Reported',
            'Office',
            'Other',
            'School',
            'Theatre'  
          ],        
          datasets:[
            {
                label: "# of Projects",
                data: [results.bank, results.barn, results.church, results.club, results.commercial, results.hospital, results.hotel, results.housing, results.housing_2, results.housing_3, results.industrial, results.multi_Use, results.not_report, results.office, results.other, results.school, results.theatre],
                backgroundColor: ["#ff1417", "#ff6611", "#ff8844", "#ffee55", "#fefe38", "#ffff99","#aacc22", "#bbdd77", "#c8cf82", "#92a77e", "#5599ee", "#0088cc", "#226688", "#175279", "#557777", "#ddbb33", "#d3a76d"],
                borderColor: "rgba(0,0,0,1)",
                borderWidth: .5,
                hoverBorderWidth: 1
            }
          ],
   
          };
          
          var options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        //stacked: false
                    }],
                    yAxes: [{
                        //stacked: false,
                        ticks: {
                          beginAtZero: true,
                          fontSize: 12,    
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'HTC Projects by Type',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontColor: '#404040'
                    
                },
                animation: {
                    duration: 1000,
                    easing: 'linear',
                    //animateScale: true
                },
                tooltips: {
                    backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                }
        };
   
        Chart.defaults.global.defaultFontFamily="'Roboto'";

        if(window.mybarChart != undefined)
        window.mybarChart.destroy();
        window.mybarChart = new Chart(projCanvas.getContext("2d"), {
          type: "horizontalBar",
          data: data,
          options: options,
        });
    
        const numbCanvas = document.getElementById("numb-chart");

            var dataTwo = {
                  labels: [
                    '2000',  
                    '2001',
                    '2002',
                    '2003',
                    '2004',
                    '2005',
                    '2006',
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019'  
                  ],        
                  datasets:[
                    {
                        label: "# of Projects",
                        data: [results.prj2000, results.prj2001, results.prj2002, results.prj2003, results.prj2004, results.prj2005, results.prj2006, results.prj2007, results.prj2008, results.prj2009, results.prj2010, results.prj2011, results.prj2012, results.prj2013, results.prj2014, results.prj2015, results.prj2016, results.prj2017, results.prj2018, results.prj2019 ],
                        backgroundColor: "#7ed3f6",
                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: .5,
                        hoverBorderWidth: 1
                    }
                  ],

                  };

                  var optionsTwo = {
                        responsive: true,
                        maintainAspectRatio: false,
                          legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                //stacked: false
                            }],
                            yAxes: [{
                                //stacked: false,
                                ticks: {
                                  beginAtZero: true,
                                  //precision: 0,
                                  fontSize: 11,
                                  callback: function(value) {
                                    if(!(value%1))
                                  {
                                    return Number(value).toFixed(0);
                                  }
                                }    
                              }
                            }]
                        },
                        title: {
                            display: false,
                            text: 'Number of HTC Projects by Year',
                            fontFamily: 'Roboto',
                            fontSize: 14,
                            fontColor: '#404040'
                        },
                        animation: {
                            duration: 1000,
                            easing: 'linear',
                        },
                        tooltips: {
                            backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                        }
                };
    

            Chart.defaults.global.defaultFontFamily="'Roboto'";


            if(window.mybarChartTwo != undefined)
            window.mybarChartTwo.destroy();
            window.mybarChartTwo = new Chart(numbCanvas.getContext("2d"), {
              type: "bar",
              data: dataTwo,
              options: optionsTwo,
            });
    
            var dataThree = {
              labels: [
                '2000',  
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019'  
              ],        
              datasets:[
                {
                    label: "Federal HTC Amount",
                    data: [htc2000, htc2001, htc2002, htc2003, htc2004, htc2005, htc2006, htc2007, htc2008, htc2009, htc2010, htc2011, htc2012, htc2013, htc2014, htc2015, htc2016, htc2017, htc2018, htc2019],
                    borderColor: "rgba(0,159,150,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "QRE Total",
                    data: [results.qre2000, results.qre2001, results.qre2002, results.qre2003, results.qre2004, results.qre2005, results.qre2006, results.qre2007, results.qre2008, results.qre2009, results.qre2010, results.qre2011, results.qre2012, results.qre2013, results.qre2014, results.qre2015, results.qre2016, results.qre2017, results.qre2018, results.qre2019 ],
                    borderColor: "rgba(230,89,37,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "Total Development Costs",
                    data: [totdev2000, totdev2001, totdev2002, totdev2003, totdev2004, totdev2005, totdev2006, totdev2007, totdev2008, totdev2009, totdev2010, totdev2011, totdev2012, totdev2013, totdev2014, totdev2015, totdev2016, totdev2017, totdev2018, totdev2019],
                    borderColor: "rgba(255,204,64,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },  
              ],

              };

              var optionsThree = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontSize: 11,
                            boxWidth: 25,
                        }
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        backgroundColor: 'rgba(64, 64, 64, 0.9)', 
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                              beginAtZero: true,
                              fontSize: 10,
                              callback: function(value, index, values) {
                                return '$' + value.toLocaleString();
                              }    
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'HTC Economic Impact',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontColor: '#404040'
                    },
                    animation: {
                        duration: 1000,
                        easing: 'linear',
                        //animateScale: true
                    },
            };
    
            Chart.defaults.global.defaultFontFamily="'Roboto'";

            const costCanvas = document.getElementById("cost-chart");

            if(window.mybarChartThree != undefined)
            window.mybarChartThree.destroy();
            window.mybarChartThree = new Chart(costCanvas.getContext("2d"), {
              type: "line",
              data: dataThree,
              options: optionsThree,
            });
  } 
    
/////////////////////////////////////////////////////////////////    
   
    view.when().then(function() {
      const graphic = {
        popupTemplate: {
          content: ""
        }
      };

        const feature = new Feature({
            container: "feature-node",
            graphic: graphic,
            map: view.map,
            spatialReference: view.spatialReference
        });    
    
        view.whenLayerView(congDist).then(function(layerView3) {
            let highlight;

            // listen for the pointer-move event on the View
            view.on("click", function(event) {
              // Perform a hitTest on the View
              view.hitTest(event).then(function(event) {
                // Make sure graphic has a popupTemplate
                let results = event.results.filter(function(result) {
                  return result.graphic.layer.popupTemplate;
                });
                let result = results[0];
                highlight && highlight.remove();
                if (result) {
                  feature.graphic = result.graphic;
                  highlight = layerView3.highlight(result.graphic);
                  cdSearch.clear();
                } else {
                  feature.graphic = graphic;
                  $("#sidebar").removeClass('active');  
                }
                $(document).ready(function(){
                    $("#toggle").click(function(){
                        highlight.remove(result.graphic);
                    })
                })
                $(document).ready(function(){
                    $("#check3").click(function(){
                        highlight.remove(result.graphic);
                        $("#sidebar").removeClass('active');    
                    })
                })  
              });     
            });
            
          cdSearch.on("select-result", function (event) {
            let result = event.result.feature;
            console.log("The selected search result: ", event);

            // Perform a hitTest on the View
            view.hitTest(event).then(function () {
              // Make sure graphic has a popupTemplate
              // let results = event.results.filter(function (result) {
              //   return result.graphic.layer.popupTemplate;
              // });
              // let result = results[0];
              // highlight && highlight.remove();
              // Update the graphic of the Feature widget
              // on pointer-move with the result

              // if (result) {
              feature.graphic = result;
              highlight.remove(result.graphic);    
              // highlight = layerView3.highlight(result.graphic);
              /*view.goTo({
                  target: result.graphic,
                  zoom: 7
              }, opts);*/
              // } else {
              // feature.graphic = graphic;
              // $("#sidebar").removeClass('active');
              // $('#info-div').html('');
              // }
              $(document).ready(function () {
                $("#toggle").click(function () {
                  highlight.remove(result.graphic);
                  //$('#info-div').html('');
                })
              })
              $(document).ready(function () {
                $("#check3").click(function () {
                  highlight.remove(result.graphic);
                  $("#sidebar").removeClass('active');
                })
              })
            });
          }); 
        });
    });
    
/////////////////////////////////////////////////////////////////
     
     const stateLabelSmall = { 
      symbol: {
        type: "text",  
        color: "#404040",
        haloColor: "white",
        haloSize: 1,
        yoffset: 1,   
        font: { 
          family: "Roboto",
          size: 9,
          weight: "normal"    
        } 
      },   
      labelPlacement: "center-center",
      labelExpressionInfo: {
        expression: "$feature.STUSPS"
      }
    };

    const stateLabelLarge = { 
      symbol: {
        type: "text",  
        color: "#404040",
        haloColor: "white",
        haloSize: 1,
        yoffset: 1,   
        font: { 
          family: "Roboto",
          size: 11,
          weight: "normal"    

        } 
      },   
      labelPlacement: "center-center",
      labelExpressionInfo: {
        expression: "$feature.NAME"
      }
    };    
    
    const htcNo = {
          type: "simple-fill", 
          color: [64, 64, 64, 0.1], 
          outline: {
            color: [64, 64, 64, .5],
            width: 0.25,  
          }
        };
    
    const htcYes = {
          type: "simple-fill",  
          color: [229, 88, 37, 0.1],
          outline: {
            color: [229, 88, 37, .5],
            width: 0.25,  
          }
        };

    const stateRenderer = {
      type: "unique-value",
      field: "stateHTC",  
      uniqueValueInfos: [{
        value: "N",
        symbol: htcNo,
        label: "No"
      }, {
        value: "Y",
        symbol: htcYes,
        label: "Yes"
      }],
    };    
    
 const stateBounds = new FeatureLayer({
    url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/States_w_HTC_Counts_EconData/FeatureServer",
    outFields: ["*"],
    visible: false,
    maxScale: 144448.1, 
    renderer: stateRenderer,  
    labelingInfo: [stateLabelSmall], 
    popupEnabled: false,
    popupTemplate: {
        outFields: ["*"],
        title: "{state}",
        content: function (feature) {
            return setContentInfoFour(feature.graphic.attributes);
        },
      }
});     
        
view.when().then(function() {     
    view.watch("scale", function(newValue) {
    stateBounds.labelingInfo =
      newValue <= 4622324 ? [stateLabelLarge]: [stateLabelSmall];
  });
});    
    
function setContentInfoFour(results) {
    
    document.getElementById("sidebar").classList.add('active');
    document.getElementById("sidebarTwo").classList.remove('active');
    
    document.getElementById("toggle").checked = true;
    document.getElementById("toggleTwo").checked = false;
    
    if (results.StateHTC == 'N') {
       document.getElementById("htc-info-div").style.display = "none"; 
    } else {
       document.getElementById("htc-info-div").style.display = "block";    
    }
    
    var htc2000 = results.qre2000 * .20;
    var htc2001 = results.qre2001 * .20;
    var htc2002 = results.qre2002 * .20;
    var htc2003 = results.qre2003 * .20;
    var htc2004 = results.qre2004 * .20;
    var htc2005 = results.qre2005 * .20;
    var htc2006 = results.qre2006 * .20;
    var htc2007 = results.qre2007 * .20;
    var htc2008 = results.qre2008 * .20;
    var htc2009 = results.qre2009 * .20;
    var htc2010 = results.qre2010 * .20;
    var htc2011 = results.qre2011 * .20;
    var htc2012 = results.qre2012 * .20;
    var htc2013 = results.qre2013 * .20;
    var htc2014 = results.qre2014 * .20;
    var htc2015 = results.qre2015 * .20;
    var htc2016 = results.qre2016 * .20;
    var htc2017 = results.qre2017 * .20;
    var htc2018 = results.qre2018 * .20;
    var htc2019 = results.qre2019 * .20;

    var totdev2000 = results.qre2000 * 1.15;
    var totdev2001 = results.qre2001 * 1.15;
    var totdev2002 = results.qre2002 * 1.15;
    var totdev2003 = results.qre2003 * 1.15;
    var totdev2004 = results.qre2004 * 1.15;
    var totdev2005 = results.qre2005 * 1.15;
    var totdev2006 = results.qre2006 * 1.15;
    var totdev2007 = results.qre2007 * 1.15;
    var totdev2008 = results.qre2008 * 1.15;
    var totdev2009 = results.qre2009 * 1.15;
    var totdev2010 = results.qre2010 * 1.15;
    var totdev2011 = results.qre2011 * 1.15;
    var totdev2012 = results.qre2012 * 1.15;
    var totdev2013 = results.qre2013 * 1.15;
    var totdev2014 = results.qre2014 * 1.15;
    var totdev2015 = results.qre2015 * 1.15;
    var totdev2016 = results.qre2016 * 1.15;
    var totdev2017 = results.qre2017 * 1.15;
    var totdev2018 = results.qre2018 * 1.15;
    var totdev2019 = results.qre2019 * 1.15;
    
    var joinCountEdit = results.join_count.toLocaleString();
    
    var totQreAmt = results.qre_tot.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totDevAmt = results.totdevamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    var totFedAmt = results.fedhtcamt.toLocaleString("en", {   
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    
    var stateHtc = (
        results.StateHTC == 'N' ? 'No' : 'Yes'     
    );
    
    var addCredits = (
        results.AddCredits == ' ' ? 'n/a' : results.AddCredits     
    );
    
    var minInv = (
        results.MinInv == ' ' ? 'n/a' : results.MinInv     
    );
    
    var anAggCap = (
        results.AnAggCap == ' ' ? 'n/a' : results.AnAggCap     
    );
    
    var anPrjCap = (
        results.AnPrjCap == ' ' ? 'n/a' : results.AnPrjCap     
    );
    
    var dirTrnsf = (
        results.DirTrnsf == ' ' ? 'n/a' : results.DirTrnsf     
    );
    
    var allPartAg = (
        results.AllPartAg == ' ' ? 'n/a' : results.AllPartAg     
    );
    
    var refund = (
        results.Refund == ' ' ? 'n/a' : results.Refund     
    );
    
    var stateHtcInfo = (
        results.StateHTC == 'N' ? '' : "<table style='margin-top: 10px;'><tbody><tr><td width='70%'><h5>Effective Year: </h5></td><td width='30%'><h4>" + results.htc_year + "</h4></td></tr><tr><td width='70%'><h5>Credit % for Income-Producing Properties: </h5></td><td width='30%'><h4>" + results.IncCredits + "</h4></td></tr><tr><td width='70%'><h5>Additional Credits: </h5></td><td width='30%'><h4>" + addCredits + "</h4></td></tr><tr><td width='70%'><h5>Minimum Investment: </h5></td><td width='30%'><h4>" + minInv + "</h4></td></tr><tr><td width='70%'><h5>Annual Aggregate Cap: </h5></td><td width='30%'><h4>" + anAggCap + "</h4></td></tr><tr><td width='70%'><h5>Annual Per-Project Cap: </h5></td><td width='30%'><h4>" + anPrjCap + "</h4></td></tr><tr><td width='70%'><h5>Direct Transfer: </h5></td><td width='30%'><h4>" + dirTrnsf + "</h4></td></tr><tr><td width='70%'><h5>Allocation by Partnership Agreement: </h5></td><td width='30%'><h4>" + allPartAg + "</h4></td></tr><tr><td width='70%'><h5>Refund: </h5></td><td width='30%'><h4>" + refund + "</h4></td></tr></tbody></table>"     
    );
    
    var popupElement = document.getElementById("info-div");
    popupElement.innerHTML = "<table style='margin-bottom: 8px;'><tbody><tr><td width='90%'><h3>Number of Projects Completed: </h></td><td width='10%'><h3 class='count'>" + joinCountEdit + "</h3></td></tr></tbody></table><table><tbody><tr><td width='70%'><h5>Total Development Amount: </h5></td><td width='30%'><h4>" + "$" + totDevAmt + "</h4></td></tr><tr><td width='70%'><h5>Total Federal HTC Amount: </h5></td><td width='30%'><h4>" + "$" + totFedAmt + "</h4></td></tr><tr><td width='70%'><h5>Total Qualifying Rehab Expenses: </h5></td><td width='30%'><h4>" + "$" + totQreAmt + "</h4></td></tr><tr><td width='50%'><h5>State HTC Program: </h5></td><td width='50%'><h4>" + stateHtc + "</h4></td></tr></tbody></table>";

    var popupElementTwo = document.getElementById("info-div-chart");
    popupElementTwo.innerHTML = "<div><h2>" + results.NAME + "</h3></div><hr>";
    
    var popupElementThree = document.getElementById("htc-state-text");
    popupElementThree.innerHTML = "<div>" + stateHtcInfo + "</div>";

//////////////////////////////////Begin State Charts///////////////////////////////
    
    const projCanvas = document.getElementById("proj-chart");
    
        var data = {
          labels: [
            'Bank',
            'Barn',
            'Church',
            'Club',
            'Commercial',
            'Hospital',
            'Hotel',
            'Housing',
            'Multi-Family Housing (2)',
            'Multi-Family Housing (3)',
            'Industrial',
            'Mixed-Use',
            'Not Reported',
            'Office',
            'Other',
            'School',
            'Theatre'  
          ],        
          datasets:[
            {
                label: "# of Projects",
                data: [results.bank, results.barn, results.church, results.club, results.commercial, results.hospital, results.hotel, results.housing, results.housing_2, results.housing_3, results.industrial, results.multi_use, results.not_report, results.office, results.other, results.school, results.theatre],
                //stack: "Stack 0",    
                backgroundColor: ["#ff1417", "#ff6611", "#ff8844", "#ffee55", "#fefe38", "#ffff99","#aacc22", "#bbdd77", "#c8cf82", "#92a77e", "#5599ee", "#0088cc", "#226688", "#175279", "#557777", "#ddbb33", "#d3a76d"],
                borderColor: "rgba(0,0,0,1)",
                borderWidth: .5,
                hoverBorderWidth: 1
            }
          ],
   
          };
          
          var options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        //stacked: false
                    }],
                    yAxes: [{
                        //stacked: false,
                        ticks: {
                          beginAtZero: true,
                          fontSize: 12,    
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'HTC Projects by Type',
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontColor: '#404040',
                    
                },
                animation: {
                    duration: 1000,
                    easing: 'linear',
                    //animateScale: true
                },
                tooltips: {
                    backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                }
        };
   

        Chart.defaults.global.defaultFontFamily="'Roboto'";

        if(window.mybarChart != undefined)
        window.mybarChart.destroy();
        window.mybarChart = new Chart(projCanvas.getContext("2d"), {
          type: "horizontalBar",
          data: data,
          options: options,
        });
    
        const numbCanvas = document.getElementById("numb-chart");

            var dataTwo = {
                  labels: [
                    '2000',  
                    '2001',
                    '2002',
                    '2003',
                    '2004',
                    '2005',
                    '2006',
                    '2007',
                    '2008',
                    '2009',
                    '2010',
                    '2011',
                    '2012',
                    '2013',
                    '2014',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019'  
                  ],        
                  datasets:[
                    {
                        label: "# of Projects",
                        data: [results.prj2000, results.prj2001, results.prj2002, results.prj2003, results.prj2004, results.prj2005, results.prj2006, results.prj2007, results.prj2008, results.prj2009, results.prj2010, results.prj2011, results.prj2012, results.prj2013, results.prj2014, results.prj2015, results.prj2016, results.prj2017, results.prj2018, results.prj2019 ],
                        backgroundColor: "#7ed3f6",
                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: .5,
                        hoverBorderWidth: 1
                    }
                  ],

                  };

                  var optionsTwo = {
                        responsive: true,
                        maintainAspectRatio: false,
                          legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                //stacked: false
                            }],
                            yAxes: [{
                                //stacked: false,
                                ticks: {
                                  beginAtZero: true,
                                  //precision: 0,
                                  fontSize: 11,
                                  callback: function(value) {
                                    if(!(value%1))
                                  {
                                    return Number(value).toFixed(0);
                                  }
                                }    
                              }
                            }]
                        },
                        title: {
                            display: false,
                            text: 'Number of HTC Projects by Year',
                            fontFamily: 'Roboto',
                            fontSize: 14,
                            fontColor: '#404040'
                        },
                        animation: {
                            duration: 1000,
                            easing: 'linear',
                        },
                        tooltips: {
                            backgroundColor: 'rgba(64, 64, 64, 0.9)',    
                        }
                };

            Chart.defaults.global.defaultFontFamily="'Roboto'";


            if(window.mybarChartTwo != undefined)
            window.mybarChartTwo.destroy();
            window.mybarChartTwo = new Chart(numbCanvas.getContext("2d"), {
              type: "bar",
              data: dataTwo,
              options: optionsTwo,
            });
    
//////////////////////////////////////////////////////////////    

            var dataThree = {
              labels: [
                '2000',  
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019'  
              ],        
              datasets:[
                {
                    label: "Federal HTC Amount",
                    data: [htc2000, htc2001, htc2002, htc2003, htc2004, htc2005, htc2006, htc2007, htc2008, htc2009, htc2010, htc2011, htc2012, htc2013, htc2014, htc2015, htc2016, htc2017, htc2018, htc2019],
                    borderColor: "rgba(0,159,150,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "QRE Total",
                    data: [results.qre2000, results.qre2001, results.qre2002, results.qre2003, results.qre2004, results.qre2005, results.qre2006, results.qre2007, results.qre2008, results.qre2009, results.qre2010, results.qre2011, results.qre2012, results.qre2013, results.qre2014, results.qre2015, results.qre2016, results.qre2017, results.qre2018, results.qre2019 ],
                    borderColor: "rgba(230,89,37,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },
                {
                    label: "Total Development Costs",
                    data: [totdev2000, totdev2001, totdev2002, totdev2003, totdev2004, totdev2005, totdev2006, totdev2007, totdev2008, totdev2009, totdev2010, totdev2011, totdev2012, totdev2013, totdev2014, totdev2015, totdev2016, totdev2017, totdev2018, totdev2019],
                    borderColor: "rgba(255,204,64,1)",
                    borderWidth: 1.5,
                    hoverBorderWidth: 2
                },  
              ],

              };
    
              var optionsThree = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontSize: 11,
                            boxWidth: 25,
                        }
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        backgroundColor: 'rgba(64, 64, 64, 0.9)',
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                              beginAtZero: true,
                              fontSize: 10,
                              callback: function(value, index, values) {
                                return '$' + value.toLocaleString();
                              }    
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'HTC Economic Impact',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        fontColor: '#404040'
                    },
                    animation: {
                        duration: 1000,
                        easing: 'linear',
                        //animateScale: true
                    },
            };
    
            Chart.defaults.global.defaultFontFamily="'Roboto'";

            const costCanvas = document.getElementById("cost-chart");

            if(window.mybarChartThree != undefined)
            window.mybarChartThree.destroy();
            window.mybarChartThree = new Chart(costCanvas.getContext("2d"), {
              type: "line",
              data: dataThree,
              options: optionsThree,
            });

    return popupElement;
    return popupElementTwo;
    
  } 
    
//////////////////////////////////////////////////////////////        
   
    view.when().then(function() {
          const graphic = {
            popupTemplate: {
              content: ""
            }
          };

        const feature = new Feature({
            container: "feature-node",
            graphic: graphic,
            map: view.map,
            spatialReference: view.spatialReference
        }); 
        
        view.whenLayerView(stateBounds).then(function(layerView4) {
            let highlight;
            // listen for the pointer-move event on the View
            view.on("click", function(event) {
              // Perform a hitTest on the View
              view.hitTest(event).then(function(event) {

                let results = event.results.filter(function(result) {
                  return result.graphic.layer.popupTemplate;
                });
                let result = results[0];
                highlight && highlight.remove();

                if (result) {
                  feature.graphic = result.graphic;
                  highlight = layerView4.highlight(result.graphic);
                } else {
                  feature.graphic = graphic;
                  $("#sidebar").removeClass('active');  
                }
                $(document).ready(function(){
                    $("#toggle").click(function(){
                        highlight.remove(result.graphic);
                    })
                })
                $(document).ready(function(){
                    $("#check4").click(function(){
                        highlight.remove(result.graphic);
                        $("#sidebar").removeClass('active');
                    })
                })  
              });
            });  
        });
    });
    
////////////////////Add Background Layers////////////////////
    
    const cdStateBounds = new FeatureLayer({
        url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/US_State_Boundaries_HTC/FeatureServer",
        popupEnabled: false,
        labelingInfo: [cdStateLabel],
        visible: false,
        opacity: 0.5,
        renderer: {
            type: "simple",
            symbol: {
              color: "rgba(128, 128, 128, 0.9)",
              type: "simple-line",
              style: "solid",
              width: 1.25,
            }
        },   
    }); 

    const htcStateBounds = new FeatureLayer({
        url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/US_State_Boundaries_HTC/FeatureServer",
        popupEnabled: false,
        labelingInfo: [cdStateLabel],
        maxScale: 1155581,
        visible: true,
        opacity: 0.5,
        renderer: {
            type: "simple",
            symbol: {
              color: "rgba(64,64,64, 0.7)",
              type: "simple-line",
              style: "solid",
              width: .75,
            }
        },   
    });    

    const usbounds = new FeatureLayer({
        url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/US_Boundary/FeatureServer",
        popupEnabled: false,
        maxScale: 1155581, 
        renderer: {
            type: "simple",
            symbol: {
              color: "rgba(64,64,64, 0.7)",
              type: "simple-line",
              style: "solid",
              width: 1  
            }
        },
    });    
 
    map.addMany([cartoBasemapTwo, cartoBasemap, congDist, cdStateBounds, htcStateBounds, stateBounds, usbounds, htc, htcProjLayer, ]);

    var cdSearch = new Search({
        view: view,
        includeDefaultSources: false,
        locationEnabled: false,
        maxSuggestions: 20,
        sources: [
            {
                layer: congDist,
                searchFields: ["state_n", "lastname", "Combo", "NAMELSAD"],
                displayField: "Disp_Name",
                exactMatch: false,
                placeholder: "Search for a District",
                name: "Congressional Districts"
            }
          ],
          container: "cdSearch",
          popupEnabled: false,
    });    
    
/////////////////Layer Toggles////////////////
    
    var congDistToggle = document.getElementById("check3");

    congDistToggle.addEventListener("change", function() {
        if (congDistToggle.checked) {
            congDist.visible = true
            cdStateBounds.visible = true
            stateBounds.visible = false
        } else {
            congDist.visible = false
            cdStateBounds.visible = false
            cdSearch.clear();
        }
    });    

    var stateToggle = document.getElementById("check4");

    stateToggle.addEventListener("change", function() {
        if (stateToggle.checked) {
            stateBounds.visible = true
            cdStateBounds.visible = false
            congDist.visible = false
        } else {
            stateBounds.visible = false
        }
    });    

    $('#check3').change(function(){
        if($(this).is(":checked")) {
            $('.cdLeg').addClass('pressed');
            $('.stateLeg').removeClass('pressed');
            $('#check4').prop('checked', false);
            //$('#info-div').html('');
            $("#cdTitle").show();
            $("#cdFilt").show();
            $("#cdTitleTwo").show();
            $("#cdsearcher").show();
        } else {
            $('.cdLeg').removeClass('pressed');
            //$('#info-div').html('');
            $("#cdTitle").hide();
            $("#cdFilt").hide();
            $("#cdTitleTwo").hide();
            $("#cdsearcher").hide();
        }
    });

    $('#check4').change(function(){
        if($(this).is(":checked")) {
            $('.stateLeg').addClass('pressed');
            $('.cdLeg').removeClass('pressed');
            $("#cdTitle").hide();
            $("#cdFilt").hide();
            $("#cdTitleTwo").hide();
            $("#cdsearcher").hide();
            $('#check3').prop('checked', false);
            //$('#info-div').html('');
            //$("#htc-info-div").show();
        } else {
            $('.stateLeg').removeClass('pressed');
            //$('#info-div').html('');
            //$("#htc-info-div").hide();
        }
    });
    
/***************Zoom Text HTC Projects**************/    
        
    view.when().then(function() {     
        view.watch("scale", function(newValue) {
        if (newValue <= 144448) {
            //$("#check3").attr("disabled", true);
            $("#check4").attr("disabled", true);
            //$('#check3').prop('checked', false);
            $('#check4').prop('checked', false);
            stateBounds.visible = false;
            //cdStateBounds.visible = false;
            //congDist.visible = false;
            $(".stateLeg").removeClass('pressed');
            $(".htcCityTitle").hide();
            $(".cdLeg").hide();
            $("#cdTitle").hide();
            $("#cdFilt").hide();
            $("#cdTitleTwo").hide();
            $("#cdsearcher").hide();
            $(".htcProjTitle").show();
            $(".htcCityLeg").hide();
            $(".htcProjLeg").show();
            $("#filtTitle").show();
            $("#filt").show();
            //$("#info-div").css("height", "270px");
        } else if (newValue > 144448) {
            $("#check3").attr("disabled", false);
            $("#check4").attr("disabled", false);
            $(".htcCityTitle").show();
            $(".htcProjTitle").hide();
            $(".htcCityLeg").show();
            $(".htcProjLeg").hide();
            $("#filtTitle").hide();
            $("#filt").hide();
            //$("#info-div").css("height", "calc(100% - 410px)");
        } else {
            
        }
      });
    });
    
/***************Filter HTC Projects**************/
    
    view.when().then(function() {
      view.whenLayerView(htcProjLayer).then(function(layerView) {
        const filterSelect = document.getElementById("useFilter");
        
        filterSelect.addEventListener("change", function(event) {
          const newValue = event.target.value;
          const whereClause = newValue
            ? "projuse3 = '" + newValue + "'"
            : null;
          layerView.effect = {
            filter: {      
            where: whereClause
          },
          excludedEffect: "grayscale(100%) opacity(25%)"
          };
        });
      });
    });

/***************Filter Cong Dists**************/
    
    view.when().then(function() {
      view.whenLayerView(congDist).then(function(layerView) {
        const filterSelect = document.getElementById("cdFilter");
        
        filterSelect.addEventListener("change", function(event) {
          const newValue = event.target.value;
          const whereClause = newValue
            ? "party = '" + newValue + "'"
            : null;
          layerView.effect = {
            filter: {      
            where: whereClause
          },
          excludedEffect: "grayscale(100%) opacity(25%)"
          };
        });
      });
    });    
        
/*****************Scale Based Renderers************/
    
    /*view.when().then(function() {     
        view.watch("scale", function(newValue) {
          newValue <= 18056 ? $(".breakStyle").css("display","none"), $(".main-tab-container").css("display","none"): $(".breakStyle").css("display","block"), $(".main-tab-container").css("display","block") ;
      });
    });*/    

    view.when().then(function() {     
        view.watch("scale", function(newValue) {
          newValue <= 18056 ? $(".breakStyle").css("display","none"): $(".breakStyle").css("display","block");
      });
    });    

    view.when().then(function() {     
        view.watch("scale", function(newValue) {
          newValue <= 18056 ? $(".main-tab-container").css("display","none"): $(".main-tab-container").css("display","block");
      });
    });    
        
/**********************Tabs JS*******************/
    
    $(document).ready(function() {

    function changeTab(){
      var target = $(this).data('target');

      $('#tab-navigation li').removeClass('selected');
      $('#tab-navigation li').addClass('noSelected');
      $(this).removeClass('noSelected');
      $(this).addClass('selected');    
      $('.tabContainer').addClass('hidden');
      $(target).removeClass('hidden');
    }

    $('#tab-navigation li').click(changeTab);

    });    
    
       
});











