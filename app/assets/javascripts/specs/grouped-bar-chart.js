(function (App) {
  'use strict';

  App.Specs.GroupedBarChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 800,
    "height": 400,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "padding": 5,
    "config": {
      "axis": {
        "domainWidth": 0,
        "gridDash": [
          1
        ],
        "labelFont": "Open Sans",
        "labelFontSize": 11,
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
        "labelFontSize": 11,
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
          "#a30d6f",
          "#84a62d",
          "#1daac3",
          "#001d22"
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
          }
        ]
      },
      {
        "name": "stats",
        "source": "data",
        "transform": [{
            "type": "aggregate",
            "groupby": [
              "subcategory"
            ],
            "fields": [
              "value"
            ],
            "ops": [
              "sum"
            ],
            "as": [
              "sum"
            ]
          },
          {
            "type": "window",
            "sort": {
              "field": "sum",
              "order": "descending"
            },
            "ops": [
              "row_number"
            ],
            "fields": [
              null
            ],
            "as": [
              "rank"
            ]
          },
          {
            "type": "collect",
            "sort": {
              "field": [
                "rank"
              ],
              "order": [
                "ascending"
              ]
            }
          }
        ]
      },
      {
        "name": "table",
        "source": "data",
        "transform": [{
            "type": "lookup",
            "from": "stats",
            "key": "subcategory",
            "fields": [
              "subcategory"
            ],
            "values": [
              "rank"
            ],
            "as": [
              "rank"
            ],
            "default": null
          },
          {
            "type": "formula",
            "as": "subcategory",
            "expr": "datum.rank < 5 ? datum.subcategory : 'Others'"
          },
          {
            "type": "formula",
            "as": "rank",
            "expr": "datum.rank < 5 ? datum.rank : 5"
          },
          {
            "type": "aggregate",
            "groupby": ["date", "subcategory", "rank"],
            "ops": ["sum"],
            "fields": ["value"],
            "as": ["value"]
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
              "subcategory",
              "rank"
            ],
            "sort": {
              "field": [
                "date",
                "value"
              ],
              "order": [
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
            "type": "collect",
            "sort": {
              "field": [
                "date",
                "rank"
              ],
              "order": [
                "ascending",
                "ascending"
              ]
            }
          }
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
                "signal": "timeFormat(datum.value, '%b')"
              }
            }
          },
          "domain": {
            "update": {
              "stroke": {
                "value": "rgba(0, 29, 34, 0.1)"
              },
              "strokeOpacity": {
                "value": 1
              },
              "strokeWidth": {
                "value": 1
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
      "padding": 0,
      "offset": 30,
      "orient": "bottom",
      "encode": {
        "legend": {},
        "labels": {
          "interactive": false,
          "update": {
            "text": {
              "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),25,'right','...')"
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
              "signal": "datum.index<6 ? datum.index*(width/5.5)+10 : (datum.index-6)*(width/5.5)+10"
            }
          }
        },
        "symbols": {
          "update": {
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/5.5) : (datum.index-6)*(width/5.5)"
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
            "y": {
              "scale": "yscale",
              "field": "y0",
              "offset": 0
            },
            "y2": {
              "scale": "yscale",
              "field": "y1",
              "offset": 0
            },
            "width": {
              "scale": "pos",
              "band": 1,
              "offset": -1
            },
            "stroke": {
              "value": "white"
            },
            "strokeWidth": {
              "value": 0
            },
            "strokeCap": {
              "value": "square"
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
