<template>
  <div :class="b()">
    <el-tabs v-model="active"
             :tab-position="parentOption.position"
             :type="parentOption.type">
      <el-tab-pane :name="index+''"
                   :disabled="column.disabled"
                   v-for="(column,index) in columnOption"
                   :key="column.prop">
        <template #label>
          <slot v-if="$slots.label"
                name="label"
                :column="column"
                :index="index"
                :active="active === index + ''">
          </slot>
          <template v-else>
            <icon-temp v-if="column.icon"
                       :text="column.icon"
                       :size="14"
                       :icon-style="{fontSize: '14px', width: '14px', height: '14px'}"></icon-temp>&nbsp;
            {{column.label}}
          </template>
        </template>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import create from "core/create";
import iconTemp from "common/components/icon/index";
export default create({
  name: "tabs",
  components: {
    iconTemp
  },
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      active: "0",
    };
  },
  watch: {
    active () {
      this.$emit("change", this.tabsObj);
    }
  },
  computed: {
    tabsObj () {
      return this.columnOption[this.active];
    },
    parentOption () {
      return this.option;;
    },
    columnOption () {
      return this.parentOption.column || [];
    }
  },
  methods: {
    changeTabs (active) {
      this.active = active + "";
    }
  }
});
</script>


