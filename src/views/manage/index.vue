<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item name="1">
        <template slot="title">
          &nbsp;&nbsp;&nbsp;外规列表
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
                  <el-option label="行政法规" value="1"></el-option>
                  <el-option label="部门规章" value="2"></el-option>
                  <el-option label="规范性文件" value="3"></el-option>
                  <el-option label="其他文件" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker class="form-item"
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
                <el-date-picker class="form-item"
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
                <el-select v-model="queryForm.department" placeholder="请选择发文部门" class="form-item">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
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
    <div v-if="this.$route.path === '/manage'" class="actions">
      <el-button size="small" @click="add">新建</el-button>
      <el-button size="small" @click="edit">修改</el-button>
      <el-button size="small" @click="del">删除</el-button>
      <el-button size="small" @click="publish">发布</el-button>
      <el-button size="small" @click="abolish">废止</el-button>
      <el-button size="small" @click="analyze">外规内化</el-button>
      <el-button size="small" @click="analyseResult">外规内化结果</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="paperList"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 10px"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
        label="状态"
        width="80">
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
  name: "Manage",
  data() {
    return {
      queryForm: {
        title: '',
        department: '',
        grade: '',
        release_time: '',
        implement_time: '',
        status: null,
      },
      pageNum: 1,
      total: 0,
      paperList: [],
      ids: [],
      loading: false,
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
    handleSelectionChange(val) {
      this.ids = [];
      for (let v of val) {
        this.ids.push(v.id);
      }
    },
    onReset() {
      this.queryForm = {
        title: '',
        department: '',
        grade: '',
        release_time: '',
        implement_time: '',
        status: null,
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
    add() {
      this.$router.push({
        path: '/detail',
        query: {
          paperId: -1
        }
      });
    },
    del() {
      if (this.ids.length > 0) {
        this.delPapers({ids: this.ids}).then(res => {
          this.$message.success(res);
          this.onSearch();
        }).catch(err => {
          this.$message.error(err);
        })
      } else {
        this.$message.warning('请选择要删除的法规');
      }
    },
    edit() {
      if (this.ids.length === 0) {
        this.$message.warning('请选择要修改的法规');
      } else if (this.ids.length > 1) {
        this.$message.warning('只能选择一条法规进行修改');
      } else {
        this.$router.push({
          path: '/detail',
          query: {
            paperId: this.ids[0]
          }
        });
      }
    },
    publish() {
      if (this.ids.length > 0) {
        this.publishPapers({
          ids: this.ids
        }).then(res => {
          this.$message.success(res);
          this.onSearch();
        }).catch(err => {
          this.$message.error(err);
        })
      } else {
        this.$message.warning('请选择要发布的法规');
      }
    },
    abolish() {
      if (this.ids.length > 0) {
        this.abolishPapers({ids: this.ids}).then(res => {
          this.$message.success(res);
          this.onSearch();
        }).catch(err => {
          this.$message.error(err);
        })
      } else {
        this.$message.warning('请选择要废止的法规');
      }
    },
    analyze() {
      if (this.ids.length === 0) {
        this.$message.warning('请选择要外规内化的法规');
      } else if (this.ids.length > 1) {
        this.$message.warning('只能选择一条法规进行外规内化');
      } else {
        this.$router.push({
          path: '/analyse',
          query: {
            paperId: this.ids[0]
          }
        });
      }
    },
    analyseResult() {
      if (this.ids.length > 0) {
        //TODO: 从后端获取结果
      } else {
        this.$message.warning('请选择要获取外规内化结果的法规');
      }
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
</style>

<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
