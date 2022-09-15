<template>
  <div :class="b()"
       :style="styleName">
    <div :id="id"
         :style="styleName">
      <div class="avue-grid"></div>
      <flow-node v-for="(node,index) in option.nodeList"
                 :node="node"
                 :id="node.id"
                 v-if="!node.display"
                 @click.native="handleClick(node)"
                 @changeNodeSite="changeNodeSite"
                 :index="index"
                 :active="active"
                 :key="index">
        <template slot="header"
                  slot-scope="{node}">
          <slot name="header"
                :node="node">
          </slot>
        </template>
        <slot :node="node">
        </slot>
      </flow-node>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import flowNode from './node'
import { randomId } from 'utils/util';
export default create({
  name: "flow",
  components: {
    flowNode
  },
  data () {
    return {
      jsPlumb: {},
      id: '',
      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
        Container: '',
        // 连线的样式 StateMachine、Flowchart
        Connector: 'Flowchart',
        // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ["Dot", {radius: 5}],
        Endpoint: ['Rectangle', { height: 10, width: 10 }],
        // 线端点的样式
        EndpointStyle: { fill: 'rgba(255,255,255,0)', outlineWidth: 1 },
        LogEnabled: true, // 是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: { stroke: 'black', strokeWidth: 3 },
        // 绘制箭头
        Overlays: [['Arrow', { width: 12, length: 12, location: 1 }]],
        RenderMode: 'svg'
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: 'Continuous'
      },

      jsplumbSourceOptions: {
        filter: '.avue-flow__node-drag', /* "span"表示标签，".className"表示类，"#id"表示元素id*/
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        filter: '.avue-flow__node-drag', /*"span"表示标签，".className"表示类，"#id"表示元素id */
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      loadEasyFlowFinish: false,
    }
  },
  props: {
    value: {
      type: String,
    },
    option: {
      type: Object
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '100%'
    }
  },
  created () {
    this.id = randomId();
    this.jsplumbSetting.Container = this.id;
  },
  mounted () {
    this.init();
  },
  computed: {
    active: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    },
    styleName () {
      return {
        position: 'relative',
        width: this.setPx(this.width),
        height: this.setPx(this.height)
      }
    }
  },
  methods: {
    init () {
      this.jsPlumb = jsPlumb.getInstance()
      this.$nextTick(() => {
        this.jsPlumbInit()
      })
    },
    handleClick (node) {
      this.$emit('click', node)
    },
    // 是否具有该线
    hasLine (from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },
    // 是否含有相反的线
    hashOppositeLine (from, to) {
      return this.hasLine(to, from)
    },
    // 删除线
    deleteLine (from, to) {
      this.option.lineList = this.option.lineList.filter(function (line) {
        return line.from !== from && line.to !== to
      })
    },
    // 改变连线
    changeLine (oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo)
    },
    // 改变节点的位置
    changeNodeSite ({ index, left, top }) {
      for (var i = 0; i < this.option.nodeList.length; i++) {
        let node = this.option.nodeList[i]
        if (i === index) {
          this.$set(this.option.nodeList[i], 'left', left)
          this.$set(this.option.nodeList[i], 'top', top)
        }
      }
    },
    //删除节点
    deleteNode (nodeId) {
      this.$confirm('确定要删除节点' + nodeId + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.option.nodeList.forEach(node => {
          if (node.id === nodeId) {
            node.display = true;
          }
        })
        this.$nextTick(function () {
          this.jsPlumb.removeAllEndpoints(nodeId);
        })
      }).catch(() => {
      })
      return true
    },
    // 添加新的节点
    addNode (name) {
      const index = this.option.nodeList.length;
      let nodeId = 'node' + index
      this.option.nodeList.push({
        id: 'node' + index,
        name: name,
        left: 0,
        top: 0,
      })
      this.$nextTick(function () {

        this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)

        this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)

        this.jsPlumb.draggable(nodeId, {
          containment: 'parent'
        })

      })
    },
    loadEasyFlow () {
      // 初始化节点
      for (var i = 0; i < this.option.nodeList.length; i++) {
        let node = this.option.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        // // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
        this.jsPlumb.draggable(node.id)
      }

      // 初始化连线
      for (var i = 0; i < this.option.lineList.length; i++) {
        let line = this.option.lineList[i]
        this.jsPlumb.connect({
          source: line.from,
          target: line.to
        }, this.jsplumbConnectOptions)
      }
      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    },
    jsPlumbInit () {
      const _this = this
      this.jsPlumb.ready(function () {
        // 导入默认配置
        _this.jsPlumb.importDefaults(_this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        _this.jsPlumb.setSuspendDrawing(false, true)
        // 初始化节点
        _this.loadEasyFlow()

        // 单点击了连接线,
        _this.jsPlumb.bind('click', function (conn, originalEvent) {
          console.log('click', conn)

          _this.$confirm('确定删除所点击的线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.jsPlumb.deleteConnection(conn)
          }).catch(() => {
          })
        })
        // 连线
        _this.jsPlumb.bind('connection', function (evt) {
          console.log('connection', evt)
          let from = evt.source.id
          let to = evt.target.id
          if (_this.loadEasyFlowFinish) {
            _this.option.lineList.push({
              from: from,
              to: to
            })
          }
        })

        // 删除连线
        _this.jsPlumb.bind('connectionDetached', function (evt) {
          console.log('connectionDetached', evt)
          _this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        _this.jsPlumb.bind('connectionMoved', function (evt) {
          console.log('connectionMoved', evt)
          _this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 单击endpoint
        // jsPlumb.bind("endpointClick", function (evt) {
        //   console.log('endpointClick', evt)
        // })
        //
        // // 双击endpoint
        // jsPlumb.bind("endpointDblClick", function (evt) {
        //   console.log('endpointDblClick', evt)
        // })

        // contextmenu
        _this.jsPlumb.bind('contextmenu', function (evt) {
          console.log('contextmenu', evt)
        })

        // beforeDrop
        _this.jsPlumb.bind('beforeDrop', function (evt) {
          console.log('beforeDrop', evt)
          let from = evt.sourceId
          let to = evt.targetId
          if (from === to) {
            _this.$message.error('不能连接自己')
            return false
          }
          if (_this.hasLine(from, to)) {
            _this.$message.error('不能重复连线')
            return false
          }
          if (_this.hashOppositeLine(from, to)) {
            _this.$message.error('不能回环哦')
            return false
          }
          return true
        })

        // beforeDetach
        _this.jsPlumb.bind('beforeDetach', function (evt) {
          console.log('beforeDetach', evt)
        })
      })
    }
  }
});
</script>

