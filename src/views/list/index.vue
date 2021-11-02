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
                <el-input v-model="queryForm.title" placeholder="请输入法规标题" class="form-item"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="效力等级">
                <el-select v-model="queryForm.grade" placeholder="请选择效力等级" class="form-item">
                  <el-option
                    v-for="item in gradeOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker class="form-item"
                                v-model="queryForm.release_time"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实施时间">
                <el-date-picker class="form-item"
                                v-model="queryForm.implement_time"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文部门">
                <el-select v-model="queryForm.department" multiple placeholder="请选择发文部门" class="form-item">
                  <el-option
                    v-for="item in departmentOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                <el-select v-model="queryForm.status" placeholder="请选择状态" class="form-item">
                  <el-option label="已发布" :value="true"></el-option>
                  <el-option label="未发布" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-form-item style="text-align: center">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="onReset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table
      ref="multipleTable"
      :data="paperList"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 10px"
      @row-click="handleRowClick">
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
      <el-table-column
        prop="analyse_status"
        label="外规内化状态"
        width="120"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.analyse_status ? 'primary' : 'info'">{{
              scope.row.analyse_status ? '已内化' : '未内化'
            }}
          </el-tag>
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
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      size="40%"
      :with-header="false"
    >
      <el-descriptions title="外规详情"
                       style="padding: 20px"
                       :column="2"
                       :label-style="{fontWeight:'bold'}"
                       direction="vertical"
                       border
                       :colon="false">
        <el-descriptions-item label="法规标题" :span="2">{{ currentPaper.title }}</el-descriptions-item>
        <el-descriptions-item label="法规文号" :span="2">{{ currentPaper.number }}</el-descriptions-item>
        <el-descriptions-item label="外规类别" :span="1">{{ currentPaper.category }}</el-descriptions-item>
        <el-descriptions-item label="发文部门" :span="1">{{ currentPaper.department }}</el-descriptions-item>
        <el-descriptions-item label="发布时间" :span="1">
          {{ currentPaper.release_time ? currentPaper.release_time.substring(0, 10) : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="实施时间" :span="1">
          {{ currentPaper.implement_time ? currentPaper.implement_time.substring(0, 10) : '' }}
        </el-descriptions-item>
        <el-descriptions-item label="效力等级" :span="1">{{ currentPaper.grade }}</el-descriptions-item>
        <el-descriptions-item label="解读部门" :span="1">{{ currentPaper.interpret_department }}</el-descriptions-item>
        <el-descriptions-item label="录入人" :span="1">{{ currentPaper.input_user }}</el-descriptions-item>
        <el-descriptions-item label="录入时间" :span="1">{{ currentPaper.input_time }}</el-descriptions-item>
        <el-descriptions-item label="状态" :span="1">
          <el-tag :type="currentPaper.status ? 'success' : 'warning'">{{
              currentPaper.status ? '已发布' : '未发布'
            }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="外规内化状态" :span="2">
          <el-tag :type="currentPaper.analyse_status ? 'primary' : 'info'">{{
              currentPaper.analyse_status ? '已内化' : '未内化'
            }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="正文" :span="2">
          <div class="card-text">
            <p v-for="paragraph in currentPaper.content?currentPaper.content.split('\n'):''"
               style="margin: 0">{{ paragraph }}</p>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Manage",
  data() {
    return {
      queryForm: {
        title: '',
        department: [],
        grade: '',
        release_time: [],
        implement_time: [],
        status: '',
      },
      pageNum: 1,
      total: 0,
      paperList: [],
      loading: false,
      interpretDepartmentOptions: [
        {value: '合规部'},
        {value: '风险部'},
        {value: '信用卡部'},
      ],
      categoryOptions: [
        {value: '法律'},
        {value: '行政法规'},
        {value: '部门规章'},
        {value: '规范性文件'},
        {value: '其他文件'},
      ],
      gradeOptions: [
        {value: '法律'},
        {value: '行政法规'},
        {value: '部门规章'},
        {value: '规范性文件'},
        {value: '其他文件'},
      ],
      departmentOptions: [
        {value: '中国银行业监督管理委员会'},
        {value: '国家外汇管理局'},
        {value: '国务院国有资产监督管理委员会'},
        {value: '发展改革委'},
        {value: '国家税务总局'},
        {value: '中国银行保险监督管理委员会'},
        {value: '民政部'},
        {value: '国家认证认可监督管理委员会'},
        {value: '中华人民共和国国家发展和改革委员会'},
        {value: '工商总局'},
        {value: '改革委员会'},
        {value: '公安部'},
        {value: '中国证券监督管理委员会'},
        {value: '扶贫办'},
        {value: '商务部'},
        {value: '工业和信息化部'},
        {value: '中国人民银行'},
        {value: '财政部'},
        {value: '人力资源社会保障部办公厅'},
        {value: '海关总署'},
        {value: '国务院'},
      ],
      drawer: false,
      currentPaper: {}
    }
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    ...mapActions([
      'getPaperList',
      'getPaperById',
    ]),
    onReset() {
      this.queryForm = {
        title: '',
        department: [],
        grade: '',
        release_time: [],
        implement_time: [],
        status: '',
      }
    },
    onSearch() {
      this.loading = true;
      this.getPaperList({
        pageNum: this.pageNum,
        ...this.queryForm
      }).then(res => {
        this.paperList = res.list;
        this.total = res.total;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => {
        this.loading = false;
      })
    },
    handleCurrentChange() {
      this.getPaperList({
        pageNum: this.pageNum,
        ...this.queryForm
      }).then(res => {
        this.paperList = res.list;
        this.total = res.total;
      }).catch(err => {
        this.$message.error(err);
      })
    },
    handleRowClick(row) {
      this.getPaperById(row.id).then(res => {
        this.currentPaper = res;
        this.drawer = true;
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

.form-item {
  width: 90%;
}

.card-text {
  font-family: 新宋体;
  font-size: 1em;
  text-indent: 2em;
}
</style>

<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
