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
      // console.log(data)
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
            resolve(response.data.message);
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
            resolve(response.data.message);
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
            resolve(response.data.message);
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
            resolve(response.data.message);
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
            resolve(response.data.message);
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
