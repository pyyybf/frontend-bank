<template>
  <div>
    <el-page-header @back="goBack" :content="(this.id>0?'修改':'新建')+'法规'">
    </el-page-header>
    <el-form ref="statuteForm" :model="statuteForm" label-width="80px" size="medium" class="statute-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="法规标题">
            <el-input v-model="statuteForm.faguibiaoti" placeholder="请输入法规标题" style="width:90%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发文文号">
            <el-input v-model="statuteForm.faguiwenhao" placeholder="请输入法规标题" style="width:90%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发文部门">
            <el-select v-model="statuteForm.fawenbumen" placeholder="请选择发文部门" style="width:90%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="效力级别">
            <el-select v-model="statuteForm.xiaolidengji" placeholder="请选择效力级别" style="width:90%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布日期">
            <el-date-picker style="width:90%"
                            v-model="statuteForm.faburiqi"
                            type="date"
                            placeholder="选择发布日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实施日期">
            <el-date-picker style="width:90%"
                            v-model="statuteForm.shishiriqi"
                            type="date"
                            placeholder="选择实施日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="外规类别">
            <el-select v-model="statuteForm.waiguileibie" placeholder="请选择外规类别" style="width:90%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="解读部门">
            <el-select v-model="statuteForm.jiedubumen" placeholder="请选择解读部门" style="width:90%">
              <el-option label="已发布" value="1"></el-option>
              <el-option label="未发布" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="摘要">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="statuteForm.zhaiyao"
              style="width: 95.5%">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="正文" style="text-align: left">
            <el-upload
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              style="margin-left: 2.25%;width: 95.5%">
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
        &nbsp;&nbsp;{{'附件管理'}}
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
      statuteForm: {
        faguibiaoti: '',
        faguiwenhao: '',
        waiguileibie: '',
        fawenbumen: '',
        xiaolidengji: '',
        faburiqi: '',
        shishiriqi: '',
        jiedubumen: '',
        lururen: '',
        lurushijian: '',
        zhengwen: '',
        zhuangtai: '',
        waiguineihuazhuangtai: '',
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
    }
  },
  created() {
    if (this.$route.query.statuteId > 0) {
      this.id = this.$route.query.statuteId;
    } else {
      this.id = -1;
    }
  },
  mounted() {
    if (this.$route.query.statuteId > 0) {
      this.getStatuteById({id: this.$route.query.statuteId}).then(res => {
        this.statuteForm = res;
      }).catch(err => {
        this.$message.error(err);
      })
    }
  },
  watch: {
    '$route.query.statuteId'(val) {
      if (this.$route.path.includes('detail')) {
        console.log(val)
        if (val > 0) {
          this.id = this.$route.query.statuteId;
          this.getStatuteById({id: this.id}).then(res => {
            this.statuteForm = res;
          }).catch(err => {
            this.$message.error(err);
          })
        } else {
          this.id = -1;
          this.statuteForm = {
            faguibiaoti: '',
            faguiwenhao: '',
            waiguileibie: '',
            fawenbumen: '',
            xiaolidengji: '',
            faburiqi: '',
            shishiriqi: '',
            jiedubumen: '',
            lururen: '',
            lurushijian: '',
            zhengwen: '',
            zhuangtai: '',
            waiguineihuazhuangtai: '',
          };
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getStatuteById',
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
    }
  },
}
</script>

<style scoped>
.statute-form {
  margin-top: 20px;
}
</style>
