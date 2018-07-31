<template>
  <div>
    <el-upload :class="{'avatar-uploader':listType=='picture-img'}"
               :action="action"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               :multiple="multiple"
               :on-preview="handlePictureCardPreview"
               :limit="limit"
               :drag="drag"
               :show-file-list="showFileList"
               :list-type="listType"
               :on-exceed="handleExceed"
               :on-error="handleError"
               :disabled="disabled"
               :on-success="handleSuccess"
               :file-list="fileList">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else-if="listType=='picture-img'">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </template>
      <template v-else-if="drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </template>
      <div slot="tip"
           class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <div class="avue-dialog">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { validatenull } from '../../utils/validate.js'
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCurdUpload",
  mixins: [crudCompoents()],
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      text: this.status ? '' : [],
      fileList: [],
    };
  },
  props: {
    value: {

    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 3,
    },
    listType: {
      type: String
    },
    drag: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    action: {
      type: String
    }
  },
  watch: {},
  computed: {
    status () {
      return this.listType === 'picture-img'
    },
    imageUrl () {
      return this.status ? this.text : ''
    }
  },
  created () {
    this.init();
  },
  mounted () { },
  methods: {
    init () {
      if (!(validatenull(this.text))) {
        if (!this.status) {
          this.fileList = this.text;
        }
      }
    },
    handleSuccess (response, file, fileList) {
      this.fileList = fileList;
      if (this.status) {
        this.text = response.data;
      } else {
        this.fileList.push({
          name: file.name,
          url: ''
        })
        this.$message.success('上传成功')
        this.setVal();
      }

    },
    handleError (err, file, fileList) {
      this.fileList = fileList;
      this.$message.error('上传失败')
      this.setVal();

    },
    handleRemove (file, fileList) {
      this.fileList = fileList;
      this.$message.error('删除成功')
      this.setVal();
    },
    setVal () {
      let value;
      if (this.status) {
        value = this.text;
      } else {
        value = this.fileList;
      }
      this.$emit('input', value);
      this.$emit('change', value);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>