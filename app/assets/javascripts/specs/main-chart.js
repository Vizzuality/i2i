(function (App) {
  'use strict';

  App.Specs.MainChart = {
    "$schema": "https://vega.github.io/schema/vega/v3.0.json",
    "width": 600,
    "height": 500,
    "padding": 0,
    "autosize": {
      "type": "fit",
      "resize": true
    },
    "config": {
      // "axis": {
      //   "grid": false,
      //   "gridColor": "#dedede",
      //   "labelFont": "sans-serif",
      //   "labelFontSize": 12,
      //   "tickColor": "#dedede"
      // },
      // "symbol": {
      //   "fill": "#F9C6B7",
      //   "size": 64
      // },
      // "line": {
      //   "opacity": 1,
      //   "interpolate": "monotone"
      // },
      // "area": {
      //   "opacity": 1,
      //   "interpolate": "monotone"
      // },
      "range": {
        "category": [
          "#F9C6B7",
          "#F95E31"
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
        "url": "<%= api %>/project_means/<%= project_name %>?categories=<%= categories %>",
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
            "format": "s",
            "domain": false,
            "grid": true,
            "zindex": 0
          }
        ],
        "signals": [{
            "name": "clickHousehold",
            "description": "A date value that updates in response to mousemove.",
            "push": "outer",
            "on": [{
              "events": "line:click",
              "update": "group().context.group.datum.household_name"
            }]
          },
          {
            "name": "overHousehold",
            "description": "tootip data.",
            "push": "outer",
            "on": [{
              "events": "line:mouseover",
              "update": "{item: group().context.group.datum.values, date: invert('xDetail',x()), position: xy()}"
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
                    // "opacity": {
                    //   "value": 0.2
                    // },
                    // "strokeWidth": {
                    //   "value": 1
                    // },
                    "strokeCap": {
                      "value": "round"
                    },
                    "zindex": {
                      "value": 0
                    }
                  },
                  "hover": {
                    "stroke": {
                      "value": "#F95E31"
                    },
                    "strokeWidth": {
                      "value": 2
                    },
                    // "opacity": {
                    //   "value": 1
                    // },
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
                    // "opacity": [{
                    //     "test": "datum.value!=null",
                    //     "value": 0.2
                    //   },
                    //   {
                    //     "value": 0
                    //   }
                    // ],
                    // "size": {
                    //   "value": 10
                    // },
                    "zindex": {
                      "value": 1
                    }
                  },
                  "hover": {
                    "zindex": {
                      "value": 2
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
              "value": 30
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
            "type": "sqrt",
            "range": [
              50,
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
                  "value": 30
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
                  "value": 30
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
                    "field": "value"
                  },
                  "fill": {
                    "scale": "color",
                    "field": {
                      "parent": "category_type"
                    }
                  },
                  "opacity": [{
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


}).call(this, this.App);
