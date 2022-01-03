<template>
  <div>
    <el-page-header @back="goBack" content="法规详情"></el-page-header>
    <br/>
    <el-row>
      <el-col :span="14">
        <!-- 显示信息 -->
        <el-radio-group v-if="paperData.analyse_id>0" v-model="ifAnalyse" size="small">
          <el-radio-button label="法规原文"></el-radio-button>
          <el-radio-button label="法规解读"></el-radio-button>
        </el-radio-group>
        <el-descriptions v-if="ifAnalyse==='法规原文'"
                         :column="2"
                         :label-style="{fontWeight:'bold'}"
                         direction="vertical"
                         :colon="false"
                         style="padding-right: 20px">
          <el-descriptions-item label="法规标题" :span="2">{{ paperData.title }}</el-descriptions-item>
          <el-descriptions-item label="法规文号" :span="2">{{ paperData.number }}</el-descriptions-item>
          <el-descriptions-item label="外规类别" :span="1">{{ paperData.category }}</el-descriptions-item>
          <el-descriptions-item label="发文部门" :span="1">{{ paperData.department }}</el-descriptions-item>
          <el-descriptions-item label="发布时间" :span="1">
            {{ paperData.release_time ? paperData.release_time.substring(0, 10) : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="实施时间" :span="1">
            {{ paperData.implement_time ? paperData.implement_time.substring(0, 10) : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="效力等级" :span="1">{{ paperData.grade }}</el-descriptions-item>
          <el-descriptions-item label="解读部门" :span="1">{{ paperData.interpret_department }}</el-descriptions-item>
          <el-descriptions-item label="录入人" :span="1">{{ paperData.input_user }}</el-descriptions-item>
          <el-descriptions-item label="录入时间" :span="1">
            {{ paperData.input_time ? paperData.input_time.substring(0, 10) : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="状态" :span="1">
            <el-tag :type="paperData.status ? 'success' : 'warning'">{{
                paperData.status ? '已发布' : '未发布'
              }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="外规内化状态" :span="2">
            <el-tag :type="paperData.analyse_id>0 ? 'success' : 'info'">{{
                paperData.analyse_id > 0 ? '已内化' : '未内化'
              }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="正文" :span="2">
            <div class="card-text">
              <p v-for="paragraph in paperData.content?paperData.content.split('\n'):''"
                 style="margin: 0">{{ paragraph }}</p>
            </div>
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions v-else-if="paperData.analyse_id>0"
                         :column="2"
                         :label-style="{fontWeight:'bold'}"
                         direction="vertical"
                         :colon="false"
                         style="padding-right: 20px">
          <el-descriptions-item label="法规标题" :span="2">{{ paperData.analyse.title }}</el-descriptions-item>
          <el-descriptions-item label="法规文号" :span="2">{{ paperData.analyse.number }}</el-descriptions-item>
          <el-descriptions-item label="外规类别" :span="1">{{ paperData.analyse.category }}</el-descriptions-item>
          <el-descriptions-item label="解读部门" :span="1">{{
              paperData.analyse.interpret_department
            }}
          </el-descriptions-item>
          <el-descriptions-item label="录入人" :span="1">{{ paperData.analyse.input_user }}</el-descriptions-item>
          <el-descriptions-item label="录入时间" :span="1">
            {{ paperData.analyse.input_time ? paperData.analyse.input_time.substring(0, 10) : '' }}
          </el-descriptions-item>
          <el-descriptions-item label="正文" :span="2">
            <div class="card-text">
              <p v-for="paragraph in paperData.analyse.content?paperData.analyse.content.split('\n'):''"
                 style="margin: 0">{{ paragraph }}</p>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="10" id="container" style="height: 80vh;border: solid 1px lightgrey"></el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import G6 from '@antv/g6';
import {getPaperIdByTitleAPI} from "../../api/paper";

export default {
  name: "Info",
  data() {
    return {
      data: {
        nodes: [],
        edges: [],
      },
      legendData: {
        nodes: [
          {
            id: 'current',
            label: '当前法规',
            style: {
              fill: '#BDD2FD',
              stroke: '#5B8FF9'
            }
          },
          {
            id: 'pre',
            label: '上位法',
            style: {
              fill: '#BDEFDB', stroke: '#5AD8A6'
            }
          },
          {
            id: 'post',
            label: '下位法',
            style: {
              fill: '#FBE5A2', stroke: '#F6BD16'
            }
          },
          {
            id: 'abolish',
            label: '使废止',
            style: {
              fill: '#F6C3B7', stroke: '#E8684A'
            }
          }
        ],
        edges: []
      },
      paperData: {},
      ifAnalyse: '法规原文',
    }
  },
  mounted() {
    this.getPaperById(this.$route.query.paperId).then(res => {
      this.paperData = res;
      this.changePaper();
      this.initG6();
    }).catch(err => {
      this.$message.error(err);
    })
  },
  methods: {
    ...mapActions([
      'getPaperById',
      'getAnalyseById',
      'getPaperIdByTitle',
    ]),
    goBack() {
      this.$router.back()
    },
    changePaper() {
      if (this.paperData.analyse_id > 0) {
        this.getAnalyseById(this.paperData.analyse_id).then(analyseData => {
          this.paperData.analyse = analyseData;
        }).catch(err => {
          this.$message.error(err);
        })
      }
      this.data = {
        nodes: [],
        edges: []
      }
      this.data.nodes.push({id: this.paperData.title, label: this.paperData.title, cluster: 'current'})
      for (let pre of this.paperData.relationVO.pre) {
        this.data.nodes.push({id: pre, label: pre, cluster: 'pre', style: {fill: '#BDEFDB', stroke: '#5AD8A6'}});
        this.data.edges.push({source: this.paperData.title, target: pre, label: '根据'});
      }
      for (let post of this.paperData.relationVO.post) {
        this.data.nodes.push({id: post, label: post, cluster: 'post', style: {fill: '#FBE5A2', stroke: '#F6BD16'}});
        this.data.edges.push({source: post, target: this.paperData.title, label: '根据'});
      }
      for (let abolish of this.paperData.relationVO.abolish) {
        this.data.nodes.push({
          id: abolish,
          label: abolish,
          cluster: 'abolish',
          style: {fill: '#F6C3B7', stroke: '#E8684A'}
        });
        this.data.edges.push({source: this.paperData.title, target: abolish, label: '废止'});
      }
    },
    fittingString(str, maxWidth, fontSize) {
      const ellipsis = '...';
      const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
      let currentWidth = 0;
      let res = str;
      const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
      str.split('').forEach((letter, i) => {
        if (currentWidth > maxWidth - ellipsisLength) return;
        if (pattern.test(letter)) {
          // Chinese charactors
          currentWidth += fontSize;
        } else {
          // get the width of single letter according to the fontSize
          currentWidth += G6.Util.getLetterWidth(letter, fontSize);
        }
        if (currentWidth > maxWidth - ellipsisLength) {
          res = `${str.substr(0, i)}${ellipsis}`;
        }
      });
      return res;
    },
    initG6() {
      var that = this;
      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = container.scrollHeight || 350;

      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        fixToNode: [1, 0.5],
        // 允许出现 tooltip 的 item 类型
        itemTypes: ['node'],
        // 自定义 tooltip 内容
        getContent: (e) => {
          const outDiv = document.createElement('div');
          outDiv.style.width = 'fit-content';
          outDiv.style.height = 'fit-content';
          const model = e.item.getModel();
          if (e.item.getType() === 'node') {
            outDiv.innerHTML = `${model.id}`;
          }
          return outDiv;
        },
      });

      const clusterMap = new Map();
      let clusterId = 0;
      this.data.nodes.forEach(function (node) {
        // cluster
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }
        node.label = that.fittingString(node.label, 80, 13)
      });

      const legend = new G6.Legend({
        data: this.legendData,
        align: 'center',
        layout: 'vertical', // vertical
        position: 'top-left',
        vertiSep: 24,
        horiSep: 24,
        offsetY: 0,
        padding: [16, 16, 8, 8],
        containerStyle: {
          fill: 'transparent',
          lineWidth: 0
        },
        filter: {
          enable: true,
          multiple: true,
          trigger: 'click',
          graphActiveState: 'activeByLegend',
          graphInactiveState: 'inactiveByLegend',
          filterFunctions: {
            'current': (d) => {
              if (d.cluster === 'current') return true;
              return false
            },
            'pre': (d) => {
              if (d.cluster === 'pre') return true;
              return false
            },
            'post': (d) => {
              if (d.cluster === 'post') return true;
              return false
            },
            'abolish': (d) => {
              if (d.cluster === 'abolish') return true;
              return false
            },
          }
        }
      });

      this.graph = new G6.Graph({
        container: 'container',
        width,
        height,
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 150,
          nodeStrength: -200,
          edgeStrength: 0.8,
          collideStrength: 0.8,
        },
        defaultNode: {
          size: 50,
        },
        defaultEdge: {
          style: {
            stroke: 'lightgrey',
            endArrow: true,
          },
        },
        nodeStateStyles: {
          activeByLegend: {
            lineWidth: 5,
            strokeOpacity: 0.5
          },
          inactiveByLegend: {
            opacity: 0.5
          }
        },
        modes: {
          default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
        },
        plugins: [legend, tooltip],
        animate: true,
      });
      this.graph.data({
        nodes: this.data.nodes,
        edges: this.data.edges.map(function (edge, i) {
          edge.id = 'edge' + i;
          return Object.assign({}, edge);
        }),
      });
      this.graph.render();

      this.graph.on('node:dragstart', function (e) {
        that.graph.layout();
        that.refreshDragedNodePosition(e);
      });
      this.graph.on('node:drag', function (e) {
        const forceLayout = that.graph.get('layoutController').layoutMethods[0];
        forceLayout.execute();
        that.refreshDragedNodePosition(e);
      });
      this.graph.on('node:dragend', function (e) {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });

      //点击跳转
      this.graph.on('node:click', function (e) {
        if (e.item.getModel().id !== that.paperData.title) {
          that.getPaperIdByTitle(e.item.getModel().id).then(res => {
            // console.log(res)
            that.getPaperById(res).then(res1 => {
              that.paperData = res1;
              that.changePaper();
              that.graph.destroy();
              that.initG6();
            })
          }).catch(err => {
            that.$message.error(err);
          });
        }
      });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!that.graph || that.graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          that.graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },
    refreshDragedNodePosition(e) {
      const model = e.item.get('model');
      model.fx = e.x;
      model.fy = e.y;
    },
  }
}
</script>

<style scoped>

</style>
