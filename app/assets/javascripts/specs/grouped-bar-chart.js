(function (App) {
  'use strict';

  App.Specs.GroupedBarChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 800,
    "height": 400,
    "padding": 5,
    "background": "white",
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "config": {
      "axis": {
        "domainWidth": 0,
        "gridDash": [
          1
        ],
        "labelFont": "Open Sans",
        "labelFontSize": 13,
        "labelColor": "#001D22",
        "ticks": false
      },
      "legend": {
        "domainWidth": 0,
        "gridDash": [
          3
        ],
        "gridColor": "rgba(0, 29, 34, 0.1)",
        "gridWidth": 0.5,
        "labelFont": "Open Sans",
        "labelFontSize": 13,
        "labelColor": "#001D22",
        "tickWidth": 0,
        "tickColor": "rgba(0, 29, 34, 0.1)",
        "strokeWidth": 10
      },
      "symbol": {
        "size": 20
      },
      "line": {
        "opacity": 1,
        "interpolate": "monotone",
        "strokeWidth": 1
      },
      "area": {
        "opacity": 0.5,
        "interpolate": "monotone",
        "strokeWidth": 1
      },
      "range": {
        "category": [
          "#F95E31",
          "#915FC4",
          "#83CB4D",
          "#3DDFE7"
        ]
      }
    },
    "data": [{
        "name": "data",
        "url": "<%= api %>/households/monthly_values/<%= project_name %>?categories=<%= categories %>&household=<%= household %>",
        "format": {
          "property": "data",
          "parse": {
            "date": "date"
          }
        },
        "transform": [{
            "type": "filter",
            "expr": "datum.subcategory != 'ALL'"
          },
          {
            "type": "formula",
            "as": "value",
            "expr": "abs(datum.value)"
          },
          {
            "type": "impute",
            "groupby": [
              "date"
            ],
            "key": "subcategory",
            "field": "value",
            "method": "value",
            "value": 0
          },
          {
            "type": "stack",
            "field": "value",
            "groupby": [
              "date",
              "subcategory"
            ],
            "sort": {
              "field": [
                "date",
                "subcategory",
                "value"
              ],
              "order": [
                "ascending",
                "ascending",
                "descending"
              ]
            },
            "as": [
              "y0",
              "y1"
            ]
          },
          {
            "type": "window",
            "sort": {
              "field": "y1",
              "order": "descending"
            },
            "ops": ["row_number"],
            "groupby": ["date"],
            "fields": [null],
            "as": ["rank"]
          },
          {
            "type": "collect",
            "sort": {
              "field": [
                "date",
                "subcategory"
              ],
              "order": [
                "ascending",
                "ascending"
              ]
            }
          }
        ]
      },
      {
        "name": "table",
        "source": "data",
        "transform": [

        ]
      }
    ],
    "scales": [{
        "name": "xscale",
        "type": "band",
        "domain": {
          "data": "table",
          "field": "date"
        },
        "range": "width",
        "padding": 0.3
      },
      {
        "name": "yscale",
        "type": "linear",
        "domain": {
          "fields": [{
              "data": "table",
              "field": "y0"
            },
            {
              "data": "table",
              "field": "y1"
            }
          ]
        },
        "range": "height",
        "round": true,
        "zero": true,
        "nice": true
      },
      {
        "name": "color",
        "type": "ordinal",
        "domain": {
          "data": "table",
          "field": "subcategory"
        },
        "range": "category"
      }
    ],
    "axes": [{
        "orient": "left",
        "scale": "yscale",
        "tickSize": 5,
        "grid": true,
        "format": "s",
        "labelPadding": 4,
        "zindex": 0
      },
      {
        "domain": true,
        "orient": "bottom",
        "scale": "xscale",
        "zindex": 10,
        "encode": {
          "labels": {
            "update": {
              "text": {
                "signal": "timeFormat(datum.value, '%B')"
              }
            }
          }
        }
      },

      {
        "orient": "bottom",
        "scale": "xscale",
        "labelOverlap": true,
        "offset": 20,
        "encode": {
          "labels": {
            "update": {
              "text": {
                "signal": "timeFormat(datum.value, '%Y')"
              }
            }
          }
        }

      }
    ],
    "legends": [{
      "fill": "color",
      "padding": 4,
      "orient": "bottom",
      "encode": {
        "legend": {},
        "labels": {
          "interactive": false,
          "update": {
            "text": {
              "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),15,'right','...')"
            },
            "fontSize": {
              "value": 12
            },
            "fill": {
              "value": "black"
            },
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/6)+10 : (datum.index-6)*(width/6)+10"
            }
          }
        },
        "symbols": {
          "update": {
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/6) : (datum.index-6)*(width/6)"
            },
            "stroke": {
              "value": "transparent"
            }
          }
        }
      }
    }],
    "marks": [{
      "type": "group",
      "from": {
        "facet": {
          "data": "table",
          "name": "facet",
          "groupby": "date"
        }
      },
      "encode": {
        "enter": {
          "x": {
            "scale": "xscale",
            "field": "date"
          }
        }
      },
      "signals": [{
        "name": "width",
        "update": "bandwidth('xscale')"
      }],
      "scales": [{
        "name": "pos",
        "type": "band",
        "range": "width",
        "domain": {
          "data": "facet",
          "field": "subcategory"
        }
      }],
      "marks": [{
        "name": "bars",
        "from": {
          "data": "facet"
        },
        "type": "rect",
        "encode": {
          "enter": {
            "x": {
              "scale": "pos",
              "field": "subcategory"
            },
            "width": {
              "scale": "pos",
              "band": 1,
              "offset": 0.5
            },
            "stroke": {
              "value": "white"
            },
            "strokeWidth": {
              "value": 1
            },
            "y": {
              "scale": "yscale",
              "field": "y0",
              "offset": 0.5
            },
            "y2": {
              "scale": "yscale",
              "field": "y1",
              "offset": 0.5
            },
            "fill": {
              "scale": "color",
              "field": "subcategory"
            },
            "fillOpacity": {
              "value": 1
            }
          }
        }
      }]
    }]
  };

}).call(this, this.App);
