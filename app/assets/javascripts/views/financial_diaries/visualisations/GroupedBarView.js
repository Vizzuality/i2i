(function (App) {
  'use strict';

  var chartSpec = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 400,
    "height": 300,
    "padding": 5,

    "data": [{
      "name": "table",
      "values": [{
          "category": "A",
          "position": 0,
          "date": "2012-01-01",
          "value": 0.1
        },
        {
          "category": "A",
          "position": 1,
          "date": "2012-01-01",
          "value": 0.6
        },
        {
          "category": "A",
          "position": 2,
          "date": "2012-01-01",
          "value": 0.9
        },
        {
          "category": "A",
          "position": 3,
          "date": "2012-01-01",
          "value": 0.4
        },
        {
          "category": "B",
          "position": 0,
          "date": "2012-01-01",
          "value": 0.7
        },
        {
          "category": "B",
          "position": 1,
          "date": "2012-01-01",
          "value": 0.2
        },
        {
          "category": "B",
          "position": 2,
          "date": "2012-01-01",
          "value": 1.1
        },
        {
          "category": "B",
          "position": 3,
          "date": "2012-01-01",
          "value": 0.8
        },
        {
          "category": "C",
          "position": 0,
          "date": "2012-01-01",
          "value": 0.6
        },
        {
          "category": "C",
          "position": 1,
          "date": "2012-01-01",
          "value": 0.1
        },
        {
          "category": "C",
          "position": 2,
          "date": "2012-01-01",
          "value": 0.2
        },
        {
          "category": "C",
          "position": 3,
          "date": "2012-01-01",
          "value": 0.7
        },
        {
          "category": "A",
          "position": 0,
          "date": "2012-02-01",
          "value": 0.1
        },
        {
          "category": "A",
          "position": 1,
          "date": "2012-02-01",
          "value": 0.6
        },
        {
          "category": "A",
          "position": 2,
          "date": "2012-02-01",
          "value": 0.9
        },
        {
          "category": "A",
          "position": 3,
          "date": "2012-02-01",
          "value": 0.4
        },
        {
          "category": "B",
          "position": 0,
          "date": "2012-02-01",
          "value": 0.7
        },
        {
          "category": "B",
          "position": 1,
          "date": "2012-02-01",
          "value": 0.2
        },
        {
          "category": "B",
          "position": 2,
          "date": "2012-02-01",
          "value": 1.1
        },
        {
          "category": "B",
          "position": 3,
          "date": "2012-02-01",
          "value": 0.8
        },
        {
          "category": "C",
          "position": 0,
          "date": "2012-02-01",
          "value": 0.6
        },
        {
          "category": "C",
          "position": 1,
          "date": "2012-02-01",
          "value": 0.1
        },
        {
          "category": "C",
          "position": 2,
          "date": "2012-02-01",
          "value": 0.2
        },
        {
          "category": "C",
          "position": 3,
          "date": "2012-02-01",
          "value": 0.7
        },
        {
          "category": "A",
          "position": 0,
          "date": "2012-03-01",
          "value": 0.1
        },
        {
          "category": "A",
          "position": 1,
          "date": "2012-03-01",
          "value": 0.6
        },
        {
          "category": "A",
          "position": 2,
          "date": "2012-03-01",
          "value": 0.9
        },
        {
          "category": "A",
          "position": 3,
          "date": "2012-03-01",
          "value": 0.4
        },
        {
          "category": "B",
          "position": 0,
          "date": "2012-03-01",
          "value": 0.7
        },
        {
          "category": "B",
          "position": 1,
          "date": "2012-03-01",
          "value": 0.2
        },
        {
          "category": "B",
          "position": 2,
          "date": "2012-03-01",
          "value": 1.1
        },
        {
          "category": "B",
          "position": 3,
          "date": "2012-03-01",
          "value": 0.8
        },
        {
          "category": "C",
          "position": 0,
          "date": "2012-03-01",
          "value": 0.6
        },
        {
          "category": "C",
          "position": 1,
          "date": "2012-03-01",
          "value": 0.1
        },
        {
          "category": "C",
          "position": 2,
          "date": "2012-03-01",
          "value": 0.2
        },
        {
          "category": "C",
          "position": 3,
          "date": "2012-03-01",
          "value": 0.7
        }
      ],
      "format": {
        "parse": {
          "date": "date"
        }
      },
      "transform": [{
        "type": "stack",
        "field": "value",
        "groupby": ["date", "category"],
        "as": [
          "y0",
          "y1"
        ]
      }]
    }],

    "scales": [{
        "name": "xscale",
        "type": "band",
        "domain": {
          "data": "table",
          "field": "date"
        },
        "range": "width",
        "padding": 0.2
      },
      {
        "name": "yscale",
        "type": "linear",
        "domain": {
          "fields": [{
            "data": "table",
            "field": "y0"
          }, {
            "data": "table",
            "field": "y1"
          }]
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
          "field": "category"
        },
        "range": {
          "scheme": "category20"
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
          "field": "category"
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
              "field": "category"
            },
            "width": {
              "scale": "pos",
              "band": 1
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
              "offset": 1
            },
            "y2": {
              "scale": "yscale",
              "field": "y1",
              "offset": 1
            },
            "fill": {
              "scale": "color",
              "field": "category"
            },
            "fillOpacity": {
              "signal": "clamp((datum.position/5)+0.20,0,1)"
            }
          }
        }
      }]
    }]
  }


  App.View.GroupedBarView = App.View.VegaChartView.extend({

    el: '#vis-grouped-bar-chart',

    options: {
      spec: chartSpec,
      vis: 'ID',
      title: 'Saving by type'
    }

  });

}).call(this, this.App);
