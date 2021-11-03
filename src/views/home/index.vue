<template>
  <el-row>
    <h1 style="text-align: left">&nbsp;&nbsp;工作台</h1>
    <el-divider></el-divider>
    <el-col :span="12" class="chart-box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>法规分类统计</span>
        </div>
        <div id="category-pie" class="chart"></div>
      </el-card>
    </el-col>
    <el-col :span="12" class="chart-box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>法规年度统计</span>
        </div>
        <div id="year-line" class="chart"></div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-divider></el-divider>
      <h4 style="text-align: left;margin-bottom: 0">&nbsp;&nbsp;最近内化法规</h4>
      <el-table
        ref="multipleTable"
        :data="paperList"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%;margin-top: 10px">
        <el-table-column
          label="法规标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column
          prop="department"
          label="发文机构"
          width="200">
        </el-table-column>
        <el-table-column
          prop="release_time"
          label="发布日期"
          width="120"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.release_time.substring(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="implement_time"
          label="实施日期"
          width="120"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.implement_time.substring(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="grade"
          label="效力等级"
          width="120"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'warning'">{{ scope.row.status ? '已发布' : '未发布' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import {PieChart, LineChart} from 'echarts/charts';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {mapActions} from "vuex";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  LineChart,
  UniversalTransition
]);

export default {
  name: "Home",
  data() {
    return {
      paperList: [],
      loading: false,
    }
  },
  mounted() {
    this.getStatisticalData().then(res => {
      var chartDomCategoryPie = document.getElementById('category-pie');
      var myChartCategoryPie = echarts.init(chartDomCategoryPie);
      var optionCategoryPie;

      optionCategoryPie = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: res.categoryPie,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      optionCategoryPie && myChartCategoryPie.setOption(optionCategoryPie);

      var chartDomYearLine = document.getElementById('year-line');
      var myChartYearLine = echarts.init(chartDomYearLine);
      var optionYearLine;

      var yearLineData = res.yearLine.sort((x, y) => {
        if (Number(x.name) < Number(y.name)) {
          return -1;
        } else if (Number(x.name) > Number(y.name)) {
          return 1;
        } else {
          return 0;
        }
      });

      optionYearLine = {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: yearLineData.filter(item => item.name != 1970).map(item => item.name)
        },
        yAxis: {
          type: 'value',
          name: '发布法规数'
        },
        series: [
          {
            data: yearLineData.filter(item => item.name != 1970).map(item => item.value),
            type: 'line'
          }
        ]
      };

      optionYearLine && myChartYearLine.setOption(optionYearLine);
    }).catch(err => {
      this.$message.error(err);
    })
    this.loading = true;
    this.getRecentAnalyzedPapers().then(res => {
      this.paperList = res;
    }).catch(err => {
      this.$message.error(err);
    }).finally(() => {
      this.loading = false;
    })
  },
  methods: {
    ...mapActions([
      'getStatisticalData',
      'getRecentAnalyzedPapers',
    ]),
  },
}
</script>

<style scoped>
.chart-box {
  padding: 10px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
