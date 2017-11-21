(function (App) {
  'use strict';

  App.Specs.Individuals.MainChartDetails = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 800,
    "height": 400,
    "padding": 5,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "data": [{
        "name": "table",
        "url": "<%= api %>/members/monthly_values/<%= project_name %>?categories=<%= categories %>&household=<%= household %>",
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
            "key": "category_type",
            "field": "value",
            "method": "value",
            "value": 0
          },
          {
            "type": "stack",
            "field": "value",
            "groupby": [
              "date",
              "category_type"
            ],
            "sort": {
              "field": [
                "date",
                "category_type",
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
              "order": "ascending"
            },
            "groupby": ["date",
              "category_type"
            ],
            "ops": ["row_number"],
            "fields": [null],
            "as": ["rank"]
          },
          {
            "type": "collect",
            "sort": {
              "field": [
                "date",
                "category_type",
                "value"
              ],
              "order": [
                "ascending",
                "ascending",
                "descending"
              ]
            }
          }
        ]
      },
      {
        "name": "stats",
        "source": "table",
        "transform": [{
            "type": "aggregate",
            "fields": ["subcategory"],
            "groupby": ["date",
              "category_type"
            ],
            "ops": ["count"],
            "as": ["value"]
          },
          {
            "type": "extent",
            "field": "value",
            "signal": "extent"
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
        "type": "sqrt",
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
        "range": "category",
        "domain": [
          "income",
          "expense",
          "savings",
          "credits"
        ]
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
              "fontSize": {
                "value": 12
              },
              "opacity": {
                "signal": "width < 380 ? 1 : 0"
              },
              "fill": {
                "value": "black"
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
        "padding": 4,
        "orient": "none",
        "encode": {
          "legend": {
            "update": {
              "x": {
                "value": 0
              },
              "y": {
                "signal": "height*1.25"
              }
            }
          },
          "labels": {
            "update": {
              "text": {
                "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),13,'right','...')"

              },
              "fontSize": {
                "value": 12
              },
              "opacity": {
                "signal": "width < 380 ? 0 : 1"
              },
              "fill": {
                "value": "black"
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
          "field": "category_type"
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
              "field": "category_type"
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
              "field": "category_type"
            },
            "fillOpacity": {
              "signal": "clamp(1-(datum.rank/(extent[1])),0.1,1)"
            }
          }
        }
      }]
    }]
  };

}).call(this, this.App);
