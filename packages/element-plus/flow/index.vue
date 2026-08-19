<template>
  <div :class="b({ readonly: !editable })"
       :style="styleName">
    <div :id="id"
         :class="b('canvas')"
         :style="canvasStyle">
      <div v-if="showGrid"
           :class="b('grid')"
           :style="gridStyle"></div>
      <template v-for="node in nodeList"
                :key="node.id">
        <flow-node v-if="!node.display"
                   :id="node.id"
                   :node="node"
                   :active="active"
                   :node-width="nodeWidth"
                   :node-height="nodeHeight"
                   :editable="editable"
                   @click="handleClick(node)"
                   @change-node-site="changeNodeSite">
          <template #header="{ node: currentNode }">
            <slot name="header"
                  :node="currentNode"></slot>
          </template>
          <template #default="{ node: currentNode }">
            <slot :node="currentNode"></slot>
          </template>
        </flow-node>
      </template>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import flowNode from './node'
import { randomId } from 'utils/util';

export default create({
  name: 'flow',
  mixins: [locale],
  components: { flowNode },
  emits: [
    'update:modelValue', 'click', 'node-click', 'node-add', 'node-remove',
    'node-change', 'line-add', 'line-remove', 'change', 'ready', 'error'
  ],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    option: {
      type: Object,
      default: () => ({ nodeList: [], lineList: [] })
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    editable: {
      type: Boolean,
      default: true
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    gridSize: {
      type: Number,
      default: 20
    },
    nodeWidth: {
      type: [Number, String],
      default: 220
    },
    nodeHeight: {
      type: [Number, String],
      default: 96
    },
    confirmDelete: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: '',
      jsPlumb: null,
      id: '',
      isInitializing: false,
      jsplumbSetting: {
        Anchors: [
          'Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle',
          'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'
        ],
        Container: '',
        Connector: ['Flowchart', { cornerRadius: 6, stub: 18 }],
        ConnectionsDetachable: true,
        DeleteEndpointsOnDetach: false,
        Endpoint: ['Dot', { radius: 5 }],
        EndpointStyle: { fill: '#fff', stroke: '#409eff', strokeWidth: 1.5 },
        PaintStyle: { stroke: '#409eff', strokeWidth: 2 },
        HoverPaintStyle: { stroke: '#66b1ff', strokeWidth: 3 },
        Overlays: [['Arrow', { width: 10, length: 10, location: 1 }]],
        RenderMode: 'svg'
      },
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        anchor: 'Continuous'
      },
      jsplumbSourceOptions: {
        filter: '.avue-flow__node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        filter: '.avue-flow__node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      }
    }
  },
  computed: {
    styleName () {
      return {
        width: this.setPx(this.width),
        height: this.setPx(this.height)
      }
    },
    canvasStyle () {
      return {
        minWidth: this.setPx(this.width),
        minHeight: this.setPx(this.height)
      }
    },
    gridStyle () {
      const size = Math.max(Number(this.gridSize) || 20, 8);
      return { backgroundSize: `${size}px ${size}px` }
    },
    nodeList () {
      return Array.isArray(this.option && this.option.nodeList)
        ? this.option.nodeList
        : []
    },
    lineList () {
      return Array.isArray(this.option && this.option.lineList)
        ? this.option.lineList
        : []
    }
  },
  watch: {
    modelValue: {
      handler (value) {
        this.active = value;
      },
      immediate: true
    },
    active (value) {
      this.$emit('update:modelValue', value)
    }
  },
  created () {
    this.id = randomId();
    this.jsplumbSetting.Container = this.id;
    this.ensureOption();
  },
  mounted () {
    this.init();
  },
  beforeUnmount () {
    if (!this.jsPlumb) return;
    this.jsPlumb.reset();
    this.jsPlumb = null;
  },
  methods: {
    ensureOption () {
      if (!this.option || typeof this.option !== 'object') return false;
      if (!Array.isArray(this.option.nodeList)) this.option.nodeList = [];
      if (!Array.isArray(this.option.lineList)) this.option.lineList = [];
      return true;
    },
    init () {
      if (typeof jsPlumb === 'undefined') {
        this.$emit('error', new Error('未找到 jsPlumb，请在使用 avue-flow 前引入 jsPlumb。'));
        return;
      }
      this.jsPlumb = jsPlumb.getInstance();
      this.$nextTick(() => this.jsPlumbInit());
    },
    jsPlumbInit () {
      if (!this.jsPlumb) return;
      this.jsPlumb.ready(() => {
        if (!this.jsPlumb) return;
        this.jsPlumb.importDefaults({
          ...this.jsplumbSetting,
          ConnectionsDetachable: this.editable
        });
        this.bindJsPlumbEvents();
        this.isInitializing = true;
        this.jsPlumb.setSuspendDrawing(true);
        this.loadEasyFlow();
        this.jsPlumb.setSuspendDrawing(false, true);
        this.$nextTick(() => {
          this.isInitializing = false;
          this.revalidate();
          this.$emit('ready', this.jsPlumb);
        });
      });
    },
    bindJsPlumbEvents () {
      this.jsPlumb.bind('click', (connection) => {
        if (!this.editable) return;
        this.withConfirm(this.t('flow.deleteLineConfirm'), () => {
          this.jsPlumb.deleteConnection(connection);
        });
      });
      this.jsPlumb.bind('connection', (event) => {
        if (this.isInitializing) return;
        const from = event.sourceId || (event.source && event.source.id);
        const to = event.targetId || (event.target && event.target.id);
        this.addLine(from, to);
      });
      this.jsPlumb.bind('connectionDetached', (event) => {
        if (this.isInitializing) return;
        this.deleteLine(event.sourceId, event.targetId);
      });
      this.jsPlumb.bind('connectionMoved', (event) => {
        if (this.isInitializing) return;
        this.deleteLine(event.originalSourceId, event.originalTargetId);
        this.addLine(event.sourceId, event.targetId);
      });
      this.jsPlumb.bind('beforeDrop', (event) => this.canConnect(
        event.sourceId,
        event.targetId
      ));
    },
    canConnect (from, to) {
      if (!this.editable) return false;
      if (from === to) {
        this.notifyError(this.t('flow.noSelfConnect'));
        return false;
      }
      if (this.hasLine(from, to)) {
        this.notifyError(this.t('flow.noDuplicateConnect'));
        return false;
      }
      if (this.hasLine(to, from)) {
        this.notifyError(this.t('flow.noLoopConnect'));
        return false;
      }
      return true;
    },
    notifyError (message) {
      if (this.$message) this.$message.error(message);
    },
    handleClick (node) {
      this.active = node.id;
      this.$emit('click', node);
      this.$emit('node-click', node);
    },
    hasLine (from, to) {
      return this.lineList.some((line) => line.from === from && line.to === to)
    },
    addLine (from, to) {
      if (!from || !to || !this.ensureOption() || this.hasLine(from, to)) return false;
      const line = { from, to };
      this.option.lineList.push(line);
      this.$emit('line-add', line);
      this.$emit('change', { type: 'line-add', line, option: this.option });
      return true;
    },
    deleteLine (from, to) {
      if (!this.ensureOption()) return false;
      const index = this.option.lineList.findIndex((line) => line.from === from && line.to === to);
      if (index === -1) return false;
      const [line] = this.option.lineList.splice(index, 1);
      this.$emit('line-remove', line);
      this.$emit('change', { type: 'line-remove', line, option: this.option });
      return true;
    },
    changeNodeSite ({ id, left, top }) {
      const node = this.nodeList.find((item) => item.id === id);
      if (!node || (Number(node.left) === left && Number(node.top) === top)) return;
      node.left = left;
      node.top = top;
      this.$emit('node-change', node);
      this.$emit('change', { type: 'node-change', node, option: this.option });
      this.revalidate();
    },
    deleteNode (nodeId) {
      const node = this.nodeList.find((item) => item.id === nodeId);
      if (!node) return Promise.resolve(false);
      return this.withConfirm(this.t('flow.deleteNodeConfirm', { nodeId }), () => {
        node.display = true;
        this.lineList
          .filter((line) => line.from === nodeId || line.to === nodeId)
          .forEach((line) => this.deleteLine(line.from, line.to));
        this.$nextTick(() => {
          if (this.jsPlumb) this.jsPlumb.removeAllEndpoints(nodeId);
          this.revalidate();
        });
        this.$emit('node-remove', node);
        this.$emit('change', { type: 'node-remove', node, option: this.option });
      });
    },
    withConfirm (message, callback) {
      if (!this.confirmDelete || typeof this.$confirm !== 'function') {
        callback();
        return Promise.resolve(true);
      }
      return this.$confirm(message, this.t('common.tip'), {
        confirmButtonText: this.t('common.submitBtn'),
        cancelButtonText: this.t('common.cancelBtn'),
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        callback();
        return true;
      }).catch(() => false);
    },
    addNode (name, config = {}) {
      if (!this.ensureOption()) return null;
      const nodeId = config.id || this.getNextNodeId();
      if (this.nodeList.some((node) => node.id === nodeId)) {
        this.notifyError(`节点 ${nodeId} 已存在`);
        return null;
      }
      const node = {
        id: nodeId,
        name,
        left: 0,
        top: 0,
        ...config
      };
      this.option.nodeList.push(node);
      this.$nextTick(() => {
        this.makeNodeInteractive(node.id);
        this.revalidate();
      });
      this.$emit('node-add', node);
      this.$emit('change', { type: 'node-add', node, option: this.option });
      return node;
    },
    getNextNodeId () {
      let index = this.nodeList.length;
      let id = `node${index}`;
      while (this.nodeList.some((node) => node.id === id)) {
        index += 1;
        id = `node${index}`;
      }
      return id;
    },
    makeNodeInteractive (nodeId) {
      if (!this.jsPlumb || !this.editable) return;
      this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions);
      this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions);
      this.jsPlumb.draggable(nodeId, { containment: 'parent' });
    },
    loadEasyFlow () {
      this.nodeList.forEach((node) => {
        if (!node.display) this.makeNodeInteractive(node.id);
      });
      this.lineList.forEach((line) => {
        if (this.getVisibleNode(line.from) && this.getVisibleNode(line.to)) {
          this.jsPlumb.connect({ source: line.from, target: line.to }, this.jsplumbConnectOptions);
        }
      });
    },
    getVisibleNode (id) {
      return this.nodeList.find((node) => node.id === id && !node.display)
    },
    revalidate () {
      if (this.jsPlumb) this.jsPlumb.repaintEverything();
    }
  }
});
</script>
