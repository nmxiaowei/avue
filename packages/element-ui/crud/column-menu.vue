<template>
  <!-- 操作栏 -->
  <el-table-column :class="b('btn')"
                   prop="menu"
                   :fixed="vaildData(tableOption.menuFixed,config.menuFixed)"
                   v-if="vaildData(tableOption.menu,config.menu)&&crud.getPermission('menu')"
                   :label="tableOption.menuTitle || t('crud.menu')"
                   :align="tableOption.menuAlign || config.menuAlign"
                   :header-align="tableOption.menuHeaderAlign || config.menuHeaderAlign"
                   :width="crud.isMobile?(tableOption.menuXsWidth || config.menuXsWidth):( tableOption.menuWidth || config.menuWidth)">
    <template slot-scope="{row,$index}">
      <el-dropdown v-if="isMenu"
                   :size="crud.isMediumSize"
                   style="margin-right:9px;">
        <el-button type="primary"
                   :size="crud.isMediumSize">
          {{ tableOption.menuBtnTitle || t('crud.menuBtn')}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="vaildData(tableOption.viewBtn,config.viewBtn)"
                            v-permission="crud.getPermission('viewBtn',row,$index)"
                            @click.native="crud.rowView(row,$index)">{{t('crud.viewBtn')}}</el-dropdown-item>
          <el-dropdown-item divided
                            v-if="vaildData(tableOption.editBtn,config.editBtn)"
                            v-permission="crud.getPermission('editBtn',row,$index)"
                            @click.native="crud.rowEdit(row,$index)">{{t('crud.editBtn')}}</el-dropdown-item>
          <el-dropdown-item divided
                            v-if="vaildData(tableOption.copyBtn,config.copyBtn)"
                            v-permission="crud.getPermission('copyBtn',row,$index)"
                            @click.native="crud.rowCopy(row)">{{t('crud.copyBtn')}}</el-dropdown-item>
          <el-dropdown-item divided
                            v-if="vaildData(tableOption.delBtn,config.delBtn)"
                            v-permission="crud.getPermission('delBtn',row,$index)"
                            @click.native="crud.rowDel(row,$index)">{{t('crud.delBtn')}}</el-dropdown-item>
          <slot name="menuBtn"
                :row="row"
                :type="menuText('primary')"
                :disabled="crud.btnDisabled"
                :size="crud.isMediumSize"
                :index="$index"></slot>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-else-if="['button','text','icon'].includes(menuType)">
        <el-button :type="menuText('primary')"
                   :icon="row.$cellEdit?config.saveBtnIcon:config.editBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="crud.btnDisabledList[$index]"
                   @click.stop="crud.rowCell(row,$index)"
                   v-permission="crud.getPermission('cellBtn',row,$index)"
                   v-if="vaildData(tableOption.cellBtn ,config.cellBtn)">
          <template v-if="!isIconMenu">
            {{crud.menuIcon(row.$cellEdit?'saveBtn':'editBtn')}}
          </template>
        </el-button>
        <el-button :type="menuText('danger')"
                   :icon="config.cancelBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="crud.btnDisabledList[$index]"
                   @click.stop="crud.rowCancel(row,$index)"
                   v-if="row.$cellEdit && vaildData(tableOption.cancelBtn,config.cancelBtn)">
          <template v-if="!isIconMenu">
            {{crud.menuIcon('cancelBtn')}}
          </template>
        </el-button>
        <el-button :type="menuText('success')"
                   :icon="config.viewBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="btnDisabled"
                   @click.stop="crud.rowView(row,$index)"
                   v-permission="crud.getPermission('viewBtn',row,$index)"
                   v-if="vaildData(tableOption.viewBtn,config.viewBtn)">
          <template v-if="!isIconMenu">
            {{crud.menuIcon('viewBtn')}}
          </template>
        </el-button>
        <el-button :type="menuText('primary')"
                   :icon="config.editBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="btnDisabled"
                   @click.stop="crud.rowEdit(row,$index)"
                   v-permission="crud.getPermission('editBtn',row,$index)"
                   v-if="vaildData(tableOption.editBtn,config.editBtn)">
          <template v-if="!isIconMenu">
            {{crud.menuIcon('editBtn')}}
          </template>
        </el-button>
        <el-button :type="menuText('primary')"
                   :icon="config.copyBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="btnDisabled"
                   @click.stop="crud.rowCopy(row)"
                   v-permission="crud.getPermission('copyBtn',row,$index)"
                   v-if="vaildData(tableOption.copyBtn,config.copyBtn)">
          <template v-if="!isIconMenu">
            {{crud.menuIcon('copyBtn')}}
          </template>
        </el-button>
        <el-button :type="menuText('danger')"
                   :icon="config.delBtnIcon"
                   :size="crud.isMediumSize"
                   :disabled="btnDisabled"
                   @click.stop="crud.rowDel(row,$index)"
                   v-permission="crud.getPermission('delBtn',row,$index)"
                   v-if="vaildData(tableOption.delBtn,config.delBtn) && !row.$cellEdit">
          <template v-if="!isIconMenu">
            {{crud.menuIcon('delBtn')}}
          </template>
        </el-button>
      </template>
      <slot name="menu"
            :row="row"
            :type="menuText('primary')"
            :disabled="crud.btnDisabled"
            :size="crud.isMediumSize"
            :index="$index"></slot>
    </template>
  </el-table-column>
</template>

<script>
import create from "core/create";
import config from "./config.js";
import locale from "../../core/common/locale";
import permission from '../../core/directive/permission';
export default create({
  name: "crud",
  data () {
    return {
      config: config,
    }
  },
  mixins: [locale],
  inject: ["crud"],
  directives: {
    permission
  },
  props: {
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    menuType () {
      return this.tableOption.menuType || this.$AVUE.menuType || 'button';
    },
    isIconMenu () {
      return this.menuType === "icon"
    },
    isTextMenu () {
      return this.menuType === "text"
    },
    isMenu () {
      return this.menuType === "menu"
    },
  },
  methods: {
    menuText (value) {
      return this.menuType === "text" ? "text" : value;
    },
  }
})
</script>