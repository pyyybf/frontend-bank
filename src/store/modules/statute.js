import {getAPI} from "@/api/statute";

const user = {
  state: {},
  mutations: {},
  actions: {
    getStatuteList({dispatch, commit}, data) {
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
  }
};
export default user;
