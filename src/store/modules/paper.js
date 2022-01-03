import {
  addPaperAPI,
  delPapersAPI,
  updatePaperByIdAPI,
  getAPI,
  publishPapersAPI,
  abolishPapersAPI,
  getPaperByIdAPI,
  getStatisticalDataAPI,
  getRecentAnalyzedPapersAPI,
  getPaperIdByTitleAPI,
} from "@/api/paper";

const paper = {
  state: {},
  mutations: {},
  actions: {
    getPaperList({}, data) {
      return new Promise((resolve, reject) => {
        getAPI(data).then(response => {
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
    addPaper({}, data) {
      return new Promise((resolve, reject) => {
        addPaperAPI(data).then(response => {
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
    delPapers({}, data) {
      return new Promise((resolve, reject) => {
        delPapersAPI(data).then(response => {
          if (response.data.success) {
            resolve('删除成功');
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    updatePaperById({}, data) {
      return new Promise((resolve, reject) => {
        updatePaperByIdAPI(data.id, data.paperForm).then(response => {
          if (response.data.success) {
            resolve('修改成功');
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    publishPapers({}, data) {
      return new Promise((resolve, reject) => {
        publishPapersAPI(data).then(response => {
          if (response.data.success) {
            resolve('发布成功');
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    abolishPapers({}, data) {
      return new Promise((resolve, reject) => {
        abolishPapersAPI(data).then(response => {
          if (response.data.success) {
            resolve('废止成功');
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    getPaperById({}, data) {
      return new Promise((resolve, reject) => {
        getPaperByIdAPI(data).then(response => {
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
    getStatisticalData({}) {
      return new Promise((resolve, reject) => {
        getStatisticalDataAPI().then(response => {
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
    getRecentAnalyzedPapers({}) {
      return new Promise((resolve, reject) => {
        getRecentAnalyzedPapersAPI().then(response => {
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
    getPaperIdByTitle({}, data) {
      return new Promise((resolve, reject) => {
        getPaperIdByTitleAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.content);
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
export default paper;
