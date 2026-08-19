/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: "input-table",
  mixins: [props(), event(), locale],
  data() {
    return {
      object: [],
      active: [],
      search: {},
      page: {},
      loading: false,
      box: false,
      created: false,
      data: [],
    };
  },
  props: {
    beforeClose: Function,
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    formatter: Function,
    onLoad: Function,
    children: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dialogWidth: {
      type: String,
      default: "80%",
    },
  },
  computed: {
    isMultiple() {
      return this.multiple;
    },
    title() {
      return this.disabled || this.readonly ? this.t('common.view') : this.t('common.select');
    },
    labelShow() {
      if (typeof this.formatter == "function") {
        return this.formatter(
          this.isMultiple ? this.object : this.object[0] || {}
        );
      }
      return this.object.map((ele) => ele[this.labelKey]).join(",");
    },
    option() {
      return Object.assign(
        {
          menu: false,
          header: false,
          size: this.size,
          tip: false,
          headerAlign: "center",
          align: "center",
          highlightCurrentRow: !this.isMultiple,
          reserveSelection: this.isMultiple,
          selection: this.isMultiple,
          selectable: (row, index) => {
            return !row.disabled;
          },
        },
        this.children
      );
    },
  },
  methods: {
    handelBeforeClose(done) {
      const callback = () => {
        this.active = [];
        done();
      };
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback);
      } else {
        callback();
      }
    },
    handleSelectionAllChange(val) {
      let ids = this.data.map((ele) => ele[this.valueKey]);
      let list = val.filter((ele) => ids.includes(ele[this.valueKey]));
      this.data.forEach((row) => {
        let index = this.active.findIndex(
          (ele) => ele[this.valueKey] == row[this.valueKey]
        );
        if (list.length == 0) {
          if (index != -1) this.active.splice(index, 1);
        } else {
          if (index == -1) this.active.push(row);
        }
      });
    },
    handleSelectionChange(val, row) {
      let checkbox = val.find(
        (ele) => ele[this.valueKey] == row[this.valueKey]
      );
      if (checkbox) {
        this.active.push(row);
      } else {
        let index = this.active.findIndex(
          (ele) => ele[this.valueKey] == row[this.valueKey]
        );
        if (index != -1) this.active.splice(index, 1);
      }
    },
    handleModelValue(val) {
      if (this.validatenull(val)) {
        this.active = [];
        this.object = [];
      }
    },
    handleTextValue(val) {
      if (typeof this.onLoad == "function") {
        this.onLoad({ value: this.text }, (data) => {
          let result = Array.isArray(data) ? data : [data];
          const valArray = Array.isArray(val) ? val : [val];
          const activeObjArray = valArray && valArray.length
              ? result.filter((item) =>valArray.some((val) => val === item[this.valueKey]))
              : [];
          this.active = this.deepClone(activeObjArray);

          const activeObjArray2 = valArray && valArray.length
              ? valArray.map((item) =>{
                const resultIndex = result.findIndex((val) => item === val[this.valueKey]);
                return resultIndex < 0 ? {[this.labelKey]: item, [this.valueKey]: item} : result[resultIndex]
              })
              : [];
          this.object = this.deepClone(activeObjArray2);
        });
      }
    },
    handleClear() {
      this.setVal([]);
      this.box = false;
    },
    handleShow() {
      this.$refs.main.blur();
      if (this.disabled || this.readonly) return;
      this.search = {};
      this.page = {
        currentPage: 1,
        total: 0,
      };
      this.data = [];
      this.box = true;
    },
    handleSubmit() {
      const callback = () => {
        this.setVal();
      };
      if (typeof this.beforeClose === "function") {
        this.beforeClose(callback);
      } else {
        callback();
      }
    },
    setVal(value) {
      this.object = this.deepClone(value || this.active);
      this.text = this.object.map((ele) => ele[this.valueKey]);
      this.box = false;
    },
    handleRowClassName({ row, rowIndex }) {
      if (row[this.disabledKey]) return "disabled";
    },
    handleCurrentChange(val) {
      if (!val) return;
      if (this.isMultiple) {
        this.$refs.crud.setCurrentRow(null);
      } else {
        if (val[this.disabledKey]) {
          this.$refs.crud.setCurrentRow(this.active[0]);
        } else {
          this.active = [val];
        }
      }
    },
    handleSearchChange(form, done) {
      this.loading = true;
      this.page.currentPage = 1;
      this.onList({}, () => {
        done && done();
      });
    },
    onList(params, callback) {
      this.loading = true;
      if (typeof this.onLoad == "function") {
        this.onLoad({ page: this.page, data: this.search }, (data) => {
          callback && callback();
          this.page.total = data.total;
          this.data = data.data;
          this.loading = false;
          if (this.isMultiple) {
            let ids = this.object.map((ele) => ele[this.valueKey]);
            let data = this.data.filter((ele) =>
              ids.includes(ele[this.valueKey])
            );
            this.$nextTick(() => {
              this.$refs.crud.toggleSelection(data, true);
            });
          } else {
            let active = this.data.find(
              (ele) => ele[this.valueKey] == this.text
            );
            setTimeout(() => {
              this.$refs.crud.setCurrentRow(active);
            });
          }
        });
      }
    },
  },
});

export { script as default };
