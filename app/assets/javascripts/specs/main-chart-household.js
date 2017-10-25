(function (App) {
  'use strict';

  App.Specs.MainChartHousehold = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 800,
    "height": 500,
    "padding": 5,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "data": [{
      "name": "table",
      "url": "<%= api %>/monthly_values/<%= project_name %>?categories=<%= categories %>&household=<%= household %>",
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
          "groupby": ["date"],
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
            "field": ["date", "category_type", "value"],
            "order": ["ascending", "ascending", "descending"]
          },
          "as": [
            "y0",
            "y1"
          ]
        }
      ]
    }],
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
        "domain": {
          "data": "table",
          "field": "category_type"
        },
        "range": {
          "scheme": "category10"
        }
      }
    ],
    "axes": [{
        "orient": "left",
        "scale": "yscale",
        "tickSize": 0,
        "labelPadding": 4,
        "zindex": 1
      },
      {
        "orient": "bottom",
        "scale": "xscale",
        "zindex": 10,
        "encode": {
          "labels": {
            "update": {
              "text": {
                "signal": "timeFormat(datum.value, '%b  %Y')"
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
              "value": 0.5
            }
          }
        }
      }]
    }]
  };


}).call(this, this.App);
