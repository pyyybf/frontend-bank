<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item name="1">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;外规查询列表
        </template>
        <el-form ref="queryForm" :model="queryForm" label-width="80px" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="法规标题">
                <el-input v-model="queryForm.title" placeholder="请输入法规标题" style="width:90%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="效力等级">
                <el-select v-model="queryForm.grade" placeholder="请选择效力等级" style="width:90%">
                  <el-option label="行政法规" value="1"></el-option>
                  <el-option label="部门规章" value="2"></el-option>
                  <el-option label="规范性文件" value="3"></el-option>
                  <el-option label="其他文件" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker style="width:90%"
                                v-model="queryForm.release_time"
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
                                v-model="queryForm.implement_time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文部门">
                <el-select v-model="queryForm.department" placeholder="请选择发文部门" style="width:90%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select v-model="queryForm.status" placeholder="请选择状态" style="width:90%">
                  <el-option label="已发布" :value="true"></el-option>
                  <el-option label="未发布" :value="false"></el-option>
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
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 10px">
      <el-table-column
        label="法规标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column
        prop="department"
        label="发文机构">
      </el-table-column>
      <el-table-column
        prop="release_time"
        label="发布日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="implement_time"
        label="实施日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="效力等级">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        label="外规内化状态">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.waiguineihuazhuangtai==='1' ? 'success' : 'warning'">{{-->
      <!--              scope.row.waiguineihuazhuangtai === '1' ? '已内化' : '未内化'-->
      <!--            }}-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="statue"
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ? 'success' : 'warning'">{{ scope.row.status ? '已发布' : '未发布' }}</el-tag>
        </template>
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
        title: '',
        number: '',
        category: '',
        department: '',
        grade: '',
        release_time: '',
        implement_time: '',
        interpret_department: '',
        input_user: '',
        input_time: '',
        content: '',
        status: '',
        // waiguineihuazhuangtai: '',
      },
      pageNum: 1,
      total: 0,
      tableData: [],
      ids: [],
    }
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    ...mapActions([
      'getPaperList',
      'delPapers',
      'publishPapers',
      'abolishPapers',
    ]),
    onSearch() {
      this.getPaperList({
        pageNum: this.pageNum,
        ...this.queryForm
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    handleCurrentChange() {
      this.getPaperList({
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

<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
