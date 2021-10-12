import {getToken, setToken, removeToken} from '@/utils/auth';
import {loginAPI} from "@/api/user";

const user = {
  state: {
    username: '',
    token: '',
  },
  mutations: {
    set_token: (state, data) => {
      state.token = data;
      setToken(data);
    },
    set_username: (state, data) => {
      state.username = data;
      localStorage.setItem('username', data);
    },
  },
  actions: {
    login({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        loginAPI(data).then(response => {
          if (response.data.success) {
            commit('set_username', response.data.content.username);
            commit('set_token', response.data.content.token);
            resolve(response.data.message);
          } else {
            reject(response.data.message);
          }
        }).catch(error => {
          reject(error);
        })
      });
    },
    logout({commit}) {
      return new Promise((resolve) => {
        removeToken();
        commit('set_username', '');
        localStorage.removeItem('username');
        resolve('登出成功');
      });
    },
  }
};
export default user;
