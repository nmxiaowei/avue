var baseList = [{
  "label": '图表',
  "icon": 'icon-bar',
  "children": [{
    "label": '柱形图',
    "option": {
      "name": "柱状图",
      "title": "柱状图",
      "icon": 'icon-bar',
      "top": 276,
      "left": 536,
      "data": {
        "categories": ["北京", "上海", "杭州", "深圳", "杭州", "深圳", "广州", "连云港"],
        "series": [{
          "name": "手机品牌",
          "data": [1131776, 1349011, 905718, 1349011, 905718, 656020, 571234, 467397]
        }, {
          "name": "其他手机品牌",
          "data": [1131776, 1349011, 905718, 1349011, 905718, 656020, 571234, 467397]
        }]
      },
      "component": {
        "width": 1200,
        "height": 600,
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
          "yAxisSplitLineShow": false,
          "refresh": 3000,
          "barWidth": 30,
          "barRadius": 8,
          "barColor": [{
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          }, {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }],
          "barMinHeight": 2
        }
      }
    }
  }, {
    "label": '折线图',
    "option": {
      "name": "折线图",
      "title": "折线图",
      "icon": 'icon-line',
      "top": 276,
      "left": 536,
      "data": {
        "categories": ["北京", "上海", "杭州", "深圳", "杭州", "深圳", "广州", "连云港"],
        "series": [{
          "name": "手机品牌",
          "data": [1131776, 1349011, 905718, 1349011, 905718, 656020, 571234, 467397]
        }, {
          "name": "其他手机品牌",
          "data": [1131776, 1349011, 905718, 1349011, 905718, 656020, 571234, 467397]
        }]
      },
      "component": {
        "width": 1200,
        "height": 600,
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
          "lineWidth": 5,
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
          "yAxisSplitLineShow": false,
          "refresh": 3000,
          "barWidth": 30,
          "barRadius": 8,
          "barColor": [{
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          }, {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }],
          "barMinHeight": 2
        }
      },
    }
  }, {
    label: '饼图',
    option: {
      "name": "饼图",
      "title": "饼图",
      "icon": 'icon-pie',
      "top": 548,
      "left": 808,
      "zIndex": 30,
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
              "color1": "#83bff6"
            },
            {
              "color1": "#23B7E5"
            },
            {
              "color1": "rgba(154, 168, 212, 1)"
            },
            {
              "color1": "#188df0"
            },
            {
              "color1": "#564AA3"
            }
          ]
        }
      },
    }
  }]
}, {
  "label": '文字',
  "icon": 'icon-text',
  "children": [{
    "label": '文本框',
    "option": {
      "title": "文本框",
      "name": "文本框",
      "icon": 'icon-text',
      "top": 0,
      "left": 0,
      "data": "文本框",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '跑马灯',
    "option": {
      "title": "跑马灯",
      "name": "跑马灯",
      "icon": 'icon-scroll',
      "top": 0,
      "left": 0,
      "data": "跑马灯",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          scroll: true,
          speed: 70,
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '超链接',
    "option": {
      "title": "超链接",
      "name": "超链接",
      "icon": 'icon-link',
      "top": 0,
      "left": 0,
      "data": "超链接",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          link: true,
          linkHref: 'http://avue.top',
          linkTarget: '_self',
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '实时时间',
    "option": {
      "name": "实时时间",
      "title": "实时时间",
      "icon": 'icon-datetime',
      "top": 78,
      "left": 1604,
      "zIndex": 31,
      "component": {
        "width": 250,
        "height": 50,
        "name": "datetime",
        "prop": "datetime",
        "option": {
          "format": 'yyyy-MM-dd hh:mm:ss',
          "color": "#fff",
          'textAlign': 'left',
          "fontSize": 24,
          "fontWeight": "normal"
        }
      }
    },
  }]
}, {
  "label": '媒体',
  "icon": 'icon-img',
  "children": [{
    "label": '图片框',
    "option": {
      "title": "图片框",
      "name": "图片框",
      "icon": 'icon-img',
      "top": 0,
      "left": 0,
      "component": {
        "width": 80,
        "height": 80,
        "name": "img",
        "prop": "img",
        "option": {}
      },
    }
  }, {
    label: '轮播图',
    option: {
      "title": "轮播图",
      "name": "轮播图",
      "icon": 'icon-banner',
      "top": 0,
      "left": 0,
      "zIndex": 33,
      "dataType": 1,
      "time": 5000,
      "url": "https://wechat.avue.top/yapiwy/swiper",
      "data": [],
      "component": {
        "width": 670,
        "height": 370,
        "option": {
          type: '',
          interval: 5000,
          opacity: 100,
          indicator: 'none'
        },
        "name": "swiper",
        "prop": "swiper"
      },
    }
  }, {
    label: 'iframe',
    option: {
      "title": "iframe",
      "name": "iframe",
      "icon": 'icon-iframe',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": 'https://cloud.baidu.com/',
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "iframe",
        "prop": "iframe"
      },
    }
  }]
}, {
  "label": '指标',
  "icon": 'icon-flop',
  "children": [{
    "label": '翻牌器',
    "option": {
      "title": "翻牌器",
      "name": "翻牌器",
      "icon": 'icon-flop',
      "top": 0,
      "left": 0,
      "data": "16.24",
      "component": {
        "width": 260,
        "height": 100,
        "name": "flop",
        "prop": "flop",
        "option": {
          "type": "img",
          "suffixText": "",
          "suffixTextAlign": "",
          "suffixSplit": '',
          "suffixColor": "",
          "suffixFontSize": '',
          "borderColor": "#fff",
          "borderWidth": 3,
          "backgroundImage": "https://sugar.bce.baidu.com/static/img-templet/border-1.png",
          "fontSize": 42,
          "fontWeight": "normal",
          "splitx": 0,
          "splity": 0,
          "backgroundColor": "",
          "color": "#fff"
        }
      },
      "index": 10
    }
  }, {
    "label": '环形图',
    "option": {
      "title": "环形图",
      "name": "环形图",
      "icon": 'icon-circle',
      "top": 0,
      "left": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
      "component": {
        "width": 200,
        "height": 200,
        "option": {
          "type": "circle",
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
      "index": 25
    }
  }, {
    "label": '进度条',
    "option": {
      "title": "进度条",
      "name": "进度条",
      "icon": 'icon-progress',
      "top": 0,
      "left": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
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
      "index": 25
    }
  }, {
    label: '仪表盘',
    option: {
      "title": "gauge",
      "icon": 'icon-gauge',
      "name": "gauge",
      "dataType": 1,
      "time": 5000,
      "url": "https://wechat.avue.top/yapiwy/gauge",
      "data": [],
      "component": {
        "width": 390,
        "height": 314,
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
            },
            {
              "color1": "#23B7E5",
              "postion": "0.8",
            },
            {
              "color1": "#564AA3",
              "postion": "1",
            }
          ]
        },
        "name": "gauge",
        "prop": "gauge"
      },
    },
  }]
}, {
  "label": '表格',
  "icon": 'icon-table',
  "children": [{
    "label": '表格',
    "option": {
      "title": "表格",
      "name": "表格",
      "icon": 'icon-table',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": [{
        "type1": '数据1',
        "type2": '数据2'
      }, {
        "type1": '数据1',
        "type2": '数据2'
      }],
      "component": {
        "width": 500,
        "height": 200,
        "name": "table",
        "prop": "table",
        "queryList": [],
        "option": {
          headerBackground: 'rgba(0, 0, 0, 0.01)',
          headerColor: 'rgba(154, 168, 212, 1)',
          headerTextAlign: 'center',
          bodyBackground: 'rgba(0, 0, 0, 0.01)',
          bodyColor: 'rgba(154, 168, 212, 1)',
          borderColor: 'rgba(51, 65, 107, 1)',
          bodyTextAlign: 'center',
          "column": [
            {
              "label": "类型1",
              "prop": "type1"
            },
            {
              "label": "类型2",
              "prop": "type2"
            },
          ]
        }
      },
    }
  }]
}]