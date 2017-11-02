(function (App) {
  'use strict';

  App.Specs.MainChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 700,
    "height": 640,
    "padding": 0,
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
    "data": [
    {
      "name": "table",
      "format": {
        "type": "json",
        "property": "data"
      },
      "url": "<%= api %>/household_transactions?categories=<%= categories %>&project_name=<%= project_name %><%= subFilters %>"
    },
    {
      "name": "stats",
      "url": "<%= api %>/households/project_min_max/<%= project_name %>?categories=<%= categories %>",
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
      "url": "<%= api %>/households/project_means/<%= project_name %>?categories=<%= categories %>",
      "format": {
        "type": "json",
        "property": "data",
        "parse": {
          "median": "number",
          "max": "number",
          "min": "number",
          "date": "date"
        }
      }
    }
    ],
    "scales": [
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
    "legends": [
    {
      "stroke": "color",
      "padding": 20,
      "orient": "bottom",
      "encode": {
        "legend": {},
        "labels": {
          "interactive": false,
          "update": {
            "text": {
              "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),15,'right','...')"
            },
            "fill": {
              "value": "black"
            },
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/8)+15 : (datum.index-6)*(width/8)+40"
            }
          }
        },
        "symbols": {
          "update": {
            "size": {
              "value": 50
            },
            "shape": {
              "value": "M -1 0 l 3 0"
            },
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/8) : (datum.index-6)*(width/8)"
            }
          }
        }
      }
    },
    {
      "stroke": "color",
      "padding": 20,
      "orient": "bottom",
      "values": [
      "mean"
      ],
      "encode": {
        "legend": {},
        "labels": {
          "interactive": false,
          "update": {
            "text": {
              "signal": "truncate(upper(slice(datum.value, 0,1))+slice(datum.value, 1),15,'right','...')"
            },
            "fill": {
              "value": "black"
            },
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/6)+15 : (datum.index-6)*(width/6)+30"
            }
          }
        },
        "symbols": {
          "update": {
            "size": {
              "value": 100
            },
            "shape": {
              "value": "M -1 0 l 3 0"
            },
            "y": {
              "signal": "datum.index<6 ? 0 : 30"
            },
            "strokeDash": {
              "value": [
              4,
              4
              ]
            },
            "x": {
              "signal": "datum.index<6 ? datum.index*(width/6) : (datum.index-6)*(width/6)"
            }
          }
        }
      }
    }
    ],
    "signals": [
    {
      "name": "sort",
      "value": true,
      "bind": {
        "input": "checkbox",
        "name": "View all households"
      }
    },
    {
      "name": "sort2",
      "value": true,
      "bind": {
        "input": "checkbox",
        "name": "View mean"
      }
    },
    {
      "name": "currency",
      "update": "data('stats')[0].unit"
    },
    {
      "name": "steps",
      "update": "data('stats')"
    },
    {
      "name": "detailDomain"
    },
    {
      "name": "detailDomainY"
    },
    {
      "name": "clickHousehold"
    },
    {
      "name": "overHousehold"
    }
    ],
    "marks": [
    {
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
      "scales": [
      {
        "name": "xDetail",
        "type": "utc",
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
        "type": "sqrt",
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
      "axes": [
      {
        "orient": "bottom",
        "scale": "xDetail",
        "labelOverlap": "greedy",
        "ticks": false,
        "labelPadding": 10,
        "zindex": 1,
        "encode": {
          "labels": {
            "interactive": false,
            "update": {
              "angle": {
                "signal": "width < 510? 90 : 0"
              }
            }
          }
        }
      },
      {
        "orient": "left",
        "scale": "yDetail",
        "title":"title",
        "domain": false,
        "format":"s",
        "grid": true,
        "zindex": 0,
        "encode": {
          "title": {
            "interactive": false,
            "update": {
              "x":{
                "value":-15
              },
              "y":{
                "value":-15
              },
              "angle":{"value":0},
              "text": {
                "signal": "currency"
              }
            }
          }
        }
      }
      ],
      "signals": [
      {
        "name": "clickHousehold",
        "description": "A date value that updates in response to mousemove.",
        "push": "outer",
        "on": [
        {
          "events": "line:click,line:touchstart",
          "update": "group().context.group.datum.household_name"
        }
        ]
      },
      {
        "name": "overHousehold",
        "description": "tootip data.",
        "push": "outer",
        "on": [
        {
          "events": "line:mouseover, symbol:mouseover",
          "update": "{item: group().context.group.datum, date: invert('xDetail',x()), position: xy()}"
        }
        ]
      }
      ],
      "marks": [
      {
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
        "signal": [],
        "marks": [
        {
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
                "field": "value"
              },
              "defined": {
                "signal": "datum.value!=null"
              },
              "stroke": {
                "scale": "color",
                "field": {
                  "parent": "category_type"
                }
              },
              "opacity": [
              {
                "test": "sort",
                "value": 0.2
              },
              {
                "value": 0
              }
              ],
              "strokeWidth": {
                "value": 1
              },
              "strokeCap": {
                "value": "round"
              },
              "zindex": {
                "value": 0
              },
              "cursor": {
                "value": "auto"
              }
            },
            "hover": {
              "cursor": {
                "value": "pointer"
              },
              "strokeWidth": {
                "value": 2
              },
              "opacity": [
              {
                "test": "sort",
                "value": 1
              },
              {
                "value": 0
              }
              ],
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
                "field": "value"
              },
              "fill": {
                "scale": "color",
                "field": {
                  "parent": "category_type"
                }
              },
              "opacity": [
              {
                "test": "datum.value!=null && sort",
                "value": 0.2
              },
              {
                "value": 0
              }
              ],
              "size": {
                "value": 20
              },
              "cursor": {
                "value": "auto"
              },
              "zindex": {
                "value": 0
              }
            },
            "hover": {
              "size": {
                "value": 60
              },
              "opacity": {
                "value": 1
              },
              "zindex": {
                "value": 1
              },
              "cursor": {
                "value": "pointer"
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
            "groupby": "category_type"
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
        "marks": [
        {
          "type": "line",
          "from": {
            "data": "mean_data"
          },
          "encode": {
            "update": {
              "x": {
                "scale": "xDetail",
                "field": "date"
              },
              "y": {
                "scale": "yDetail",
                "field": "median"
              },
              "stroke": {
                "scale": "color",
                "field": "category_type"
              },
              "opacity": [
              {
                "test": "sort2",
                "value": 1
              },
              {
                "value": 0
              }
              ],
              "strokeWidth": {
                "value": 2
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
        }
        ]
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
            "value": 450
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
          },
          "stroke": {
            "value": "#efefef"
          }
        }
      },
      "signals": [
      {
        "name": "brush",
        "value": 0,
        "on": [
        {
          "events": "@overview:mousedown, @end:mousedown, @overview:touchstart, @end:touchstart",
          "update": "[x()-80, x()-80]"
        },
        {
          "events": "[@overview:mousedown, window:mouseup] > window:mousemove!,[@end:mousedown, window:mouseup] > window:mousemove!,[@overview:touchstart, window:touchend] > window:touchmove!,[@end:touchstart, window:touchend] > window:touchmove!",
          "update": "[brush[0], clamp(x()-80, 0, width)]"
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
        "on": [
        {
          "events": "@brush:mousedown, @brush:touchstart",
          "update": "slice(brush)"
        }
        ]
      },
      {
        "name": "xdown",
        "value": 0,
        "on": [
        {
          "events": "@brush:mousedown, @brush:touchstart",
          "update": "x()"
        }
        ]
      },
      {
        "name": "delta",
        "value": 0,
        "on": [
        {
          "events": "[@brush:mousedown, window:mouseup] > window:mousemove!, [@brush:touchstart, window:touchend] > window:touchmove!",
          "update": "x() - xdown"
        }
        ]
      },
      {
        "name": "detailDomain",
        "push": "outer",
        "on": [
        {
          "events": {
            "signal": "brush"
          },
          "update": "span(brush) ? invert('xOverview', brush) : null"
        }
        ]
      }
      ],
      "scales": [
      {
        "name": "xOverview",
        "type": "utc",
        "range": "width",
        "nice": true,
        "domain": {
          "data": "stats",
          "field": "date"
        }
      },
      {
        "name": "yOverview",
        "type": "sqrt",
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
      "axes": [
      {
        "orient": "bottom",
        "scale": "xOverview",
        "labelOverlap": true,
        "format": "%b"
      },
      {
        "orient": "bottom",
        "scale": "xOverview",
        "labelOverlap": true,
        "format": "%Y",
        "offset": 20,
        "tickCount": {
          "signal": "2"
        }
      }
      ],
      "marks": [
      {
        "name": "area_group",
        "type": "group",
        "from": {
          "facet": {
            "name": "area_data",
            "data": "mean",
            "groupby": "category_type"
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
        "marks": [
        {
          "type": "area",
          "interactive": false,
          "from": {
            "data": "area_data"
          },
          "encode": {
            "update": {
              "x": {
                "scale": "xOverview",
                "field": "date"
              },
              "y": {
                "scale": "yOverview",
                "field": "min"
              },
              "y2": {
                "scale": "yOverview",
                "field": "max"
              },
              "fill": {
                "scale": "color",
                "field": "category_type"
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
            "stroke": {
              "value": "#2F939C"
            },
            "strokeWidth": {
              "value": 1
            },
            "fill": {
              "value": "#2F939C"
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
              "value": "#2F939C"
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
        "type": "symbol",
        "name": "end0",
        "interactive": true,
        "encode": {
          "enter": {
            "y": {
              "value": 35
            },
            "size": {
              "value": 100
            },
            "fill": {
              "value": "#2F939C"
            },
            "stroke": {
              "value": "#efefef"
            }
          },
          "update": {
            "x": {
              "signal": "brush[0]"
            },
            "cursor": {
              "value": "auto"
            }
          },
          "hover": {
            "cursor": {
              "value": "ew-resize"
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
              "value": "#2F939C"
            }
          },
          "update": {
            "x": {
              "signal": "brush[1]"
            }
          }
        }
      },
      {
        "type": "symbol",
        "name": "end",
        "interactive": true,
        "encode": {
          "enter": {
            "y": {
              "value": 35
            },
            "size": {
              "value": 100
            },
            "fill": {
              "value": "#2F939C"
            },
            "stroke": {
              "value": "#efefef"
            }
          },
          "update": {
            "x": {
              "signal": "brush[1]"
            },
            "cursor": {
              "value": "auto"
            }
          },
          "hover": {
            "cursor": {
              "value": "ew-resize"
            }
          }
        }
      }
      ]
    },
    {
      "type": "rule",
      "name": "swq",
      "interactive": false,
      "encode": {
        "enter": {
          "x": {
            "value": 0
          },
          "y": {
            "value": 580
          },
          "x2": {
            "signal": "width*1.1"
          },
          "strokeOpacity": {
            "value": 1
          },
          "strokeWidth": {
            "value": 1
          },
          "stroke": {
            "value": "#efefef"
          }
        }
      }
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
            "value": false
          },
          "stroke": {
            "value": "#efefef"
          }
        }
      },
      "signals": [
      {
        "name": "yBrush",
        "value": 0,
        "on": [
        {
          "events": "@yOverview:mousedown, @yend:mousedown, @yOverview:touchstart, @yend:touchstart",
          "update": "[y(), y()]"
        },
        {
          "events": "[@yOverview:mousedown, window:mouseup] > window:mousemove!, [@yend:mousedown, window:mouseup] > window:mousemove!, [@yOverview:touchstart, window:touchend] > window:touchmove!, [@yend:touchstart, window:touchend] > window:touchmove!",
          "update": "[yBrush[0],clamp(y(), 0, 390)]"
        },
        {
          "events": {
            "signal": "ydelta"
          },
          "update": "clampRange([yanchor[0] + ydelta, yanchor[1] + ydelta], 0, 390)"
        }
        ]
      },
      {
        "name": "yanchor",
        "value": null,
        "on": [
        {
          "events": "@yBrush:mousedown,@yBrush:touchstart",
          "update": "slice(yBrush)"
        }
        ]
      },
      {
        "name": "ydown",
        "value": 0,
        "on": [
        {
          "events": "@yBrush:mousedown,@yBrush:touchstart",
          "update": "y()"
        }
        ]
      },
      {
        "name": "ydelta",
        "value": 0,
        "on": [
        {
          "events": "[@yBrush:mousedown, window:mouseup] > window:mousemove!, [@yBrush:touchstart, window:touchend] > window:touchmove!",
          "update": "y() - ydown"
        }
        ]
      },
      {
        "name": "detailDomainY",
        "push": "outer",
        "on": [
        {
          "events": {
            "signal": "yBrush"
          },
          "update": "span(yBrush) ? [invert('yYOverview', yBrush)[1],invert('yYOverview', yBrush)[0]] : null"
        }
        ]
      }
      ],
      "scales": [
      {
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
        "type": "sqrt",
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
      "axes": [
      {
        "orient": "left",
        "scale": "yYOverview",
        "labels": false,
        "ticks": false
      }
      ],
      "marks": [
      {
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
        "marks": [
        {
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
                "field": "value"
              },
              "fill": {
                "scale": "color",
                "field": {
                  "parent": "category_type"
                }
              },
              "opacity": [
              {
                "test": "datum.value!=null",
                "value": 0.2
              },
              {
                "value": 0
              }
              ],
              "size": {
                "value": 2
              },
              "zindex": {
                "value": 0
              }
            }
          }
        }
        ]
      },
      {
        "type": "rect",
        "name": "yBrush",
        "encode": {
          "enter": {
            "x": {
              "value": 0
            },
            "width": {
              "value": 30
            },
            "stroke": {
              "value": "#2F939C"
            },
            "strokeWidth": {
              "value": 1
            },
            "fill": {
              "value": "#2F939C"
            },
            "fillOpacity": {
              "value": 0.2
            }
          },
          "update": {
            "y2": {
              "signal": "yBrush[0]"
            },
            "y": {
              "signal": "yBrush[1]"
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
              "value": "#2F939C"
            }
          },
          "update": {
            "y": {
              "signal": "yBrush[0]"
            }
          }
        }
      },
      {
        "type": "symbol",
        "name": "yend0",
        "interactive": true,
        "encode": {
          "enter": {
            "x": {
              "value": 15
            },
            "size": {
              "value": 100
            },
            "fill": {
              "value": "#2F939C"
            },
            "stroke": {
              "value": "#efefef"
            }
          },
          "update": {
            "y": {
              "signal": "yBrush[0]"
            },
            "cursor": {
              "value": "auto"
            }
          },
          "hover": {
            "cursor": {
              "value": "ns-resize"
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
              "value": "#2F939C"
            }
          },
          "update": {
            "y": {
              "signal": "yBrush[1]"
            }
          }
        }
      },
      {
        "type": "symbol",
        "name": "yend",
        "interactive": true,
        "encode": {
          "enter": {
            "x": {
              "value": 15
            },
            "size": {
              "value": 100
            },
            "fill": {
              "value": "#2F939C"
            },
            "stroke": {
              "value": "#efefef"
            }
          },
          "update": {
            "y": {
              "signal": "yBrush[1]"
            },
            "cursor": {
              "value": "auto"
            }
          },
          "hover": {
            "cursor": {
              "value": "ns-resize"
            }
          }
        }
      }
      ]
    }
    ]
  };

}).call(this, this.App);
