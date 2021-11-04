import {
  getAnalyseByIdAPI,
  addAnalyseAPI,
  updateAnalyseByIdAPI,
  downloadResultFileAPI
} from "@/api/analyse";

const analyse = {
  state: {},
  mutations: {},
  actions: {
    getAnalyseById({}, data) {
      return new Promise((resolve, reject) => {
        getAnalyseByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    addAnalyse({}, data) {
      return new Promise((resolve, reject) => {
        addAnalyseAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    updateAnalyse({}, data) {
      return new Promise((resolve, reject) => {
        updateAnalyseByIdAPI(data.id, data.analyseForm).then(response => {
          if (response.data.success) {
            resolve('更新成功');
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    downloadResultFile({}, data) {
      return new Promise((resolve, reject) => {
        downloadResultFileAPI(data).then(response => {
          if (response.status) {
            resolve(response.data);
          } else {
            reject('结果文件获取失败');
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
};
export default analyse;
