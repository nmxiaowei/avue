<template>
  <div :class="b()"
       v-loading.lock="loading">
    <el-upload :class="b({'list':listType=='picture-img','upload':disabled})"
               @click.native="handleClick"
               :action="action"
               :on-remove="handleRemove"
               :accept="acceptList"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePreview"
               :limit="limit"
               :http-request="httpRequest"
               :drag="drag"
               :readonly="readonly"
               :show-file-list="isPictureImg?false:showFileList"
               :list-type="listType"
               :on-change="handleFileChange"
               :on-exceed="handleExceed"
               :disabled="disabled"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <img v-if="imgUrl"
             :src="imgUrl"
             v-bind="allParams"
             @mouseover="menu=true"
             :class="b('avatar')" />
        <i v-else
           class="el-icon-plus"
           :class="b('icon')"></i>
        <div class="el-upload-list__item-actions"
             :class="b('menu')"
             v-if="menu"
             @mouseover="menu=true"
             @mouseout="menu=false"
             @click.stop="()=>{return false}">
          <i class="el-icon-zoom-in"
             @click.stop="handlePreview({url:imgUrl})"></i>
          <i class="el-icon-delete"
             v-if="!disabled"
             @click.stop="handleDelete(imgUrl)"></i>
        </div>
      </template>
      <template v-else-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          {{t('upload.tip')}}
          <em>{{t('upload.upload')}}</em>
        </div>
      </template>
      <template v-else>
        <el-button size="small"
                   type="primary">{{t('upload.upload')}}</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip">{{tip}}</div>
    </el-upload>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import locale from "../../core/common/locale";
import upload from '../../core/common/upload'
export default create({
  name: "upload",
  mixins: [props(), event(), upload(), locale],
  data () {
    return {
      menu: false,
    };
  }
});
</script>