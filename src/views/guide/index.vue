<template>
  <div>
    <basic-container>
      <el-button icon='el-icon-question'
                 type="primary"
                 @click="guide">运行引导页</el-button>
    </basic-container>
  </div>
</template>

<script>
import * as Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "./defineSteps";

export default {
  name: "guide",
  data () {
    return {
      option: {
        cloumns: [
          {
            name: "区域",
            prop: "area",
            type: "select",
            children: [
              {
                label: "婚房1",
                value: 1
              },
              {
                label: "婚房2",
                value: 2
              },
              {
                label: "婚房3",
                value: 3
              },
              {
                label: "婚房4",
                value: 4
              }
            ]
          },
          {
            name: "价格",
            prop: "price",
            type: "cascader",
            children: [
              {
                label: "婚房1",
                value: 1,
                children: [
                  {
                    label: "婚房1",
                    value: 2
                  }
                ]
              },
              {
                label: "婚房2",
                value: 2,
                children: [
                  {
                    label: "婚房2",
                    value: 2
                  }
                ]
              }
            ]
          },
          {
            name: "排序",
            prop: "type",
            type: "select",
            children: [
              {
                label: "从高到低",
                value: 1
              },
              {
                label: "从上到下",
                value: 2
              },
              {
                label: "从高到低",
                value: 3
              }
            ]
          },
          {
            name: "更多",
            prop: "more",
            type: "checkbox",
            children: [
              {
                label: "特色",
                prop: "tese",
                dic: [
                  {
                    label: "婚房",
                    value: 0
                  },
                  {
                    label: "毛皮房",
                    value: 1
                  },
                  {
                    label: "婚房",
                    value: 2
                  },
                  {
                    label: "毛皮房",
                    value: 3
                  },
                  {
                    label: "婚房",
                    value: 4
                  },
                  {
                    label: "毛皮房",
                    value: 5
                  }
                ]
              },
              {
                label: "面积",
                prop: "mianji",
                dic: [
                  {
                    label: "60以下",
                    value: 0
                  },
                  {
                    label: "60-80",
                    value: 1
                  }
                ]
              }
            ]
          }
        ]
      },
      driver: null
    };
  },
  mounted () {
    this.driver = new Driver();
  },
  methods: {
    guide () {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
    getQuery (params) {
      console.log(prarms);
    }
  }
};
</script>
