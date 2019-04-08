var list = [
  {
    "name": "柱状图",
    "title": "柱状图",
    "icon": 'icon-bar',
    "top": 118,
    "left": 504,
    "zIndex": 31,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/bar",
    "data": {},
    "resize": false,
    "component": {
      "width": 746,
      "height": 450,
      "name": "bar",
      "prop": "bar",
      "option": {
        "title": "2019各地的房价大比拼",
        "titlePostion": "",
        "titleFontSize": 20,
        "titleColor": "rgb(115, 170, 229)",
        "titleLink": "http://avue.top",
        "info": "这是一些简单的图表介绍",
        "gridX": 105,
        "gridY": 50,
        "gridX2": 80,
        "gridY2": 100,
        "nameColor": "#eee",
        "lineColor": "#eee",
        "xNameFontSize": 16,
        "yNameFontSize": 16,
        "labelShow": false,
        "labelShowColor": "#fff",
        "labelShowFontSize": 14,
        "labelShowFontWeight": 300,
        "yAxisInverse": false,
        "xAxisInverse": false,
        "xAxisShow": true,
        "yAxisShow": true,
        "xAxisSplitLineShow": false,
        "yAxisSplitLineShow": false,
        "refresh": 3000,
        "barWidth": 30,
        "barRadius": 8,
        "barColor": [
          {
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
          },
          {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
          }
        ],
        "barMinHeight": 2
      }
    },
    "index": 2
  },
  {
    "title": "仪表盘",
    "name": "仪表盘",
    "icon": "icon-gauge",
    "top": 702,
    "left": 224,
    "zIndex": 31,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/gauge",
    "data": [],
    "component": {
      "width": 340,
      "height": 274,
      "option": {
        "lineSize": 15,
        "axisLabelShow": false,
        "axisLabelFontSize": 25,
        "nameFontSize": 20,
        "valueFontSize": 30,
        "nameColor": "",
        "lineColor": "#eee",
        "barColor": [
          {
            "color1": "rgba(154, 168, 212, 1)",
            "postion": "0.2",
            "$index": 0,
            "_show": true
          },
          {
            "color1": "#23B7E5",
            "postion": "0.8",
            "$index": 1,
            "_show": true
          },
          {
            "color1": "#564AA3",
            "postion": "1",
            "$index": 2,
            "_show": true
          }
        ]
      },
      "name": "gauge",
      "prop": "gauge"
    },
    "index": 1
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 52,
    "left": 227,
    "data": "这是滚动的文字",
    "zIndex": 30,
    "component": {
      "width": 230,
      "height": 50,
      "option": {
        "speed": 100,
        "link": true,
        "linkHref": "https://avue.top",
        "linkTarget": "_self",
        "scroll": true,
        "textAlign": "center",
        "fontSize": 26,
        "fontWeight": "normal",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 2
  },
  {
    "name": "实时时间",
    "title": "实时时间",
    "icon": "icon-datetime",
    "top": 78,
    "left": 1604,
    "zIndex": 29,
    "component": {
      "width": 250,
      "height": 50,
      "name": "datetime",
      "prop": "datetime",
      "option": {
        "format": "yyyy-MM-dd hh:mm:ss",
        "color": "#fff",
        "textAlign": "left",
        "fontSize": 24,
        "fontWeight": "normal"
      }
    },
    "index": 3
  },
  {
    "name": "饼图",
    "title": "饼图",
    "icon": "icon-pie",
    "top": 548,
    "left": 808,
    "zIndex": 28,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/pie",
    "data": [],
    "resize": false,
    "component": {
      "width": 588,
      "height": 340,
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
    "index": 4
  },
  {
    "title": "表格",
    "name": "表格",
    "icon": "icon-table",
    "top": 408,
    "left": 1344,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/table",
    "data": [],
    "component": {
      "width": 500,
      "height": 500,
      "name": "table",
      "prop": "table",
      "queryList": [
        {
          "label": "物品1",
          "value": 1
        },
        {
          "label": "物品2",
          "value": 2
        }
      ],
      "option": {
        "headerBackground": "rgba(0, 0, 0, 0.01)",
        "headerColor": "rgba(154, 168, 212, 1)",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(154, 168, 212, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center",
        "column": [
          {
            "label": "姓名",
            "prop": "name",
            "$index": 0,
            "_show": true
          },
          {
            "label": "年龄",
            "prop": "sex",
            "$index": 1,
            "_show": true
          },
          {
            "label": "数量",
            "prop": "count",
            "$index": 2,
            "_show": true
          }
        ],
        "menu": false,
        "align": "center",
        "headerAlign": "center",
        "header": false
      }
    },
    "index": 5,
    "zIndex": 27
  },
  {
    "name": "折线图",
    "title": "折线图",
    "icon": "icon-line",
    "top": 540,
    "left": 517,
    "zIndex": 26,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/bar",
    "data": {},
    "resize": false,
    "component": {
      "width": 456,
      "height": 352,
      "name": "line",
      "prop": "line",
      "option": {
        "title": "2019年度潍坊城市销售额排名",
        "titlePostion": "",
        "titleFontSize": 20,
        "titleColor": "rgb(115, 170, 229)",
        "titleLink": "http://avue.top",
        "info": "这是图表的简介",
        "width": 700,
        "height": 424,
        "gridX": 105,
        "gridY": 50,
        "gridX2": 80,
        "gridY2": 100,
        "nameColor": "#eee",
        "lineColor": "#eee",
        "xNameFontSize": 16,
        "yNameFontSize": 16,
        "labelShow": false,
        "labelShowColor": "#fff",
        "labelShowFontSize": 14,
        "labelShowFontWeight": 300,
        "yAxisInverse": false,
        "xAxisInverse": false,
        "xAxisShow": true,
        "yAxisShow": true,
        "xAxisSplitLineShow": false,
        "yAxisSplitLineShow": false,
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
        "smooth": true,
        "areaStyle": true
      }
    },
    "index": 6
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": -6,
    "left": 135,
    "zIndex": 25,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-2.png",
    "component": {
      "width": 1700,
      "height": 146,
      "name": "img",
      "prop": "img"
    },
    "index": 7
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 900,
    "left": 115,
    "zIndex": 24,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-1.png",
    "component": {
      "width": 1700,
      "height": 146,
      "name": "img",
      "prop": "img"
    },
    "index": 8
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 20,
    "left": 20,
    "zIndex": 23,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-8.png",
    "component": {
      "name": "img",
      "prop": "img"
    },
    "index": 9
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 344,
    "left": 10,
    "zIndex": 22,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-4.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 10
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 340,
    "left": 230,
    "zIndex": 21,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-5.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 11
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 479,
    "left": 10,
    "zIndex": 20,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-6.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 12
  },
  {
    "title": "图片框",
    "name": "图片框",
    "icon": "icon-img",
    "top": 481,
    "left": 232,
    "zIndex": 19,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-7.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 13
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 240,
    "left": 1222,
    "zIndex": 18,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count",
    "component": {
      "width": 750,
      "height": 120,
      "name": "flop",
      "prop": "flop",
      "list": [
        "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "https://sugar.bce.baidu.com/static/img-templet/border-2.png"
      ],
      "option": {
        "type": "img",
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "fontSize": 51,
        "fontWeight": "normal",
        "split": 3,
        "backgroundColor": "rgb(15, 57, 107)",
        "color": "#fff"
      }
    },
    "index": 14
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 344,
    "left": 100,
    "zIndex": 17,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count1",
    "component": {
      "width": 230,
      "height": 100,
      "name": "flop",
      "prop": "flop",
      "list": [
        "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "https://sugar.bce.baidu.com/static/img-templet/border-2.png"
      ],
      "option": {
        "type": "",
        "suffixText": "订单总数(万)",
        "suffixTextAlign": "",
        "suffixSplit": 5,
        "suffixColor": "rgba(176, 194, 249, 1)",
        "suffixFontSize": 16,
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "fontSize": 42,
        "fontWeight": "normal",
        "split": 0,
        "backgroundColor": "",
        "color": "#fff"
      }
    },
    "index": 15
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 346,
    "left": 320,
    "zIndex": 16,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count1",
    "component": {
      "width": 230,
      "height": 100,
      "name": "flop",
      "prop": "flop",
      "list": [
        "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "https://sugar.bce.baidu.com/static/img-templet/border-2.png"
      ],
      "option": {
        "type": "",
        "suffixText": "销售总量（万元）",
        "suffixTextAlign": "",
        "suffixSplit": 5,
        "suffixColor": "rgba(176, 194, 249, 1)",
        "suffixFontSize": 16,
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "fontSize": 42,
        "fontWeight": "normal",
        "split": 0,
        "backgroundColor": "",
        "color": "#fff"
      }
    },
    "index": 16
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 478,
    "left": 102,
    "zIndex": 15,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count1",
    "component": {
      "width": 230,
      "height": 100,
      "name": "flop",
      "prop": "flop",
      "list": [
        "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "https://sugar.bce.baidu.com/static/img-templet/border-2.png"
      ],
      "option": {
        "type": "",
        "suffixText": "人均消费",
        "suffixTextAlign": "",
        "suffixSplit": 5,
        "suffixColor": "rgba(176, 194, 249, 1)",
        "suffixFontSize": 16,
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "fontSize": 42,
        "fontWeight": "normal",
        "split": 0,
        "backgroundColor": "",
        "color": "#fff"
      }
    },
    "index": 17
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "icon": "icon-flop",
    "top": 478,
    "left": 322,
    "zIndex": 14,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count1",
    "component": {
      "width": 230,
      "height": 100,
      "name": "flop",
      "prop": "flop",
      "list": [
        "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "https://sugar.bce.baidu.com/static/img-templet/border-2.png"
      ],
      "option": {
        "type": "",
        "suffixText": "近10分钟新增订单数(万)",
        "suffixTextAlign": "",
        "suffixSplit": 5,
        "suffixColor": "rgba(176, 194, 249, 1)",
        "suffixFontSize": 16,
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
        "fontSize": 42,
        "fontWeight": "normal",
        "split": 0,
        "backgroundColor": "",
        "color": "#fff"
      }
    },
    "index": 18
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-flop",
    "top": 14,
    "left": 702,
    "zIndex": 13,
    "data": "avuex数据大屏实时展示",
    "component": {
      "width": 490,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 40,
        "fontWeight": "bold",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 19
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 120,
    "left": 1220,
    "zIndex": 12,
    "data": "电商数据",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 20
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 120,
    "left": 1338,
    "zIndex": 11,
    "data": "Sell Data",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 21
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 276,
    "left": 15,
    "zIndex": 10,
    "data": "数据统计",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 22
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 278,
    "left": 350,
    "zIndex": 9,
    "data": "Statistics Data",
    "component": {
      "width": 150,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 23
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 124,
    "left": 320,
    "zIndex": 8,
    "data": "完成的百分比",
    "component": {
      "width": 150,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 24
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 180,
    "left": 1204,
    "zIndex": 7,
    "data": "销售量",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 16,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 25
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 180,
    "left": 1760,
    "zIndex": 6,
    "data": "万元",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 16,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 26
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 646,
    "left": 15,
    "zIndex": 5,
    "data": "交易统计",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 27
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 650,
    "left": 350,
    "zIndex": 4,
    "data": "Count Data",
    "component": {
      "width": 150,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 28
  },
  {
    "title": "进度条",
    "name": "进度条",
    "icon": "icon-progress",
    "top": 736,
    "left": 40,
    "zIndex": 3,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count2",
    "component": {
      "width": 200,
      "height": 200,
      "option": {
        "width": 200,
        "type": "circle",
        "color": "rgba(154, 168, 212, 1)",
        "fontSize": 24,
        "strokeWidth": 14,
        "fontWeight": "normal",
        "borderColor": "#23b7e5",
        "height": 200
      },
      "name": "progress",
      "prop": "progress"
    },
    "index": 29
  },
  {
    "title": "进度条",
    "name": "进度条",
    "icon": "icon-progress",
    "top": 150,
    "left": 60,
    "zIndex": 2,
    "dataType": 1,
    "time": 5000,
    "url": "https://wechat.avue.top/yapiwy/count3",
    "component": {
      "width": 400,
      "height": 80,
      "option": {
        "type": "line",
        "color": "rgba(154, 168, 212, 1)",
        "fontSize": 24,
        "strokeWidth": 18,
        "fontWeight": "normal",
        "borderColor": "#564AA3",
        "width": 400,
        "height": 80
      },
      "name": "progress",
      "prop": "progress"
    },
    "index": 30
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 392,
    "left": 1326,
    "zIndex": 1,
    "data": "数据统计",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 31
  },
  {
    "title": "文本框",
    "name": "文本框",
    "icon": "icon-text",
    "top": 394,
    "left": 1480,
    "zIndex": 0,
    "data": "Sell Data",
    "component": {
      "width": 100,
      "height": 50,
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 32
  }
]