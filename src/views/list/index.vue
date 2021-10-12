<template>
  <div>
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;{{ `外规${this.$route.path === '/search' ? '查询' : ''}列表` }}
        </template>
        <el-form ref="queryForm" :model="queryForm" label-width="80px" size="small">
          <el-row>
            <el-col span="8">
              <el-form-item label="法规标题">
                <el-input v-model="queryForm.item1" style="width:90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="效力级别">
                <el-select v-model="queryForm.item2" placeholder="请选择效力级别" style="width:90%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="发布时间">
                <el-date-picker style="width:90%"
                                v-model="queryForm.item3"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="实施时间">
                <el-date-picker style="width:90%"
                                v-model="queryForm.item4"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="发文部门">
                <el-input v-model="queryForm.item5" style="width:90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="状态">
                <el-select v-model="queryForm.region" placeholder="请选择状态" style="width:90%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8" offset="8">
              <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div v-if="this.$route.path === '/edit'" class="actions">
      <el-button size="small">新建</el-button>
      <el-button size="small">修改</el-button>
      <el-button size="small">删除</el-button>
      <el-button size="small">发布</el-button>
      <el-button size="small">废止</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 10px">
      <el-table-column
        v-if="this.$route.path === '/edit'"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="法规标题">
        <template slot-scope="scope">《{{ scope.row.item1 }}》</template>
      </el-table-column>
      <el-table-column
        prop="item5"
        label="发文机构">
      </el-table-column>
      <el-table-column
        prop="item3"
        label="发布日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="item4"
        label="实施日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="item2"
        label="效力级别">
      </el-table-column>
      <el-table-column
        label="外规内化状态">
        <template slot-scope="scope">{{ scope.row.item7 ? '已内化' : '未内化' }}</template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">{{ scope.row.item6 ? '已发布' : '未发布' }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :page-size="1"
      :total="2"
      style="text-align: right">
    </el-pagination>
  </div>
</template>

<script>
const tableData = [
  {
    item1: '票据管理实施办法',
    item2: '行政法规',
    item3: '2013-01-05',
    item4: '2013-01-02',
    item5: '银监会',
    item6: 1,
    item7: 1,
  },
  {
    item1: '中华人民共和国票据法',
    item2: '法律',
    item3: '2013-01-05',
    item4: '2013-01-02',
    item5: '人民银行',
    item6: 0,
    item7: 0,
  },
]

export default {
  name: "List",
  data() {
    return {
      queryForm: {
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
        item6: '',
      },
      tableData,
    }
  },
  methods: {
    onSearch() {

    },
    handleCurrentChange() {

    },
  }
}
</script>

<style scoped>
.actions {
  text-align: left;
  margin-top: 10px;
}
</style>

<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
