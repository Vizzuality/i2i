(function (App) {
  'use strict';

  var chartSpec = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 900,
    "height": 480,
    "padding": 10,
    "autosize": {
      "type": "pad",
      "resize": true
    },
    "config": {
      "axis": {
        "grid": false,
        "gridColor": "#dedede",
        "labelFont": "sans-serif",
        "labelFontSize": 12,
        "tickColor": "#dedede"
      },
      "symbol": {
        "fill": "steelblue",
        "size": 64
      },
      "line": {
        "opacity": "steelblue",
        "interpolate": "monotone"
      },
      "range": {
        "category": [
          "#5079a5",
          "#ef8e3b",
          "#dd565c",
          "#79b7b2"
        ]
      }

    },
    "data": [{
        "name": "table",
        "format": {
          "type": "json",
          "property": "data"
        },
        "url": "<%= api %>/household_transactions?categories=<%= categories %>&project_name=<%= project_name %>"
      },
      {
        "name": "stats",
        "url": "<%= api %>/project_min_max/<%= project_name %>?categories=<%= categories %>",
        "format": {
          "type": "json",
          "property": "data",
          "parse": {
            "value": "number",
            "date": "date"
          }
        }
      },
      {
        "name": "mean",
        "values": [{
            "c": "income",
            "yMin": 20000,
            "yMax": 80000,
            "y": 50000,
            "x": "2014-07-01"
          },
          {
            "c": "income",
            "yMin": 200,
            "yMax": 8000,
            "y": 6000,
            "x": "2014-09-01"
          },
          {
            "c": "income",
            "yMin": 20000,
            "yMax": 80000,
            "y": 50000,
            "x": "2014-11-01"
          },
          {
            "c": "income",
            "yMin": 200,
            "yMax": 8000,
            "y": 6000,
            "x": "2015-01-01"
          },
          {
            "c": "income",
            "yMin": 200,
            "yMax": 8000,
            "y": 6000,
            "x": "2015-03-01"
          },
          {
            "c": "income",
            "yMin": 200,
            "yMax": 8000,
            "y": 6000,
            "x": "2015-12-01"
          }
        ],
        "format": {
          "type": "json",
          "parse": {
            "y": "number",
            "yMin": "number",
            "yMax": "number",
            "x": "date"
          }
        }
      }
    ],
    "scales": [{
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": {
        "data": "table",
        "field": "category_type"
      }
    }],
    "signals": [{
        "name": "detailDomain"
      },
      {
        "name": "detailDomainY"
      }
    ],
    "marks": [{
        "type": "group",
        "name": "detail",
        "encode": {
          "enter": {
            "x": {
              "value": 80
            },
            "height": {
              "value": 390
            },
            "width": {
              "field": {
                "group": "width"
              }
            }
          }
        },
        "scales": [{
            "name": "xDetail",
            "type": "time",
            "range": "width",
            "nice": true,
            "domain": {
              "data": "stats",
              "field": "date"
            },
            "domainRaw": {
              "signal": "detailDomain"
            }
          },
          {
            "name": "yDetail",
            "type": "linear",
            "range": [
              390,
              0
            ],
            "domain": {
              "data": "stats",
              "field": "value"
            },
            "domainRaw": {
              "signal": "detailDomainY"
            },
            "nice": true,
            "reverse": false,
            "zero": true
          }
        ],
        "axes": [{
            "orient": "bottom",
            "scale": "xDetail",
            "labelOverlap": true,
            "domain": true,
            "zindex": 1
          },
          {
            "orient": "left",
            "scale": "yDetail",
            "domain": false,
            "grid": true,
            "zindex": 0
          }
        ],
        "marks": [{
            "name": "partitioned_saved",
            "type": "group",
            "from": {
              "facet": {
                "name": "partitioned_saved_data",
                "data": "table",
                "field": "values"
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
                    "stroke": {
                      "scale": "color",
                      "field": {
                        "parent": "category_type"
                      }
                    },
                    "opacity": {
                      "value": 0.2
                    },
                    "strokeWidth": {
                      "value": 1
                    },
                    "strokeCap": {
                      "value": "round"
                    },
                    "zindex": {
                      "value": 0
                    }
                  },
                  "hover": {
                    "href": {
                      "signal": "'/'+parent.household_name"
                    },
                    "strokeWidth": {
                      "value": 2
                    },
                    "opacity": {
                      "value": 1
                    },
                    "zindex": {
                      "value": 1
                    }
                  }
                }
              },
              {
                "type": "symbol",
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
                    "fill": {
                      "scale": "color",
                      "field": {
                        "parent": "category_type"
                      }
                    },
                    "opacity": [{
                        "test": "datum.avg_value!=null",
                        "value": 0.2
                      },
                      {
                        "value": 0
                      }
                    ],
                    "size": {
                      "value": 10
                    },
                    "zindex": {
                      "value": 0
                    }
                  },
                  "hover": {
                    "href": {
                      "signal": "'https://vega.github.io/'+parent.household_name"
                    },
                    "zindex": {
                      "value": 1
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "mean_group",
            "type": "group",
            "from": {
              "facet": {
                "name": "mean_data",
                "data": "mean",
                "groupby": "c"
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
                "data": "mean_data"
              },
              "encode": {
                "update": {
                  "x": {
                    "scale": "xDetail",
                    "field": "x"
                  },
                  "y": {
                    "scale": "yDetail",
                    "field": "y"
                  },
                  "stroke": {
                    "scale": "color",
                    "field": "c"
                  },
                  "opacity": {
                    "value": 1
                  },
                  "strokeWidth": {
                    "value": 1
                  },
                  "strokeDash": {
                    "value": [
                      4,
                      4
                    ]
                  },
                  "zindex": {
                    "value": 1
                  }
                }
              }
            }]
          }
        ]
      },
      {
        "type": "group",
        "name": "overview",
        "encode": {
          "enter": {
            "x": {
              "value": 80
            },
            "y": {
              "value": 430
            },
            "height": {
              "value": 70
            },
            "width": {
              "field": {
                "group": "width"
              }
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
              },
              {
                "events": "[@overview:mousedown, window:mouseup] > window:mousemove!",
                "update": "[brush[0], clamp(x(), 0, width)]"
              },
              {
                "events": {
                  "signal": "delta"
                },
                "update": "clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)"
              }
            ]
          },
          {
            "name": "anchor",
            "value": null,
            "on": [{
              "events": "@brush:mousedown",
              "update": "slice(brush)"
            }]
          },
          {
            "name": "xdown",
            "value": 0,
            "on": [{
              "events": "@brush:mousedown",
              "update": "x()"
            }]
          },
          {
            "name": "delta",
            "value": 0,
            "on": [{
              "events": "[@brush:mousedown, window:mouseup] > window:mousemove!",
              "update": "x() - xdown"
            }]
          },
          {
            "name": "detailDomain",
            "push": "outer",
            "on": [{
              "events": {
                "signal": "brush"
              },
              "update": "span(brush) ? invert('xOverview', brush) : null"
            }]
          }
        ],
        "scales": [{
            "name": "xOverview",
            "type": "time",
            "range": "width",
            "domain": {
              "data": "stats",
              "field": "date"
            },
            "nice": true
          },
          {
            "name": "yOverview",
            "type": "linear",
            "range": [
              70,
              0
            ],
            "domain": {
              "data": "stats",
              "field": "value"
            },
            "nice": true,
            "zero": true
          }
        ],
        "axes": [{
          "orient": "bottom",
          "scale": "xOverview",
          "labelOverlap": true
        }],
        "marks": [{
            "name": "area_group",
            "type": "group",
            "from": {
              "facet": {
                "name": "area_data",
                "data": "mean",
                "groupby": "c"
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
              "type": "area",
              "interactive": false,
              "from": {
                "data": "area_data"
              },
              "encode": {
                "update": {
                  "x": {
                    "scale": "xOverview",
                    "field": "x"
                  },
                  "y": {
                    "scale": "yOverview",
                    "field": "yMin"
                  },
                  "y2": {
                    "scale": "yOverview",
                    "field": "yMax"
                  },
                  "interpolate": {
                    "value": "linear"
                  },
                  "fill": {
                    "scale": "color",
                    "field": "c"
                  },
                  "opacity": {
                    "value": 1
                  },
                  "zindex": {
                    "value": 1
                  }
                }
              }
            }]
          },
          {
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
          },
          {
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
          },
          {
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
          }
        ]
      },
      {
        "type": "group",
        "name": "yOverview",
        "encode": {
          "enter": {
            "height": {
              "value": 390
            },
            "width": {
              "value": 30
            },
            "fill": {
              "value": "transparent"
            },
            "clip": {
              "value": true
            }
          }
        },
        "signals": [{
            "name": "brush",
            "value": 0,
            "on": [{
                "events": "@yOverview:mousedown",
                "update": "[y(), y()]"
              },
              {
                "events": "[@yOverview:mousedown, window:mouseup] > window:mousemove!",
                "update": "[brush[0],clamp(y(), 0, height)]"
              },
              {
                "events": {
                  "signal": "delta"
                },
                "update": "clampRange([anchor[0] + delta,anchor[1] + delta], 0, height)"
              }
            ]
          },
          {
            "name": "anchor",
            "value": null,
            "on": [{
              "events": "@brush:mousedown",
              "update": "slice(brush)"
            }]
          },
          {
            "name": "xdown",
            "value": 0,
            "on": [{
              "events": "@brush:mousedown",
              "update": "y()"
            }]
          },
          {
            "name": "delta",
            "value": 0,
            "on": [{
              "events": "[@brush:mousedown, window:mouseup] > window:mousemove!",
              "update": "y() - xdown"
            }]
          },
          {
            "name": "detailDomainY",
            "push": "outer",
            "on": [{
              "events": {
                "signal": "brush"
              },
              "update": "span(brush) ? [invert('yYOverview', brush)[1],invert('yYOverview', brush)[0]] : null"
            }]
          }
        ],
        "scales": [{
            "name": "xYOverview",
            "type": "time",
            "range": [
              30,
              0
            ],
            "domain": {
              "data": "stats",
              "field": "date"
            }
          },
          {
            "name": "yYOverview",
            "type": "linear",
            "range": [
              390,
              0
            ],
            "domain": {
              "data": "stats",
              "field": "value"
            },
            "nice": true,
            "reverse": false,
            "zero": true
          }
        ],
        "axes": [{
          "orient": "left",
          "scale": "yYOverview",
          "labels": false,
          "ticks": false
        }],
        "marks": [{
            "name": "partitioned_saved",
            "type": "group",
            "from": {
              "facet": {
                "name": "partitioned_saved_data",
                "data": "table",
                "field": "values"
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
              "type": "symbol",
              "from": {
                "data": "partitioned_saved_data"
              },
              "interactive": false,
              "encode": {
                "update": {
                  "x": {
                    "scale": "xYOverview",
                    "signal": "toDate(datum.date)"
                  },
                  "y": {
                    "scale": "yYOverview",
                    "field": "avg_value"
                  },
                  "fill": {
                    "scale": "color",
                    "field": {
                      "parent": "category_type"
                    }
                  },
                  "opacity": [{
                    "test": "datum.avg_value!=null",
                    "value": 0.2
                  }, {
                    "value": 0
                  }],
                  "size": {
                    "value": 2
                  },
                  "zindex": {
                    "value": 0
                  }
                }
              }
            }]
          },
          {
            "type": "rect",
            "name": "brush",
            "encode": {
              "enter": {
                "x": {
                  "value": 0
                },
                "width": {
                  "value": 30
                },
                "fill": {
                  "value": "#333"
                },
                "fillOpacity": {
                  "value": 0.2
                }
              },
              "update": {
                "y2": {
                  "signal": "brush[0]"
                },
                "y": {
                  "signal": "brush[1]"
                }
              }
            }
          },
          {
            "type": "rect",
            "interactive": false,
            "encode": {
              "enter": {
                "height": {
                  "value": 1
                },
                "x": {
                  "value": 0
                },
                "width": {
                  "value": 30
                },
                "fill": {
                  "value": "firebrick"
                }
              },
              "update": {
                "y": {
                  "signal": "brush[0]"
                }
              }
            }
          },
          {
            "type": "rect",
            "interactive": false,
            "encode": {
              "enter": {
                "height": {
                  "value": 1
                },
                "x": {
                  "value": 0
                },
                "width": {
                  "value": 30
                },
                "fill": {
                  "value": "firebrick"
                }
              },
              "update": {
                "y": {
                  "signal": "brush[1]"
                }
              }
            }
          }
        ]
      }
    ]
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
