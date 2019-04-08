var list = [
  {
    "name": "地图",
    "title": "地图",
    "icon": "icon-map",
    "top": 328,
    "left": 1252,
    "zIndex": 24,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/map",
    "component": {
      "width": 1246,
      "height": 1288,
      "name": "map",
      "prop": "map",
      "option": {
        "location": [
          {
            "label": "测试坐标",
            "x": 322,
            "y": 50
          },
          {
            "label": "测试坐标",
            "x": 360,
            "y": 65
          }
        ],
        "scale": 87,
        "type": 1,
        "img": "../../img/map.png",
        "borderColor": "#389BB7",
        "areaColor": "#0c162f"
      }
    },
    "index": 0,
    "data": "客户实时申请滚动"
  },
  {
    "title": "表格",
    "name": "表格",
    "icon": "icon-table",
    "top": 1672,
    "left": 1142,
    "dataType": 1,
    "data": [],
    "component": {
      "width": 1536,
      "height": 410,
      "name": "table",
      "prop": "table",
      "queryList": [],
      "option": {
        "scroll": false,
        "count": 7,
        "headerBackground": "rgba(0, 0, 0, 0.01)",
        "headerColor": "#feffff",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(154, 168, 212, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center",
        "column": [
          {
            "label": "客户姓名",
            "prop": "name",
            "$index": 0,
            "_show": true
          },
          {
            "label": "放款时间(min)",
            "prop": "sj",
            "$index": 1,
            "_show": true
          },
          {
            "label": "担保方式",
            "prop": "type",
            "$index": 2,
            "_show": true
          },
          {
            "label": "放款金额",
            "prop": "je",
            "$index": 3,
            "_show": true
          },
          {
            "label": "法人机构",
            "prop": "jg",
            "$index": 4,
            "_show": true
          },
          {
            "label": "客户经理",
            "prop": "jl",
            "$index": 5,
            "_show": true
          }
        ],
        "menu": false,
        "align": "center",
        "headerAlign": "center",
        "header": false,
        "index": false,
        "fontSize": 23,
        "othColor": "#11274c"
      }
    },
    "zIndex": 23,
    "index": 1,
    "url": "https://wechat.avue.top/yapiwy/sls/table2",
    "time": 5000
  },
  {
    "title": "表格",
    "name": "表格",
    "icon": "icon-table",
    "top": 256,
    "left": 2758,
    "dataType": 1,
    "data": [],
    "component": {
      "width": 1046,
      "height": 832,
      "name": "table",
      "prop": "table",
      "queryList": [],
      "option": {
        "scroll": true,
        "scrollTime": 3000,
        "scrollCount": 11,
        "headerBackground": "rgba(0, 0, 0, 0.01)",
        "headerColor": "#feffff",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(154, 168, 212, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center",
        "count": 11,
        "column": [
          {
            "label": "机构",
            "prop": "jg",
            "$index": 0,
            "_show": true
          },
          {
            "label": "授信用户/金额",
            "prop": "je",
            "$index": 1,
            "_show": true
          },
          {
            "label": "较年初/上月",
            "prop": "sy",
            "$index": 2,
            "_show": true
          },
          {
            "label": "用信金额/金额",
            "prop": "yx",
            "$index": 3,
            "_show": true
          },
          {
            "label": "较年初/上月",
            "prop": "jnc",
            "$index": 4,
            "_show": true
          },
          {
            "label": "客户经理",
            "prop": "jl",
            "$index": 5,
            "_show": true
          }
        ],
        "menu": false,
        "align": "center",
        "headerAlign": "center",
        "header": false,
        "index": true,
        "fontSize": 19,
        "othColor": "#11274c"
      }
    },
    "zIndex": 22,
    "index": 2,
    "url": "https://wechat.avue.top/yapiwy/sls/table1",
    "time": 5000
  },
  {
    "title": "表格",
    "name": "表格",
    "icon": "icon-table",
    "top": 1264,
    "left": 2774,
    "dataType": 1,
    "data": [],
    "component": {
      "width": 1046,
      "height": 832,
      "name": "table",
      "prop": "table",
      "queryList": [],
      "option": {
        "scroll": true,
        "scrollTime": 3000,
        "scrollCount": 11,
        "count": 11,
        "headerBackground": "rgba(0, 0, 0, 0.01)",
        "headerColor": "#feffff",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(154, 168, 212, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center",
        "column": [
          {
            "label": "机构",
            "prop": "jg",
            "$index": 0,
            "_show": true
          },
          {
            "label": "授信用户/金额",
            "prop": "je",
            "$index": 1,
            "_show": true
          },
          {
            "label": "较年初/上月",
            "prop": "sy",
            "$index": 2,
            "_show": true
          },
          {
            "label": "用信金额/金额",
            "prop": "yx",
            "$index": 3,
            "_show": true
          },
          {
            "label": "较年初/上月",
            "prop": "jnc",
            "$index": 4,
            "_show": true
          },
          {
            "label": "客户经理",
            "prop": "jl",
            "$index": 5,
            "_show": true
          }
        ],
        "menu": false,
        "align": "center",
        "headerAlign": "center",
        "header": false,
        "index": true,
        "fontSize": 19,
        "othColor": "#11274c"
      }
    },
    "zIndex": 21,
    "index": 3,
    "url": "https://wechat.avue.top/yapiwy/sls/table1",
    "time": 5000
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 1168,
    "left": 2746,
    "data": "业务量 TOP10 - 客户经理",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "center",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 20,
    "index": 4
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 152,
    "left": 2738,
    "data": "业务量 TOP10 - 机构",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "center",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 19,
    "index": 5
  },
  {
    "name": "实时时间",
    "title": "实时时间",
    "icon": "icon-datetime",
    "top": 146,
    "left": 3400,
    "zIndex": 18,
    "component": {
      "width": 266,
      "height": 62,
      "name": "datetime",
      "prop": "datetime",
      "option": {
        "format": "MM-dd",
        "color": "#feffff",
        "textAlign": "center",
        "fontSize": 48,
        "fontWeight": "normal"
      }
    },
    "index": 6
  },
  {
    "name": "实时时间",
    "title": "实时时间",
    "icon": "icon-datetime",
    "top": 26,
    "left": 3398,
    "zIndex": 17,
    "component": {
      "width": 266,
      "height": 92,
      "name": "datetime",
      "prop": "datetime",
      "option": {
        "format": "hh:mm",
        "color": "#fdfffe",
        "textAlign": "center",
        "fontSize": 87,
        "fontWeight": "normal"
      }
    },
    "index": 7
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 28,
    "left": 1392,
    "data": "V贷管理驾驶舱",
    "component": {
      "width": 1012,
      "height": 152,
      "option": {
        "textAlign": "center",
        "fontSize": 112,
        "fontWeight": "bolder",
        "color": "#fff",
        "split": 15
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 16,
    "index": 8
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 318,
    "left": 1134,
    "data": "16.24",
    "component": {
      "width": 328,
      "height": 1334,
      "name": "flop",
      "prop": "flop",
      "option": {
        "type": "img",
        "suffixText": "",
        "suffixTextAlign": "",
        "suffixSplit": "",
        "suffixColor": "",
        "suffixFontSize": "",
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "../../img/border-3.png",
        "fontSize": 41,
        "fontWeight": "normal",
        "split": 64,
        "backgroundColor": "",
        "color": "#fff",
        "prefixText": "",
        "whole": true,
        "width": 240,
        "prefixColor": "#4dffff",
        "height": 94,
        "prefixFontSize": 26,
        "prefixSplit": 7
      }
    },
    "index": 9,
    "zIndex": 15,
    "dataType": 1,
    "url": "https://wechat.avue.top/yapiwy/sls/table3",
    "time": 5000
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 232,
    "left": 2370,
    "data": "16.24",
    "component": {
      "width": 290,
      "height": 514,
      "name": "flop",
      "prop": "flop",
      "option": {
        "type": "border",
        "suffixText": "",
        "suffixTextAlign": "",
        "suffixSplit": "",
        "suffixColor": "",
        "suffixFontSize": "",
        "borderColor": "#4affff",
        "borderWidth": 3,
        "backgroundImage": "../../img/border-3.png",
        "fontSize": 34,
        "fontWeight": "normal",
        "split": 57,
        "backgroundColor": "",
        "color": "#fff",
        "prefixText": "",
        "whole": true,
        "width": 255,
        "prefixColor": "#4dffff",
        "height": 114,
        "prefixFontSize": 26,
        "prefixSplit": 7
      }
    },
    "index": 10,
    "zIndex": 14,
    "dataType": 1,
    "url": "https://wechat.avue.top/yapiwy/sls/table4",
    "time": 5000
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 216,
    "left": 1114,
    "data": "当前城市:潍坊",
    "component": {
      "width": 416,
      "height": 76,
      "option": {
        "textAlign": "center",
        "fontSize": 58,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 13,
    "index": 11
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 1628,
    "left": 48,
    "data": "不良率/违约率",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 12,
    "index": 12
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 1582,
    "left": 1592,
    "data": "客户实时申请滚动 / ",
    "component": {
      "width": 416,
      "height": 60,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 11,
    "index": 13
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 1238,
    "left": 44,
    "data": "微信申请拦截笔数",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 10,
    "index": 14
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 220,
    "left": 38,
    "data": "申请业务量",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 9,
    "index": 15
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 50,
    "left": 280,
    "data": "潍坊市联社",
    "component": {
      "width": 410,
      "height": 98,
      "option": {
        "textAlign": "left",
        "fontSize": 74,
        "fontWeight": "normal",
        "color": "#fff",
        "split": 7
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 8,
    "index": 16
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 1586,
    "left": 1968,
    "data": " V贷业务统计量",
    "component": {
      "width": 282,
      "height": 62,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#4affff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 7,
    "index": 17
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 720,
    "left": 34,
    "data": "微信申请拦截笔数",
    "component": {
      "width": 528,
      "height": 70,
      "option": {
        "textAlign": "left",
        "fontSize": 41,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "zIndex": 6,
    "index": 18
  },
  {
    "name": "折线图",
    "title": "折线图",
    "icon": "icon-line",
    "top": 1700,
    "left": 44,
    "data": {
      "categories": [
        "北京",
        "上海",
        "杭州",
        "深圳",
        "杭州",
        "深圳",
        "广州",
        "连云港"
      ],
      "series": [
        {
          "name": "手机品牌",
          "data": [
            1131776,
            1349011,
            905718,
            1349011,
            905718,
            656020,
            571234,
            467397
          ]
        },
        {
          "name": "其他手机品牌",
          "data": [
            1131776,
            1349011,
            905718,
            1349011,
            905718,
            656020,
            571234,
            467397
          ]
        }
      ]
    },
    "component": {
      "width": 924,
      "height": 442,
      "name": "line",
      "prop": "line",
      "option": {
        "refreshTime": 5000,
        "title": "2019年度潍坊城市销售额排名",
        "titlePostion": "",
        "titleFontSize": 24,
        "titleColor": "rgb(115, 170, 229)",
        "titleLink": "http://avue.top",
        "info": "这是图表的简介",
        "width": 1282,
        "height": 600,
        "gridX": 105,
        "gridY": 50,
        "gridX2": 80,
        "gridY2": 100,
        "nameColor": "#eee",
        "lineColor": "#eee",
        "lineWidth": 7,
        "xNameFontSize": 16,
        "yNameFontSize": 16,
        "labelShow": false,
        "labelShowFontSize": 14,
        "labelShowFontWeight": 300,
        "yAxisInverse": false,
        "xAxisInverse": false,
        "xAxisShow": true,
        "yAxisShow": true,
        "xAxisSplitLineShow": false,
        "yAxisSplitLineShow": true,
        "refresh": 3000,
        "barWidth": 30,
        "barRadius": 8,
        "barColor": [
          {
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }
        ],
        "barMinHeight": 2,
        "titleShow": true
      }
    },
    "zIndex": 5,
    "index": 19
  },
  {
    "name": "柱状图",
    "title": "柱状图",
    "icon": "icon-bar",
    "top": 280,
    "left": 8,
    "data": {
      "categories": [
        "北京",
        "上海",
        "杭州",
        "深圳",
        "杭州",
        "深圳",
        "广州",
        "连云港"
      ],
      "series": [
        {
          "name": "手机品牌",
          "data": [
            1131776,
            1349011,
            905718,
            1349011,
            905718,
            656020,
            571234,
            467397
          ]
        },
        {
          "name": "其他手机品牌",
          "data": [
            1131776,
            1349011,
            905718,
            1349011,
            905718,
            656020,
            571234,
            467397
          ]
        }
      ]
    },
    "component": {
      "width": 998,
      "height": 454,
      "name": "bar",
      "prop": "bar",
      "option": {
        "refreshTime": 5000,
        "title": "2019年度潍坊城市销售额排名",
        "titlePostion": "",
        "titleFontSize": 24,
        "titleColor": "rgb(115, 170, 229)",
        "titleLink": "http://avue.top",
        "info": "这是图表的简介",
        "width": 1282,
        "height": 600,
        "gridX": 105,
        "gridY": 50,
        "gridX2": 80,
        "gridY2": 100,
        "nameColor": "#eee",
        "lineColor": "#eee",
        "xNameFontSize": 16,
        "yNameFontSize": 16,
        "labelShow": false,
        "labelShowFontSize": 14,
        "labelShowFontWeight": 300,
        "yAxisInverse": false,
        "xAxisInverse": false,
        "xAxisShow": true,
        "yAxisShow": true,
        "xAxisSplitLineShow": false,
        "yAxisSplitLineShow": true,
        "refresh": 3000,
        "barWidth": 21,
        "barRadius": 8,
        "barColor": [
          {
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }
        ],
        "barMinHeight": 2,
        "titleShow": true
      }
    },
    "zIndex": 4,
    "index": 20
  },
  {
    "name": "饼图",
    "title": "饼图",
    "icon": "icon-pie",
    "top": 1126,
    "left": 84,
    "zIndex": 3,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/pie",
    "data": [],
    "resize": false,
    "component": {
      "width": 738,
      "height": 572,
      "name": "pie",
      "prop": "pie",
      "option": {
        "title": "手机大比拼",
        "barColor": [
          {
            "color1": "#83bff6",
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "$index": 1,
            "_show": true
          },
          {
            "color1": "rgba(154, 168, 212, 1)",
            "$index": 2,
            "_show": true
          },
          {
            "color1": "#188df0",
            "$index": 3,
            "_show": true
          },
          {
            "color1": "#564AA3",
            "$index": 4,
            "_show": true
          }
        ]
      }
    },
    "index": 21
  },
  {
    "name": "饼图",
    "title": "饼图",
    "icon": "icon-pie",
    "top": 688,
    "left": -20,
    "zIndex": 2,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/pie",
    "data": [],
    "resize": false,
    "component": {
      "width": 554,
      "height": 494,
      "name": "pie",
      "prop": "pie",
      "option": {
        "title": "手机大比拼",
        "barColor": [
          {
            "color1": "#83bff6",
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "$index": 1,
            "_show": true
          },
          {
            "color1": "rgba(154, 168, 212, 1)",
            "$index": 2,
            "_show": true
          },
          {
            "color1": "#188df0",
            "$index": 3,
            "_show": true
          },
          {
            "color1": "#564AA3",
            "$index": 4,
            "_show": true
          }
        ],
        "radius": true
      }
    },
    "index": 22
  },
  {
    "name": "饼图",
    "title": "饼图",
    "icon": "icon-pie",
    "top": 764,
    "left": 518,
    "zIndex": 1,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/pie",
    "data": [],
    "resize": false,
    "component": {
      "width": 424,
      "height": 394,
      "name": "pie",
      "prop": "pie",
      "option": {
        "title": "手机大比拼",
        "barColor": [
          {
            "color1": "#83bff6",
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "$index": 1,
            "_show": true
          },
          {
            "color1": "rgba(154, 168, 212, 1)",
            "$index": 2,
            "_show": true
          },
          {
            "color1": "#188df0",
            "$index": 3,
            "_show": true
          },
          {
            "color1": "#564AA3",
            "$index": 4,
            "_show": true
          }
        ],
        "radius": true
      }
    },
    "index": 23
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 22,
    "left": 114,
    "component": {
      "width": 154,
      "height": 148,
      "name": "img",
      "prop": "img"
    },
    "zIndex": 0,
    "index": 24,
    "data": "../../img/logo.png"
  }
]