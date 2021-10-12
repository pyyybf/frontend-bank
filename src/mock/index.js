const Mock = require('mockjs');

// 登录
const login = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  if (paramObj.username === 'panyue' && paramObj.password === '123456') {
    return {
      success: true,
      content: {
        username: 'panyue',
        token: 'oiwesklhczuc'
      },
      message: '登录成功'
    }
  } else {
    return {
      success: false,
      content: {},
      message: '用户名或密码错误'
    }
  }
}

Mock.mock(RegExp('.*/api/user/login'), 'post', login);// 登录
