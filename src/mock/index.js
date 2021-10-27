const Mock = require('mockjs');

// const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

var accounts = [
  {
    id: 1,
    username: 'panyue',
    password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  },
]
var curId = 2;
var papers = [
  {
    id: 1,
    title: '票据管理实施办法',
    number: '123456789',
    category: '外规类别1',
    department: '银监会',
    grade: '行政法规',
    release_time: '2013-01-02',
    implement_time: '2013-01-05',
    interpret_department: '合规部',
    input_user: '录入人1',
    input_time: '2021-10-18',
    content: '正文1',
    status: true,
    // waiguineihuazhuangtai: '1',
  },
  {
    id: 2,
    title: '中华人民共和国票据法',
    number: '00000000',
    category: '外规类别2',
    department: '人民银行',
    grade: '法律',
    release_time: '2013-01-02',
    implement_time: '2013-01-05',
    interpret_department: '风险部,信用卡部',
    input_user: '录入人2',
    input_time: '2021-10-18',
    content: '正文2',
    status: false,
    // waiguineihuazhuangtai: '0',
  },
]

// function randomToken() {
//   var token = '';
//   for (let i = 0; i < 32; i++) {
//     token += ALPHABET[Math.floor(Math.random() * 62)];
//   }
//   return token;
// }

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
          // token: randomToken(),
          userId: account.id
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
//登出
const logout = function (param) {
  var pathVariables = param.url.split('/');
  const userId = pathVariables[pathVariables.length - 1];
  console.log(userId)
  return {
    success: true,
    content: {},
    message: '登出成功'
  }
}

const add = function (param) {
  // param = param.body || '';
  // let paramObj = JSON.parse(param);
  // console.log(param.body)
  curId++;
  papers.push({
    id: curId,
    title: param.body.get('title'),
    number: param.body.get('number'),
    category: param.body.get('category'),
    department: param.body.get('department'),
    grade: param.body.get('grade'),
    release_time: param.body.get('release_time'),
    implement_time: param.body.get('implement_time'),
    interpret_department: param.body.get('interpret_department'),
    input_user: param.body.get('input_user'),
    input_time: param.body.get('input_time'),
    content: param.body.get('content'),
    status: param.body.get('status'),
  })
  return {
    success: true,
    content: {},
    message: '添加成功'
  }
}

const del = function (param) {
  var params = param.url.split('?').pop().split('&');
  let paramObj = {};
  for (let param of params) {
    param = param.split('=');
    if (param[0].endsWith('[]')) {
      if (!paramObj[param[0].slice(0, -2)]) {
        paramObj[param[0].slice(0, -2)] = [];
      }
      paramObj[param[0].slice(0, -2)].push(Number(param[1]));
    } else {
      paramObj[param[0]] = param[1];
    }
  }
  papers = papers.filter(v => !paramObj.ids.includes(v.id));
  return {
    success: true,
    content: {},
    message: '删除成功'
  }
}

const update = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  papers = papers.map(v => v.id === paramObj.id ? param : v);
  return {
    success: true,
    content: {},
    message: '更新成功'
  }
}

const get = function (param) {
  var params = param.url.split('?').pop().split('&');
  let paramObj = {};
  for (let param of params) {
    param = param.split('=');
    paramObj[param[0]] = param[1];
  }
  return {
    success: true,
    content: {
      list: papers.slice((Number(paramObj.pageNum) - 1) * 10, Number(paramObj.pageNum) * 10),
      total: papers.length
    },
    message: '获取成功'
  }
}

const publish = function (param) {
  var params = param.url.split('?').pop().split('&');
  let paramObj = {};
  for (let param of params) {
    param = param.split('=');
    if (param[0].endsWith('[]')) {
      if (!paramObj[param[0].slice(0, -2)]) {
        paramObj[param[0].slice(0, -2)] = [];
      }
      paramObj[param[0].slice(0, -2)].push(Number(param[1]));
    } else {
      paramObj[param[0]] = param[1];
    }
  }
  for (let paper of papers) {
    if (paramObj.ids.includes(paper.id)) {
      paper.status = true;
    }
  }
  return {
    success: true,
    content: {},
    message: '发布成功'
  }
}

const abolish = function (param) {
  var params = param.url.split('?').pop().split('&');
  let paramObj = {};
  for (let param of params) {
    param = param.split('=');
    if (param[0].endsWith('[]')) {
      if (!paramObj[param[0].slice(0, -2)]) {
        paramObj[param[0].slice(0, -2)] = [];
      }
      paramObj[param[0].slice(0, -2)].push(Number(param[1]));
    } else {
      paramObj[param[0]] = param[1];
    }
  }
  for (let paper of papers) {
    if (paramObj.ids.includes(paper.id)) {
      paper.status = false;
    }
  }
  return {
    success: true,
    content: {},
    message: '废止成功'
  }
}

const getPaperById = function (param) {
  var pathVariables = param.url.split('/');
  const id = pathVariables[pathVariables.length - 1];
  for (let paper of papers) {
    if (id == paper.id) {
      return {
        success: true,
        content: paper,
        message: '获取详情成功'
      }
    }
  }
  return {
    success: false,
    content: {},
    message: '未查询到法规详情'
  }
}

// Mock.mock(RegExp('.*/api/user/login'), 'post', login); // 登录
// Mock.mock(RegExp('.*/api/user/register'), 'post', register); // 注册
// Mock.mock(RegExp('.*/api/user/logout'), 'post', logout); // 登出
//
// Mock.mock(RegExp('.*/api/paper/add'), 'post', add); // 增
// Mock.mock(RegExp('.*/api/paper/del'), 'delete', del); // 删
// Mock.mock(RegExp('.*/api/paper/update'), 'put', update); // 改
// Mock.mock(RegExp('.*/api/paper/get/.*'), 'get', getPaperById); // 根据id获取法规详情
// Mock.mock(RegExp('.*/api/paper/get'), 'get', get); // 查
// Mock.mock(RegExp('.*/api/paper/publish'), 'put', publish); // 发布
// Mock.mock(RegExp('.*/api/paper/abolish'), 'put', abolish); // 废止
