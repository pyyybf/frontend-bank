// import {getToken, setToken, removeToken} from '@/utils/auth';
import {loginAPI, registerAPI, logoutAPI} from "@/api/user";

const user = {
  state: {
    username: '',
    userId: -1,
    // token: '',
  },
  mutations: {
    // set_token: (state, data) => {
    //   state.token = data;
    //   setToken(data);
    // },
    set_username: (state, data) => {
      state.username = data;
      localStorage.setItem('username', data);
    },
    set_userId: (state, data) => {
      state.userId = data;
      localStorage.setItem('userId', data);
    },
  },
  actions: {
    login({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        loginAPI(data).then(response => {
          if (response.data.success) {
            commit('set_username', response.data.content.username);
            commit('set_userId', response.data.content.userId);
            // commit('set_token', response.data.content.token);
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      });
    },
    logout({commit}, data) {
      return new Promise((resolve, reject) => {
        logoutAPI(data).then(response => {
          if (response.data.success) {
            // removeToken();
            commit('set_username', '');
            commit('set_userId', -1);
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      });
    },
    register({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        registerAPI(data).then(response => {
          if (response.data.success) {
            resolve(response.data.message)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
};
export default user;
