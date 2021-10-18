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
    faguibiaoti: '票据管理实施办法',
    faguiwenhao: '123456789',
    waiguileibie: '外规类别1',
    fawenbumen: '银监会',
    xiaolidengji: '行政法规',
    faburiqi: '2013-01-02',
    shishiriqi: '2013-01-05',
    jiedubumen: '解读部门1',
    lururen: '录入人1',
    lurushijian: '2021-10-18',
    zhengwen: '正文1',
    zhuangtai: '1',
    waiguineihuazhuangtai: '1',
  },
  {
    id: 2,
    faguibiaoti: '中华人民共和国票据法',
    faguiwenhao: '00000000',
    waiguileibie: '外规类别2',
    fawenbumen: '人民银行',
    xiaolidengji: '法律',
    faburiqi: '2013-01-02',
    shishiriqi: '2013-01-05',
    jiedubumen: '解读部门2',
    lururen: '录入人2',
    lurushijian: '2021-10-18',
    zhengwen: '正文2',
    zhuangtai: '0',
    waiguineihuazhuangtai: '0',
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
      statute.zhuangtai = '1';
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
      statute.zhuangtai = '0';
    }
  }
  return {
    success: true,
    content: {},
    message: '废止成功'
  }
}

const getStatuteById = function (param) {
  param = param.body || '';
  let paramObj = JSON.parse(param);
  for (let statute of statutes) {
    if (paramObj.id == statute.id) {
      return {
        success: true,
        content: statute,
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

Mock.mock(RegExp('.*/api/user/login'), 'post', login); // 登录
Mock.mock(RegExp('.*/api/user/register'), 'post', register); // 注册

Mock.mock(RegExp('.*/api/statute/add'), 'post', add); // 增
Mock.mock(RegExp('.*/api/statute/del'), 'delete', del); // 删
Mock.mock(RegExp('.*/api/statute/update'), 'put', update); // 改
Mock.mock(RegExp('.*/api/statute/get$'), 'get', get); // 查
Mock.mock(RegExp('.*/api/statute/publish'), 'put', publish); // 发布
Mock.mock(RegExp('.*/api/statute/abolish'), 'put', abolish); // 废止
Mock.mock(RegExp('.*/api/statute/getStatuteById'), 'get', getStatuteById); // 根据id查询法规详情
