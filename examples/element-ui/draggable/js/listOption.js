var list = [
  {
    "name": "饼图",
    "title": "饼图",
    "top": 548,
    "left": 808,
    "zIndex": 30,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/pie",
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
    "index": 0
  },
  {
    "title": "表格",
    "name": "表格",
    "top": 408,
    "left": 1344,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/table",
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
      "style": {
        "headerBackground": "rgba(0, 0, 0, 0.01)",
        "headerColor": "rgba(154, 168, 212, 1)",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(154, 168, 212, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center"
      },
      "option": {
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
    "index": 1,
    "zIndex": 29
  },
  {
    "name": "折线图",
    "title": "折线图",
    "top": 540,
    "left": 517,
    "zIndex": 31,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/bar",
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
    "index": 2
  },
  {
    "name": "柱状图",
    "title": "柱状图",
    "top": 118,
    "left": 504,
    "zIndex": 28,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/bar",
    "data": {},
    "resize": false,
    "component": {
      "width": 746,
      "height": 450,
      "name": "bar",
      "prop": "bar",
      "option": {
        "title": "2019年度潍坊城市销售额排名",
        "titlePostion": "",
        "titleFontSize": 20,
        "titleColor": "rgb(115, 170, 229)",
        "titleLink": "http://avue.top",
        "info": "这是图表的简介",
        "width": 746,
        "height": 450,
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
        "barMinHeight": 2
      }
    },
    "index": 3
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": -6,
    "left": 135,
    "zIndex": 27,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-2.png",
    "component": {
      "width": 1700,
      "height": 146,
      "name": "img",
      "prop": "img"
    },
    "index": 4
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 900,
    "left": 115,
    "zIndex": 26,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-1.png",
    "component": {
      "width": 1700,
      "height": 146,
      "name": "img",
      "prop": "img"
    },
    "index": 5
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 20,
    "left": 20,
    "zIndex": 25,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-8.png",
    "component": {
      "name": "img",
      "prop": "img"
    },
    "index": 6
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 344,
    "left": 10,
    "zIndex": 24,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-4.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 7
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 340,
    "left": 230,
    "zIndex": 23,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-5.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 8
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 479,
    "left": 10,
    "zIndex": 22,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-6.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 9
  },
  {
    "title": "图片框",
    "name": "图片框",
    "top": 481,
    "left": 232,
    "zIndex": 21,
    "data": "https://sugar.bce.baidu.com/static/img-templet/pic-7.png",
    "component": {
      "width": 80,
      "height": 80,
      "name": "img",
      "prop": "img"
    },
    "index": 10
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "top": 240,
    "left": 1222,
    "zIndex": 20,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count",
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
    "index": 11
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "top": 344,
    "left": 100,
    "zIndex": 19,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count1",
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
    "index": 12
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "top": 346,
    "left": 320,
    "zIndex": 18,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count1",
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
    "index": 13
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "top": 478,
    "left": 102,
    "zIndex": 17,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count1",
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
    "index": 14
  },
  {
    "title": "翻牌器",
    "name": "翻牌器",
    "top": 478,
    "left": 322,
    "zIndex": 16,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count1",
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
    "index": 15
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 14,
    "left": 702,
    "zIndex": 15,
    "data": "avuex数据大屏实时展示",
    "component": {
      "width": 490,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 40,
        "fontWeight": "bold",
        "color": "#fff"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 16
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 120,
    "left": 1220,
    "zIndex": 14,
    "data": "电商数据",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 17
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 120,
    "left": 1338,
    "zIndex": 13,
    "data": "Sell Data",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 18
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 276,
    "left": 15,
    "zIndex": 12,
    "data": "数据统计",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 19
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 278,
    "left": 350,
    "zIndex": 11,
    "data": "Statistics Data",
    "component": {
      "width": 150,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 20
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 124,
    "left": 320,
    "zIndex": 10,
    "data": "完成的百分比",
    "component": {
      "width": 150,
      "height": 50,
      "style": {
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
    "top": 180,
    "left": 1204,
    "zIndex": 9,
    "data": "销售量",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 16,
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
    "top": 180,
    "left": 1760,
    "zIndex": 8,
    "data": "万元",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 16,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 23
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 646,
    "left": 15,
    "zIndex": 7,
    "data": "交易统计",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 24
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 650,
    "left": 350,
    "zIndex": 6,
    "data": "Count Data",
    "component": {
      "width": 150,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 25
  },
  {
    "title": "进度条",
    "name": "进度条",
    "top": 736,
    "left": 40,
    "zIndex": 5,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count2",
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
    "index": 26
  },
  {
    "title": "进度条",
    "name": "进度条",
    "top": 738,
    "left": 300,
    "zIndex": 4,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count3",
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
        "borderColor": "#564AA3",
        "height": 200
      },
      "name": "progress",
      "prop": "progress"
    },
    "index": 27
  },
  {
    "title": "进度条",
    "name": "进度条",
    "top": 150,
    "left": 60,
    "zIndex": 3,
    "dataType": 1,
    "time": 5000,
    "url": "http://yapi.demo.qunar.com/mock/9013/count3",
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
    "index": 28
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 392,
    "left": 1326,
    "zIndex": 2,
    "data": "数据统计",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 22,
        "fontWeight": "normal",
        "color": "rgba(154, 168, 212, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 29
  },
  {
    "title": "文本框",
    "name": "文本框",
    "top": 394,
    "left": 1480,
    "zIndex": 1,
    "data": "Sell Data",
    "component": {
      "width": 100,
      "height": 50,
      "style": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(64, 77, 105, 1)"
      },
      "name": "text",
      "prop": "text"
    },
    "index": 30
  }
]