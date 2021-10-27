const getters = {
  username: state => state.user.username ? state.user.username : JSON.parse(localStorage.getItem('username')),
  userId: state => state.user.userId > 0 ? state.user.userId : JSON.parse(localStorage.getItem('userId')),
}
export default getters
