<template>
  <el-row>
    <h1 style="text-align: left">工作台</h1>
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
    return {}
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

      optionYearLine = {
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: res.yearLine.filter(item => item.name != 1970).map(item => item.name)
        },
        yAxis: {
          type: 'value',
          name: '发布法规数'
        },
        series: [
          {
            data: res.yearLine.filter(item => item.name != 1970).map(item => item.value),
            type: 'line'
          }
        ]
      };

      optionYearLine && myChartYearLine.setOption(optionYearLine);
    })
  },
  methods: {
    ...mapActions([
      'getStatisticalData',
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
