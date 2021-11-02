<template>
  <div>
    <el-page-header @back="goBack" content="外规解读">
    </el-page-header>
    <el-form ref="analyseForm" :model="analyseForm" :rules="paperRules" label-width="80px" size="medium"
             class="paper-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法规标题" prop="title">
            <el-input v-model="analyseForm.title" placeholder="请输入法规标题" style="width:95%;float: left"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发文文号" prop="number">
            <el-input v-model="analyseForm.number" placeholder="请输入发文文号" style="width:95%;float: left"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外规类别" prop="category">
            <el-select v-model="analyseForm.category" placeholder="请选择外规类别" style="width:95%;float: left">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="解读部门" prop="interpret_department">
            <el-select v-model="analyseForm.interpret_department"
                       multiple
                       placeholder="请选择解读部门"
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="正文" prop="content" style="text-align: left">
            <el-upload
              action="#"
              :http-request="handleUpload"
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
            <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
            <el-button @click="reset">重置</el-button>
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Analyse",
  data() {
    return {
      id: 0,
      analyseForm: {
        title: '',
        number: '',
        category: '',
        interpret_department: [],
        content: '',
      },
      fileList: [],
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
        interpret_department: [{
          required: false,
          message: '请选择解读部门',
          trigger: 'blur',
        }],
        content: [{
          required: true,
          message: '请上传正文',
          trigger: 'blur',
        }],
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
      ],
      categoryOptions: [
        {
          value: '法律'
        },
        {
          value: '行政法规'
        },
        {
          value: '部门规章'
        },
        {
          value: '规范性文件'
        },
        {
          value: '其他文件'
        },
      ],
      saveLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
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
        var interpret_department = res.interpret_department.split(',');
        if (interpret_department[0] === '') {
          interpret_department.pop();
        }
        this.analyseForm = {
          ...res,
          interpret_department: interpret_department
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
            var interpret_department = res.interpret_department.split(',');
            if (interpret_department[0] === '') {
              interpret_department.pop();
            }
            this.analyseForm = {
              ...res,
              interpret_department: interpret_department
            };
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          this.id = -1;
          this.analyseForm = {
            title: '',
            number: '',
            category: '',
            interpret_department: [],
            content: '',
          };
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getPaperById',
      'analyzePaperById',
    ]),
    goBack() {
      this.$router.push({path: '/manage'});
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleUpload(params) {
      this.analyseForm.content = params.file;
    },
    save() {
      this.saveLoading = true;

      // 通过 FormData 对象上传文件
      let formData = new FormData();
      for (let key in this.analyseForm) {
        formData.append(key, this.analyseForm[key]);
      }
      formData.set("interpret_department", this.analyseForm.interpret_department.join(','));
      formData.set("content", this.analyseForm.content);

      this.analyzePaperById({
        id: this.id,
        analyseForm: formData
      }).then(res => {
        this.$message.success(res);
        this.$router.push({path: '/manage'});
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => {
        this.saveLoading = false;
      })
    },
    reset() {
      this.analyseForm = {
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
      }
    },
  },
}
</script>

<style scoped>
.paper-form {
  margin-top: 20px;
}
</style>
