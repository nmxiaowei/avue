var baseList = [{
  label: '基本组件',
  children: [{
    label: '表格',
    option: {
      "title": "表格",
      "name": "表格",
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": [{
        type1: '数据1',
        type2: '数据2'
      }, {
        type1: '数据1',
        type2: '数据2'
      }],
      "component": {
        "width": 500,
        "height": 200,
        "name": "table",
        "prop": "table",
        "queryList": [
          {
            "label": "类型1",
            "value": 1
          },
          {
            "label": "类型2",
            "value": 2
          }
        ],
        style: {
          headerBackground: 'rgba(0, 0, 0, 0.01)',
          headerColor: 'rgba(154, 168, 212, 1)',
          headerTextAlign: 'center',
          bodyBackground: 'rgba(0, 0, 0, 0.01)',
          bodyColor: 'rgba(154, 168, 212, 1)',
          borderColor: 'rgba(51, 65, 107, 1)',
          bodyTextAlign: 'center',
        },
        "option": {
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
  }, {
    label: '文本框',
    option: {
      "title": "文本框",
      "name": "文本框",
      "top": 0,
      "left": 0,
      "data": "文本框",
      "component": {
        "width": 100,
        "height": 50,
        "value": "文本框",
        "style": {
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
    label: '图片框',
    option: {
      "title": "图片框",
      "name": "图片框",
      "top": 0,
      "left": 0,
      "component": {
        "width": 80,
        "height": 80,
        "name": "img",
        "prop": "img",
      },
    }
  }, {
    label: '翻牌器',
    option: {
      "title": "翻牌器",
      "name": "翻牌器",
      "top": 0,
      "left": 0,
      "data": "16.24",
      "component": {
        "width": 260,
        "height": 100,
        "name": "flop",
        "prop": "flop",
        "list": ["https://sugar.bce.baidu.com/static/img-templet/border-1.png", "https://sugar.bce.baidu.com/static/img-templet/border-2.png"],
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
          "split": 0,
          "backgroundColor": "",
          "color": "#fff"
        }
      },
      "index": 10
    }
  }, {
    label: '进度条',
    option: {
      "title": "进度条",
      "name": "进度条",
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
  }]
}, {
  label: '图表',
  children: [{
    label: '柱形图',
    option: {
      "name": "柱状图",
      "title": "柱状图",
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
      },
    }
  }, {
    label: '折线图',
    option: {
      "name": "折线图",
      "title": "折线图",
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
  }]
}]