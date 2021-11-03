import {
  getAppendixListAPI,
  uploadAppendixAPI,
  deleteAppendixAPI,
  downloadAppendixAPI
} from "@/api/appendix";

const appendix = {
  state: {},
  mutations: {},
  actions: {
    getAppendixList({}, data) {
      return new Promise((resolve, reject) => {
        getAppendixListAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      });
    },
    uploadAppendix({}, data) {
      return new Promise((resolve, reject) => {
        uploadAppendixAPI(data.paperId, data.appendixForm).then(response => {
          if (response.data.success) {
            resolve('附件上传成功');
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    deleteAppendix({}, data) {
      return new Promise((resolve, reject) => {
        deleteAppendixAPI(data).then(response => {
          if (response.data.success) {
            resolve('删除成功');
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    downloadAppendix({}, data) {
      return new Promise((resolve, reject) => {
        downloadAppendixAPI(data).then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(response.data.message);
          }
        })
      })
    },
  }
};
export default appendix;
