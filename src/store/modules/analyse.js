import {getAnalyseByIdAPI, addAnalyseAPI, updateAnalyseByIdAPI} from "@/api/analyse";

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
    }
  }
};
export default analyse;
