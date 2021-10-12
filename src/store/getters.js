const getters = {
  username: state => state.user.username ? state.user.username : JSON.parse(localStorage.getItem('username')),
  token: state => state.user.token ? state.user.token : JSON.parse(localStorage.getItem('token')),
}
export default getters
