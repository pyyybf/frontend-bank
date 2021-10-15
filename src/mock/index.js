const Mock = require('mockjs');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

var accounts = [
  {
    username: 'panyue',
    password: '123456'
  },
]
var curId = 2;
var statutes = [
  {
    id: 1,
    item1: '票据管理实施办法',
    item2: '行政法规',
    item3: '2013-01-05',
    item4: '2013-01-02',
    item5: '银监会',
    item6: '1',
    item7: '1',
  },
  {
    id: 2,
    item1: '中华人民共和国票据法',
    item2: '法律',
    item3: '2013-01-05',
    item4: '2013-01-02',
    item5: '人民银行',
    item6: '0',
    item7: '0',
  },
]

function randomToken() {
  var token = '';
  for (let i = 0; i < 32; i++) {
    token += ALPHABET[Math.floor(Math.random() * 62)];
  }
  return token;
}

// 登录
const login = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  for (let account of accounts) {
    if (paramObj.username === account.username && paramObj.password === account.password) {
      return {
        success: true,
        content: {
          username: account.username,
          token: randomToken()
        },
        message: '登录成功'
      }
    }
  }
  return {
    success: false,
    content: {},
    message: '用户名或密码错误'
  }
}
// 注册
const register = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  for (let account of accounts) {
    if (account.username === paramObj.username) {
      return {
        success: false,
        content: {},
        message: '用户名已存在'
      }
    }
  }
  accounts.push({
    username: paramObj.username,
    password: paramObj.password
  })
  return {
    success: true,
    content: {},
    message: '注册成功'
  }
}

const add = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  curId++;
  statutes.push({
    id: curId,
    ...paramObj
  })
  return {
    success: true,
    content: {},
    message: '添加成功'
  }
}

const del = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  statutes = statutes.filter(v => !paramObj.ids.includes(v.id));
  return {
    success: true,
    content: {},
    message: '删除成功'
  }
}

const update = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  statutes = statutes.map(v => v.id === paramObj.id ? param : v);
  return {
    success: true,
    content: {},
    message: '更新成功'
  }
}

const get = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  // console.log(paramObj)
  return {
    success: true,
    content: {
      list: statutes.slice((paramObj.pageNum - 1) * 10, paramObj.pageNum * 10),
      total: statutes.length
    },
    message: '获取成功'
  }
}

const publish = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  for (let statute of statutes) {
    if (paramObj.ids.includes(statute.id)) {
      statute.item6 = '1';
    }
  }
  return {
    success: true,
    content: {},
    message: '发布成功'
  }
}

const abolish = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  for (let statute of statutes) {
    if (paramObj.ids.includes(statute.id)) {
      statute.item6 = '0';
    }
  }
  return {
    success: true,
    content: {},
    message: '废止成功'
  }
}

Mock.mock(RegExp('.*/api/user/login'), 'post', login); // 登录
Mock.mock(RegExp('.*/api/user/register'), 'post', register); // 注册

Mock.mock(RegExp('.*/api/statute/add'), 'post', add); // 增
Mock.mock(RegExp('.*/api/statute/del'), 'delete', del); // 删
Mock.mock(RegExp('.*/api/statute/update'), 'put', update); // 改
Mock.mock(RegExp('.*/api/statute/get'), 'get', get); // 查
Mock.mock(RegExp('.*/api/statute/publish'), 'put', publish); // 发布
Mock.mock(RegExp('.*/api/statute/abolish'), 'put', abolish); // 废止
