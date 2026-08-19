/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';

const ROOT_FOLDER_ID = "__avue_root__";
const IMAGE_EXTENSIONS = ["bmp", "gif", "jpeg", "jpg", "png", "svg", "webp"];
const VIDEO_EXTENSIONS = ["m4v", "mov", "mp4", "ogv", "webm"];
const AUDIO_EXTENSIONS = ["aac", "flac", "m4a", "mp3", "oga", "ogg", "wav"];
const TEXT_EXTENSIONS = ["csv", "css", "html", "htm", "js", "json", "log", "md", "sql", "text", "ts", "txt", "xml", "yaml", "yml"];

var script = create({
  name: "file-manager",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    folders: {
      type: Array,
      default: () => [],
    },
    rootLabel: {
      type: String,
      default: "全部文件",
    },
    height: {
      type: [Number, String],
      default: 560,
    },
    accept: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: Number,
      default: 0,
    },
    showUpload: {
      type: Boolean,
      default: true,
    },
    showPreview: {
      type: Boolean,
      default: true,
    },
    download: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    uploadRequest: Function,
  },
  emits: [
    "update:modelValue",
    "update:folders",
    "change",
    "select",
    "preview",
    "download",
    "upload",
    "remove",
    "error",
    "folder-change",
    "folder-create",
    "folder-rename",
    "folder-remove",
  ],
  data() {
    return {
      rootFolderId: ROOT_FOLDER_ID,
      localFiles: this.normalizeFiles(this.modelValue),
      localFolders: this.normalizeFolders(this.folders),
      activeFolderId: ROOT_FOLDER_ID,
      selectedFileId: "",
      keyword: "",
      idSeed: 0,
      folderDialogVisible: false,
      folderDialogError: "",
      folderName: "",
      folderDialogMode: "create",
      folderTargetId: ROOT_FOLDER_ID,
      folderDeleteDialogVisible: false,
      folderToDelete: null,
      renameDialogVisible: false,
      renameDialogError: "",
      renameValue: "",
      moveDialogVisible: false,
      targetFolderId: ROOT_FOLDER_ID,
      textContent: "",
      textError: "",
      textLoading: false,
      requestSeed: 0,
      requestController: null,
    };
  },
  computed: {
    isDisabled() {
      return this.disabled || this.readonly;
    },
    treeProps() {
      return { label: "name", children: "children" };
    },
    folderTree() {
      const nodes = {};
      const root = [];
      this.localFolders.forEach((folder) => {
        nodes[folder.id] = { ...folder, children: [] };
      });
      Object.values(nodes).forEach((folder) => {
        if (folder.parentId && nodes[folder.parentId]) {
          nodes[folder.parentId].children.push(folder);
        } else {
          root.push(folder);
        }
      });
      return root;
    },
    activeFolderName() {
      if (this.activeFolderId === ROOT_FOLDER_ID) return this.rootLabel;
      return (this.localFolders.find((folder) => folder.id === this.activeFolderId) || {}).name || this.rootLabel;
    },
    folderDialogTitle() {
      return this.folderDialogMode === "rename" ? "重命名文件夹" : "新建文件夹";
    },
    rootFilesCount() {
      return this.localFiles.filter((file) => file.folderId === ROOT_FOLDER_ID).length;
    },
    visibleFiles() {
      const keyword = this.keyword.trim().toLowerCase();
      return this.localFiles.filter((file) => {
        const sameFolder = file.folderId === this.activeFolderId;
        return sameFolder && (!keyword || file.name.toLowerCase().includes(keyword));
      });
    },
    selectedFile() {
      return this.localFiles.find((file) => file.id === this.selectedFileId) || null;
    },
    workspaceStyle() {
      const height = typeof this.height === "number" ? `${this.height}px` : this.height;
      return { minHeight: height };
    },
    previewHeight() {
      if (typeof this.height === "number") return Math.max(this.height - 54, 280);
      return this.height;
    },
    previewContentStyle() {
      const height = typeof this.previewHeight === "number" ? `${this.previewHeight}px` : this.previewHeight;
      return { minHeight: height };
    },
    downloadable() {
      return this.download && this.selectedFile && Boolean(this.selectedFile.url || this.selectedFile.downloadUrl);
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(value) {
        this.syncFiles(value);
      },
    },
    folders: {
      deep: true,
      handler(value) {
        this.localFolders = this.normalizeFolders(value);
        if (this.activeFolderId !== ROOT_FOLDER_ID && !this.localFolders.some((folder) => folder.id === this.activeFolderId)) {
          this.selectFolder(ROOT_FOLDER_ID);
        }
      },
    },
    selectedFile: {
      immediate: true,
      handler(file) {
        this.loadTextContent(file);
      },
    },
  },
  beforeUnmount() {
    this.abortTextRequest();
    this.localFiles.forEach((file) => this.revokeObjectUrl(file));
  },
  methods: {
    createLocalId(prefix) {
      const seed = Number(this.idSeed) || 0;
      this.idSeed = seed + 1;
      return `${prefix}_${Date.now()}_${this.idSeed}`;
    },
    normalizeFiles(files) {
      const previousFiles = Array.isArray(this.localFiles) ? this.localFiles : [];
      return (Array.isArray(files) ? files : []).map((file) => {
        const value = file || {};
        const id = value.id || value.uid || this.createLocalId("file");
        const previous = previousFiles.find((item) => item.id === id && item.url === value.url);
        return {
          ...value,
          id,
          name: value.name || this.getFileName(value.url) || "未命名文件",
          url: value.url || value.downloadUrl || "",
          folderId: value.folderId || ROOT_FOLDER_ID,
          status: value.status || "success",
          _objectUrl: previous && previous._objectUrl,
        };
      });
    },
    normalizeFolders(folders) {
      const result = [];
      const append = (items, parentId = "") => {
        (Array.isArray(items) ? items : []).forEach((folder) => {
          const value = folder || {};
          const id = value.id || this.createLocalId("folder");
          result.push({
            ...value,
            id,
            name: value.name || "未命名文件夹",
            parentId: value.parentId || parentId || "",
          });
          if (value.children) append(value.children, id);
        });
      };
      append(folders);
      return result;
    },
    syncFiles(files) {
      const nextFiles = this.normalizeFiles(files);
      this.localFiles.forEach((file) => {
        if (!nextFiles.some((next) => next.id === file.id && next.url === file.url)) {
          this.revokeObjectUrl(file);
        }
      });
      this.localFiles = nextFiles;
      if (this.selectedFileId && !this.selectedFile) this.selectedFileId = "";
    },
    toExternalFile(file) {
      const { _objectUrl, ...value } = file;
      return { ...value };
    },
    emitFiles() {
      const files = this.localFiles.map((file) => this.toExternalFile(file));
      this.$emit("update:modelValue", files);
      this.$emit("change", files);
    },
    emitFolders() {
      const folders = this.localFolders.map(({ children, ...folder }) => ({ ...folder }));
      this.$emit("update:folders", folders);
    },
    selectFolder(id) {
      this.activeFolderId = id;
      this.selectedFileId = "";
      this.$emit("folder-change", id);
      this.$nextTick(() => {
        if (this.$refs.folderTree && id !== ROOT_FOLDER_ID) this.$refs.folderTree.setCurrentKey(id);
      });
    },
    handleFolderClick(folder) {
      this.selectFolder(folder.id);
    },
    handleRootCommand(command) {
      if (command === "create") this.openCreateFolder(ROOT_FOLDER_ID);
    },
    handleFolderCommand(command, folder) {
      this.selectFolder(folder.id);
      if (command === "create") {
        this.openCreateFolder(folder.id);
      } else if (command === "rename") {
        this.openRenameFolder(folder);
      } else if (command === "remove") {
        this.openRemoveFolder(folder);
      }
    },
    getFolderFileCount(folderId) {
      return this.localFiles.filter((file) => file.folderId === folderId).length;
    },
    getFolderPath(folderId) {
      const path = [];
      let folder = this.localFolders.find((item) => item.id === folderId);
      const visited = new Set();
      while (folder && !visited.has(folder.id)) {
        visited.add(folder.id);
        path.unshift(folder.name);
        folder = this.localFolders.find((item) => item.id === folder.parentId);
      }
      return path.join(" / ");
    },
    selectFiles() {
      if (this.isDisabled || !this.$refs.fileInput) return;
      this.$refs.fileInput.click();
    },
    async handleNativeFileChange(event) {
      const files = Array.from(event.target.files || []);
      event.target.value = "";
      for (const file of files) {
        await this.addFile(file);
      }
    },
    async addFile(rawFile) {
      if (this.maxSize > 0 && rawFile.size > this.maxSize * 1024 * 1024) {
        const error = new Error(`${rawFile.name} 超过 ${this.maxSize}MB 限制`);
        this.$emit("error", error, rawFile);
        return;
      }

      const objectUrl = typeof URL !== "undefined" && URL.createObjectURL ? URL.createObjectURL(rawFile) : "";
      const entry = {
        id: this.createLocalId("file"),
        name: rawFile.name,
        size: rawFile.size,
        type: rawFile.type,
        url: objectUrl,
        folderId: this.activeFolderId,
        status: this.uploadRequest ? "uploading" : "success",
        _objectUrl: objectUrl,
      };
      this.localFiles.push(entry);
      this.selectedFileId = entry.id;
      this.emitFiles();
      this.$emit("upload", rawFile, this.toExternalFile(entry));

      if (typeof this.uploadRequest !== "function") return;
      try {
        const result = await this.uploadRequest(rawFile, {
          folderId: this.activeFolderId,
          file: this.toExternalFile(entry),
        });
        const data = typeof result === "string" ? { url: result } : (result || {});
        const target = this.localFiles.find((file) => file.id === entry.id);
        if (!target) return;
        if (data.url && data.url !== target.url) this.revokeObjectUrl(target);
        Object.assign(target, data, { status: data.status || "success", _objectUrl: data.url ? "" : target._objectUrl });
        this.emitFiles();
      } catch (error) {
        const target = this.localFiles.find((file) => file.id === entry.id);
        if (target) {
          target.status = "error";
          target.errorMessage = error.message || "上传失败";
          this.emitFiles();
        }
        this.$emit("error", error, rawFile);
      }
    },
    revokeObjectUrl(file) {
      if (file && file._objectUrl && typeof URL !== "undefined" && URL.revokeObjectURL) {
        URL.revokeObjectURL(file._objectUrl);
        file._objectUrl = "";
      }
    },
    selectFile(file) {
      this.selectedFileId = file.id;
      this.$emit("select", this.toExternalFile(file));
    },
    previewFile(file) {
      this.selectFile(file);
      this.$emit("preview", this.toExternalFile(file));
    },
    handleFileCommand(command, file) {
      this.selectFile(file);
      if (command === "preview") {
        this.previewFile(file);
      } else if (command === "move") {
        this.openMoveDialog();
      } else if (command === "rename") {
        this.openRenameDialog();
      } else if (command === "remove") {
        this.removeSelectedFile();
      }
    },
    removeSelectedFile() {
      if (!this.selectedFile || this.isDisabled) return;
      const file = this.selectedFile;
      this.localFiles = this.localFiles.filter((item) => item.id !== file.id);
      this.revokeObjectUrl(file);
      this.selectedFileId = "";
      this.emitFiles();
      this.$emit("remove", this.toExternalFile(file));
    },
    canRemoveFolder(folder) {
      if (!folder || !folder.id) return false;
      const hasChildren = this.localFolders.some((item) => item.parentId === folder.id);
      const hasFiles = this.localFiles.some((file) => file.folderId === folder.id);
      return !hasChildren && !hasFiles;
    },
    openCreateFolder(parentId = this.activeFolderId) {
      if (this.isDisabled) return;
      this.folderDialogMode = "create";
      this.folderTargetId = parentId || ROOT_FOLDER_ID;
      this.folderName = "";
      this.folderDialogError = "";
      this.folderDialogVisible = true;
    },
    openRenameFolder(folder) {
      if (!folder || this.isDisabled) return;
      this.folderDialogMode = "rename";
      this.folderTargetId = folder.id;
      this.folderName = folder.name;
      this.folderDialogError = "";
      this.folderDialogVisible = true;
    },
    saveFolder() {
      const name = this.folderName.trim();
      if (!name) {
        this.folderDialogError = "请输入文件夹名称";
        return;
      }
      const target = this.localFolders.find((folder) => folder.id === this.folderTargetId);
      const parentId = this.folderDialogMode === "rename"
        ? (target && target.parentId) || ""
        : (this.folderTargetId === ROOT_FOLDER_ID ? "" : this.folderTargetId);
      const duplicated = this.localFolders.some((folder) =>
        folder.id !== this.folderTargetId && folder.parentId === parentId && folder.name === name
      );
      if (duplicated) {
        this.folderDialogError = "同一层级下已存在同名文件夹";
        return;
      }
      if (this.folderDialogMode === "rename") {
        if (!target) return;
        target.name = name;
        this.folderDialogVisible = false;
        this.emitFolders();
        this.$emit("folder-rename", { ...target });
        return;
      }
      const folder = { id: this.createLocalId("folder"), name, parentId };
      this.localFolders.push(folder);
      this.folderDialogVisible = false;
      this.emitFolders();
      this.$emit("folder-create", { ...folder });
      this.selectFolder(folder.id);
    },
    openRemoveFolder(folder) {
      if (this.isDisabled || !this.canRemoveFolder(folder)) return;
      this.folderToDelete = folder;
      this.folderDeleteDialogVisible = true;
    },
    removeFolder() {
      const folder = this.folderToDelete;
      if (!folder || !this.canRemoveFolder(folder)) return;
      const nextFolderId = folder.parentId || ROOT_FOLDER_ID;
      this.localFolders = this.localFolders.filter((item) => item.id !== folder.id);
      this.folderDeleteDialogVisible = false;
      this.folderToDelete = null;
      this.emitFolders();
      this.$emit("folder-remove", { ...folder });
      if (this.activeFolderId === folder.id) this.selectFolder(nextFolderId);
    },
    openRenameDialog() {
      if (!this.selectedFile || this.isDisabled) return;
      this.renameValue = this.selectedFile.name;
      this.renameDialogError = "";
      this.renameDialogVisible = true;
    },
    renameFile() {
      const name = this.renameValue.trim();
      if (!name) {
        this.renameDialogError = "请输入文件名称";
        return;
      }
      const duplicated = this.localFiles.some((file) => file.id !== this.selectedFile.id && file.folderId === this.selectedFile.folderId && file.name === name);
      if (duplicated) {
        this.renameDialogError = "当前文件夹已存在同名文件";
        return;
      }
      this.selectedFile.name = name;
      this.renameDialogVisible = false;
      this.emitFiles();
    },
    openMoveDialog() {
      if (!this.selectedFile || this.isDisabled) return;
      this.targetFolderId = this.selectedFile.folderId || ROOT_FOLDER_ID;
      this.moveDialogVisible = true;
    },
    moveFile() {
      if (!this.selectedFile) return;
      const fileId = this.selectedFile.id;
      this.selectedFile.folderId = this.targetFolderId;
      this.moveDialogVisible = false;
      this.emitFiles();
      this.selectFolder(this.targetFolderId);
      this.selectedFileId = fileId;
    },
    getFileName(url) {
      if (!url) return "";
      return url.split("?")[0].split("/").pop() || "";
    },
    getFileExtension(file) {
      const name = (file && (file.name || file.url)) || "";
      const extension = name.split("?")[0].split(".").pop();
      return extension && extension !== name ? extension.toLowerCase() : "";
    },
    getFileKind(file) {
      const type = String((file && file.type) || "").toLowerCase();
      const extension = this.getFileExtension(file);
      if (type.startsWith("image/") || IMAGE_EXTENSIONS.includes(extension)) return "image";
      if (type.startsWith("video/") || VIDEO_EXTENSIONS.includes(extension)) return "video";
      if (type.startsWith("audio/") || AUDIO_EXTENSIONS.includes(extension)) return "audio";
      if (type === "application/pdf" || extension === "pdf") return "pdf";
      if (type.startsWith("text/") || TEXT_EXTENSIONS.includes(extension)) return "text";
      return "file";
    },
    formatSize(size) {
      const value = Number(size);
      if (!Number.isFinite(value) || value < 0) return "";
      if (value < 1024) return `${value} B`;
      if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
      if (value < 1024 * 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MB`;
      return `${(value / 1024 / 1024 / 1024).toFixed(1)} GB`;
    },
    abortTextRequest() {
      if (this.requestController) {
        this.requestController.abort();
        this.requestController = null;
      }
    },
    async loadTextContent(file) {
      this.abortTextRequest();
      this.textContent = "";
      this.textError = "";
      this.textLoading = false;

      if (!file || this.getFileKind(file) !== "text") return;
      if (file.content !== undefined && file.content !== null) {
        this.textContent = String(file.content);
        return;
      }
      if (!file.url || typeof fetch !== "function") return;

      const requestId = ++this.requestSeed;
      const controller = new AbortController();
      this.requestController = controller;
      this.textLoading = true;

      try {
        const response = await fetch(file.url, { signal: controller.signal });
        if (!response.ok) throw new Error(`请求失败（${response.status}）`);
        const content = await response.text();
        if (requestId !== this.requestSeed) return;
        this.textContent = content;
      } catch (error) {
        if (error.name === "AbortError" || requestId !== this.requestSeed) return;
        this.textError = error.message || "无法读取文件内容";
        this.$emit("error", error, file);
      } finally {
        if (requestId === this.requestSeed) {
          this.textLoading = false;
          this.requestController = null;
        }
      }
    },
    downloadSelected() {
      if (!this.selectedFile || !this.downloadable) return;
      const link = document.createElement("a");
      link.href = this.selectedFile.downloadUrl || this.selectedFile.url;
      link.download = this.selectedFile.name || "";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$emit("download", this.toExternalFile(this.selectedFile));
    },
    handlePreviewError(error) {
      this.$emit("error", error, this.selectedFile ? this.toExternalFile(this.selectedFile) : null);
    },
  },
});

export { script as default };
