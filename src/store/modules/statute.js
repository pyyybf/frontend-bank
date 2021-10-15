import {
  addStatuteAPI,
  delStatutesAPI,
  updateStatuteByIdAPI,
  getAPI,
  publishStatutesAPI,
  abolishStatutesAPI
} from "@/api/statute";

const user = {
  state: {},
  mutations: {},
  actions: {
    getStatuteList({},data) {
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
    addStatute({},data) {
      return new Promise((resolve, reject) => {
        addStatuteAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    delStatutes({},data) {
      return new Promise((resolve, reject) => {
        delStatutesAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    updateStatuteById({},data) {
      return new Promise((resolve, reject) => {
        updateStatuteByIdAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    publishStatutes({},data) {
      return new Promise((resolve, reject) => {
        publishStatutesAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
      })
    },
    abolishStatutes({},data) {
      return new Promise((resolve, reject) => {
        abolishStatutesAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        })
      })
    },
  }
};
export default user;
