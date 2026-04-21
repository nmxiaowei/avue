/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';
import '../../../../src/plugin/logs/index.mjs';
import permission from '../../../core/directive/permission.mjs';
import '../../../../src/global/variable.mjs';
import 'lodash-es/get.js';
import 'lodash-es/set.js';
import 'lodash-es/cloneDeep.js';
import config from '../config.mjs';

var script = create({
  name: "crud",
  mixins: [locale],
  directives: {
    permission
  },
  inject: ["crud"],
  data () {
    return {
      dateCreate: false,
      shortcuts: [
        {
          text: this.t('date.t'),
          value: new Date(),
        },
        {
          text: this.t('date.y'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: this.t('date.n'),
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
      config: config
    };
  },
  created () {
    this.initFun();

  },
  computed: {
    data () {
      if (this.crud.tableOption.selection) {
        return this.crud.tableSelect;
      } else {
        return this.crud.list;
      }
    }
  },
  methods: {
    //日期组件回调
    dateChange (val) {
      if (this.dateCreate) {
        this.crud.$emit("date-change", val);
      } else {
        this.dateCreate = true;
      }

    },
    initFun () {
      this.crud.rowExcel = this.rowExcel;
      this.crud.rowPrint = this.rowPrint;
    },
    rowExcel () {
      this.crud.$refs.dialogExcel.handleShow();
    },
    rowPrint () {
      this.$Print(this.crud.$refs.table);
    }
  }
});

export { script as default };
