import {getAnalyseByIdAPI} from "@/api/analyse";

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
    }
  }
};
export default analyse;
