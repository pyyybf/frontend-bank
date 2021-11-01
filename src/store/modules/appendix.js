import {
  getAppendixListAPI,
  uploadAppendixAPI,
  deleteAppendixAPI
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
        uploadAppendixAPI(data).then(response => {
          if (response.data.success) {
            resolve('上传成功');
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
  }
};
export default appendix;
