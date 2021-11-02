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
            <el-select v-model="paperForm.department"
                       multiple
                       placeholder="请选择发文部门"
                       style="width:95%;float: left">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="效力等级" prop="grade">
            <el-select v-model="paperForm.grade" placeholder="请选择效力等级" style="width:95%;float: left">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布日期" prop="release_time">
            <el-date-picker style="width:95%;float: left"
                            v-model="paperForm.release_time"
                            type="date"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择发布日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实施日期" prop="implement_time">
            <el-date-picker style="width:95%;float: left"
                            v-model="paperForm.implement_time"
                            type="date"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择实施日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外规类别" prop="category">
            <el-select v-model="paperForm.category" placeholder="请选择外规类别" style="width:95%;float: left">
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
            <el-select v-model="paperForm.interpret_department"
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
              <el-button size="small" type="primary" icon="el-icon-upload2" style="float: left">点击上传</el-button>
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
        <el-upload
          action="#"
          :http-request="handleUploadAppendix"
          :file-list="appendixFileList"
          :show-file-list="false"
          style="width: 95%;float: left">
          <el-button size="small" type="primary" icon="el-icon-upload2" style="float: left">添加附件</el-button>
        </el-upload>
      </template>
    </el-descriptions>
    <el-table
      :data="appendixList"
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
  name: "Detail",
  data() {
    return {
      id: 0,
      paperForm: {
        title: '',
        number: '',
        category: '',
        department: [],
        grade: '',
        release_time: '',
        implement_time: '',
        interpret_department: [],
        input_user: '',
        input_time: '',
        content: '',
        status: '',
        analyse_status: '',
      },
      fileList: [],
      appendixFileList: [],
      appendixList: [],
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
      gradeOptions: [
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
        var department = res.department.split(',');
        if (department[0] === '') {
          department.pop();
        }
        this.paperForm = {
          ...res,
          content: null,
          interpret_department: interpret_department,
          department: department
        };
      }).catch(err => {
        this.$message.error(err);
      })
      this.getAppendixList(this.$route.query.paperId).then(res => {
        this.appendixList = res;
      }).catch(err => {
        this.$message.error(err);
      })
    }
  },
  watch: {
    '$route.query.paperId'(val) {
      if (this.$route.path.includes('detail')) {
        if (val > 0) {
          this.id = this.$route.query.paperId;
          this.getPaperById(this.id).then(res => {
            var interpret_department = res.interpret_department.split(',');
            if (interpret_department[0] === '') {
              interpret_department.pop();
            }
            var department = res.department.split(',');
            if (department[0] === '') {
              department.pop();
            }
            this.paperForm = {
              ...res,
              interpret_department: interpret_department,
              department: department,
              content: null
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
            department: [],
            grade: '',
            release_time: '',
            implement_time: '',
            interpret_department: [],
            input_user: '',
            input_time: '',
            content: null,
            status: false,
            analyse_status: false,
          };
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getPaperById',
      'addPaper',
      'updatePaperById',
      'getAppendixList',
      'uploadAppendix',
      'deleteAppendix'
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
      this.paperForm.content = params.file;
    },
    save() {
      this.saveLoading = true;
      var date = new Date();

      // 通过 FormData 对象上传文件
      var formData = new FormData();

      this.paperForm.content && formData.append('content', this.paperForm.content);
      formData.append('title', this.paperForm.title);
      formData.append('number', this.paperForm.number);
      formData.append('category', this.paperForm.category);
      formData.append('department', this.paperForm.department.join(','));
      formData.append('grade', this.paperForm.grade);
      formData.append('release_time', this.paperForm.release_time.substring(0, 10));
      formData.append('implement_time', this.paperForm.implement_time.substring(0, 10));
      formData.append('interpret_department', this.paperForm.interpret_department.join(','));
      formData.append('input_user', this.userId);
      formData.append('input_time', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
      formData.append('status', this.paperForm.status);
      formData.append('analyse_status', this.paperForm.analyse_status);

      if (this.id > 0) {
        this.updatePaperById({
          id: this.id,
          paperForm: formData
        }).then(res1 => {
          if (this.appendixFileList.length > 0) {
            var appendixForm = new FormData();
            for (var file of this.appendixFileList) {
              appendixForm.append('appendixFile', file);
            }
            this.uploadAppendix({
              paperId: this.id,
              appendixForm: appendixForm
            }).then(res2 => {
              this.appendixFileList = [];
              this.saveLoading = false;
              this.$message.success(res1);
              this.$router.push({path: '/manage'});
            }).catch(err => {
              this.$message.error(err);
            })
          } else {
            this.saveLoading = false;
            this.$message.success(res1);
            this.$router.push({path: '/manage'});
          }
        }).catch(err => {
          this.$message.error(err);
        }).finally(() => {
          this.saveLoading = false;
        })
      } else {
        this.addPaper(formData).then(paperId => {
          var appendixForm = new FormData();
          for (var file of this.appendixFileList) {
            appendixForm.append('appendixFile', file);
          }
          this.uploadAppendix({
            paperId: paperId,
            appendixForm: appendixForm
          }).then(res => {
            this.saveLoading = false;
            this.$message.success(res);
            this.$router.push({path: '/manage'});
          }).catch(err => {
            this.$message.error(err);
          })
        }).catch(err => {
          this.$message.error(err);
        }).finally(() => {
          this.saveLoading = false;
        })
      }
    },
    reset() {
      this.paperForm = {
        title: '',
        number: '',
        category: '',
        department: [],
        grade: '',
        release_time: '',
        implement_time: '',
        interpret_department: [],
        input_user: '',
        input_time: '',
        content: null,
        status: false,
        analyse_status: false,
      }
    },
    handleUploadAppendix(params) {
      this.appendixFileList.push(params.file);
      this.appendixList.push({
        name: params.file.name,
        size: Math.floor(params.file.size * 100 / 1024) / 100,
        creator: localStorage.getItem('username')
      })
    },
    handleDelete(index, row) {
      if (this.id > 0) {  //编辑
        this.deleteAppendix({id: row.id}).then(res1 => {
          this.$message.success(res1);
          this.getAppendixList(this.$route.query.paperId).then(res2 => {
            // console.log(res)
            this.appendixList = res2;
          }).catch(err => {
            this.$message.error(err);
          })
        }).catch(err => {
          this.$message.error(err);
        })
      } else {  //新增
        this.appendixFileList.splice(index, 1);
        this.appendixList.splice(index, 1);
      }
    },
    handleDownload(index, row) {
      if (this.id > 0) {  //编辑
        //TODO
      } else {  //新增
        let aTag = document.createElement('a');  //创建一个a标签
        aTag.download = this.appendixFileList[index].name;
        let href = URL.createObjectURL(this.appendixFileList[index]);  //获取url
        aTag.href = href;
        aTag.click();
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
