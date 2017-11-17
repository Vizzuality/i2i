(function(App) {
  'use strict';

  App.Specs.GroupedBarChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 500,
    "height": 350,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "padding": 0,
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
            "groupby": [
              "date",
              "subcategory",
              "rank"
            ],
            "ops": [
              "sum"
            ],
            "fields": [
              "value"
            ],
            "as": [
              "value"
            ]
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
      },
      {
        "name": "maxi",
        "source": "table",
        "transform": [{
            "type": "aggregate",
            "fields": [
              "value"
            ],
            "ops": [
              "max"
            ],
            "as": [
              "max"
            ]
          }]
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
    "signals": [{
        "name": "rows",
        "description": "data required to update ",
        "update": "width < 380 ? 3 : 1"
      },
      {
        "name": "columns",
        "description": "data required to update ",
        "update": "width < 380 ? 2 : 5"
      }
    ],
    "legends": [{
        "fill": "color",
        "padding": 5,
        "orient": "bottom",
        "encode": {
          "labels": {
            "update": {
              "text": {
                "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),25,'right','...')"
              },
              "opacity": {
                "signal": "width < 380 ? 1 : 0"
              }
            }
          },
          "symbols": {
            "update": {
              "opacity": {
                "signal": "width < 380 ? 1 : 0"
              },
              "stroke": {
                "value": "transparent"
              }
            }
          }
        }
      },
      {
        "fill": "color",
        "padding": 5,
        "orient": "none",
        "encode": {
          "legend": {
            "update": {
              "x": {
                "value": 0
              },
              "y": {
                "signal": "height * 1.25"
              }
            }
          },
          "labels": {
            "update": {
              "text": {
                "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),13,'right','...')"
              },
              "opacity": {
                "signal": "width < 380 ? 0 : 1"
              },
              "y": {
                "signal": "datum.index<columns ? 0 : 30*rows"
              },
              "x": {
                "signal": "datum.index<columns ? datum.index*(width/columns)+10 : (datum.index-columns)*(width/columns)+10"
              }
            }
          },
          "symbols": {
            "update": {
              "y": {
                "signal": "datum.index < columns ? 0 : 30"
              },
              "opacity": {
                "signal": "width < 380 ? 0 : 1"
              },
              "x": {
                "signal": "datum.index<columns ? datum.index*(width/columns) : (datum.index-columns)*(width/columns)"
              },
              "stroke": {
                "value": "transparent"
              }
            }
          }
        }
      }
    ],
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
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "x": {
            "signal": "width/2"
          },
          "y": {
            "signal": "height/2"
          },
          "fill": {
            "value": "#000"
          },
          "align": {
            "value":"center"
          },
          "fontSize": {
            "value": 30
            },
          "text": {
            "value": "No data"
          }
        },
        "update": {
          "opacity": {
                "signal": "data('maxi')[0].max ==  0 ? 1 : 0"
              },
        }
      }
    }
]
  };

}).call(this, this.App);
