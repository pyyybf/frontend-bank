<template>
  <div>
    <el-page-header @back="goBack" :content="(this.id>0?'修改':'新建')+'法规'">
    </el-page-header>
    <el-form ref="paperForm" :model="paperForm" :rules="paperRules" label-width="80px" size="medium"
             class="paper-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法规标题" prop="title">
            <el-input v-model="paperForm.title" placeholder="请输入法规标题" style="width:95%;float: left"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发文文号" prop="number">
            <el-input v-model="paperForm.number" placeholder="请输入发文文号" style="width:95%;float: left"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发文部门" prop="department">
            <el-select v-model="paperForm.department" placeholder="请选择发文部门" style="width:95%;float: left">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="效力等级" prop="grade">
            <el-select v-model="paperForm.grade" placeholder="请选择效力等级" style="width:95%;float: left">
              <el-option label="行政法规" value="1"></el-option>
              <el-option label="部门规章" value="2"></el-option>
              <el-option label="规范性文件" value="3"></el-option>
              <el-option label="其他文件" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布日期" prop="release_time">
            <el-date-picker style="width:95%;float: left"
                            v-model="paperForm.release_time"
                            type="date"
                            placeholder="选择发布日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实施日期" prop="implement_time">
            <el-date-picker style="width:95%;float: left"
                            v-model="paperForm.implement_time"
                            type="date"
                            placeholder="选择实施日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外规类别" prop="category">
            <el-select v-model="paperForm.category" placeholder="请选择外规类别" style="width:95%;float: left">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="解读部门" prop="interpret_department">
            <!--            <el-select v-model="paperForm.interpret_department" placeholder="请选择解读部门" style="width:95%;float: left">-->
            <!--              <el-option label="已发布" value="1"></el-option>-->
            <!--              <el-option label="未发布" value="0"></el-option>-->
            <!--            </el-select>-->
            <el-select v-model="paperForm.interpret_department" multiple placeholder="请选择解读部门"
                       style="width:95%;float: left">
              <el-option
                v-for="item in interpretDepartmentOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="24">-->
        <!--          <el-form-item label="摘要">-->
        <!--            <el-input-->
        <!--              type="textarea"-->
        <!--              :autosize="{ minRows: 2, maxRows: 4}"-->
        <!--              v-model="paperForm.zhaiyao"-->
        <!--              style="width: 100%;float: left">-->
        <!--            </el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="正文" prop="content" style="text-align: left">
            <el-upload
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              style="width: 95%;float: left">
              <el-button size="small" type="primary" style="float: left">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-descriptions class="margin-top" size="medium">
      <template slot="title">
        &nbsp;&nbsp;{{ '附件管理' }}
      </template>
      <template slot="extra">
        <el-button type="primary" size="small">添加附件</el-button>
      </template>
    </el-descriptions>
    <el-table
      :data="attachmentList"
      style="width: 100%;margin-bottom: 100px">
      <el-table-column
        label="附件名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="文件大小(KB)"
        prop="size">
      </el-table-column>
      <el-table-column
        label="创建人"
        prop="creator">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDownload(scope.$index, scope.row)">下载
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      id: 0,
      paperForm: {
        title: '',
        number: '',
        category: '',
        department: '',
        grade: '',
        release_time: '',
        implement_time: '',
        interpret_department: [],
        input_user: '',
        input_time: '',
        content: '',
        status: '',
        // waiguineihuazhuangtai: '',
      },
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      attachmentList: [{
        name: '附件一',
        size: 23,
        creator: '超级管理员',
      }],
      paperRules: {
        title: [{
          required: true,
          message: '请输入法规标题',
          trigger: 'blur',
        }],
        number: [{
          required: false,
          message: '请输入发文文号',
          trigger: 'blur',
        }],
        category: [{
          required: true,
          message: '请选择外规类别',
          trigger: 'blur',
        }],
        department: [{
          required: true,
          message: '请选择发文部门',
          trigger: 'blur',
        }],
        grade: [{
          required: true,
          message: '请选择效力等级',
          trigger: 'blur',
        }],
        release_time: [{
          required: true,
          message: '请选择发布日期',
          trigger: 'blur',
        }],
        implement_time: [{
          required: true,
          message: '请选择实施日期',
          trigger: 'blur',
        }],
        interpret_department: [{
          required: false,
          message: '请选择解读部门',
          trigger: 'blur',
        }],
        input_user: [{
          required: true,
          message: '请输入录入人',
          trigger: 'blur',
        }],
        input_time: [{
          required: true,
          message: '请选择录入时间',
          trigger: 'blur',
        }],
        content: [{
          required: true,
          message: '请上传正文',
          trigger: 'blur',
        }],
        status: [{
          required: true,
          message: '请选择状态',
          trigger: 'blur',
        }],
        // waiguineihuazhuangtai: [{
        //   required: true,
        //   message:'请输入外规内化状态',
        //   trigger: 'blur',
        // }],
      },
      interpretDepartmentOptions: [
        {
          value: '合规部'
        },
        {
          value: '风险部'
        },
        {
          value: '信用卡部'
        },
      ]
    }
  },
  created() {
    if (this.$route.query.paperId > 0) {
      this.id = this.$route.query.paperId;
    } else {
      this.id = -1;
    }
  },
  mounted() {
    if (this.$route.query.paperId > 0) {
      this.getPaperById(this.$route.query.paperId).then(res => {
        this.paperForm = {
          ...res,
          interpret_department: res.interpret_department.split(',')
        };
      }).catch(err => {
        this.$message.error(err);
      })
    }
  },
  watch: {
    '$route.query.paperId'(val) {
      if (this.$route.path.includes('detail')) {
        // console.log(val)
        if (val > 0) {
          this.id = this.$route.query.paperId;
          this.getPaperById(this.id).then(res => {
            this.paperForm = {
              ...res,
              interpret_department: res.interpret_department.split(',')
            };
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          this.id = -1;
          this.paperForm = {
            title: '',
            number: '',
            category: '',
            department: '',
            grade: '',
            release_time: '',
            implement_time: '',
            interpret_department: [],
            input_user: '',
            input_time: '',
            content: '',
            status: '',
            // waiguineihuazhuangtai: '',
          };
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getPaperById',
    ]),
    goBack() {
      this.$router.push({path: '/edit'});
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    save() {

    },
  },
}
</script>

<style scoped>
.paper-form {
  margin-top: 20px;
}
</style>
