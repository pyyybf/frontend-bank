import {
  addPaperAPI,
  delPapersAPI,
  updatePaperByIdAPI,
  getAPI,
  publishPapersAPI,
  abolishPapersAPI,
  getPaperByIdAPI,
} from "@/api/paper";

const user = {
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
            resolve('添加成功');
          } else {
            reject(response.data.message);
          }
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
        })
      })
    },
  }
};
export default user;
