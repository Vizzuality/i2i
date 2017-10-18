(function(App) {
  'use strict';

  var chartSpec = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 1000,
    "height": 480,
    "padding": 5,
    "data": [{
      "name": "table",
      "format": {
        "type": "json",
        "property": "values"
      },
      "url": "/data/kenya_household_without_null.json",
      "transform": [{
        "type": "filter",
        "expr": "datum.category_type == 'income' || datum.category_type == 'expense'"
      }]
    }, {
      "name": "stats",
      "values": [{
        "c": "min",
        "y": 0,
        "x": "2012-07-01"
      }, {
        "c": "max",
        "y": 60000,
        "x": "2013-12-01"
      }],
      "format": {
        "type": "json",
        "parse": {
          "y": "number",
          "x": "date"
        }
      }
    }],
    "scales": [{
      "name": "color",
      "type": "ordinal",
      "range": ["#CCDDFE", "#FECCD7", "#E2CCFE", "#CDFECC", "#FEFECC"],
      "domain": {
        "data": "table",
        "field": "category_type"
      }
    }],
    "signals": [{
      "name": "detailDomain"
    }],
    "marks": [{
      "type": "group",
      "name": "detail",
      "encode": {
        "enter": {
          "height": {
            "value": 390
          },
          "width": {
            "value": 1000
          }
        }
      },
      "scales": [{
        "name": "xDetail",
        "type": "time",
        "range": "width",
        "domain": {
          "data": "stats",
          "field": "x"
        },
        "domainRaw": {
          "signal": "detailDomain"
        }
      }, {
        "name": "yDetail",
        "type": "linear",
        "range": [
          390,
          0
        ],
        "domain": {
          "data": "stats",
          "field": "y"
        },
        "nice": true,
        "zero": true
      }],
      "axes": [{
        "orient": "bottom",
        "scale": "xDetail"
      }, {
        "orient": "left",
        "scale": "yDetail"
      }],
      "marks": [{
        "name": "partitioned_saved",
        "type": "group",
        "from": {
          "facet": {
            "name": "partitioned_saved_data",
            "data": "table",
            "field": "household_transaction_histories"
          }
        },
        "encode": {
          "enter": {
            "height": {
              "field": {
                "group": "height"
              }
            },
            "width": {
              "field": {
                "group": "width"
              }
            },
            "clip": {
              "value": true
            }
          }
        },
        "marks": [{
          "type": "line",
          "from": {
            "data": "partitioned_saved_data"
          },
          "encode": {
            "update": {
              "x": {
                "scale": "xDetail",
                "signal": "toDate(datum.date)"
              },
              "y": {
                "scale": "yDetail",
                "field": "avg_value"
              },
              "defined": {
                "signal": "datum.avg_value!=null"
              },
              "interpolate": {
                "value": "monotone"
              },
              "stroke": {
                "scale": "color",
                "field": {
                  "parent": "category_type"
                }
              },
              "opacity": {
                "value": 1
              },
              "strokeWidth": {
                "value": 0.5
              },
              "zindex": {
                "value": 1
              }
            },
            "hover": {
              "stroke": {
                "value": "firebrick"
              },
              "strokeWidth": {
                "value": 2
              },
              "strokeOpacity": {
                "value": 1
              },
              "zindex": {
                "value": 1000
              }
            }
          }
        }]
      }]
    }, {
      "type": "group",
      "name": "overview",
      "encode": {
        "enter": {
          "x": {
            "value": 0
          },
          "y": {
            "value": 430
          },
          "height": {
            "value": 70
          },
          "width": {
            "value": 1000
          },
          "fill": {
            "value": "transparent"
          }
        }
      },
      "signals": [{
        "name": "brush",
        "value": 0,
        "on": [{
          "events": "@overview:mousedown",
          "update": "[x(), x()]"
        }, {
          "events": "[@overview:mousedown, window:mouseup] > window:mousemove!",
          "update": "[brush[0], clamp(x(), 0, width)]"
        }, {
          "events": {
            "signal": "delta"
          },
          "update": "clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)"
        }]
      }, {
        "name": "anchor",
        "value": null,
        "on": [{
          "events": "@brush:mousedown",
          "update": "slice(brush)"
        }]
      }, {
        "name": "xdown",
        "value": 0,
        "on": [{
          "events": "@brush:mousedown",
          "update": "x()"
        }]
      }, {
        "name": "delta",
        "value": 0,
        "on": [{
          "events": "[@brush:mousedown, window:mouseup] > window:mousemove!",
          "update": "x() - xdown"
        }]
      }, {
        "name": "detailDomain",
        "push": "outer",
        "on": [{
          "events": {
            "signal": "brush"
          },
          "update": "span(brush) ? invert('xOverview', brush) : null"
        }]
      }],
      "scales": [{
        "name": "xOverview",
        "type": "time",
        "range": "width",
        "domain": {
          "data": "stats",
          "field": "x"
        }
      }, {
        "name": "yOverview",
        "type": "linear",
        "range": [
          70,
          0
        ],
        "domain": [0, 1],
        "nice": true,
        "zero": true
      }],
      "axes": [{
        "orient": "bottom",
        "scale": "xOverview"
      }],
      "marks": [{
        "type": "rect",
        "name": "brush",
        "encode": {
          "enter": {
            "y": {
              "value": 0
            },
            "height": {
              "value": 70
            },
            "fill": {
              "value": "#333"
            },
            "fillOpacity": {
              "value": 0.2
            }
          },
          "update": {
            "x": {
              "signal": "brush[0]"
            },
            "x2": {
              "signal": "brush[1]"
            }
          }
        }
      }, {
        "type": "rect",
        "interactive": false,
        "encode": {
          "enter": {
            "y": {
              "value": 0
            },
            "height": {
              "value": 70
            },
            "width": {
              "value": 1
            },
            "fill": {
              "value": "firebrick"
            }
          },
          "update": {
            "x": {
              "signal": "brush[0]"
            }
          }
        }
      }, {
        "type": "rect",
        "interactive": false,
        "encode": {
          "enter": {
            "y": {
              "value": 0
            },
            "height": {
              "value": 70
            },
            "width": {
              "value": 1
            },
            "fill": {
              "value": "firebrick"
            }
          },
          "update": {
            "x": {
              "signal": "brush[1]"
            }
          }
        }
      }]
    }]
  };

  App.View.MainChartView = App.View.VegaChartView.extend({

    el: '#vis-main-chart',

    options: {
      spec: chartSpec,
      vis: 'ID',
      title: 'Flow of savings'
    }

  });

}).call(this, this.App);
