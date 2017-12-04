(function (App) {
  'use strict';

  App.Specs.Individuals.MainChartMobile = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 320,
    "height": 330,
    "padding": 0,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "data": [{
        "name": "table",
        "format": {
          "type": "json",
          "property": "data"
        },
        "url": "<%= api %>/household_member_transactions?categories=<%= categories %>&project_name=<%= project_name %><%= subFilters %>"
      },
      {
        "name": "stats",
        "url": "<%= api %>/members/project_min_max/<%= project_name %>?categories=<%= categories %>",
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
        "url": "<%= api %>/members/project_means/<%= project_name %>?categories=<%= categories %>",
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
    "legends": [{
        "stroke": "color",
        "padding": 15,
        "offset": 30,
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
        "padding": 15,
        "offset": 35,
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
        "react": false,
        "on": [{
          "events": [{
            "source": "window",
            "type": "customLoad"
          }],
          "update": "utcFormat(data('stats')[0].date, '%Y-%m-%d')"
        }],
        "bind": {
          "input": "date",
          "min": "utcFormat(data('stats')[0].date, '%Y-%m-%d')",
          "max": "utcFormat(data('stats')[1].date, '%Y-%m-%d')",
          "name": "Date Start"
        }
      },
      {
        "name": "range_end",
        "react": false,
        "on": [{
          "events": [{
            "source": "window",
            "type": "customLoad"
          }],
          "update": "utcFormat(data('stats')[1].date, '%Y-%m-%d')"
        }],
        "bind": {
          "input": "date",
          "min": "utcFormat(data('stats')[0].date, '%Y-%m-%d')",
          "max": "utcFormat(data('stats')[1].date, '%Y-%m-%d')",
          "name": "Date End"
        }
      },
      {
        "name": "detailDomain",
        "update": "[toDate(range_end), toDate(range_start)]",
        "on": [{
          "events": [{
            "signal": "range_start"
          }, {
            "signal": "range_end"
          }],
          "update": "[toDate(range_end), toDate(range_start)]"
        }]
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
