<template>
  <div class="contail">
    <avue-select v-model="test"></avue-select>
    <div class="weaper">
      <div class="list">
        <div class="list-item"
             v-for="(item,index) in cloumns"
             :key="index"
             @click="open(item)">
          <i class="count"
             v-if="(itemCount[item.prop]!=undefined && itemCount[item.prop]!=0 && item.type =='checkbox')">{{itemCount[item.prop]}}</i>
          <p class="name"
             :class="{'is-active':(itemProp == item.prop || itemObj[item.prop]) }">
            <template v-if="(itemCount[item.prop]!=undefined && itemCount[item.prop]!='' && itemCount[item.prop]!=0&& item.type =='select')">
              {{itemCount[item.prop]}}
            </template>
            <template v-else>
              {{item.name}}
            </template>
          </p>
        </div>
      </div>
      <div class="checkbox-dialog"
           v-if="checkboxBox">
        <div class="checkbox-groups">
          <div class="checkbox-group"
               v-for="(item,index) in checkboxList">
            <p class="checkout-title">
              {{item.label}}
            </p>
            <div class="checkout-list">
              <div class="checkbox-item"
                   v-for="(citem,cindex) in item.dic"
                   :key="cindex"
                   @click="checkboxLink(item,citem)">
                <p :class="{'is-active':checkboxCheck(item,citem)}">{{citem.label}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="checkbox-dialog-footer">
          <button class="el-button"
                  @click="checkboxReset">不限制条件</button>
          <button class="el-button el-button--primary "
                  @click="checkboxSubmit">确定</button>
        </div>
      </div>
      <div class="select-dialog"
           v-if="selectBox">
        <div class="select-groups">
          <div class="select-group">
            <div class="select-item"
                 v-for="(item,index) in selectList"
                 @click="selectSubmit(item)">
              <p :class="{'is-active':selectCheck(item)}">{{item.label}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="select-dialog cascader-dialog"
           v-if="cascaderBox">
        <div class="select-groups cascader-groups">
          <div class="select-group">
            <div class="select-item"
                 v-for="(item,index) in cascaderList"
                 @click="cascaderLink(item)">
              <p :class="{'is-active':cascaderCheck(item,0)}">{{item.label}}</p>
            </div>
          </div>
        </div>
        <div class="select-groups cascader-groups">
          <div class="select-group">
            <div class="select-item"
                 v-for="(item,index) in cascaderChild"
                 @click="cascaderSubmit(item)">
              <p :class="{'is-active':cascaderCheck(item,1)}">{{item.label}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvueSelect from "./compoents/select/main";
export default {
  props: {
    option: {
      type: Object
    }
  },
  components: {
    AvueSelect
  },
  data() {
    return {
      test: "",
      itemCount: {},
      itemObj: {},
      itemProp: "",
      selectBox: false,
      selectList: [],
      selectVal: {},
      checkboxBox: false,
      checkboxList: [],
      checkboxVal: {},
      cascaderBox: false,
      cascaderList: [],
      cascaderChild: [],
      cascaderVal: []
    };
  },
  computed: {
    cloumns: function() {
      return this.option.cloumns;
    },
    vallen: function() {
      let count = 0;
      for (let o in this.checkboxVal) {
        const ele = this.checkboxVal[o];
        count = count + ele.length;
      }
      return count;
    }
  },
  watch: {
    checkboxBox: function(val) {
      if (!val) {
        this.checkboxDestroyed();
      }
    },
    selectBox: function(val) {
      if (!val) {
        this.selectDestroyed();
      }
    },
    cascaderBox: function(val) {
      if (!val) {
        this.cascaderDestroyed();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    open(item) {
      this.cascaderDestroyed();
      this.checkboxDestroyed();
      this.selectDestroyed();
      this.itemProp = item.prop;
      if (item.type == "checkbox") {
        this.checkboxBox = !this.checkboxBox;
        if (this.checkboxBox) {
          this.checkboxVal = this.itemObj[this.itemProp];
          if (!this.checkboxVal) {
            this.checkboxVal = {};
          }
          this.checkboxList = item.children;
        }
      } else if (item.type == "select") {
        this.selectBox = !this.selectBox;
        if (this.selectBox) {
          this.selectVal = this.itemObj[this.itemProp];
          if (!this.selectVal) {
            this.selectVal = {};
          }
          this.selectList = item.children;
        }
      } else if (item.type == "cascader") {
        this.cascaderBox = !this.cascaderBox;
        if (this.cascaderBox) {
          this.cascaderVal = this.itemObj[this.itemProp];
          this.cascaderList = item.children;
          if (!this.cascaderVal) {
            this.cascaderVal = [];
          } else {
            const val = this.cascaderVal[0];
            this.cascaderList.forEach(ele => {
              if (ele.value == val) {
                this.cascaderChild = ele.children;
              }
            });
          }
        }
      }
    },
    cascaderDestroyed() {
      this.cascaderVal = [];
      this.cascaderList = [];
      this.cascaderChild = [];
      this.itemProp = "";
      this.cascaderBox = false;
    },
    cascaderLink(item) {
      this.cascaderVal = [];
      this.cascaderVal.push(item.value);
      this.cascaderChild = item.children;
    },
    cascaderCheck(item, num) {
      if (this.cascaderVal && this.cascaderVal != 0) {
        if (this.cascaderVal[num] == item.value) return true;
        else return false;
      }
      return false;
    },
    cascaderSubmit(item) {
      this.cascaderVal.push(item.value);
      this.itemObj[this.itemProp] = this.cascaderVal;
      this.getQuery();
      this.cascaderDestroyed();
    },
    checkboxReset() {
      this.checkboxVal = {};
    },
    selectSubmit(item) {
      this.selectVal = item.value;
      if (this.itemObj[this.itemProp] == this.selectVal) {
        delete this.itemObj[this.itemProp];
        delete this.itemCount[this.itemProp];
      } else {
        this.itemObj[this.itemProp] = this.selectVal;
        this.itemCount[this.itemProp] = item.label;
      }
      this.getQuery();
      this.selectDestroyed();
    },
    selectDestroyed() {
      this.selectVal = {};
      this.selectList = [];
      this.itemProp = "";
      this.selectBox = false;
    },
    selectCheck(item) {
      if (this.selectVal === item.value) {
        return true;
      }
      return false;
    },
    checkboxSubmit() {
      if (JSON.stringify(this.checkboxVal) == "{}") {
        delete this.itemObj[this.itemProp];
        delete this.itemCount[this.itemProp];
      } else {
        this.itemObj[this.itemProp] = this.checkboxVal;
      }
      this.itemCount[this.itemProp] = this.vallen;
      this.getQuery();
      this.checkboxDestroyed();
    },
    getQuery() {
      this.$emit("getQuery", this.itemObj);
    },
    checkboxDestroyed() {
      this.checkboxVal = {};
      this.checkboxList = [];
      this.itemProp = "";
      this.checkboxBox = false;
    },
    checkboxCheck(item, citem) {
      const list = this.checkboxVal[item.prop];
      if (list) {
        if (list.indexOf(citem.value) != -1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    checkboxLink(item, citem) {
      const prop = item.prop;
      let list = this.checkboxVal[prop];
      if (!list) {
        list = [];
      }
      const index = list.indexOf(citem.value);
      if (index == -1) {
        list.push(citem.value);
      } else {
        list.splice(index, 1);
        if (list.length == 0) {
          delete this.checkboxVal[prop];
          return;
        }
      }
      this.$set(this.checkboxVal, prop, list);
    }
  }
};
</script>

<style>
.contail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999999999;
}
.weaper {
  background-color: #eee;
  height: 100%;
}
.list {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #eee;
  line-height: 40px;
}
.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-item > .name {
  font-size: 14px;
  text-align: center;
}
.list-item > .count {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: #fff;
  background-color: #409eff;
  font-size: 12px;
  font-style: normal;
  text-align: center;
  line-height: 20px;
}
.list-item > .name.is-active {
  color: #409eff;
}

.checkbox-dialog,
.select-dialog {
  height: auto;
  background-color: #fff;
}
.checkbox-dialog {
  padding-bottom: 50px;
}
.checkbox-groups {
  max-height: 200px;
  overflow-y: auto;
}
.checkbox-group {
  margin-bottom: 20px;
}
.checkout-title {
  padding: 0 8px;
}
.checkout-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.checkbox-item {
  margin: 8px 0;
  width: 25%;
  padding: 0 8px;
  height: 40px;
  box-sizing: border-box;
}
.checkbox-item > p {
  border: 1px solid #eee;
  border-radius: 5px;
  color: 333;
  line-height: 40px;
  text-align: center;
}
.checkbox-item > p.is-active {
  border: 1px solid #409eff;
  color: #409eff;
}

.checkbox-dialog {
  position: relative;
}
.checkbox-dialog > .checkbox-dialog-footer {
  position: absolute;
  right: 0;
}
.checkbox-dialog > .checkbox-dialog-footer > .el-button {
  width: 150px;
}
.select-groups {
  max-height: 200px;
  overflow-y: auto;
  border-bottom: 1px solid #eee;
}
.select-group > .select-item {
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
}
.select-group > .select-item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.select-item > p.is-active {
  color: #409eff;
}

.cascader-dialog {
  display: flex;
}
.cascader-groups {
  width: 50%;
}
.cascader-groups:first-child {
  border-right: 1px solid #eee;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>
