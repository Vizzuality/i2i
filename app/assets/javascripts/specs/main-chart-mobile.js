(function (App) {
  'use strict';

  App.Specs.MainChartMobile = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 320,
    "height": 330,
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
        "labelFontSize": 11,
        "labelColor": "#001D22",
        "titleFont": "Open Sans",
        "titleFontSize": 11,
        "titleFontWeight": "normal",
        "titleColor": "#001D22",
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
          "#915FC4",
          "#83CB4D",
          "#5DD0E5"
        ]
      }
    },
    "data": [{
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
    "scales": [{
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": [
        "income",
        "expense",
        "savings",
        "credit"
      ]
    }],
    "legends": [{
        "stroke": "color",
        "padding": 5,
        "orient": "bottom",
        "encode": {
          "legend": {},
          "labels": {},
          "symbols": {
            "update": {
              "size": {
                "value": 50
              },
              "shape": {
                "value": "M -1 0 l 3 0"
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
    "signals": [{
        "name": "range_start",
        "value": null,
        "bind": {
          "input": "date",
          "name": "Date Start"
        }
      },
      {
        "name": "range_end",
        "value": null,
        "bind": {
          "input": "date",
          "name": "Date End"
        }
      },
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
        "name": "detailDomain",
        "on": [{
            "events": {
              "signal": "range_start"
            },
            "update": "span([range_start,range_end]) ? invert('xOverview', [range_start,range_end]) : null"
          },
          {
            "events": {
              "signal": "range_end"
            },
            "update": "span([range_start,range_end]) ? invert('xOverview', [range_start,range_end]) : null"
          }
        ]
      },
      {
        "name": "clickHousehold"
      },
      {
        "name": "overHousehold"
      }
    ],
    "marks": [{
      "type": "group",
      "name": "detail",
      "encode": {
        "enter": {
          "height": {
            "signal": "height"
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
          "type": "utc",
          "range": {
            "signal": "[width,0]"
          },
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
          "range": "height",
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
          "orient": "bottom",
          "scale": "xDetail",
          "labelOverlap": true,
          "ticks": false,
          "format": "%b",
          "labelPadding": 10,
          "zindex": 1
        },
        {
          "orient": "bottom",
          "scale": "xDetail",
          "labelOverlap": true,
          "ticks": false,
          "labelPadding": 10,
          "format": "%Y",
          "offset": 15,
          "tickCount": 3,
          "zindex": 1
        },
        {
          "orient": "left",
          "title": "title",
          "scale": "yDetail",
          "offset": 2,
          "domain": false,
          "labelOverlap": true,
          "grid": true,
          "format": "s",
          "zindex": 0,
          "encode": {
            "title": {
              "interactive": false,
              "update": {
                "x": {
                  "value": -15
                },
                "y": {
                  "value": -15
                },
                "angle": {
                  "value": 0
                },
                "text": {
                  "signal": "currency"
                }
              }
            }
          }
        }
      ],
      "signals": [{
          "name": "clickHousehold",
          "description": "A date value that updates in response to mousemove.",
          "push": "outer",
          "on": [{
            "events": "line:click,line:touchstart",
            "update": "group().context.group.datum.household_name"
          }]
        },
        {
          "name": "overHousehold",
          "description": "tootip data.",
          "push": "outer",
          "on": [{
            "events": "line:mouseover, symbol:mouseover",
            "update": "{item: group().context.group.datum, date: invert('xDetail',x()), position: xy()}"
          }]
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
          "signal": [],
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
                  "opacity": [{
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
                  "opacity": [{
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
                  "opacity": [{
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
          "marks": [{
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
                "opacity": [{
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
          }]
        }
      ]
    }]
  };


}).call(this, this.App);
