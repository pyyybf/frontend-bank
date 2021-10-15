<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item name="1">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;{{ `外规${this.$route.path === '/search' ? '查询' : ''}列表` }}
        </template>
        <el-form ref="queryForm" :model="queryForm" label-width="80px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="法规标题">
                <el-input v-model="queryForm.item1" placeholder="请输入法规标题" style="width:90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="效力级别">
                <el-select v-model="queryForm.item2" placeholder="请选择效力级别" style="width:90%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="发文部门">
                <el-input v-model="queryForm.item5" placeholder="请输入发文部门" style="width:90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select v-model="queryForm.item6" placeholder="请选择状态" style="width:90%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
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
        <template slot-scope="scope"><el-tag :type="scope.row.item7 ? 'success' : 'warning'">{{ scope.row.item7 ? '已内化' : '未内化' }}</el-tag></template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope"><el-tag :type="scope.row.item6 ? '' : 'info'">{{ scope.row.item6 ? '已发布' : '未发布' }}</el-tag></template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :current-page.sync="pageNum"
      :page-size="10"
      :total="total"
      style="text-align: right">
    </el-pagination>
  </div>
</template>

<script>
import {mapActions} from "vuex";

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
        item7: '',
      },
      pageNum: 1,
      total: 0,
      tableData: [],
    }
  },
  mounted() {
    this.getStatuteList({
      pageNum: this.pageNum,
      ...this.queryForm
    }).then(res => {
      this.tableData = res.list;
      this.total = res.total;
    }).catch(err => {
      this.$message.error(err);
    })
  },
  methods: {
    ...mapActions([
      'getStatuteList',
    ]),
    onSearch() {

    },
    handleCurrentChange() {
      this.getStatuteList({
        pageNum: this.pageNum,
        ...this.queryForm
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      }).catch(err => {
        this.$message.error(err);
      })
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
